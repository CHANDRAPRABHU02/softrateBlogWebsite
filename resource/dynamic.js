//This function returns difference between the current time and the blog posted tiem in a formated manner

function formatDateDifference(postedTime, currentTime) {
  let dif = Date.now() - postedTime.getTime();
  dif /= 1000;
  let sec = Math.floor(dif) % 60;
  dif /= 60;
  let minute = Math.floor(dif) % 60;
  dif /= 60;
  let hour = Math.floor(dif) % 24;
  dif /= 24;
  let day = Math.floor(dif) % 365;
  dif /= 365;
  let year = Math.floor(dif);
  // console.log(year, day, hour, minute, sec);
  if (year > 0) return year + " year" + (year > 1 ? "s" : "") + " ago";
  if (day > 0) {
    let month = Math.floor(day / 30);
    if (month > 0) {
      return month + " month" + (month > 1 ? "s" : "") + " ago";
    }
    return day + " day" + (day > 1 ? "s" : "") + " ago";
  }
  if (hour > 0) return hour + " hour" + (hour > 1 ? "s" : "") + " ago";
  if (minute == 0) return "Just now";
  return minute + "minute" + (minute > 1 ? "s" : "") + " ago";
}

async function getData() {
  const res = await fetch("/getHomePage");
  const data = await res.json();
  const currentDate = Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // console.log(data);
  const jdata = {
    title: "AR and VR",
    homePageRelativePath: "assets/img/ar.jpeg",
    blogPage: "Blog_Page.html",
    content:
      "Virtual Reality is the first step in a grand adventure into the landscape of the imagination",
    author: "ABC",
    // timePosted: new Date('07/30/2019'),
    timePosted: new Date(Date.now()),
  };
  data.forEach((jdata) => {
    // console.log(jdata);
    jdata.timePosted = new Date(jdata.timePosted);
    // console.log(jdata.timePosted);
    // console.log(typeof data.timePosted);
    const str = `
    <div class="toptitle" id="toptitle">
      <a href=${jdata.blogPage}>${jdata.title}</a>
    </div>
    <img
      src=${jdata.homePageRelativePath}
      alt="Avatar"
      class="image"
      style="width: 100%"
    />
    <div class="middle">
      <div class="text">
        <a href=${jdata.blogPage}>
        ${jdata.content}
        </a>
        <div class="details">
          <div>
            <span class="material-icons">hourglass_full</span>${formatDateDifference(
              jdata.timePosted,
              currentDate
            )}
          </div>
          <div>
            <span class="material-icons">calendar_today</span>${
              jdata.timePosted.getDate() +
              " " +
              monthNames[jdata.timePosted.getMonth()] +
              " " +
              jdata.timePosted.getFullYear()
            }
          </div>
          <div style="font-family: Roboto, serif; font-size: 25px">
            <b>by <img src=${
              jdata.authorPic
            } style="width:30px;height:30px;border-radius:50%;" /> ${
      jdata.author
    }</b>
          </div>
        </div>
      </div>
    </div>
  `;
    let con = document.createElement("div");
    con.setAttribute("class", "container");
    con.innerHTML = str;
    document.getElementById("blog").appendChild(con);
  });
}

getData();
