var blog = document.getElementById("blog_sec");
var toptitles = document.getElementsByClassName("toptitle");
var meow = document.getElementById("meow");
// console.log(toptitles);
// console.log(toptitles.length);

for (var i = 0; i < toptitles.length; ++i) {
  var toptitle = toptitles[i];
  console.log("now");
  console.log(toptitle);
  toptitle.addEventListener("click", (e) => {
    console.log("clicked ");
    toptitle_clicked = e.target;
    blog_data_fetch(toptitle_clicked.innerHTML);
  });
}

//Fetching

const blog_data_fetch = async (search_text) => {
  console.log(search_text);

  const result = await fetch("../env.local/blogs.json");
  const datas = await result.json();

  let blog_data = datas.filter((data) => {
    const regex = new RegExp(`^${search_text}`, "gi");
    return data.title.match(regex);
  });

  if (blog_data) {
    update_data(blog_data);
  } else {
    alert("No such Blog");
  }
};
