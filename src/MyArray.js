function MyArray(initialCapacity) {
    if (initialCapacity === undefined) {
        initialCapacity = 3;
    }

    this.elements = new PlainArray(initialCapacity);
    this.size = 0;
}

MyArray.prototype.length = function () {
    return this.size;
};

MyArray.prototype.resize = function (newCapacity) {
    var biggerArr = new PlainArray(newCapacity);
    for (var i = 0; i < this.size; i++) {
        biggerArr.set(i, this.elements.get(i));
    }
    this.elements = biggerArr;
};

MyArray.prototype.push = function (value) {

    if (this.elements.length === this.size) {
        this.resize(this.elements.length + 1);
    }

    this.elements.set(this.size, value);
    this.size++;
};

MyArray.prototype.get = function (index) {
    if (index < this.size && index >= 0) {
        return this.elements.get(index);
    }
    return undefined;
};

MyArray.prototype.set = function (index, value) {

    if (this.elements.length <= index) {
        this.resize(index + 1);
    }

    if (index >= this.size) {
        this.size = index + 1;
    }
    return this.elements.set(index, value);
};

MyArray.of = function () {
    var array = new MyArray();
    for (var i = 0; i < arguments.length; i++) {
        array.push(arguments[i]);
    }
    return array;
};

MyArray.prototype.pop = function () {
    if (this.size <= 0) {
        return undefined;
    }

    var value = this.get(this.size - 1);
    this.size--;
    return value;
};

MyArray.prototype.concat = function (other) {
    var newArr = new MyArray(this.size + other.size);
    for (var i = 0; i < this.size; i++) {
        var getItem = this.get(i);
        newArr.set(i, getItem);
    }

    for (var j = 0; j < other.size; j++) {
        var getItemOfOther = other.get(j);
        newArr.set(this.size + j, getItemOfOther);
    }
    return newArr;
};

MyArray.prototype.indexOf = function (element) {
    for (var i = 0; i < this.size; i++) {
        if (this.get(i) === element) {
            return i;
        }
    }

    return -1;
};

MyArray.prototype.lastIndexOf = function (element) {
    for (var i = this.size - 1; i >= 0; i--) {
        if (this.get(i) === element) {
            return i;
        }
    }
    return -1;
};

MyArray.prototype.includes = function (element) {
    for (var i = 0; i < this.size; i++) {
        if (this.get(i) === element) {
            return true;
        }
    }
    return false;
};

MyArray.prototype.find = function (fn) {
    var element;
    for (var i = 0; i < this.size; i++) {
        element = this.get(i);
        if (fn(element)) {
            return element;
        }
    }

};

MyArray.prototype.findIndex = function (fn) {
    var element;
    for (var i = 0; i < this.size; i++) {
        element = this.get(i);
        if (fn(element)) {
            return i;
        }
    }
    return -1;
};

MyArray.prototype.equals = function (other) {

    if (this.size !== other.size) {
        return false;
    }

    // Object.is(value1, value2)
    for (var i = 0; i < this.size; i++) {
        if (this.get(i) !== other.get(i)) {
            return false;
        }
    }
    return true;
};

MyArray.prototype.forEach = function (fn) {
    var element;
    for (var i = 0; i < this.size; i++) {
        element = this.get(i);
        // currentValue, index
        fn(element, i);
    }
};

MyArray.prototype.join = function (separator) {
    if (separator === undefined) {
        separator = ',';
    }
    var result = '';

    for (var i = 0; i < this.size; i++) {
        result += this.get(i);

        if (i < this.size - 1) {
            result += separator;
        }
    }
    return result;
};

MyArray.prototype.toString = function () {
    return this.join();
};

MyArray.prototype.map = function (fn) {
    var newArr = new MyArray(this.size);

    this.forEach(function (element, i) {
        newArr.set(i, fn(element, i));
    });
    return newArr;
};

MyArray.prototype.filter = function (fn) {
    var newArr = new MyArray(this.size);

    this.forEach(function (element, i) {
        if (fn(element, i)) {
            newArr.push(element);
        }
    });
    return newArr;
};

MyArray.prototype.some = function (fn) {
    return this.find(fn) !== undefined;
};

MyArray.prototype.every = function (fn) {
    return this.filter(fn).length() === this.size;
};

MyArray.prototype.fill = function (value, start, end) {

    if (start === undefined) {
        start = 0;
    }

    if (end === undefined) {
        end = this.size;
    }

    for (var i = start; i < end; i++) {
        this.set(i, value);
    }
};

MyArray.prototype.reverse = function () {
    for (var i = 0; i < this.size / 2; i++) {
        var a = this.get(i);
        var b = this.get(this.size - i - 1);

        this.set(i, b);
        this.set(this.size - i - 1, a);
    }
};

MyArray.prototype.shift = function () {

    if (this.size === 0) {
        return undefined;
    }

    var element = this.get(0);
    for (var i = 0; i < this.size; i++) {
        this.set(i, this.get(i + 1));
    }
    this.size--;
    return element;
};

MyArray.prototype.unshift = function (element) {
    for (var i = this.size; i > 0; i--) {
        this.set(i, this.get(i - 1));
    }
    this.set(0, element);
};

MyArray.prototype.slice = function (start, end) {
    if (start === undefined) {
        start = 0;
    }

    if (end === undefined) {
        end = this.size;
    }

    var newArr = new MyArray(this.size);

    for (var i = start; i < end; i++) {
        newArr.set(i - start, this.get(i));
    }
    return newArr;
};

MyArray.prototype.splice = function (start, deleteCount) {

    if (deleteCount === undefined) {
        deleteCount = this.size - start;
    }

    var prefix = this.slice(0, start);

    var middle = new MyArray();

    for (var i = 2; i < arguments.length; i++) {
        middle.push(arguments[i]);
    }

    var suffix = this.slice(start + deleteCount);

    var newArr = prefix.concat(middle).concat(suffix);

    this.elements = newArr.elements;
    this.size = newArr.size;
};