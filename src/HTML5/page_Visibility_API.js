(() => {
  const show = hidden => console.log(hidden ? '页面不可见' : '页面可见');
  show(document.hidden);
  document.addEventListener('visibilitychange', () => show(document.hidden), false);
})();