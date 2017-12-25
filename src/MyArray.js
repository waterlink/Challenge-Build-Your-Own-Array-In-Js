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
    if(this.elements.length <= this.size)
    {
        var newElements = new PlainArray(this.size + 1);
        
        //copy old elements
        for(let i = 0;i < this.size;i++)
        {
            newElements.set(i, this.elements.get(i));
        }

        this.elements = newElements;
    }

    this.elements.set(this.size,value);

    return ++this.size;
};

MyArray.prototype.get = function (index) {    
    if(index < 0 || index > this.size - 1)
        return undefined;
    else
        return this.elements.get(index);
};

MyArray.prototype.set = function (index, value) {
    if(index < 0)
        throw new Error('Cannot set inMyArraydex lower than zero');

    if(index >= this.elements.length)
    {
        var oldElements = this.elements;
        var newElements = new PlainArray(index+1);

        for(let i = 0;i < this.elements.length;i++)
        {
            newElements.set(i,oldElements.get(i));
        }

        this.elements = newElements;
    }

    this.elements.set(index,value);

    this.size = this.elements.length;
};

MyArray.of = function () {
    var len = arguments.length;

    var array = new MyArray(len);
    array.size = len;

    for(let i=0; i<len;i++)
    {
        array.elements.set(i,arguments[i]);
    }

    return array;
};

MyArray.prototype.pop = function () {
    var element;
    if(this.size > 0)
    {
        element = this.elements.get(this.elements.length - 1);

        var newElements = new PlainArray(this.elements.length - 1);

        for(let i = 0;i < this.elements.length - 1;i++)
        {
            newElements.set(i,this.elements.get(i));
        }

        this.elements = newElements;
        this.size--;
    }

    return element;
};

MyArray.prototype.concat = function (other) {
    var size1 = this.size;
    var size2 = other.size;
    var totalSize = size1 + size2;

    var newArray = new MyArray(totalSize);

    for(let i = 0;i < size1;i++)
    {
        newArray.push(this.elements.get(i));
    }

    for(let i = 0;i < size2; i++)
    {
        newArray.push(other.elements.get(i));
    }

    newArray.size = totalSize;

    return newArray;
};

MyArray.prototype.indexOf = function (element) {
    let index = -1;
    
    let currentIndex = 0;
    while(currentIndex < this.size && index === -1)
    {
        if(this.elements.get(currentIndex)=== element)
            index = currentIndex;
        
        currentIndex++;
    }

    return index;
};

MyArray.prototype.lastIndexOf = function (element) {
    let index = -1;

    let currentIndex = this.size - 1;

    while(currentIndex >= 0 && index === -1)
    {
        if(this.elements.get(currentIndex) === element)
            index = currentIndex;
        
        currentIndex--;
    }

    return index;
};

MyArray.prototype.includes = function (element) {
    return this.indexOf(element) !== -1;
};

MyArray.prototype.find = function (fn) {
    let elementIndex = this.findIndex(fn);

    return elementIndex === -1 ? undefined : this.elements.get(elementIndex);
};

MyArray.prototype.findIndex = function (fn) {
    let index = -1;
    let testElement;
    let currentIndex = 0;

    while(currentIndex < this.size && index === -1)
    {
        testElement = this.elements.get(currentIndex);
        if(fn(testElement))
            index = currentIndex;

        currentIndex++;
    }

    return index;
};

MyArray.prototype.equals = function (other) {
    var len1 = this.size;
    var len2 = other.size;

    if(len1 !== len2)
        return false;

    for(let i = 0;i < len1;i++)
    {
        if(this.elements.get(i) !== other.elements.get(i))
            return false;
    }

    return true;
};

MyArray.prototype.forEach = function (fn) {
    var len = this.length();
    for(let i =0;i<len;i++)
    {
        fn(this.elements.get(i),i,this.elements);
    }
};

