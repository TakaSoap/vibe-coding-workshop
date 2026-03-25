/**
 * Wraps DOM updates in document.startViewTransition when available
 * so theme switches can animate (see css/main.css).
 */
(function () {
  function withThemeTransition(updateDom) {
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(updateDom);
    } else {
      updateDom();
    }
  }
  window.withThemeTransition = withThemeTransition;
})();
