# burger.js
a simple burger for your projects

## quick start

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
  zIndex: 100,
  click: () => {
    if (Burger.opened === true) console.log('Open')
    else console.log('Close')
  },
})
```
