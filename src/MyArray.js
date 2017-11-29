//@ts-check

const MyArray = (function() {

  /**
   * resizes the array
   * @param {any} oldArray 
   * @param {number} newCapacity 
   */
  function resizePlainArray(oldArray, newCapacity) {
    var newArray = new PlainArray(newCapacity);
    var value;

    for (var i = 0; i < oldArray.length; i += 1) {
      value = oldArray.get(i);
      newArray.set(i, value);
    }

    return newArray;
  }

  function cloneArray(oldArray) {
    var newArray = new MyArray(oldArray.length());

    oldArray.forEach((item, i) => newArray.push(oldArray.get(i)));

    return newArray;
  }

  function MyArray(initialCapacity) {
    if (!initialCapacity) {
      initialCapacity = 3;
    }
  
    this.elements = new PlainArray(initialCapacity);
    this.size = 0;
  }
  
  MyArray.prototype.length = function () {
    return this.size;
  };
  
  MyArray.prototype.push = function(value) {
      if (this.size === this.elements.length) {
        this.elements = resizePlainArray(this.elements, this.size * 2);
      }
  
      this.elements.set(this.size, value);
      this.size += 1;
  };
  
  /**
   * Returns the element at index or undefined
   * @param {number} index
   * @returns {any|undefined} Item at index
   */
  MyArray.prototype.get = function (index) {
    try {
      return this.elements.get(index);
    } catch (err) {
      return undefined;
    }
  };
  
  MyArray.prototype.set = function (index, value) {
    if(index >= this.elements.length) {
      this.elements = resizePlainArray(this.elements, index + 1);
      this.size = this.elements.length;
    }

    this.elements.set(index, value);
  };
  
  MyArray.of = function (...args) {
    const newArray = new MyArray(args.length);
    args.forEach(item => newArray.push(item));
    return newArray;
  };
  
  MyArray.prototype.pop = function () {
    if(this.size > 0) {
      const lastElementIndex = this.size - 1;
      const item = this.elements.get(lastElementIndex);
      this.elements.set(lastElementIndex, undefined);
      this.size -= 1;
      
      return item;
    } 
  };
  
  MyArray.prototype.concat = function (other) {
    const newArray = cloneArray(this);
    other.forEach((item) => newArray.push(item));
  
    return newArray;
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
    for(let i = 0; i < this.size; i += 1) {
      fn(this.elements.get(i), i);
    }
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
  
  return MyArray;

})();
