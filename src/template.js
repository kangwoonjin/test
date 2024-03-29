// 박스 템플릿 불러오기
import { StudyHelper } from "/src/study/study-helper";
// 박스 템플릿 변수 설정
const helper = new StudyHelper();

// 샘플 클래스 내보내기 + 샘플 클래스 만들기
export class SampleClass {
    //샘플 클래스의 구조
    constructor(){
        this.names = ["kay", "luna", "Jenna", "Jonas", "Eunsoo"]
        this.result = ["bad","good","nice","awesome"]
        this.colors = ["yellow", "red", "green", "white"]

    }
    // Method 만들기
    createA() {
        const nameIndex = parseInt(Math.random() * this.names.length);
        const colorIndex = parseInt(Math.random() * this.colors.length);
        const selectedName = this.names[nameIndex];
        const selectedcolor = this.colors[colorIndex];

        helper.addBlock({
            text : selectedName,
            color : selectedcolor
        })
    }
     // Method 만들기
    createB() {
        helper.addBlock("is")
    }
     // Method 만들기
    createC() {
        const resultIndex = parseInt(Math.random()*this.result.length);
        const selectedresult = this.result[resultIndex];
        helper.addBlock(selectedresult);

    }

}