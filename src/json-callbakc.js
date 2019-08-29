(() => {
  const {
    data,
    callback,
  } = window.$jsonp;
  callback(data.a + data.b);
})();