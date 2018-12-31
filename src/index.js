// Rematrix, import for calc transform
let Rematrix = require('rematrix')
/**
 * @classdesc make elements draggable in a rect
 * @class DraggableEl
 * @constructor
 * @description initialize instance
 * @param {Object} config
 * @param {Element} config.dragButton element used to drag
 * @param {Element} [config.dragEl=dragButton] element which we change the left/top or translate
 * @param {Element} [config.mouseMoveTarget=document] element which we will bind mousemove on
 * @param {Element} [config.mouseUpTarget=document] element which we will bind mouseup on
 * @param {Element} [config.mouseLeaveTarget=document]  element which we will bind mouseleave on
 * @param {Function} [config.mouseDownStartCb=function(event) {}] callback, earliest executed when mousedown event is triggered, **you can return false in the callback, then we will stop**
 * @param {Function} [config.mouseDownEndCb=function(event) {}] callback, latest executed when mousedown event is triggered
 * @param {Function} [config.mouseMoveStartCb=function(event) {}] callback, earliest executed when mousedown event is triggered, **you can return false in the callback, then we will stop**
 * @param {Function} [config.mouseMoveEndCb=function(event) {}] as above end callback
 * @param {Function} [config.mouseUpStartCb=function(event) {}] callback, earliest executed when mouseup event is triggered
 * @param {Function} [config.mouseUpEndCb=function(event) {}] as above end callback
 * @param {Function} [config.mouseLeaveStartCb=function(event) {}] callback, earliest executed when mouseleave event is triggered
 * @param {Function} [config.mouseLeaveEndCb=function(event) {}] as above end callback
 * @param {Element|Rect} [config.containerRect=config.dragEl.parentNode] dragEl will always stay in this area, Rect is like [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect) which must has `{left:Number,top:Number,right:Number,bottom:Number}` properties.
 * @param {Boolean} [config.isLeftTop=false] use absolute left/top or transform:translate()
 * @param {Boolean} [config.isMouseLeaveOn=false] whether to listen mouseleave event
 */
