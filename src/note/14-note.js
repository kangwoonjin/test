import "./study/style.less";
import { StudyHelper } from "/src/study/study-helper";

const helper = new StudyHelper();

// type below

// const, let
const Name01 = "Coloso";
let Name02 = "Javascript";

// string
let String01 = "Hello";

// number
let Number01 = 10;

// boolean
let Boolean01 = true;

// array
const Array01 = ["Coloso", 100, true, "Coloso2"];

// object
const skills = ["Programming", "Drawing", "Reading"];
const Object01 = {
  name: "Coloso",
  age: 100,
  isMale: true,
  skills: skills,
};

// function
const Function01 = function () {
  const Item01 = "Web";
  const Item02 = "Site";

  const Item03 = 15;
  const Item04 = 30;

  return Item03 + Item04;
};

// say hello!
helper.addBlock(Function01());
