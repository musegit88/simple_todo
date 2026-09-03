import { prisma } from "@/lib/prisma-client";
import { generateNKeysBetween } from "fractional-indexing";

async function backfill() {
  const users = await prisma.user.findMany({ select: { id: true } });

  for (const { id: userId } of users) {
    const allTasks = await prisma.tasks.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    // All Tasks
    const positionKeys = generateNKeysBetween(null, null, allTasks.length);
    await prisma.$transaction(
      allTasks.map((t, i) =>
        prisma.tasks.update({
          where: { id: t.id },
          data: { position: positionKeys[i] },
        }),
      ),
    );

    // My Day
    const myDay = allTasks.filter((t) => t.myday);
    const myDayPositionKeys = generateNKeysBetween(null, null, myDay.length);
    await prisma.$transaction(
      myDay.map((t, i) =>
        prisma.tasks.update({
          where: { id: t.id },
          data: { myDayPosition: myDayPositionKeys[i] },
        }),
      ),
    );

    // Important
    const important = allTasks.filter((t) => t.important);
    const importantPositionKeys = generateNKeysBetween(
      null,
      null,
      important.length,
    );
    await prisma.$transaction(
      myDay.map((t, i) =>
        prisma.tasks.update({
          where: { id: t.id },
          data: { importantPosition: importantPositionKeys[i] },
        }),
      ),
    );

    // Per-list (grouped by listId)
    const byList = new Map<string, typeof allTasks>();
    for (const t of allTasks) {
      if (!t.listId) continue;
      const arr = byList.get(t.listId) ?? [];
      arr.push(t);
      byList.set(t.listId, arr);
    }
    for (const tasks of byList.values()) {
      const listKeys = generateNKeysBetween(null, null, tasks.length);
      await prisma.$transaction(
        tasks.map((t, i) =>
          prisma.tasks.update({
            where: { id: t.id },
            data: { listPosition: listKeys[i] },
          }),
        ),
      );
    }

    console.log(
      `Backfilled ordering for user ${userId} (${allTasks.length} tasks)`,
    );
  }
}

backfill()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
