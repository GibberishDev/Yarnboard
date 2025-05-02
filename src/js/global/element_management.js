const ElementType = {
    ElText,
    ElPhoto,
    ElImage,
    ElLabel,
    ElDrawing
}

var elements = {
    "elementid": {
        type: ElementType.ElPhoto,
        data: {},
        position: {
            x: 0,
            y: 0
        },
        transformOffset: {
            x: 0,
            y: 0
        },
        scale: {
            x: 1.0,
            y: 1.0
        },
        rotation : 0
    }
}

var conenctions = {
    "id1" : {
        from: "elementStartId",
        to: "elementEndId",
        elementid: "lineElementID"
    },
}