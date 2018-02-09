console.log("sanity check");

const _request = function(method, url, callback) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    const data = JSON.parse(this.responseText);
    return callback.bind(this)(data);
  });
  oReq.open(method, url);
  oReq.send();
};

const _createElement = function(type, className, id, innerHTML) {
  const element = document.createElement(type);
  if (className) {
    element.className = className;
  }
  if (id) {
    element.id = id;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
};