MyArray.prototype.join = function (separator) {
    if(typeof separator !== 'string')
        separator = ',';

    let len = this.size;
    let result = '';

    for(let i = 0;i<len;i++)
    {
        result += this.elements.get(i);
        
        if(i !== len - 1)
            result += separator;
    }

    return result;
};

MyArray.prototype.toString = function () {
    return this.join();
};

MyArray.prototype.map = function (fn) {
    let size = this.size;

    let newArray = new MyArray(size);

    for(let i = 0;i<size;i++)
    {
        newArray.push(fn(this.elements.get(i)));
    }

    return newArray;
};

MyArray.prototype.filter = function (fn) {
    let newArray = new MyArray();
    let testElement;
    for(let i=0;i<this.size;i++)
    {
        testElement = this.elements.get(i);
        if(fn(testElement))
            newArray.push(testElement);
    }

    return newArray;
};

MyArray.prototype.some = function (fn) {
    return this.find(fn) !== undefined;
};

MyArray.prototype.every = function (fn) {
    let currentIndex = 0;
    let testElement;

    while(currentIndex < this.size)
    {
        testElement = this.elements.get(currentIndex);
        if(!fn(testElement))
            return false;

        currentIndex++;
    }

    return true;
};

MyArray.prototype.fill = function (value, start, end) {
    if(typeof start !== 'number' || isNaN(start) || !isFinite(start))
        start = 0;
    
    if(typeof end !== 'number' || isNaN(end) || !isFinite(end))
        end = this.elements.length;

    for(;start<end;start++)
    {
        this.elements.set(start,value);
    }
};

MyArray.prototype.reverse = function () {
    let len = this.size;

    var newElements = new PlainArray(len);
    
    for(let i = 0; i < len; i++)
    {
        newElements.set(i,this.pop());
    }

    this.elements = newElements;
    this.size = len;
};

MyArray.prototype.shift = function () {
    let element;
    if(this.size >0)
    {
        element = this.elements.get(0);
        let newSize = this.size-1;

        let newElements = new PlainArray(newSize);

        for(let i = 0;i < newSize;i++)
        {
            newElements.set(i, this.elements.get(i+1));
        }

        this.elements = newElements;
        this.size = newSize;
    }
    return element;
};

MyArray.prototype.unshift = function (element) {
    let newArray = MyArray.of(element);

    for(let i=0;i<this.size;i++)
    {
        newArray.push(this.elements.get(i));
    }

    this.elements = newArray.elements;
    this.size = newArray.size;
};

MyArray.prototype.slice = function (start, end) {
    if(typeof start !== 'number' || isNaN(start) || !isFinite(start))
        start = 0;
    
    if(typeof end !== 'number' || isNaN(end) || !isFinite(end))
        end = this.elements.length;

    var newArray = new MyArray(end-start);

    for(let i = start; i<end;i++)
    {
        newArray.push(this.elements.get(i));
    }

    return newArray;
};

MyArray.prototype.splice = function (start, deleteCount) {
    //Join 3 parts: from 0 to start, added args, and from start+deleteCount to .length
    if(typeof deleteCount !== 'number' || isNaN(deleteCount) || !isFinite(deleteCount))
        deleteCount = this.size - start;

    let numberOfExtraValues = Math.max(arguments.length - 2, 0);
    let newSize = this.size - deleteCount + numberOfExtraValues;
    
    let newElements = new PlainArray(newSize);


    //Copy previous values
    for(let i = 0; i < start; i++)
    {
        newElements.set(i, this.elements.get(i));
    }

    //Insert intermediate values
    for(let i = 0; i < numberOfExtraValues; i++)
    {
        newElements.set(start + i, arguments[2 + i]);
    }

    //Insert Array Tail
    for(let i = 0; start + deleteCount + i < this.size; i++)
    {
        newElements.set(start + numberOfExtraValues + i, this.elements.get(start + deleteCount + i));
    }

    this.elements = newElements;
    this.size = newSize;

};