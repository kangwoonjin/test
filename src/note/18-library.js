// essential imports
import "./study/style.less";
import { StudyHelper } from "./study/study-helper";
// import npm library
import { add, subtract } from "mathjs";

const helper = new StudyHelper();

helper.addBlock(substract(10, 50));
helper.addBlock(add(10, 50));
