// essential imports
import "./study/style.less";
import { StudyHelper } from "./study/study-helper";

const helper = new StudyHelper();
// if you want to use text block, use below.
// helper.addBlock("");

// type below
// ++ -> i = i + 1;
// ++ -> i += 1;
const count = 10;
for(let i=0; i<count; i++) {
    // helper.addBlock(i + 1);
}

const animals = ["cat", "dog", "pig", "lion"];
const colors = ["red", "blue", "yellow", "#fdc900"];
// animals.length = 4
for(let i=0; i<animals.length; i++) {
    // helper.addBlock(animals[i]);
}

// forEach
animals.forEach(function(item, index) {
    helper.addBlock({
        text : item,
        color : colors[index]
    });
});

//if
// 1 + 1 = 2 -> 1 + 1 == 2
// && - AND
// || - OR,
if(animals[0] == "cat") {
    // helper.addBlock("TRUE!!");
} else {
    // helper.addBlock("FALSE!!");
}