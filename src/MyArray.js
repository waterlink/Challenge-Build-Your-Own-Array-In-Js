function MyArray(initialCapacity) {
    if (initialCapacity === undefined) {
        initialCapacity = 3;
    }

    this.elements = new PlainArray(initialCapacity);
    this.size = 0;
}

MyArray.prototype.chacngeCapacuty = function (newCapacity) {
    var newArr = new PlainArray(newCapacity);
    //because i don't know if we want to extend or decrease the size of the array
    var loopFor = Math.min(this.size, newCapacity);

    for (var i = 0; i < loopFor; i++) {
        newArr.set(i, this.get(i));
    }

    this.size = newCapacity;
    this.elements = newArr;
}

MyArray.prototype.length = function () {
    return this.size;
};

MyArray.prototype.push = function (value) {
    this.chacngeCapacuty(this.size + 1);
    this.set((this.size - 1), value);
};

MyArray.prototype.get = function (index) {
    if (index < this.size && index > -1 && typeof index === "number")
        return this.elements.get(index);
};

MyArray.prototype.set = function (index, value) {
    if (index < 0 && typeof index !== "number")
        throw ('index must be a positive number');
    if (index > this.size)
        this.chacngeCapacuty(index + 1);
    this.elements.set(index, value);

};

MyArray.of = function () {
    var newArr = new MyArray(arguments.length);

    for (var i = 0; i < arguments.length; i++) {
        newArr.elements.set(i, arguments[i]);
        newArr.size++;
    }
    return newArr;
};

MyArray.prototype.pop = function () {
    if (this.size) {
        var popedValue = this.elements.get(this.size - 1);
        this.chacngeCapacuty(this.size - 1);
        return popedValue;
    }
};

MyArray.prototype.concat = function (other) {
    if (other.size !== 0) {
        for (let i = 0; i < other.size; i++) {
            this.push(other.elements.get(i));
        }
    }
    return this;
};

MyArray.prototype.indexOf = function (element) {
    for (let i = 0; i < this.size; i++) {
        if (this.elements.get(i) === element)
            return i;
    }
    return -1;
};

MyArray.prototype.lastIndexOf = function (element) {
    for (let i = --this.size; i >= 0; i--) {
        if (this.elements.get(i) === element)
            return i;
    }
    return -1;
};

MyArray.prototype.includes = function (element) {
    for (let i = 0; i < this.size; i++) {
        if (this.elements.get(i) === element)
            return true;
    }
    return false;
};

MyArray.prototype.find = function (fn) {
    for (let i = 0; i < this.size; i++) {
        if (fn(this.elements.get(i)))
            return this.elements.get(i);
    }
};

MyArray.prototype.findIndex = function (fn) {
    for (let i = 0; i < this.size; i++) {
        if (fn(this.elements.get(i)))
            return i;
    }
    return -1;
};

MyArray.prototype.equals = function (other) {
    if (this.size != other.size)
        return false;
    for (let i = 0; i < this.size; i++) {
        if (this.elements.get(i) !== other.elements.get(i))
            return false;
    }
    return true;
};

MyArray.prototype.forEach = function (fn) {
    for (let i = 0; i < this.size; i++) {
        fn(this.elements.get(i), i);
    }
};

MyArray.prototype.join = function (separator) {
    separator = separator || separator === '' ? separator : ',';
    var str = '';
    for (let i = 0; i < this.size; i++) {
        str += (i + 1 !== this.size) ? this.elements.get(i) + separator : this.elements.get(i);
    }
    return str;
};

MyArray.prototype.toString = function () {
    var str = '';
    for (let i = 0; i < this.size; i++) {
        str += (i + 1 !== this.size) ? this.elements.get(i) + ',' : this.elements.get(i);
    }
    return str;
};

MyArray.prototype.map = function (fn) {
    var newArr = new MyArray();
    for (let i = 0; i < this.size; i++) {
        newArr.push(fn(this.elements.get(i)));
    }
    return newArr;
};

MyArray.prototype.filter = function (fn) {
    var newArr = new MyArray();
    for (let i = 0; i < this.size; i++) {
        if (fn(this.elements.get(i)))
            newArr.push(this.elements.get(i));
    }
    return newArr;
};

MyArray.prototype.some = function (fn) {
    for (let i = 0; i < this.size; i++) {
        if (fn(this.elements.get(i)))
            return true;
    }
    return false;
};

MyArray.prototype.every = function (fn) {
    for (let i = 0; i < this.size; i++) {
        if (!fn(this.elements.get(i)))
            return false;
    }
    return true;
};

MyArray.prototype.fill = function (value, start = 0, end = this.size) {
    for (let i = start; i < end; i++) {
        this.elements.set(i, value);
    }
};

MyArray.prototype.reverse = function () {
    var newArr = new MyArray(this.size);
    for (let i = 0; i < this.size; i++) {
        newArr.set((this.size - i) - 1, this.elements.get(i));
    }
    this.elements = newArr.elements;
};

MyArray.prototype.shift = function () {
    if (this.size) {
        var shiftedValue = this.elements.get(0);
        for (let i = 0; i < this.size - 1; i++) {
            this.elements.set(i, this.elements.get(i + 1));
        }
        this.chacngeCapacuty(this.size - 1);
        return shiftedValue;
    }
};

MyArray.prototype.unshift = function (element) {
    var newArr = new MyArray();
    newArr.push(element);
    newArr.concat(this);
    this.elements = newArr.elements;
    this.size = newArr.size;
};

MyArray.prototype.slice = function (start = 0, end = this.size) {
    var newArr = new MyArray(end - start);
    for (let i = start; i < end; i++) {
        newArr.push(this.elements.get(i));
    }

    return newArr;
};

MyArray.prototype.splice = function (start = 0, deleteCount) {
    var newArr = new MyArray();
    for (var i = 0; i < start; i++) {
        newArr.push(this.elements.get(i));
    }

    //get arguments
    var argumentsArr = new MyArray();
    for (var i = 2; i < arguments.length; i++) {
        newArr.push(arguments[i]);
    }
    //newArr.concat(argumentsArr);

    var stopDelete = (deleteCount || deleteCount === 0) ? deleteCount + start : this.size;
    for (var i = stopDelete; i < this.size; i++) {
        newArr.push(this.elements.get(i))
    }

    this.elements = newArr.elements;
    this.size = newArr.size;
};