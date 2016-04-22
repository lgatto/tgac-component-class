# <spark-line>

## Install

```sh
npm install --save sparkline
```

If you have d3 on the page, there is a `spark-line-no-d3.js` build. Additionally you'll need a Web Components enabled browser, or the `webcomponents.js` polyfill.

## Example

To include a sparkline, put this anywhere on the page, before or after you have loaded the sparkline.js library:

```html
<spark-line
	id="GOOG"
	color="blue"
	width=200
	height=30
	>
</spark-line>
```

Data is provided via a data setter. It accepts promises or existing data, so regardless if your data is already loaded, cached, or on an exernal server sparkline.js can handle it!

```js
document.querySelector("spark-line")
	.data = $.getJSON("./some/spark/data.json");
```