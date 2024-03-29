import { StudyHelper } from "./study/study-helper";
const helper = new StudyHelper();

export class template{
    constructor(){
        this.name = ["운진", "민서", "혜윤"];
        this.color = ["yellow", "green", "blue"];
    }

    make_name(){
        const name_index = parseInt(Math.random() * this.name.length);
        const selected_name = this.name[name_index];
        const color_index = parseInt(Math.random() * this.color.length);
        const selected_color = this.color[color_index];
        helper.addBlock({
            text : selected_name,
            color : selected_color,

        });
    }
}
