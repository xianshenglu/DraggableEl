# DraggableEl

![npm](https://img.shields.io/npm/v/draggable-el.svg) ![building](https://img.shields.io/badge/building-pass-brightgreen.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

### Browser Support

This lib uses [transform-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#Browser_compatibility), [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). Their compatibilities are:

**Chrome, Firefox, Safari, Edge15, IE10**

### Usage

#### [demo](https://xianshenglu.github.io/DraggableEl/examples/index/index.html)

1. download package

```bash
npm i --save draggable-el
```

2. import with `require` or `<script>`

```js
let DraggableEl = require('draggable-el')
```

or

```html
<script src="./node_modules/draggable-el/dist/DraggableEl.min.js"></script>
```

3. initialize/destroy instance

- initialize instance

```js
let config = {
  dragButton: document.getElementById('app__drag_el'),
  dragEl: document.getElementById('app__drag_bo')
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

### [Config](./spec/config.md)

### Warning

- If `rotate` is in your `transform` or default mode is not good, set `isLeftTop:true` in your config.

### Other Shiny Libs

- [interact.js](https://github.com/taye/interact.js)
- [plain-draggable](https://github.com/anseki/plain-draggable)

### TODO

- [x] support npm
- [x] support browser
- [ ] add tests
- [x] support mobile touch behavior
- [x] add readme config
- [x] avoid overwrite transform other values
