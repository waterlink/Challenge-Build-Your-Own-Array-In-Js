/* global PlainArray */

function MyArray(initialCapacity) {
	//if (initialCapacity === undefined) {
	//	initialCapacity = 0;
	//}
	this.elements = new PlainArray(initialCapacity || 0);	// has .get(i), .set(i,v), .length
	//console.log(this.elements);
	this.size = this.elements.length; // DO THIS LINE AT THE END OF EVERY SIZE-CHANGING METHOD ?
}

MyArray.of = function() {
	if (arguments.length === 0) {
		return new MyArray(0);
	}
	else if (arguments.length === 1) {
		return new MyArray(arguments[0]);
	}
	else {
		var a = new MyArray(arguments.length);
		for (var i = 0; i < arguments.length; ++i) {
			a.set(i, arguments[i]);
		}
		return a;
	}
};

MyArray.prototype.length = function() {		// IDEA: LENGTH() SHOULD NEVER BE A FUNCTION IN JS
	return this.size;
};

MyArray.prototype.get = function(index) {
	// length doesn't change
	if (index < 0 || index >= this.size) return undefined;
	else return this.elements.get(index);
};

MyArray.prototype.set = function(index, value) {
	// length can increase
	if (index >= this.size) {
		var newArray = new PlainArray(index + 1);

		for (var i = 0; i < this.size; i++) {
			newArray.set(i, this.get(i));
		}

		this.elements = newArray;
		this.size = this.elements.length;
	}
	return this.elements.set(index, value);
};

MyArray.prototype.push = function(value) {
	// increases length by 1
	var newArray = new PlainArray(this.size + 1);

	for (var i = 0; i < this.size; i++) {
		newArray.set(i, this.get(i));
	}
	newArray.set(i, value);

	this.elements = newArray;
	this.size = this.elements.length;
	return this;
};

MyArray.prototype.pop = function() {
	// decreases length
	if (this.size === 0) return undefined;

	var i = this.size - 1;
	var el = this.elements.get(i);
	this.elements.set(i, undefined);
	this.elements.length -= 1;
	this.size = this.elements.length;
	return el;
};

MyArray.prototype.concat = function(other) {
	for (var i = 0; i < other.length; i++) {
		this.push(other.get(i));
	}
	return this;
};

MyArray.prototype.indexOf = function(element) {
	for (var i = 0; i < this.elements.length; i++) {
		if (this.elements.get(i) === element) return i;
	}
	return -1;
};

MyArray.prototype.lastIndexOf = function(element) {
	for (var i = this.elements.length - 1; i >= 0; i--) {
		if (this.elements.get(i) === element) return i;
	}
	return -1;
};

MyArray.prototype.includes = function(element) {

};

MyArray.prototype.find = function(fn) {

};

MyArray.prototype.findIndex = function(fn) {

};

MyArray.prototype.equals = function(other) {

};

MyArray.prototype.forEach = function(fn) {

};

MyArray.prototype.join = function(separator) {
	var len = this.elements.length;
	var s = "";
	for (var i = 0; i < len; i++) {
		s += this.get(i);
		if (i+1 < len) s += separator;
	}
	return s;
};

MyArray.prototype.toString = function() {
	return "[" + this.join(", ") + "]";
};

MyArray.prototype.map = function(fn) {

};

MyArray.prototype.filter = function(fn) {

};

MyArray.prototype.some = function(fn) {

};

MyArray.prototype.every = function(fn) {

};

MyArray.prototype.fill = function(value, start, end) {

};

MyArray.prototype.reverse = function() {
	var reversed = new PlainArray(this.size);
	for (var i = this.size - 1; i >= 0; i--) {
		reversed.push(this.get(i));
	}
	return reversed;
};

MyArray.prototype.shift = function() {

};

MyArray.prototype.unshift = function(element) {

};

MyArray.prototype.slice = function(start, end) {

};

MyArray.prototype.splice = function(start, deleteCount) {

};
