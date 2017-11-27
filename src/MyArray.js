(function (global) {
  function MyArray(initialCapacity) {
    if (initialCapacity === undefined) {
      initialCapacity = 0;
    }
    this.elements = new PlainArray(initialCapacity);
  }

  MyArray.prototype.length = function () {
    return this.elements.length;
  };

  MyArray.prototype.push = function (value) {
    const newElements = copy(this.elements, this.elements.length + 1);
    newElements.set(this.elements.length, value);
    this.elements = newElements;
  };

  MyArray.prototype.get = function (index) {
    if (isIndexInRange(index, this.elements)) {
      return this.elements.get(index);
    } else {
      return undefined;
    }
  };

  MyArray.prototype.set = function (index, value) {
    if (!isIndexInRange(index, this.elements)) {
      this.elements = copy(this.elements, index + 1)
    }
    this.elements.set(index, value);
  };

  // name static method so we can use it elsewhere
  function of() {
    const array = new MyArray(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
      array.set(i, arguments[i]);
    }
    return array;
  }

  MyArray.of = of;

  MyArray.prototype.pop = function () {
    const lastEle = this.get(this.length() - 1);
    this.elements = copy(this.elements, this.elements.length - 1);
    return lastEle;
  };

  MyArray.prototype.concat = function (other) {
    const newArrLength = this.length() + other.length();
    const newArr = new MyArray(newArrLength);
    var item;
    for (var i = 0; i < newArrLength; i++) {
      if (i < this.length()) {
        item = this.get(i);
      } else {
        item = other.get(i - this.length());
      }
      newArr.set(i, item);
    }
    return newArr;
  };

  MyArray.prototype.indexOf = function (element) {
    const indices = allIndicesWhere(isEqualTo(element), this);
    if (indices.length() === 0) {
      return -1;
    } else {
      return indices.get(0);
    }
  };

  MyArray.prototype.lastIndexOf = function (element) {
    const indices = allIndicesWhere(isEqualTo(element), this);
    if (indices.length() === 0) {
      return -1;
    } else {
      return indices.pop();
    }
  };

  MyArray.prototype.includes = function (element) {
    return allIndicesWhere(isEqualTo(element), this).length() > 0;
  };

  MyArray.prototype.find = function (fn) {
    return this.get(this.findIndex(fn));
  };

  MyArray.prototype.findIndex = function (fn) {
    const firstIndex = allIndicesWhere(fn, this).get(0);
    if (firstIndex === undefined) {
      return -1;
    }
    return firstIndex;
  };

  MyArray.prototype.equals = function (other) {
    const matches = allIndicesWhere(isEqualToI(this), other);
    return matches.length() === this.length() && matches.length() === other.length();
  };

  MyArray.prototype.forEach = function (fn) {
    this.map(fn);
  };

  MyArray.prototype.join = function (separator) {
    if (separator === undefined) {
      separator = ",";
    }
    const length = this.length();
    var strVal = "";
    this.forEach(function (item, i) {
      strVal += item;
      if (i < length - 1) {
        strVal += separator;
      }
    });
    return strVal;
  };

  MyArray.prototype.toString = function () {
    return this.join();
  };

  MyArray.prototype.map = function (fn) {
    const newArray = new MyArray(this.length());
    for (var i = 0, l = this.length(); i < l; i++) {
      newArray.set(i, fn(this.get(i), i));
    }
    return newArray;
  };

  MyArray.prototype.filter = function (fn) {
    const indices = allIndicesWhere(fn, this);
    const get = this.get.bind(this);
    return indices.map(get);
  };

  MyArray.prototype.some = function (fn) {
    return allIndicesWhere(fn, this).length() > 0;
  };

  MyArray.prototype.every = function (fn) {
    return allIndicesWhere(fn, this).length() === this.length();
  };

  MyArray.prototype.fill = function (fillValue, start, end) {
    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = this.length();
    }
    this.elements = this.map(function (item, i) {
      if (i < start || i >= end) {
        return item;
      }
      return fillValue;
    }).elements;
  };

  MyArray.prototype.reverse = function () {
    const length = this.length();
    const get = this.get.bind(this);
    this.elements = this.map(function (item, i) {
      return get(length - 1 - i);
    }).elements;
  };

  MyArray.prototype.shift = function () {
    const firstEle = this.get(0);
    this.elements = this.filter(function (item, i) {
      return i > 0;
    }).elements;
    return firstEle;
  };

  MyArray.prototype.unshift = function (element) {
    this.elements = MyArray.of(element).concat(this).elements;
  };

  MyArray.prototype.slice = function (start, end) {
    if (start === undefined) {
      start = -1;
    }
    if (end === undefined) {
      end = this.length();
    }
    return this.filter(function (item, i) {
      return i >= start && i < end;
    });
  };

  MyArray.prototype.splice = function (startIndex, deleteCount) {
    const start = this.slice(0, startIndex);
    const middle = of.apply(undefined, arguments).slice(2);
    const end = this.slice(startIndex + deleteCount);
    this.elements = start.concat(middle).concat(end).elements;
  };

  function isIndexInRange(index, elements) {
    return !(index < 0 || index >= elements.length);
  }

  function copy(elements, newArrLength) {
    if (newArrLength === undefined) {
      newArrLength = elements.length;
    }
    // must be a +ve integer
    newArrLength = Math.max(0, newArrLength);
    const copied = new PlainArray(newArrLength);
    // new arr can be shorter than original
    for (var i = 0, l = Math.min(elements.length, newArrLength); i < l; i++) {
      copied.set(i, elements.get(i));
    }
    return copied;
  }

  function allIndicesWhere(testFn, list) {
    const indices = new MyArray();
    for (var i = 0, l = list.length(); i < l; i++) {
      if (testFn(list.get(i), i)) {
        indices.push(i);
      }
    }
    return indices;
  }

  function isEqualTo(known) {
    return function (test) {
      return known === test;
    }
  }

  function isEqualToI(list) {
    return function (test, i) {
      const element = list.get(i);
      return element === test;
    }
  }

  global.MyArray = MyArray;
})(this);