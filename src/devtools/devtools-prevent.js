(function () {
  // Prevent right-click (context menu)
  window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    //   alert("Right-click is disabled!");
  });

  // Prevent common key shortcuts used to open DevTools
  window.addEventListener("keydown", function (e) {
    // Disable F12 key (open DevTools)
    if (e.keyCode === 123) {
      e.preventDefault();
      // alert("F12 is disabled!");
    }

    // Disable Ctrl+Shift+I or Cmd+Option+I (open DevTools)
    if (
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
      (e.metaKey && e.altKey && e.keyCode === 73)
    ) {
      e.preventDefault();
      // alert("DevTools shortcut is disabled!");
    }

    // Disable Ctrl+Shift+J (open DevTools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      // alert("DevTools shortcut is disabled!");
    }

    // Disable Ctrl+U (view source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      // alert("View source shortcut is disabled!");
    }

    // Disable Ctrl+Shift+C (open element inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
      // alert("Inspect element shortcut is disabled!");
    }
  });
})();
