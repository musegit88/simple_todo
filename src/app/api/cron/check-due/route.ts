import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:musemyy88@gmail.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function GET(request: NextRequest) {
  // protect the cron endpoint
  if (
    request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const windowEnd = new Date(Date.now() + 5 * 60 * 1000); // due in next 5 min
  const dueTasks = await prisma.tasks.findMany({
    where: { duedate: { lte: windowEnd, gte: new Date() }, notified: false },
    include: { user: { include: { pushSubscriptions: true } } },
  });

  for (const task of dueTasks) {
    for (const sub of task.user.pushSubscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          JSON.stringify({ title: "Task due soon", body: task.name }),
        );
      } catch (error: any) {
        if (error.statusCode === 410) {
          await prisma.pushSubscription.delete({ where: { id: sub.id } });
        }
      }
    }
    await prisma.tasks.update({
      where: { id: task.id },
      data: { notified: true },
    });
  }
  return NextResponse.json({ processed: dueTasks.length });
}
