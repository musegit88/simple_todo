self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {}
    const title = data.title || 'Reminder';
    const options = {
        body: data.body || "",
        icon: "/icon-192x192.png",
        badge: "/icon-192x192.png",
        data: { url: data.url || "/" }
    }
    event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener("notifiacationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url))
})