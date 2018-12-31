
### new DraggableEl(config)
initialize instance


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| config | <code>Object</code> |  |  |
| config.dragButton | <code>Element</code> |  | element used to drag |
| [config.dragEl] | <code>Element</code> | <code>dragButton</code> | element which we change the left/top or translate |
| [config.mouseMoveTarget] | <code>Element</code> | <code>document</code> | element which we will bind mousemove on |
| [config.mouseUpTarget] | <code>Element</code> | <code>document</code> | element which we will bind mouseup on |
| [config.mouseLeaveTarget] | <code>Element</code> | <code>document</code> | element which we will bind mouseleave on |
| [config.mouseDownStartCb] | <code>function</code> | <code>function(event) {}</code> | callback, earliest executed when mousedown event is triggered |
| [config.mouseDownEndCb] | <code>function</code> | <code>function(event) {}</code> | callback, latest executed when mousedown event is triggered |
| [config.mouseMoveStartCb] | <code>function</code> | <code>function(event) {}</code> | as above |
| [config.mouseMoveEndCb] | <code>function</code> | <code>function(event) {}</code> | as above |
| [config.mouseUpStartCb] | <code>function</code> | <code>function(event) {}</code> | as above |
| [config.mouseUpEndCb] | <code>function</code> | <code>function(event) {}</code> | as above |
| [config.mouseLeaveStartCb] | <code>function</code> | <code>function(event) {}</code> | as above |
| [config.mouseLeaveEndCb] | <code>function</code> | <code>function(event) {}</code> | as above |
| [config.containerRect] | <code>Element</code> \| <code>Rect</code> | <code>config.dragEl.parentNode</code> | dragEl will always stay in this area, Rect is like [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect) which must has `{left:Number,top:Number,right:Number,bottom:Number}` properties. |
| [config.isLeftTop] | <code>Boolean</code> | <code>false</code> | use absolute left/top or transform:translate() |
| [config.isMouseLeaveOn] | <code>Boolean</code> | <code>false</code> | whether to listen mouseleave event |
