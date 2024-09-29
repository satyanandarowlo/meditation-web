(function () {
  const allowedUrl = "https://your-allowed-url.com"; // Set your allowed URL here
  let detected = false;

  const afterDetection = () => {
    if (!detected) {
      console.log("DevTools detection triggered due to incorrect URL!");
      window.dispatchEvent(
        new CustomEvent("urlinfo", {
          detail: {
            isOpen: true,
          },
        })
      );
      detected = true;
    }
  };

  // Check if URL matches the allowed one
  const currentUrl = window.location.href;
  if (currentUrl !== allowedUrl) {
    afterDetection();
  }

  // Continuously check DevTools status using setInterval
  setInterval(() => {
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: function () {
        afterDetection();
      },
    });

    console.log(element); // Trigger the console detection
  }, 10000);
})();