const DraggableEl = (function () {
  //todo can be re-written by static private properties, at that moment we can delete IIFE
  let count = 0
  const instances = []
  let isMobile = false
  return class {
    constructor ({
      dragButton,
      dragEl = dragButton,
      mouseMoveTarget = document,
      mouseUpTarget = document,
      mouseLeaveTarget = document,
      mouseDownStartCb = function () {},
      mouseDownEndCb = function () {},
      mouseMoveStartCb = function () {},
      mouseMoveEndCb = function () {},
      mouseUpStartCb = function () {},
      mouseUpEndCb = function () {},
      mouseLeaveStartCb = function () {},
      mouseLeaveEndCb = function () {},
      containerRect = dragEl.parentNode,
      isLeftTop = false,
      isMouseLeaveOn = false
    }) {
      Object.assign(this, {
        dragButton,
        dragEl,
        mouseMoveTarget,
        mouseUpTarget,
        mouseLeaveTarget,
        containerRect,
        isLeftTop,
        isMouseLeaveOn
      })
      this.callback = {
        mouseDownStartCb,
        mouseDownEndCb,
        mouseMoveStartCb,
        mouseMoveEndCb,
        mouseUpStartCb,
        mouseUpEndCb,
        mouseLeaveStartCb,
        mouseLeaveEndCb
      }
      this.mouseDownCbBind = this.mouseDownCb.bind(this)
      this.mouseMoveCbBind = this.mouseMoveCb.bind(this)
      this.mouseUpCbBind = this.mouseUpCb.bind(this)
      this.dragButton.addEventListener('mousedown', this.mouseDownCbBind)
      this.dragButton.addEventListener('touchstart', this.mouseDownCbBind)
      this.warnIllegalMouseLeave()
      this.id = count++
      instances.push(this)
    }

    /**
     * @description mousedown logic, mainly add event listener and other stuff such as record the start point
     * @param {Event} event
     */
    mouseDownCb (event) {
      isMobile = event.type === 'touchstart'
      let isCancelled = this.callback.mouseDownStartCb.call(this, event)
      if (isCancelled === false) {
        return
      }
      this.hasRendered = true
      this.prevMouseMoveEvent = event
      if (isMobile === true) {
        this.mouseMoveTarget.addEventListener('touchmove', this.mouseMoveCbBind)
        this.mouseUpTarget.addEventListener('touchend', this.mouseUpCbBind)
      } else {
        this.mouseMoveTarget.addEventListener('mousemove', this.mouseMoveCbBind)
        this.mouseUpTarget.addEventListener('mouseup', this.mouseUpCbBind)
        if (this.isMouseLeaveOn) {
          this.mouseLeaveTarget.addEventListener(
            'mouseleave',
            this.mouseUpCbBind
          )
        }
      }
      this.callback.mouseDownEndCb.call(this, event)
    }
    // mousemove logic, such as record the current point
    mouseMoveCb (event) {
      let isCancelled = this.callback.mouseMoveStartCb.call(this, event)
      if (isCancelled === false) {
        return
      }
      if (isMobile === true) {
        event.preventDefault()
      }
      // avoid unnecessary calculation
      if (this.hasRendered === false) {
        return
      }
      requestAnimationFrame(() => {
        this.mouseMoveCalc(event)
        this.callback.mouseMoveEndCb.call(this, event)
        this.hasRendered = true
      })
      this.hasRendered = false
    }
    // do mousemove calculation job
    mouseMoveCalc (event) {
      let offset = {
        x: event.clientX - this.prevMouseMoveEvent.clientX,
        y: event.clientY - this.prevMouseMoveEvent.clientY
      }
      if (isMobile === true) {
        offset = {
          x:
            event.touches[0].clientX -
            this.prevMouseMoveEvent.touches[0].clientX,
          y:
            event.touches[0].clientY -
            this.prevMouseMoveEvent.touches[0].clientY
        }
      }
      let targetOffset = this.correctOffsetInContainer(offset)
      this.setCurPos(targetOffset)
      // save the previous event to calculate position next time
      this.prevMouseMoveEvent = event
    }
    /**
     * @description correct theoretical offset by containerRect
     * @param {{x:Number,y:Number}} offset current event.clientX/Y - previous event.clientX/Y
     */
    correctOffsetInContainer (offset) {
      let curRect = this.dragEl.getBoundingClientRect()
      let containerRect =
        typeof this.containerRect.getBoundingClientRect === 'function'
          ? this.containerRect.getBoundingClientRect()
          : this.containerRect
      let spaceLeft = ['left', 'right', 'top', 'bottom'].reduce((re, key) => {
        re[key] = containerRect[key] - curRect[key]
        return re
      }, {})
      let isLeftOverflow = offset.x < spaceLeft.left
      let isRightOverflow = offset.x > spaceLeft.right
      let isTopOverflow = offset.y < spaceLeft.top
      let isBottomOverflow = offset.y > spaceLeft.bottom
      if (isLeftOverflow) {
        offset.x = spaceLeft.left
      } else if (isRightOverflow) {
        offset.x = spaceLeft.right
      }
      if (isTopOverflow) {
        offset.y = spaceLeft.top
      } else if (isBottomOverflow) {
        offset.y = spaceLeft.bottom
      }
      return offset
    }
    /**
     * @description get dragEl current position and offset, then set target position by current position + offset
     * @param {Object} offset
     * @param {Number} offset.x offset to current position in x axis
     * @param {Number} offset.y offset to current position in y axis
     */
    setCurPos (offset) {
      let style = window.getComputedStyle(this.dragEl)
      let targetPos
      if (this.isLeftTop === true) {
        targetPos = this.setCurLeftTop(style, offset)
      } else {
        targetPos = this.setCurTransform(style, offset)
      }
      this.dragEl.setAttribute('data-x', targetPos.x)
      this.dragEl.setAttribute('data-y', targetPos.y)
    }
    /**
     * @description set dragEl position by left,top
     * @param {CSSStyleDeclaration} style
     * @param {Object} offset
     * @returns {{x:Number,y:Number}} the current offset
     */
    setCurLeftTop (style, offset) {
      let left = style.getPropertyValue('left')
      let top = style.getPropertyValue('top')
      left = Number.parseFloat(left) + Number(offset.x)
      top = Number.parseFloat(top) + Number(offset.y)
      this.dragEl.style.left = left + 'px'
      this.dragEl.style.top = top + 'px'
      return { x: left, y: top }
    }
    /**
     * @description set dragEl position by transform:translate()
     * @param {CSSStyleDeclaration} style
     * @param {Object} offset
     * @todo avoid overwriting scale and skew
     * @returns {{x:Number,y:Number}} the current offset
     */
    setCurTransform (style, offset) {
      let transform = Rematrix.parse(style.getPropertyValue('transform'))
      let translateX = Rematrix.translateX(offset.x)
      let translateY = Rematrix.translateY(offset.y)
      let result = [transform, translateX, translateY].reduce(Rematrix.multiply)
      this.dragEl.style.transform = Rematrix.toString(result)
      return { x: translateX, y: translateY }
    }
    /**
     * @description mouseup logic, remove listeners and other stuff such as record the end point
     * @param {Event} event
     */
    mouseUpCb (event) {
      this.callback.mouseUpStartCb.call(this, event)

      if (isMobile) {
        this.mouseMoveTarget.removeEventListener(
          'touchmove',
          this.mouseMoveCbBind
        )
        this.mouseUpTarget.removeEventListener('touchend', this.mouseUpCbBind)
      } else {
        this.mouseMoveTarget.removeEventListener(
          'mousemove',
          this.mouseMoveCbBind
        )
        this.mouseUpTarget.removeEventListener('mouseup', this.mouseUpCbBind)
        if (this.isMouseLeaveOn) {
          this.mouseLeaveTarget.removeEventListener(
            'mouseleave',
            this.mouseUpCbBind
          )
        }
      }

      this.callback.mouseUpEndCb.call(this, event)
    }
    /**
     * @description remove mousedown listener
     * @returns {Boolean} if destroy successfully return true. Otherwise return false
     */
    destroy () {
      if (isMobile) {
        this.dragButton.removeEventListener('touchstart', this.mouseDownCbBind)
      } else {
        this.dragButton.removeEventListener('mousedown', this.mouseDownCbBind)
      }
      let instanceIndex = instances.findIndex(obj => obj.id === this.id)
      if (instanceIndex >= 0) {
        return !!instances.splice(instanceIndex, 1)
      }
      return false
    }
    /**
     * @description destroy all instances
     */
    destroyAll () {
      while (instances.length !== 0) {
        let instance = instances[0]
        instance.dragButton.removeEventListener(
          'mousedown',
          instance.mouseDownCbBind
        )
      }
    }
    /**
     * @description if [window,document,html].includes(mouseUpTarget)===false
     */
    warnIllegalMouseLeave () {
      let needMouseLeaveMsg =
        'You had better turn on isMouseLeaveOn and mouseLeaveTarget because your mouseUpTarget is not in [window, document, document.documentElement]. In this case, mouseup event won\'t be caught when user release the right button out of document or window. In this case, mouseleave would catch it.'
      let noNeedMouseLeave =
        'You don\'t have to listen mouseleave event because your mouseUpTarget is in [window, document, document.documentElement]. In this case, mouseup event would be caught even you release your right button out of document or window.'
      let idealMouseUpTarget = [window, document, document.documentElement]
      let isMouseUpTargetIdeal =
        idealMouseUpTarget.includes(this.mouseUpTarget) === true
      if (isMouseUpTargetIdeal && this.isMouseLeaveOn === true) {
        console.warn(noNeedMouseLeave)
      }
      if (!isMouseUpTargetIdeal && this.isMouseLeaveOn === false) {
        console.warn(needMouseLeaveMsg)
      }
    }
  }
})()

module.exports = DraggableEl
