(function () {
  // Detect if the app is running as a PWA
  const isPWA =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  // Detect if the app is running in Electron
  const isElectron = !!window.navigator.userAgent
    .toLowerCase()
    .includes("electron");

  // Detect if opened from a mobile browser
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  // Browser details
  const browserDetails = navigator.userAgent;

  let platformType = "desktop"; // Default to desktop

  if (isPWA) {
    platformType = "pwa";
  } else if (isElectron) {
    platformType = "electron";
  } else if (isMobile) {
    platformType = "mobile";
  }

  // Dispatch event with the detected platform and browser details
  window.dispatchEvent(
    new CustomEvent("envinfo", {
      detail: {
        platformType: platformType,
        browserDetails: browserDetails,
      },
    })
  );

  console.log(`Detected platform type: ${platformType}`);
  console.log(`Browser details: ${browserDetails}`);

  // Take further action based on the platform
  if (platformType !== "desktop" && platformType !== "pwa") {
    console.log("Suspicious environment detected. Preventing further access.");
    // You can add code to prevent access here
    document.body.innerHTML = "<h1>Access denied</h1>";
  }
})();
