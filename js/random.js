console.log("sanity check");

const _request = function(method, url, callback) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener("load", callback);
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

function createPost() {
  const data = JSON.parse(this.responseText);
  console.log(data.data.children);
  const mainRandom = document.getElementById("mainRandom");
  const post = _createElement("div", "post");
  const subredditDiv = _createElement("div", "subredditDiv");
  const imageDiv = _createElement("div", "imageDiv");
  const titleDiv = _createElement("div", "titleDiv");
  const statsDiv = _createElement("div", "statsDiv");
  const commentDiv = _createElement("div", "commentDiv");
  const child0 = data.data.children[0].data;

  const postImg = document.createElement("img");
  if (child0.preview) {
    postImg.src = child0.preview.images[0].source.url;
  } else {
    postImg.src = "https://img.fireden.net/a/image/1451/19/1451192610930.png";
  }

  imageDiv.appendChild(postImg);

  const postSub = _createElement(
    "h2",
    "subreddit",
    false,
    child0.subreddit_name_prefixed
  );
  subredditDiv.appendChild(postSub);

  const postTitle = _createElement("h3", "title", false, child0.title);
  titleDiv.appendChild(postTitle);

  const postAuthor = _createElement(
    "p",
    "author",
    false,
    "by: " + child0.author
  );
  statsDiv.appendChild(postAuthor);

  const postCommentCount = _createElement(
    "p",
    "commentCount",
    false,
    "comments: " + child0.num_comments
  );
  statsDiv.appendChild(postCommentCount);

  const postScore = _createElement(
    "p",
    "score",
    false,
    "score: " + child0.score
  );
  statsDiv.appendChild(postScore);

  function calculateTimeSincePosted(sec) {
    const date = new Date(sec * 1000);
    const today = new Date();
    const ms = today - date;
    console.log("today: " + today);
    console.log("date: " + date);
    console.log(ms);
    let s = Math.floor(ms / 1000);
    let m = Math.floor(s / 60);
    s = s % 60;
    let h = Math.floor(m / 60);
    m = m % 60;
    const d = Math.floor(h / 24);
    h = h % 24;
    return d + "D:" + h + "H:" + m + ":M ago";
  }
  const postTime = document.createElement("p");
  postTime.className = "time";
  const timeElapsed = calculateTimeSincePosted(child0.created_utc);
  postTime.innerHTML = "posted: " + timeElapsed;
  statsDiv.appendChild(postTime);

  mainRandom.appendChild(post);
  post.appendChild(subredditDiv);
  post.appendChild(imageDiv);
  post.appendChild(titleDiv);
  post.appendChild(statsDiv);
  post.appendChild(commentDiv);

  const xhr2 = _request(
    "GET",
    "https://www.reddit.com" + child0.permalink + ".json",
    function() {
      const data2 = JSON.parse(this.response);
      const postComments = document.createElement("p");
      postComments.className = "comment";
      postComments.innerHTML = data2[1].data.children[0].data.body;
      commentDiv.appendChild(postComments);
    }
  );
}

const randomSubreddits = [
  "/r/art/.json",
  "/r/foodporn/.json",
  "/r/memes/.json",
  "/r/onepiece/.json",
  "/r/poetry/.json",
  "/r/comics/.json",
  "/r/celebs/.json",
  "/r/starwars/.json",
  "/r/facepalm/.json",
  "/r/surfing/.json",
  "/r/sports/.json"
];

let randomNumber = Math.floor(Math.random() * randomSubreddits.length);
console.log("random: " + randomNumber);

const randomPost = _request(
  "GET",
  "https://www.reddit.com" + randomSubreddits[randomNumber],
  createPost
);
