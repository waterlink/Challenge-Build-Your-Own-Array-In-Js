function MyArray(initialCapacity) {
    if (initialCapacity === undefined) {
        initialCapacity = 0;
    }

    this.elements = new PlainArray(initialCapacity);
    this.size = this.elements.length;
}

MyArray.prototype.length = function () {
	return this.size;
};

MyArray.prototype.push = function (value) {
	this.resize(this.size+1);
	this.elements.set(this.size-1, value);
};

MyArray.prototype.get = function (index) {
	if(index >= 0 && index < this.size) {
		return this.elements.get(index);
	}

	return undefined;
};

MyArray.prototype.set = function (index, value) {

	if(index >= this.size) {
		this.resize(index + 1);
	}

	this.elements.set(index, value);
};

MyArray.of = function () {
	var a = new MyArray(arguments.length);
	for(var i = 0; i < arguments.length; i++) {
		a.set(i, arguments[i]);
	}
	return a;
};

MyArray.prototype.pop = function () {
	if(this.size == 0) {
		return undefined;
	}

	this.size--;
	var element = this.elements.get(this.size);
	this.elements.set(this.size, undefined)
	return element;
};

MyArray.prototype.concat = function (other) {
	var a = new MyArray(this.size + other.size);

	if(this.size == 0) {
		return other;
	}

	for(var i = 0; i < this.size; i++) {
		a.set(i, this.get(i));
	}

	for(var i = 0; i < other.size; i++) {
		a.set(i + this.size, other.get(i));
	}

	return a;
};

MyArray.prototype.indexOf = function (element) {
	for(var i = 0; i < this.size; i++) {
		if(this.get(i) === element) {
			return i;
		}
	}

	return -1;
};

MyArray.prototype.lastIndexOf = function (element) {
	for(var i = this.size; i > 0; i--) {
		if(this.get(i) === element) {
			return i;
		}
	}

	return -1;
};

MyArray.prototype.includes = function (element) {
	return this.indexOf(element) != -1;
};

MyArray.prototype.find = function (fn) {
	for(var i = 0; i < this.size; i++) {
		if(fn(this.get(i))) {
			return this.get(i);
		}
	}
};

MyArray.prototype.findIndex = function (fn) {
	for(var i = 0; i < this.size; i++) {
		if(fn(this.get(i))) {
			return i;
		}
	}

	return -1;
};

MyArray.prototype.equals = function (other) {
	if(this.size != other.size) {
		return false;
	}

	for(var i = 0; i < this.size; i++) {
		if(this.get(i) != other.get(i)) {
			return false;
		}
	}

	return true;
};

MyArray.prototype.forEach = function (fn) {
	for(var i = 0; i < this.size; i++) {
		fn(this.get(i), i);
	}
};

MyArray.prototype.join = function (separator) {
	var str = '';

	if(separator == undefined) {
		separator = ',';
	}

	this.forEach((element) => {
		str += separator + element;
	});

	str = str.substring(separator.length);

	return str;
};

MyArray.prototype.toString = function () {
	return this.join();
};

MyArray.prototype.map = function (fn) {
  var a = this.slice();
	this.forEach((element, index) => {
    a.set(index, fn(element, index));
  });
	return a;
};

MyArray.prototype.filter = function (fn) {
	var a = new MyArray();

	this.forEach((element, index) => {
		if(fn(element, index)) {
			a.push(element);
		}
	});

	return a;
};

MyArray.prototype.some = function (fn) {
	var r = false;

	this.forEach((element, index) => {
		if(fn(element, index)) {
			r = true;
		}
	});

	return r;
};

MyArray.prototype.every = function (fn) {
	var r = true;

	this.forEach((element, index) => {
		if(!(fn(element, index))) {
			r = false;
		}
	});

	return r;
};

MyArray.prototype.fill = function (value, start, end) {
	if(start == undefined) {
		start = 0;
	}

	if(end == undefined) {
		end = this.size;
	}

	for(var i = start; i < end; i++) {
		this.set(i, value);
	}
};

MyArray.prototype.reverse = function () {
	var a = this.slice();
	var i = this.size;
	a.forEach((element, index) => {
		i--;
		this.set(i, element);
	});
};

MyArray.prototype.shift = function () {
	if(this.size <= 1) {
		this.resize(0);
		return;
	}

	var r = this.get(0);
	var a = this.slice(1, this.size);
	this.size--;
	this.elements = a.elements;

	return r;
};

MyArray.prototype.unshift = function (element) {
	var a = this.slice();
	this.resize(this.size+1);
	this.set(0, element);
	for(var i = 1; i < this.size; i++) {
		this.set(i, a.get(i-1));
	}
};

MyArray.prototype.slice = function (start, end) {
	if(start == undefined) {
		start = 0;
	}

	if(end == undefined) {
		end = this.size;
	}

	var a = new MyArray(end - start);

	for(var i = 0; i < a.size; i++) {
		a.set(i, this.get(i + start));
	}

	return a;
};

MyArray.prototype.splice = function (start, deleteCount) {
	var argsCount = 2;

	if(start == undefined) {
		start = 0;
		argsCount--;
	}

	if(deleteCount == undefined) {
		deleteCount = this.size - start;
		argsCount--;
	}

	// Start
	var a = this.slice(0, start);

	// Insert Arguments
	var insert = new MyArray(arguments.length - argsCount);
	for(var i = 0; i < insert.size; i++) {
		insert.set(i, arguments[i+argsCount]);
	}
	a = a.concat(insert);

	// End
	a = a.concat(this.slice(start + deleteCount));

	this.elements = a.elements;
	this.size = a.size;
};

MyArray.prototype.resize = function (newLength) {
	var n_elements = new PlainArray(newLength);

	// Copy old Array to new Array
	for(var i = 0; i < newLength; i++) {
		n_elements.set(i, this.get(i));
	}

	this.elements = n_elements;
	this.size = newLength;
};
