// ,?><
const body = document.querySelector(".body");
const wrong = document.querySelector(".wrong span");
const userName = document.querySelector(".user-name span");
const userInput = document.querySelector(".parent #user-input");
const buttonStart = document.querySelector("#buttonStart");
const buttonEnd = document.querySelector("#buttonEnd");
const failedNumber = document.querySelector(".failedNumber");
buttonStart.onclick = function (eo) {
  if (userInput.value == "") {
  } else {
    document.querySelector(".shadow-start").remove();
    userName.innerText = userInput.value;
  }
};

const allBlock = [...body.children];
const allKeys = [...allBlock.keys()];

const rondomNumber = Math.round(Math.random() * allKeys.length);

function rondomBox() {
  for (let i = 0; i < allKeys.length; i++) {
    const rondomNumber = Math.round(Math.random() * allKeys.length);
    allBlock[i].style.order = rondomNumber;
  }
}
rondomBox();
const block = document.querySelectorAll(".block .front");
let first = "";
let last = "";
let wrongCounter = 0;
let firstBlock;
let lastBlock;
block.forEach((item) => {
  item.onclick = function (eo) {
    if (first == "") {
      eo.target.parentElement.classList.add("active");
      firstBlock = eo.target.parentElement;
      first = eo.target.parentElement.dataset.memory;
    } else if (last == "") {
      eo.target.parentElement.classList.add("active");
      lastBlock = eo.target.parentElement;
      last = eo.target.parentElement.dataset.memory;
      if (first == last) {
        first = "";
        last = "";
        firstBlock.classList.add("true");
        lastBlock.classList.add("true");
      } else {
        wrongCounter++;
        setTimeout(() => {
          block.forEach((it) => {
            it.parentElement.classList.remove("active");
          });
          wrong.innerText = wrongCounter;
          first = "";
          last = "";
        }, 1000);
      }
    }
    checkFinished();
  };
});
let myFinalyBlock = [];
for (let i = 0; i < block.length; i++) {
  myFinalyBlock.push(block[i]);
}
function checkFinished() {
  let myfilter = myFinalyBlock.filter((el) => {
    if (el.parentElement.classList.contains("true")) {
      return this;
    }
  });
  if (myfilter.length == myFinalyBlock.length) {
    setTimeout(() => {
      document.querySelector(".shadow-end").classList.add("db");
      failedCounter();
    }, 500);
  }
}
let num = 0;
function failedCounter() {
  if (failedNumber.innerText < wrongCounter) {
    setInterval(() => {
      if (failedNumber.innerText < wrongCounter) {
        num++;
        failedNumber.innerText = num;
      }
    }, 100);
  }
}
buttonEnd.onclick = function (eo) {
  document.querySelector(".shadow-end").classList.remove("db");
  setTimeout(() => {
    block.forEach((it) => {
      it.parentElement.classList.remove("active");
      it.parentElement.classList.remove("true");
      wrongCounter = 0;
      wrong.innerText = wrongCounter;
      num = 0;
      failedNumber.innerText = num;
      setTimeout(() => {
        rondomBox();
      }, 600);
    });
  }, 500);
};
