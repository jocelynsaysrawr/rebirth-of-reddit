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
  // data.data.children.forEach(arr => {
  const children = data.data.children;
  const post = document.createElement("div");
  post.className = "post";

  const postImg = document.createElement("img");
  postImg.src = children[0].data.url;
  post.appendChild(postImg);

  const postSub = document.createElement("h3");
  postSub.className = "subreddit";
  postSub.innerHTML = children[0].data.subreddit_name_prefixed;

  const postTitle = document.createElement("h4");
  postTitle.className = "title";
  postTitle.innerHTML = children[0].data.title;

  const postAuthor = document.createElement("h4");
  postAuthor.className = "author";
  postAuthor.innerHTML = "By: " + children[0].data.author;

  const postCommentCount = document.createElement("p");
  postCommentCount.className = "commentCount";
  postCommentCount.innerHTML = "Comments: " + children[0].data.num_comments;

  const postScore = document.createElement("p");
  postScore.className = "score";
  postScore.innerHTML = "Score: " + children[0].data.score;

  const postTime = document.createElement("p");
  postTime.className = "time";
  const date = new Date(children[0].data.created * 1000);
  const today = new Date();
  console.log("today: " + (today - date));
  const ms = today - date;
  let s = Math.floor(ms / 1000);
  let m = Math.floor(s / 60);
  s = s % 60;
  let h = Math.floor(m / 60);
  m = m % 60;
  const d = Math.floor(h / 24);
  h = h % 24;
  postScore.innerHTML =
    "Posted: " + d + " days, " + h + " hrs, " + m + " mins ago";

  main.appendChild(postSub);
  main.appendChild(post);
  main.appendChild(postCommentCount);
  main.appendChild(postScore);
  main.appendChild(postTitle);
  main.appendChild(postAuthor);

  const xhr2 = new XMLHttpRequest();
  xhr2.addEventListener("load", function() {
    const data2 = JSON.parse(this.response);
    console.log(data2[1].data.children[0].data.body);
    const postComments = document.createElement("p");
    postComments.className = "comment";
    postComments.innerHTML = data2[1].data.children[0].data.body;
    main.appendChild(postComments);
  });
  xhr2.open(
    "GET",
    "https://www.reddit.com" + children[0].data.permalink + ".json"
  );
  xhr2.send();

  // });
});
xhr.open("GET", "https://www.reddit.com/r/EarthPorn/.json");
xhr.send();
