class viewControl {
  static container = document.querySelector("#current-project")
  static elements = document.querySelector("#project-elements")
  static bg = document.querySelector("#project-background")
  
  static drag = false

  static currentViewData = {
    pos: {
      x: 0,
      y: 0
    },
    scale: 1.0,
    last: {
      pos: {
        x: 0,
        y: 0
      }
    }
  }

  static updateBackground = () => {
    var containerWidth = this.container.getBoundingClientRect().width
    var containerHeight = this.container.getBoundingClientRect().height
    this.bg.style.backgroundPositionX = String(containerWidth / 2.0 + this.currentViewData.pos.x) + "px"
    this.bg.style.backgroundPositionY = String(containerHeight / 2.0 + this.currentViewData.pos.y) + "px"
    this.bg.style.backgroundSize = String(this.currentViewData.scale * 100) + "px"
    this.updateElementsContainer()

  }

  static containerObserverConfig = { attributes: true, childList: false, subtree: false };
  static containerObserver = new ResizeObserver(this.updateBackground).observe(this.container, this.containerObserverConfig)

  static containerListenerMouseDown = this.container.addEventListener("mousedown", (ev) => {
    if (ev.buttons === 4) {
      this.drag = true
      this.currentViewData.last.pos.x = this.currentViewData.pos.x
      this.currentViewData.last.pos.y = this.currentViewData.pos.y
    }
  })

  static containerListenerMouseUp = this.container.addEventListener("mouseup", (ev) => {
    if (ev.button === 1) {
      this.drag = false
      this.currentViewData.last.pos.x = this.currentViewData.pos.x
      this.currentViewData.last.pos.y = this.currentViewData.pos.y
    }
    if (ev.button === 2 && this.drag) {
      this.drag = false
      this.currentViewData.pos.x = this.currentViewData.last.pos.x
      this.currentViewData.pos.y = this.currentViewData.last.pos.y
      this.updateBackground()
    }
  })

  static containerListenerMouseMove = this.container.addEventListener("mousemove", (ev) => {
    if (ev.buttons === 4 && this.drag) {
      this.currentViewData.pos.x += ev.movementX
      this.currentViewData.pos.y += ev.movementY
      this.updateBackground()
    }
  })

  static containerListenerMouseScroll = this.container.addEventListener("wheel", (ev) => {
    this.currentViewData.last.scale = this.currentViewData.scale
    if (ev.deltaY > 0) {
      this.zoom(ev.clientX - (window.innerWidth - this.container.getBoundingClientRect().width), ev.clientY - (window.innerHeight - this.container.getBoundingClientRect().height), 1/ 1.1)
    } else {
      this.zoom(ev.clientX - (window.innerWidth - this.container.getBoundingClientRect().width), ev.clientY - (window.innerHeight - this.container.getBoundingClientRect().height), 1.1)
    }
  })

  static zoom = (mouseX, mouseY, amount) => {
    this.currentViewData.scale = this.currentViewData.scale * amount
    document.querySelector(":root").style.setProperty("--outline-scale", 1 / this.currentViewData.scale)
    var mouseOffset = {
      x: mouseX - (this.container.getBoundingClientRect().width / 2.0) - 6,
      y: mouseY - (this.container.getBoundingClientRect().height / 2.0) - 6,
    }
    var viewOffset = {
      x: mouseOffset.x - (mouseOffset.x - this.currentViewData.pos.x) * amount,
      y: mouseOffset.y - (mouseOffset.y - this.currentViewData.pos.y) * amount,
    }
    this.currentViewData.pos.x = viewOffset.x
    this.currentViewData.pos.y = viewOffset.y
    this.updateBackground()
  }

  static resetView = () => {
    this.currentViewData.pos.x = 0
    this.currentViewData.pos.y = 0
    this.currentViewData.scale = 1
    this.updateBackground()
  }

  static resetViewBind = document.addEventListener("keyup", (ev) => {
    if (ev.code === "NumpadDecimal") {
      this.resetView()
    }

  })

