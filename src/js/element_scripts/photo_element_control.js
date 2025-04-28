function move_element(element_id, amount_x, amount_y) {
    var element = document.getElementById(element_id)
    console.log(element)
    if (element.style.left === "") {element.style.left = '0px'}
    if (element.style.top === "") {element.style.top = '0px'}
    element.style.left = String(parseInt(element.style.left) + amount_x) + 'px'
    element.style.top = String(parseInt(element.style.left) + amount_y) + 'px'
}