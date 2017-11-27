function MyArray(initialCapacity) {
    if (initialCapacity === undefined) {
        initialCapacity = 3;
    }

    this.elements = new PlainArray(initialCapacity);
    this.size = 0;
}

MyArray.prototype.length = function () {
    return this.size
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

    var value = this.elements.get(this.size - 1);
    this.size--;
    return value;
};

MyArray.prototype.concat = function (other) {
    
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

};

MyArray.prototype.includes = function (element) {

};

MyArray.prototype.find = function (fn) {

};

MyArray.prototype.findIndex = function (fn) {

};

MyArray.prototype.equals = function (other) {

};

MyArray.prototype.forEach = function (fn) {

};

MyArray.prototype.join = function (separator) {

};

MyArray.prototype.toString = function () {

};

MyArray.prototype.map = function (fn) {

};

MyArray.prototype.filter = function (fn) {

};

MyArray.prototype.some = function (fn) {

};

MyArray.prototype.every = function (fn) {

};

MyArray.prototype.fill = function (value, start, end) {

};

MyArray.prototype.reverse = function () {

};

MyArray.prototype.shift = function () {

};

MyArray.prototype.unshift = function (element) {

};

MyArray.prototype.slice = function (start, end) {

};

MyArray.prototype.splice = function (start, deleteCount) {

};