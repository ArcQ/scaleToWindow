Scale and align an HTML element in the browser
===============================================

This initially started off being the npm downloadable fork of scale-to-window-pixi by kittykatattack at https://github.com/kittykatattack/scaleToWindow. However for my purposes I have modified it so that it doesn't only apply to a canvas element but a container element with centered children inside of it.
Use the function `scaleToWindow` to scale an HTML element to
the maximum size of the browser's window. `scaleToWindow` will also align the element for the best vertical or horizontal fit inside the browser window. For example, if you have an element that's wider than it is tall, it will be centered vertically inside the browser. If the element is taller than it is wide, it will be centered horizontally.

Here's how to use `scaleToWindow`:

To install, you can use npm
```
npm install --save scale-to-window-pixi
```
## New way of usage

```js
import scaleToWindow from 'scale-to-window-pixi';
// in case you need ssr, it's good to wrap your window objects in some method
const getWindow = () => window;
const getDocument = () => document;
scaleToWindow(eleDict, getWindow, getDocument, backgroundColor)(canvas);
```

`scaleToWindow` accepts 4 arguments:

`eleDict`: this is an object of shape `{ containerSel: '.app', childSelArr: ['.childOne', '.childTwo']}`

scaleToWindow will find the element that matches the selector matched in containerSel, and apply the resize and center based on window size. The way it will apply this will be based on the aspect ratio of the canvas that is passed in. All selectors in `childSelArr` are optional, but will be scaled to the size of the container.

`getWindow`: this is a function that returns the global window object

`getDocument`: this is a function that returns the global document object

`backgroundColor`: (optional) this is the color code of the background color of the surrounding element of everything outside of your view

`canvas`: this is the canvas. You will need to set the initial height and width that reflects a pixel density that matches the device that you are optimizing for. scaleToWindow will use the canvas's dimensions to determine the aspect ratio of the container.

The `scaleToWindow` function also returns the `scale` value that the
element is scaled to. You can find it like this:

scaleToWindow(...)  will give you a number, like 1.98046875, which tells you the
ratio by which the element was scaled. This might be an important value
to know if you need to convert browser pixel coordinates to the scaled
pixel values of the element. For example, if you have a `pointer`
object which tracks the mouse's position in the browser, you might
need to convert those pixel positions to the scaled element coordinates
to find out if the mouse is touching something in the element. Some general code like this will do the trick:
```js
pointer.x = pointer.x / scale;
pointer.y = pointer.y / scale;
```
Optionally, you might also want the element to rescale itself every
time the size of the browser window is changed. If that’s the case,
call `scaleToWindow` inside a window event listener:
```js
window.addEventListener("resize", function(event){ 
  scaleToWindow(eleDict, getWindow, getDocument, backgroundColor)(canvas);
});
```
For the best effect, make sure that you set the browser's default margins and
padding to `0` on all HTML elements. If you don't do this, most
browsers will add some padding around the element borders.  This bit of CSS will do the
trick:
```
<style>* {padding: 0; margin: 0}</style>
```
If you prefer, you can add this CSS style using JavaScript in your main program
like this:
```
const newStyle = document.createElement("style");
const style = "* {padding: 0; margin: 0}";
newStyle.appendChild(document.createTextNode(style));
document.head.appendChild(newStyle);
```


## Originial Methods

The older methods written by kittykatattack remain. To use, they are included in ```scale-to-window-pixi/scale-to-canvas-window```
For actual usage instructions, the old readme still exists under scaleCanvasToWindow/
