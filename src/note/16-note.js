// essential imports
import "./study/style.less";
import { StudyHelper } from "./study/study-helper";

const helper = new StudyHelper();
// if you want to use text block, use below.
// helper.addBlock("");

// +
function add(param_1, param_2) {
  return param_1 + param_2;
}

// -
function sub(param_1, param_2) {
  return param_1 - param_2;
}

// *
function multiply(param_1, param_2) {
  return param_1 * param_2;
}

// /
function divide(param_1, param_2) {
  return param_1 / param_2;
}

// click
window.addEventListener("click", function (param) {
  // helper.addBlock(param.clientX + " , " + param.clientY);

  let output = Math.random() * 10; // 0 ~ 1 * 10 => 0 ~ 10

  output = Math.floor(output);
  // output = parseInt(output);

  helper.addBlock({
    text: output,
    color: "yellow",
  });
});

// variable
const names = ["choi", "kim", "kang", "ko"];
const colors = ["red", "blue", "white", "green"];

// type
window.addEventListener("click", () => {
  let selectedName = names[parseInt(Math.random() * names.length)];
  let selectedColor = colors[parseInt(Math.random() * colors.length)];

  helper.addBlock({
    text: selectedName,
    color: selectedColor,
  });
});
