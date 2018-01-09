/* global PlainArray */

function MyArray(initialCapacity) {
	this.elements = new PlainArray(initialCapacity || 0);
	this.size = this.elements.length;
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

MyArray.prototype.length = function() {
	return this.size;
};

MyArray.prototype.get = function(index) {
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
	// decreases length by 1
	if (this.size === 0) return undefined;

	var i = this.size - 1;
	var el = this.elements.get(i);
	this.elements.set(i, undefined);
	this.size = this.elements.length - 1;

	return el;
};

MyArray.prototype.concat = function(other) {
	// other could be MyArray or Array
	// need one branch for PlainArray.get(i), other for Array[i]
	if (other instanceof MyArray) {
		for (var i = 0; i < other.size; i++) {
			this.push(other.get(i));
		}
	}
	else if (other instanceof Array) {
		for (var i = 0; i < other.length; i++) {
			this.push(other[i]);
		}
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
	return this.indexOf(element) > -1;
};

MyArray.prototype.find = function(fn) {
	for (var i = 0; i < this.size; i++) {
		var el = this.elements.get(i);
		if (fn.call(null, el)) return el;
	}
	return undefined;
};

MyArray.prototype.findIndex = function(fn) {
	for (var i = 0; i < this.size; i++) {
		var el = this.elements.get(i);
		if (fn.call(null, el)) return i;
	}
	return -1;
};

MyArray.prototype.equals = function(other) {
	// Unwrap:
	if (other instanceof MyArray) other = other.elements;

	// False if lengths differ:
	if (this.size !== other.length) return false;

	// False if an element differs:
	for (var i = 0; i < this.size; i++) {
		if (this.get(i) !== other.get(i)) return false;
	}
	// True if same length and same elements:
	return true;
};

MyArray.prototype.forEach = function(fn) {
	for (var i = 0; i < this.size; i++) {
		var el = this.elements.get(i);
		fn.call(null, el, i);
	}
};

MyArray.prototype.join = function(separator = ",") {
	var len = this.elements.length,
		s = "";

	for (var i = 0; i < len; i++) {
		s += this.get(i);
		if (i+1 < len) s += separator;
	}

	return s;
};

MyArray.prototype.toString = function() {
	return this.join();
};

MyArray.prototype.map = function(fn) {
	var newArray = new MyArray(0);

	this.forEach(function(el) {
		newArray.push(fn.call(null, el));
	});

	return newArray;
};

MyArray.prototype.filter = function(fn) {
	var newArray = new MyArray(0);

	this.forEach(function(el) {
		if (fn.call(null, el)) newArray.push(el);
	});

	return newArray;
};

MyArray.prototype.some = function(fn) {
	return this.filter(fn).length() > 0;
};

MyArray.prototype.every = function(fn) {
	return this.filter(fn).equals(this);
};

MyArray.prototype.fill = function(value, start, end) {
	start = start || 0;
	end = end || this.size;

	for (var i = start; i < end; i++) {
		this.set(i, value);
	}

	return this;
};

MyArray.prototype.reverse = function() {
	var reversed = new MyArray(0);

	for (var i = this.size - 1; i >= 0; i--) {
		reversed.push(this.get(i));
	}

	this.elements = reversed.elements;

	return this;
};

MyArray.prototype.shift = function() {
	var el = this.get(0),
		newArray = new MyArray(0);

	for (var i = 1; i < this.size; i++) {
		newArray.push(this.get(i));
	}

	this.elements = newArray.elements;
	this.size = this.elements.length;

	return el;
};

MyArray.prototype.unshift = function(element) {
	var newArray = new MyArray(0);
	newArray.push(element);

	for (var i = 0; i < this.size; i++) {
		newArray.push(this.get(i));
	}

	this.elements = newArray.elements;
	this.size = this.elements.length;

	return this;
};

MyArray.prototype.slice = function(start, end) {
	start = start || 0;
	end = end || this.size;
	var newArray = new MyArray(0);

	for (var i = start; i < end; i++) {
		newArray.push(this.get(i));
	}

	return newArray;
};

MyArray.prototype.splice = function(start, deleteCount, ...items) {
	if (items === undefined) items = [];
	if (deleteCount === undefined) deleteCount = this.size - start;

	var end = start + deleteCount;
	var head = new MyArray(0),
		tail = new MyArray(0),
		deleted = new MyArray(0);

	this.forEach(function(el,i) {
		if (i < start) head.push(this.get(i));
		else if (i >= end) tail.push(this.get(i));
		else deleted.push(this.get(i));
	}.bind(this));

	this.elements = head.concat(items).concat(tail).elements;
	this.size = this.elements.length;

	return deleted;
};
