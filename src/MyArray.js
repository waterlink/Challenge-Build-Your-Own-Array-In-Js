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

MyArray.prototype.push = function (value) {
  this.set(this.size, value)
};

MyArray.prototype.get = function (index) {
  if(index >= this.size || index < 0) {
    return undefined
  }
  return this.elements.get(index)
};

MyArray.prototype.set = function (index, value) {
  if(index >= this.elements.length) {
    var helpArr = new PlainArray(index + 1)
    for(var elemIndex = 0; elemIndex < this.size; elemIndex += 1) {
      helpArr.set(elemIndex, this.elements.get(elemIndex))
    }
    this.elements = helpArr
  }
  this.elements.set(index, value)
  if(index >= this.size) {
    this.size = index + 1
  }
};

MyArray.of = function () {
  var arr = new MyArray(arguments.length);
  for(var argIndex in arguments) {
    arr.push(arguments[argIndex])
  }
  return arr;
};

MyArray.prototype.pop = function () {
  var val = this.get(this.size - 1)
  if(this.size > 0) {
    this.size--
  }
  return val
};

MyArray.prototype.concat = function (other) {
  var len1 = this.length()
  var len2 = other.length()
  var arr = new MyArray(this.length() + other.length())
  for(var i = 0; i < len1; i++) {
    arr.push(this.get(i))
  }
  for(var i = 0; i < len2; i++) {
    arr.push(other.get(i))
  }
  return arr
};

MyArray.prototype.indexOf = function (element) {
  return this.findIndex(function(a) {
    return a === element
  })
};

MyArray.prototype.lastIndexOf = function (element) {
  for(var i = this.size - 1; i >= 0; i--) {
    if(this.get(i) === element) {
      return i
    }
  }
  return -1
};

MyArray.prototype.includes = function (element) {
  return this.indexOf(element) >= 0
};

MyArray.prototype.find = function (fn) {
  var index = this.findIndex(fn)
  return index >= 0 ? this.get(index) : undefined
};

MyArray.prototype.findIndex = function (fn) {
  for(var i = 0; i < this.size; i++) {
    if(fn(this.get(i))) {
      return i
    }
  }
  return -1
};

MyArray.prototype.equals = function (other) {
  if(this.length() != other.length()) {
    return false
  }
  for(var i = 0; i < this.length(); i++) {
    if(this.get(i) !== other.get(i)) {
      return false
    }
  }
  return true
};

MyArray.prototype.forEach = function (fn) {
  this.map(fn)
};

MyArray.prototype.join = function (separator) {
  if(separator == undefined) {
    separator = ","
  }
  var res = ""
  for(var i = 0; i < this.length(); i++) {
    if(i != 0) {
      res += separator
    }
    res += this.get(i)
  }
  return res
};

MyArray.prototype.toString = function () {
  return this.join()
};

MyArray.prototype.map = function (fn) {
  var arr = new MyArray(this.size)
  for(var i = 0; i < this.length(); i++) {
    arr.set(i, fn(this.get(i), i))
  }
  return arr
};

MyArray.prototype.filter = function (fn) {
  var arr = new MyArray(0)
  for(var i = 0; i < this.length(); i++) {
    if(fn(this.get(i))) {
      arr.push(this.get(i))
    }
  }
  return arr
};

MyArray.prototype.some = function (fn) {
  return this.findIndex(fn) >= 0
};

MyArray.prototype.every = function (fn) {
  return this.filter(fn).length() === this.length()
};

MyArray.prototype.fill = function (value, start, end) {
  if(start == undefined) {
    start = 0
  }
  if(end == undefined) {
    end = this.length()
  }
  for(var i = start; i < end; i++) {
    this.set(i, value)
  }
};

MyArray.prototype.reverse = function () {
  for(var i = 0; i < this.size / 2; i++) {
    var help = this.get(i)
    this.set(i, this.get(this.size - i - 1))
    this.set(this.size - i - 1, help)
  }
};

MyArray.prototype.shift = function () {
  this.reverse()
  var res = this.pop()
  this.reverse()
  return res
};

MyArray.prototype.unshift = function (element) {
  this.reverse()
  this.push(element)
  this.reverse()
};

MyArray.prototype.slice = function (start, end) {
  if(start == undefined) {
    start = 0
  }
  if(end == undefined) {
    end = this.length()
  }
  if(start === 0 && end === this.length()) {
    return this
  }
  var arr = new MyArray(end - start)
  for(var i = start; i < end; i++) {
    arr.push(this.get(i))
  }
  return arr
};

MyArray.prototype.splice = function (start, deleteCount) {
  if(deleteCount == undefined) {
    deleteCount = this.length() - start
  }
  var toInsert = this.slice(start + deleteCount)
  var carry = new MyArray(0)
  for(var i = 2; i in arguments; i++) {
    carry.push(arguments[i])
  }
  toInsert = carry.concat(toInsert)
  this.size = start
  for(var i = 0; i < toInsert.length(); i++) {
    this.set(start + i, toInsert.get(i))
  }
};
