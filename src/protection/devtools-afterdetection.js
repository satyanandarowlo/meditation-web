(function () {
  window.addEventListener("devtoolschange", (event) => {
    if (event.detail.isOpen) {
      console.log(
        "DevTools detected! Taking action...type is",
        event.detail.type
      );
      // Optionally reload or take further actions
      // window.location.reload();
    }
  });
})();
