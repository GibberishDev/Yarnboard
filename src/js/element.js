function addElement() {

}

function removeElement() {

}

const elementTypeEnum = {
    0: "label",
    1: "picture",
    2: "drawing",
    3: "text",
    4: "photo"
}

class Element {
    static type = 0
    static pos = {x: 0, y: 0}
    static rot = 0
    static scale = 1.0

    constructor(type = 0, pos = {x:0,y:0}, rot = 0, scale = 1.0) {
        this.type = type
        this.pos.x = pos.x
        this.pos.y = pos.y
        this.rot = rot
        this.scale = scale
        // return element
    }
}