  static updateElementsContainer = () => {
    this.elements.style.transform = (
      "translateX(" + String(this.currentViewData.pos.x) + "px)" + 
      "translateY(" + String(this.currentViewData.pos.y) + "px)" +
      "scale(" + String(this.currentViewData.scale) + ")"
    )
  }
}



//TODO: Move to selection handling script

document.querySelectorAll(".element").forEach((el) => {
  el.addEventListener("click", (ev) => {
    if (dragging) return;
    if (ev.button === 0 && ev.shiftKey) {
      el.classList.toggle("selected")
      return
    }
    if (ev.button === 0) {
      var elements = document.querySelectorAll(".element")
      var selected = document.querySelectorAll(".selected")

      if (!el.classList.contains("selected")) {
        elements.forEach((els) => {
          els.classList.remove("selected")
        })
        el.classList.add("selected")
        return
      }
      if (selected.length > 1) {
        elements.forEach((els) => {
          els.classList.remove("selected")
          el.classList.remove("selected")
        })
      } else {
        if (selected.length === 0) {
          el.classList.add("selected")
        } else {
          el.classList.remove("selected")
        }
      }
    }
  })
})

document.addEventListener("mouseup", (ev) => {
  if (ev.button === 0) {
    dragging = false
    lockedX = false
    lockedY = false
  }
  if (ev.button === 2 && dragging) {
    dragging = false
    resetDrag()
  }
})

document.querySelector("#project-background").addEventListener("mouseup", (ev) => {
  if (dragging) return;
  if (ev.button === 0) {
    document.querySelectorAll(".element").forEach((el) => {
      el.classList.remove("selected")
    })
  }
})

document.addEventListener("keypress", (ev) => {
  if (ev.altKey && ev.code === "KeyG") {
    
    document.querySelectorAll(".selected").forEach((el) => {
      el.style.left = "0px"
      el.style.top = "0px"
    })
    return
  }
  if (ev.code === "KeyG") {
    if (!dragging) {
      dragOffset.x = 0
      dragOffset.y = 0
      document.querySelectorAll(".selected").forEach((el) => {
        elementData[String(el.id)] = {x: parseFloat(el.style.left), y: parseFloat(el.style.top)}
      })
    } else {
      lockedX = false
      lockedY = false
    }
    dragging = !dragging
  }
  if (dragging) {
    if (ev.code == "KeyX") {
      lockedY = false
      lockedX = !lockedX
      document.querySelectorAll(".selected").forEach((el) => {
        el.style.top = String(elementData[String(el.id)].y) + "px"
        el.style.left = String(elementData[String(el.id)].x + dragOffset.x) + "px"
      })
    }
    if (ev.code == "KeyY") {
      lockedX = false
      lockedY = !lockedY
      document.querySelectorAll(".selected").forEach((el) => {
        el.style.left = String(elementData[String(el.id)].x) + "px"
        el.style.top = String(elementData[String(el.id)].y + dragOffset.y) + "px"
      })
    }
  }
})

function moveElements(ev) {
}

elementData = {}
dragging = false
lockedX = false
lockedY = false
dragOffset = {x:0, y:0}

document.addEventListener("mousemove", (ev) => {
  if (dragging) {
    dragOffset.x += ev.movementX
    dragOffset.y += ev.movementY
    document.querySelectorAll(".selected").forEach((el) => {
      if (!lockedY) {
        el.style.left = String(parseFloat(el.style.left) + ev.movementX / viewControl.currentViewData.scale) + "px"
      }
      if (!lockedX) {
        el.style.top = String(parseFloat(el.style.top) + ev.movementY / viewControl.currentViewData.scale) + "px"
      }
    })
  }
})

function resetDrag() {
  document.querySelectorAll(".selected").forEach((el) => {
    el.style.left = String(elementData[String(el.id)].x) + "px"
    el.style.top = String(elementData[String(el.id)].y) + "px"
  })

}