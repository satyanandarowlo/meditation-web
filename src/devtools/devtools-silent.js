(function () {
  const afterDetection = () => {
    window.dispatchEvent(
      new CustomEvent("devtoolschange", {
        detail: {
          isOpen: true,
          type: "sl",
        },
      })
    );
  };

  let lastTime = performance.now();
  const checkInterval = 500; // Check every 500 ms
  const threshold = 3000; // If frame takes more than 200 ms, it might indicate DevTools is slowing the script

  setInterval(() => {
    const currentTime = performance.now();
    const timeDiff = currentTime - lastTime;
    lastTime = currentTime;

    if (timeDiff > threshold) {
      // Detected potential DevTools or other abnormal performance issues
      //   console.log("DevTools detected silently due to performance slow down!");
      afterDetection();
      //   alert("DevTools detected silently!");
    }
  }, checkInterval);
})();
