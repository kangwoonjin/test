//import { PointsMaterial } from "three";
import { StudyHelper } from "/src/study/study-helper";
const helper = new StudyHelper();

export class point_event{
    constructor(){
    this.names = ["kay", "jan", "aldo", "luna", "jenna"];
    }

    go_name(){
        const nameIndex = parseInt(Math.random() * this.names.length);
        const selectedname = this.names[nameIndex];
        helper.addBlock({
            text : selectedname,
        })

    }

    paragraph(){
        helper.addBlock("got the points");
    }

    points(){
        const point = parseInt(Math.random() * 100);
        helper.addBlock({
            text : point,
        })
    }

}