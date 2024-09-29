(function () {
  const threshold = 160;

  const afterDetection = () => {
    window.dispatchEvent(
      new CustomEvent("devtoolschange", {
        detail: {
          isOpen: true,
          type: "op",
        },
      })
    );
  };

  const emitEvent = (isOpen, orientation) => {
    if (isOpen) {
      afterDetection();
    }
  };

  const checkDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    const orientation = widthThreshold ? "vertical" : "horizontal";

    if (
      (window.Firebug &&
        window.Firebug.chrome &&
        window.Firebug.chrome.isInitialized) ||
      widthThreshold ||
      heightThreshold
    ) {
      emitEvent(true, orientation);
    }
  };

  // Set interval to continuously check for DevTools
  setInterval(checkDevTools, 500);
})();
