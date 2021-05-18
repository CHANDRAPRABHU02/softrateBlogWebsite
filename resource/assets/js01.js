function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var x = 1,
  len = 3,
  isMoving = false;

async function demol() {
  isMoving = true;
  var pre = x;
  x--;
  if (x == 0) x = len;
  moveRight(pre, x);
  for (let i = 1; i <= len; i++)
    document.getElementById("part-" + i).style.display =
      i != x && i != pre ? "none" : "block";
  await sleep(1000);
  for (let i = 1; i <= len; i++)
    document.getElementById("part-" + i).style.display =
      i != x ? "none" : "block";
  isMoving = false;
}
async function demor() {
  isMoving = true;
  var pre = x;
  x++;
  if (x == len + 1) x = 1;
  moveLeft(pre, x);
  for (let i = 1; i <= len; i++)
    document.getElementById("part-" + i).style.display =
      i != x && i != pre ? "none" : "block";
  await sleep(1000);
  for (let i = 1; i <= len; i++)
    document.getElementById("part-" + i).style.display =
      i != x ? "none" : "block";
  isMoving = false;
}

async function moveRight(r, l) {
  let val = 0;
  // console.log(l + " " + r);
  document.getElementById("part-" + l).style.left = "unset";
  document.getElementById("part-" + r).style.right = "unset";
  while (val <= 102.5) {
    document.getElementById("part-" + r).style.opacity = 100 - val + "%";
    document.getElementById("part-" + r).style.left = val + "vw";
    document.getElementById("part-" + l).style.right = 100 - val + "vw";
    document.getElementById("part-" + l).style.opacity = "100%";
    val += 1;
    await sleep(10);
  }
  document.getElementById("part-" + l).style.right = "-2.5vw";
}
async function moveLeft(l, r) {
  let val = 100;
  // console.log(l /+ " " + r);
  while (val > -1) {
    // console.log(val, r, l);
    document.getElementById("part-" + r).style.opacity = "100%";
    document.getElementById("part-" + r).style.right = "unset";
    document.getElementById("part-" + r).style.left = val + "vw";
    document.getElementById("part-" + l).style.right = 100 - val + "vw";
    document.getElementById("part-" + l).style.left = "unset";
    document.getElementById("part-" + l).style.opacity = val + "%";
    val -= 1;
    await sleep(10);
  }
}

// demo();

async function changeBackGroundColor() {
  while (true) {
    // document.getElementById("main-container")
    // document.getElementsByClassName("front-div").style.backgroundColor = "red";
    elements = document.getElementsByClassName("front-div");
    // console.log(elements);
    for (let i = 0; i < elements.length; i++)
      elements[i].style.backgroundColor =
        "rgb(" +
        (190 + Math.random() * 40) +
        "," +
        (190 + Math.random() * 40) +
        "," +
        (190 + Math.random() * 40);
    // console.log("hi");
    await sleep(2000);
  }
}

changeBackGroundColor();

async function autoslide() {
  while (1) {
    if (isMoving) await sleep(5000);
    else {
      await sleep(3000);
      demor();
    }
  }
}

autoslide();

$(window).scroll(function () {
  if ($(this).scrollTop() > 0) {
    $(".nav").fadeOut();
  } else {
    $(".nav").fadeIn();
  }
});

var interval_id;
$(window).focus(function () {
  // console.log("Focused");
  isMoving = false;
});

$(window).blur(function () {
  // console.log("blur");
  isMoving = true;
});
