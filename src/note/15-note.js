import "./study/style.less";
import { StudyHelper } from "/src/study/study-helper";

const helper = new StudyHelper();

// type below
// ++ -> i = i + 1;
// ++ -> i += 1;

// -- -> i = i - 1;
// -- -> i -= 1;

const count = 10;
for (let i = 0; i < count; i++) {
  helper.addBlock(i);
}

const animals = ["dog", "cat", "tiger", "lion", "bear"];
const colors = ["red", "blue", "white", "green", "#fdc900"];
// animals.length = 5;

// for
for (let i = 0; i < animals.length; i++) {
  helper.addBlock(animals[i]);
}

// foreach
animals.forEach(function (item, index) {
  helper.addBlock({
    text: item,
    color: colors[index],
  });
});

// if
// 1 + 1 = 2 (error) -> 1 + 1 == 2 (collect)
// && - AND
// || - OR
if (1 == 1 && (2 == 2 || 3 == 6)) {
  helper.addBlock("true");
} else {
  helper.addBlock("false");
}
