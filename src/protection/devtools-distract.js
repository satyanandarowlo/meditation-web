(function () {
  const afterDetection = () => {
    window.dispatchEvent(
      new CustomEvent("devtoolschange", {
        detail: {
          isOpen: true,
          type: "ds",
        },
      })
    );
  };

  const randomDebuggerDisturbance = () => {
    // Random delay between 0 and 5 seconds within every 10-second cycle
    const randomDelay = Math.random() * 5000; // 0 to 5000ms (5 seconds)

    setTimeout(() => {
      const start = performance.now();

      debugger; // Insert debugger after a random delay

      const end = performance.now();
      if (end - start > 100) {
        afterDetection();
      }
    }, randomDelay);
  };

  // Set an interval to run the debugger disturbance every 10 seconds
  setInterval(randomDebuggerDisturbance, 10000); // Run every 10 seconds
})();
