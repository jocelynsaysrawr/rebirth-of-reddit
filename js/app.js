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

const xhr = new XMLHttpRequest();
xhr.addEventListener("load", function() {
  const data = JSON.parse(this.responseText);
  console.log(data.data.children);
  const main = document.getElementById("main");
  data.data.children.forEach(arr => {
    const post = document.createElement("div");
    post.className = "post";
    const postImg = document.createElement("img");
    postImg.src = arr.data.url;
    post.appendChild(postImg);
    main.appendChild(post);
  });
});
xhr.open("GET", "https://www.reddit.com/r/EarthPorn/.json");
xhr.send();
