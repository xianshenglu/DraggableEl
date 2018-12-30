# DraggableEl

### Usage

#### use in browser

```html
<script src=""></script>
```

##### use by npm

```bash
npm i --save DraggableEl
```

```js
let DraggableEl = require('draggable-el')
```

##### initialize/destroy instance

- initialize instance

```js
// draggableEl config
let appRect = app.getBoundingClientRect()
let config = {
  dragButton: app__drag_el,
  dragEl: app__drag_box
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

- [ ] support npm
- [ ] support browser DraggableEl.min.js
- [ ] support mobile touch behavior
- [ ] add readme config
