# burger.js
a simple burger for your projects

## Quick start

```html
<!-- connect js file -->
<script src="https://ivomika.ru/plugins/js/burger.js" rel="script"></script>
<!-- or -->
<script src="burger.js" rel="script"></script>
```

create new script

```html
<!-- init new burger -->
<script rel="script">
  Burger.init('burger')
</script>
```

and add new container with unique id
```html
<button id="burger"></button>
```

## Nav menu
create simple nav menu
```html
<!-- add data-burger="nav" for your DOM elements -->
<button id="burger">
  <a href="#" data-burger="nav">One</a>
  <a href="#" data-burger="nav">Two</a>
  <a href="#" data-burger="nav">Three</a>
</button>
```

## Example and listing of all js settings

```js
Burger.init('burger', {
  height: 25,
  width: 40,
  lineHeight: 4,
  lineBorderRadius: 5,
  topColor: '#333',
  centerColor: '#333',
  bottomColor: '#333',
  transition: 200,
  zIndex: 0,
  padding: 0,
  background: 'none',
  borderRadius: 0,
  menu: {
  // container nav menu. Nav menu will create in .content (standart: body)
    container: '.content', 
    width: 100,
    height: 100,
    background: 'rgba(0,0,0, 0.2)',
    transition: 200,
    zIndex: 0,
  },
  click: () => {
    if (Burger.opened === true) console.log('Open')
    else console.log('Close')
  },
})
```
