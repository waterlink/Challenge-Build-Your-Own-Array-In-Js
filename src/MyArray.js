function MyArray(initialCapacity) {
    if (initialCapacity === undefined) {
        initialCapacity = 0;
    }

    this.elements = new PlainArray(initialCapacity);
    this.size = 0;
}

MyArray.prototype.length = function () {
    return this.elements.length;
};

MyArray.prototype.resize = function (capacity) {
    var newArray = new PlainArray(capacity);

    for (var i = 0; i < Math.min(this.size, capacity); i++) {
        newArray.set(i, this.elements.get(i));
    }

    this.size = capacity;
    delete this.elements;
    this.elements = newArray;
};

MyArray.prototype.push = function (value) {
    this.resize(this.size + 1);
    this.elements.set(this.size - 1, value);
};

MyArray.prototype.get = function (index) {
    if (index < 0) {
        return undefined;
    }
    if (index >= this.size) {
        return undefined;
    }
    return this.elements.get(index);
};

MyArray.prototype.set = function (index, value) {
    if (index < 0) {
        throw Error();
    }
    if (index >= this.size) {
        this.resize(index + 1);
    }

    this.elements.set(index, value);
};

MyArray.of = function () {
    var newArray = new MyArray(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
        newArray.set(i, arguments[i]);
    }
    return newArray;
};

MyArray.prototype.pop = function () {
    if (this.size < 1) {
        return undefined;
    }
    var returnValue = this.get(this.size - 1);
    this.resize(this.size - 1);
    return returnValue;
};

MyArray.prototype.concat = function (other) {
    var newArray = new MyArray(other.size + this.size);
    for (var i = 0; i < this.size; i++) {
        newArray.set(i, this.elements.get(i));
    }
    for (var i = 0; i < other.size; i++) {
        newArray.set(this.size + i, other.elements.get(i));
    }
    return newArray;
};

MyArray.prototype.indexOf = function (element) {
    for (var i = 0; i < this.size; i++) {
        if (this.elements.get(i) === element) {
            return i;
        }
    }

    return -1;
};

MyArray.prototype.lastIndexOf = function (element) {
    for (var i = this.size -1; i >= 0; i--) {
        if (this.elements.get(i) === element) {
            return i;
        }
    }

    return -1;
};

MyArray.prototype.includes = function (element) {
    for (var i = 0; i < this.size; i++) {
        if (this.elements.get(i) === element) {
            return true;
        }
    }

    return false;
};

MyArray.prototype.find = function (fn) {
    for (var i = 0; i < this.size; i++) {
        var element = this.elements.get(i);
        if (fn(element)) {
            return element;
        }
    }

    return undefined;
};

MyArray.prototype.findIndex = function (fn) {
    for (var i = 0; i < this.size; i++) {
        var element = this.elements.get(i);
        if (fn(element)) {
            return i;
        }
    }

    return -1;
};

MyArray.prototype.equals = function (other) {
    if (other === this) {
        return true;
    }

    if (other.size !== this.size) {
        return false;
    }

    for (var i = 0; i < this.size; i++) {
        if (this.elements.get(i) !== other.elements.get(i)) {
            return false;
        }
    }

    return true;
};

MyArray.prototype.forEach = function (fn) {
    for (var i = 0; i < this.size; i++) {
        var element = this.elements.get(i);
        fn(element, i);
    }
};

MyArray.prototype.join = function (separator) {
    if (this.size < 1) {
        return '';
    }
    if (typeof separator === 'undefined') {
        separator = ',';
    }

    var value = String(this.elements.get(0));
    for (var i = 1; i < this.size; i++) {
        var element = this.elements.get(i);
        value += separator + String(element);
    }

    return value;
};

MyArray.prototype.toString = function () {
    return this.join();
};

MyArray.prototype.map = function (fn) {
    var newArray = new MyArray(this.size);
    for (var i = 0; i < this.size; i++) {
        var element = this.elements.get(i);
        newArray.set(i, fn(element, i));
    }
    return newArray;
};

MyArray.prototype.filter = function (fn) {
    var newArray = new MyArray(0);
    for (var i = 0; i < this.size; i++) {
        var element = this.elements.get(i);
        if (fn(element, i)) {
            newArray.push(element);
        }
    }
    return newArray;
};

MyArray.prototype.some = function (fn) {
    for (var i = 0; i < this.size; i++) {
        var element = this.elements.get(i);
        if (fn(element, i)) {
            return true;
        }
    }
    return false;
};

MyArray.prototype.every = function (fn) {
    for (var i = 0; i < this.size; i++) {
        var element = this.elements.get(i);
        if (!fn(element, i)) {
            return false;
        }
    }
    return true;
};

MyArray.prototype.fill = function (value, start, end) {
    if (typeof start === 'undefined') {
        start = 0;
    }
    if (typeof end === 'undefined') {
        end = this.size;
    }

    for (var i = start; i < end; i++) {
        this.elements.set(i, value);
    }
};

MyArray.prototype.reverse = function () {
    var lastIndex = this.size - 1;
    var iterations = Math.floor(this.size / 2) + (this.size & 1);
    for (var i = 0; i < iterations; i++) {
        var toBack = this.elements.get(i);
        var toFront = this.elements.get(lastIndex - i);
        this.elements.set(i, toFront);
        this.elements.set(lastIndex - i, toBack);
    }
};

MyArray.prototype.shift = function () {
    if (this.size < 1) {
        return undefined;
    }

    var returnValue = this.elements.get(0);
    for (var i = 1; i < this.size; i++) {
        this.elements.set(i - 1, this.elements.get(i));
    }
    this.resize(this.size - 1);
    return returnValue;
};

MyArray.prototype.unshift = function (element) {
    this.resize(this.size + 1);
    for (var i = this.size - 1; i >= 1; i--) {
        this.elements.set(i, this.elements.get(i - 1));
    }
    this.elements.set(0, element);
};

MyArray.prototype.slice = function (start, end) {
    if (typeof start === 'undefined') {
        start = 0;
    }
    if (typeof end === 'undefined') {
        end = this.size;
    }
    var newArray = new MyArray(end - start);
    for (var i = start; i < end; i++) {
        newArray.set(i - start, this.elements.get(i));
    }
    return newArray;
};

MyArray.prototype.splice = function (start, deleteCount) {
    if (typeof deleteCount === 'undefined') {
        deleteCount = this.size;
    }

    var newArray = this.slice(0, start);
    if (arguments.length > 2) {
        var newElements = MyArray.of(...arguments).slice(2);
        newArray = newArray.concat(newElements);
    }

    if (start + deleteCount <= this.size) {
        var tail = this.slice(start + deleteCount);
        newArray = newArray.concat(tail);
    }

    this.resize(newArray.size);
    for (var i = 0; i < this.size; i++) {
        this.elements.set(i, newArray.elements.get(i));
    }
};
