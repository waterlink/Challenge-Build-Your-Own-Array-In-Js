function MyArray(initialCapacity) {
    if (initialCapacity === undefined) {
        initialCapacity = 3;
    }

    this.elements = new PlainArray(initialCapacity);
    this.size = 0;
}

MyArray.prototype._grow = function (newCapacity) {
    const newElements = new PlainArray(newCapacity);
    for (let i = 0; i < this.elements.length; ++i) {
        newElements.set(i, this.elements.get(i));
    }
    this.elements = newElements;
};

MyArray.prototype.length = function () {
    return this.size;
};

MyArray.prototype.push = function (value) {
    if (this.elements.length <= this.size) this._grow(this.size * 2 + 1);

    this.elements.set(this.size, value);
    this.size += 1;
};

MyArray.prototype.get = function (index) {
    if(index < 0 || index >= this.size) return;

    return this.elements.get(index);
};

MyArray.prototype.set = function (index, value) {
    if(index >= this.size){
        this._grow(index * 2 + 1);
        this.size = index + 1;
    };

    this.elements.set(index, value);
};

MyArray.of = function (...elements) {
    const array = new MyArray(elements.size);
    if(elements.length === 0) return array;

    for (const element of elements) array.push(element);

    return array;
};

MyArray.prototype.pop = function () {
    if(this.size === 0) return;

    const value = this.elements.get(this.size - 1);
    this.elements.set(this.size - 1, undefined);
    this.size--;
    return value;
};

MyArray.prototype.concat = function (other) {
    const array = new MyArray(this.length() + other.length());
    for (let i = 0; i < this.length(); ++i) array.push(this.get(i));
    for (let i = 0; i < other.length(); ++i) array.push(other.get(i));
    return array;
};

MyArray.prototype.indexOf = function (element) {
    return this.findIndex(el => el === element);
};

MyArray.prototype.lastIndexOf = function (element) {
    for (let i = this.length() - 1; i >= 0; --i) {
        if (this.get(i) === element) return i;
    };
    return -1;
};

MyArray.prototype.includes = function (element) {
    return this.indexOf(element) !== -1;
};

MyArray.prototype.find = function (fn) {
    for (let i = 0; i < this.length(); ++i) {
        if (fn(this.get(i))) return this.get(i);
    };
};

MyArray.prototype.findIndex = function (fn) {
    for (let i = 0; i < this.length(); ++i) {
        if (fn(this.get(i))) return i;
    };
    return -1;
};

MyArray.prototype.equals = function (other) {
    return this.length() === other.length()
        && this.every((element, index) => element === other.get(index));
};

MyArray.prototype.forEach = function (fn) {
    for (let i = 0; i < this.length(); ++i) {
        fn(this.get(i), i);
    };
};

MyArray.prototype.join = function (separator = ',') {
    let combined = '';
    this.forEach((element, index) => {
        combined += element;
        if (this.length() - 1 !== index) combined += separator;
    });
    return combined;
};

MyArray.prototype.toString = function () {
    return this.join();
};

MyArray.prototype.map = function (fn) {
    const array = new MyArray(this.length());
    this.forEach((element, index) => array.push(fn(element, index)));
    return array;
};

MyArray.prototype.filter = function (fn) {
    const array = new MyArray(this.length());
    this.forEach((element, index) => {
        if (fn(element, index)) array.push(element);
    });
    return array;
};

MyArray.prototype.some = function (fn) {
    return this.filter(fn).length() > 0;
};

MyArray.prototype.every = function (fn) {
    return this.filter(fn).length() === this.length();
};

MyArray.prototype.fill = function (value, start = 0, end = this.length()) {
    for(let i = start; i < end; ++i) this.set(i, value);
};

MyArray.prototype.reverse = function () {
    const array = new MyArray(this.length());
    for(let i = 0; i < this.length(); ++i) array.set(this.length() - 1 - i, this.get(i));
    this.elements = array.elements;
};

MyArray.prototype.shift = function () {
    return this.splice(0, 1).get(0);
};

MyArray.prototype.unshift = function (element) {
    this.splice(0, 0, element);
};

MyArray.prototype.slice = function (start = 0, end = this.length()) {
    return this.filter((_, index) => index >= start && index < end);
};

MyArray.prototype.splice = function (start, deleteCount = this.length(), ...items) {
    const ret = this.slice(start, start + deleteCount);

    const itemsBefore = this.slice(0, start);
    const itemsAfter = this.slice(start + deleteCount, this.length());

    const array = itemsBefore
        .concat(MyArray.of(...items))
        .concat(itemsAfter);

    this.elements = array.elements;
    this.size = array.length();

    return ret;
};
