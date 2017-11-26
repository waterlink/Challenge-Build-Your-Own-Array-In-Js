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

MyArray.prototype.push = function (value) {
    if (this.elements.length === this.size) {
        this.grow();
    }

    this.elements.set(this.size, value);
    this.size += 1;
};

MyArray.prototype.grow = function () {
    var bigger = new PlainArray(this.elements.length * 2 + 1);
    for (var i = 0; i < this.size; i++) {
        bigger.set(i, this.get(i));
    }
    this.elements = bigger;
};

MyArray.prototype.get = function (index) {
    try {
        return this.elements.get(index);
    } catch (error) {
        if (error instanceof ArrayIndexOutOfBoundsError) {
            return undefined;
        }

        throw error;
    }
};

MyArray.prototype.set = function (index, value) {
    while (this.elements.length <= index) {
        this.grow();
    }

    if (this.length() <= index) {
        this.size = index + 1;
    }

    this.elements.set(index, value);
};

MyArray.of = function () {
    var array = new MyArray(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
        array.push(arguments[i]);
    }
    return array;
};

MyArray.prototype.pop = function () {
    if (this.length() === 0) {
        return undefined;
    }

    var value = this.get(this.length() - 1);
    this.set(this.length() - 1, undefined);
    this.size -= 1;
    return value;
};

MyArray.prototype.concat = function (other) {
    var i;
    var array = new MyArray();

    for (i = 0; i < this.length(); i++) {
        array.push(this.get(i));
    }

    for (i = 0; i < other.length(); i++) {
        array.push(other.get(i));
    }

    return array;
};

MyArray.prototype.indexOf = function (element) {
    return this.findIndex(function (x) {
        return x === element;
    });
};

MyArray.prototype.lastIndexOf = function (element) {
    for (var i = this.length() - 1; i >= 0; i--) {
        if (this.get(i) === element) {
            return i;
        }
    }

    return -1;
};

MyArray.prototype.includes = function (element) {
    return this.indexOf(element) !== -1;
};

MyArray.prototype.find = function (fn) {
    var index = this.findIndex(fn);

    if (index === -1) {
        return undefined;
    }

    return this.get(index);
};

MyArray.prototype.findIndex = function (fn) {
    for (var i = 0; i < this.length(); i++) {
        if (fn(this.get(i))) {
            return i;
        }
    }

    return -1;
};

MyArray.prototype.equals = function (other) {
    if (this.length() !== other.length()) {
        return false;
    }

    for (var i = 0; i < this.length(); i++) {
        if (this.get(i) !== other.get(i)) {
            return false;
        }
    }

    return true;
};

MyArray.prototype.forEach = function (fn) {
    for (var i = 0; i < this.length(); i++) {
        fn(this.get(i), i);
    }
};

MyArray.prototype.join = function (separator) {
    if (separator === undefined) {
        separator = ',';
    }

    var string = '';
    var isFirst = true;

    this.forEach(function (element) {
        if (isFirst) {
            isFirst = false;
        } else {
            string += separator;
        }

        string += element;
    });

    return string;
};

MyArray.prototype.toString = function () {
    return this.join(',');
};

MyArray.prototype.map = function (fn) {
    var array = new MyArray();

    this.forEach(function (element) {
        array.push(fn(element));
    });

    return array;
};

MyArray.prototype.filter = function (fn) {
    var array = new MyArray();

    this.forEach(function (element) {
        if (fn(element)) {
            array.push(element);
        }
    });

    return array;
};

MyArray.prototype.some = function (fn) {
    return this.filter(fn).length() > 0;
};

MyArray.prototype.every = function (fn) {
    return this.filter(fn).length() === this.length();
};

MyArray.prototype.fill = function (value, start, end) {
    if (start === undefined) {
        start = 0;
    }

    if (end === undefined) {
        end = this.length();
    }

    for (var i = start; i < end; i++) {
        this.set(i, value);
    }
};

MyArray.prototype.swap = function (leftIndex, rightIndex) {
    var temp = this.get(leftIndex);
    this.set(leftIndex, this.get(rightIndex));
    this.set(rightIndex, temp);
};

MyArray.prototype.reverse = function () {
    for (var i = 0; i < this.length() / 2; i++) {
        this.swap(i, this.length() - i - 1);
    }
};

MyArray.prototype.shift = function () {
    if (this.length() === 0) {
        return undefined;
    }

    var value = this.get(0);

    for (var i = 0; i < this.length() - 1; i++) {
        this.set(i, this.get(i + 1));
    }

    this.set(this.length() - 1, undefined);
    this.size -= 1;

    return value;
};

MyArray.prototype.unshift = function (element) {
    for (var i = this.length(); i > 0; i--) {
        this.set(i, this.get(i - 1));
    }

    this.set(0, element);
};

MyArray.prototype.slice = function (start, end) {
    if (start === undefined) {
        start = 0;
    }

    if (end === undefined) {
        end = this.length();
    }

    var slice = new MyArray();

    for (var i = start; i < end; i++) {
        slice.push(this.get(i));
    }

    return slice;
};

MyArray.prototype.splice = function (start, deleteCount) {
    var i;

    if (deleteCount === undefined) {
        deleteCount = this.length() - start;
    }

    var suffixLength = this.length() - start - deleteCount;

    // shift suffix to start position
    for (i = start; i < start + suffixLength; i++) {
        this.set(i, this.get(i + deleteCount));
    }

    // remove anything that is left after that shifted suffix
    for (i = start + suffixLength; i < this.length(); i++) {
        this.set(i, undefined);
    }

    // fix size to end immediately after suffix
    this.size = this.length() - deleteCount;

    var itemsLength = arguments.length - 2;

    // shift that suffix by itemsLength to the right
    // to make space for inserted items
    for (i = start + suffixLength - 1; i >= start; i--) {
        this.set(i + itemsLength, this.get(i));
    }

    // insert items in that place
    for (i = 0; i < itemsLength; i++) {
        this.set(start + i, arguments[2 + i]);
    }
};