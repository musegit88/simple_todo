"use client";

import { startTransition, useEffect, useOptimistic, useState } from "react";
import { urlBase64ToUint8Array } from "@/lib/push";
import { toast } from "sonner";
import { Bell, BellOff } from "lucide-react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useRouter } from "next/navigation";

const PushSubscribeButton = () => {
  const router = useRouter();
  const [subscribed, setSubscribed] = useState(false);
  const [supported, setSupported] = useState(true);
  const [optimisticSubscribed, addOptimisticSubscribed] =
    useOptimistic(subscribed);
  const handleCheckbox = async (checked: CheckedState) => {
    const next = checked === true;

    startTransition(() => {
      addOptimisticSubscribed(next);
    });

    if (next) {
      await subscribe();
    } else {
      await unsubscribe();
    }

    setSubscribed(next);
    router.refresh();
  };

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setSupported(false);
      return;
    }
    navigator.serviceWorker.register("/sw.js").then(async (reg) => {
      const sub = await reg.pushManager.getSubscription();
      setSubscribed(!!sub);
    });
  }, []);

  const subscribe = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });
    try {
      const response = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }
      setSubscribed(true);
      toast.success("Subscribed for push notifications!");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error subscribing:", error.message);
        toast.error("Failed to subscribe for push notifications.");
      } else {
        console.error("Error subscribing:", error);
      }
    }
  };

  const unsubscribe = async () => {
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    if (!sub) return;
    try {
      const response = await fetch("/api/push/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: sub.endpoint }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }
      await sub.unsubscribe();
      setSubscribed(false);
      toast.success("Unsubscribed from push notification");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error unsubscribing:", error.message);
      } else {
        console.error("Error unsubscribing:", error);
      }
    }
  };

  if (!supported) return null;
  return (
    <Label className="flex items-center w-full sm:w-fit gap-2 sm:ml-4 border px-4 py-4 rounded-md cursor-pointer hover:shadow-md">
      {optimisticSubscribed ? <Bell /> : <BellOff />}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={optimisticSubscribed}
          onCheckedChange={handleCheckbox}
        />
      </div>
      {optimisticSubscribed ? "Disable reminders" : "Enable reminders"}
    </Label>
  );
};

export default PushSubscribeButton;
