// essential imports
import "./study/style.less";
import { StudyHelper } from "./study/study-helper";

const helper = new StudyHelper();
// if you want to use text block, use below.
// helper.addBlock("");

// type below
class NewClass {
    // function NewFunction(param) {}
    // staic, public, private
    constructor(param) {
        /*
            param = {
                x:0,
                y:0,
                z:0
            }
        */
        this.property_1 = param.x;
        this.property_2 = param.y;
        this.property_3 = param.z;
    }

    changeValue(param) {
        this.property_1 = param.x;
        this.property_2 = param.y;
        this.property_3 = param.z;
    }
    
    sum() {
        helper.addBlock(this.property_1 + this.property_2 + this.property_3);
    }
}

const NewInstance = new NewClass({
    x:0,
    y:10,
    z:100
});

NewInstance.changeValue({
    x:50,
    y:30,
    z:1800
});

NewInstance.sum();