# DraggableEl

![npm](https://img.shields.io/npm/v/draggable-el.svg) ![dependencies](https://img.shields.io/badge/dependencies-No%20dependency-brightgreen.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

### Browser Support

This lib uses [transform-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#Browser_compatibility), [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). Their compatibilities is:

**Chrome, Firefox, Safari, Edge12, IE10**

### Usage

#### [demo](https://xianshenglu.github.io/DraggableEl/examples/index/index.html)

#### download package

```bash
npm i --save draggable-el
```

#### import with `require` or `<script>`

```js
let DraggableEl = require('draggable-el')
```

or

```html
<script src="./node_modules/draggable-el/dist/DraggableEl.min.js"></script>
```

#### initialize/destroy instance

- initialize instance

```js
let config = {
  dragButton: document.getElementById('app__drag_el'),
  dragEl: document.getElementById('app__drag_bo')x
}
let instance1 = new DraggableEl(config)
```

more about [config](#Config)

- destroy instance

```js
instance1.destroy()
```

- destroy all instances

```js
instance1.destroyAll()
```

### [Config](./src/index.js)

### Warning

- If `rotate` is in your `transform` or default mode is not good, set `isLeftTop:true` in your config.

### Other Shiny Libs

- [interact.js](https://github.com/taye/interact.js)
- [plain-draggable](https://github.com/anseki/plain-draggable)

### TODO

- [x] support npm
- [x] support browser
- [ ] support mobile touch behavior
- [ ] add readme config
- [x] avoid overwrite transform other values
