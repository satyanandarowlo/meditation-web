(function () {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  const platform = isMobile ? "mobile" : "desktop";

  window.dispatchEvent(
    new CustomEvent("deviceinfo", {
      detail: {
        platform: platform,
      },
    })
  );

  console.log(`Detected platform: ${platform}`);

  // You can also handle any suspicious access here by platform type.
  if (platform === "mobile") {
    console.log("Mobile device detected");
    // Optionally prevent access or other actions for mobile devices
  }
})();
