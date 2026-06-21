// public/sw.js
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const { title = "إشعار جديد", body = "", url = "/" } = data;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/favicon.ico",
      data: { url },
      vibrate: [100, 50, 100],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url } = event.notification.data || {};
  if (url) {
    event.waitUntil(clients.openWindow(url));
  }
});
