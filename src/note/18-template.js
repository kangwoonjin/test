import { StudyHelper } from "./study/study-helper";
const helper = new StudyHelper();

export class SampleClass {
  constructor() {
    this.names = ["choi", "kim", "han", "ko"];
    this.colors = ["red", "blue", "yellow", "green", "white"];
  }

  createBlock() {
    const nameIndex = parseInt(Math.random() * this.names.length); // 0 ~ 4
    const colorIndex = parseInt(Math.random() * this.colors.length); // 0 ~ 5

    const selectedName = this.names[nameIndex];
    const selectedColor = this.colors[colorIndex];

    helper.addBlock({
      text: selectedName,
      color: selectedColor,
    });
  }
}
