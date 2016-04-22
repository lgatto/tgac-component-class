const sparklineVis = require("./sparkline");

class Sparkline extends HTMLElement {
    createdCallback() {
	this._observed = ["width", "height", "color", "points"];
	this.style.display = "inline-block"; 
    }

    attachedCallback() {
	this._takeAllAttributes();
	this._render();
    }

    attributeChanged(name, previous, current) {
	this[name] = current;
    }

    // this.points = ...
    set points(string) {
	const values = string.split(" ")
	      .map(s => parseFloat(s));
	this._points = values;
    }

    set color(v) {
	this._color = v || "black";
    }

    // const = this.points;
    // document.querySelector("spark-line").points
    get points() {
	return this._points;
    }
    
    _takeAllAttributes() {
	for (const attribute of this._observed) {
	    this[attribute] = this.getAttribute(attribute);
	}
    }
    
    _render() {

	const points = this._points.map(function(y, i) {
	    return {y, x: i};
	})
	
	sparklineVis.render({
	    el: this,
	    width: this._width,
	    height: this._height,
	    color: this._color,
	    points: points,
	})
    }
}

document.registerElement("spark-line", Sparkline);

// // TODO create your element prototype - make sure you use
// // Object.create() to inherit - HTMLElement

// const sparklinePt = Object.create(HTMLElement.prototype);


// // TODO implement the createdCallback to setup the
// // element

// sparklinePt.createdCallback = function() {
//     this.innerHTML = "I am a sparkline";
//     this.style.color = "red";
// }

// // TODO implement the attachedCallback to create
// // our visual content
// //
// // TODO implement the detachedCallback to remove
// // our visual content

// // TODO implement attributeChanged to handle
// // parsing, and then give this to our d3 code

// // TODO register 
// document.registerElement("spark-line", {
//   prototype: sparklinePt,
// });
