// essential imports
import "./study/style.less";
import { StudyHelper } from "./study/study-helper";

const helper = new StudyHelper();
// if you want to use text block, use below.
// helper.addBlock("");

// ./ => current directory -> relative path
// / => root directory -> absolute path
import { SampleClass, SampleFunction, string_1 } from "./18-sample.js";

// type below
const sampleInstance = new SampleClass();
helper.addBlock({
  text: string_1,
  color: sampleInstance.color,
});
