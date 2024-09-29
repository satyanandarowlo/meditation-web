(function () {
  const threshold = 100;
  let detected = false; // Flag to ensure detection is only triggered once

  const afterDetection = () => {
    //Events not working with this, but function calls would work
    //   window.dispatchEvent(
    //     new CustomEvent("devtoolschange", {
    //       detail: {
    //         isOpen: true,
    //       },
    //     })
    //   );

    detected = true;
    //console.log("prop accessed");
    //do something specific
  };

  // Console detection trick
  const element = new Image();
  Object.defineProperty(element, "id", {
    get: function () {
      afterDetection(); // Trigger event when the id is accessed
    },
  });

  // Continuously check for DevTools status using setInterval
  setInterval(() => {
    if (!detected) {
      console.log(element); // Trigger the console detection only if not yet detected
    }
  }, 10000); // Check every 10 seconds
})();
