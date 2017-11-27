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
    this.elements.set(this.size, value);
    this.size += 1;
    //TODO resize
};

MyArray.prototype.get = function (index) {
    try {
      return this.elements.get(index);
    } catch (err) {
        return undefined;
    }
};

MyArray.prototype.set = function (index, value) {

};

MyArray.of = function () {

};

MyArray.prototype.pop = function () {

};

MyArray.prototype.concat = function (other) {

};

MyArray.prototype.indexOf = function (element) {

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
