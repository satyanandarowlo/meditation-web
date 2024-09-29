(function () {
  const threshold = 100;

  const afterDetection = () => {
    window.dispatchEvent(
      new CustomEvent("devtoolschange", {
        detail: {
          isOpen: true,
          type: "db",
        },
      })
    );
  };

  // Option 1: Use a `debugger` statement to detect DevTools by measuring performance
  const checkDevToolsOpen = () => {
    const start = performance.now();
    debugger; // Pause execution here if DevTools is open
    const end = performance.now();
    const timeTaken = end - start;

    // If the time taken is more than the threshold, it means the debugger paused
    if (timeTaken > threshold) {
      // console.log("DevTools is opened!");
      afterDetection();
    } else {
      // console.log("DevTools is closed!");
    }
  };

  // Continuously check for DevTools status using setInterval
  setInterval(() => {
    checkDevToolsOpen();
  }, 1000);
})();
