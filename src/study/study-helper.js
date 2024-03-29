// export class preset
// created for coloso study project
export class StudyHelper {
    
    className = "block";

    constructor(settings) {
        const container = document.createElement("div");
        container.className = "container";
        document.body.appendChild(container);

        this.container = container;
        this.time = 0;
    }

    /**
     * 
     * @param {{text:string, color:string}} object 
     */
    addBlock(object) {
        const block = document.createElement("div");
        block.classList.add(this.className);

        switch(typeof object) {
            case "string":
                block.innerHTML = object;
            break;
            case "number":
                block.innerHTML = object;
            break;
            case "boolean":
                block.innerHTML = object;
            break;
            case "object":
                if(object.text) block.innerHTML = object.text;
                if(object.color) {
                    // boxshadow color
                    block.style.boxShadow = `0 0 10px ${object.color}`;
                    block.style.backgroundColor = object.color
                };
                break;
            }
            
        block.style.animationDelay = `${this.time}s`;
        this.time += 0.1;
        this.container.appendChild(block);
    }
}