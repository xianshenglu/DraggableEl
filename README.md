# DraggableEl

![npm](https://img.shields.io/npm/v/draggable-el.svg) ![dependencies](https://img.shields.io/badge/dependencies-No%20dependency-brightgreen.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

### Usage

#### [demo](https://xianshenglu.github.io/DraggableEl/examples/index/index.html)

#### use in browser

```html
<script src="https://xianshenglu.github.io/DraggableEl/dist/DraggableEl.min.js"></script>
```

#### use by npm

```bash
npm i --save draggable-el
```

```js
let DraggableEl = require('draggable-el')
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

### Config

### TODO

- [x] support npm
- [x] support browser
- [ ] support mobile touch behavior
- [ ] add readme config
