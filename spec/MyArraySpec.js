describe('MyArray', function () {
    describe('length() returns size of the array', function () {
        it('is 0 for empty array', function () {
            var empty = new MyArray();

            expect(empty.length()).toEqual(0);
        });

        it('is 1 for array with 1 element', function () {
            var one = new MyArray();

            one.push(1);

            expect(one.length()).toEqual(1);
        });

        it('is >1 for array >1 element', function () {
            var many = new MyArray();

            many.push(1);
            many.push('2');

            expect(many.length()).toBeGreaterThan(1);
        });
    });

    describe('get(index) returns element at the specified index', function () {
        it('returns undefined if there is no such index', function () {
            var one = new MyArray();

            one.push(1);

            expect(one.get(-2)).toEqual(undefined);
            expect(one.get(-1)).toEqual(undefined);
            expect(one.get(1)).toEqual(undefined);
            expect(one.get(2)).toEqual(undefined);
        });

        it('returns value at the index', function () {
            var many = new MyArray();

            many.push('a');
            many.push(42);
            many.push('37');

            expect(many.get(0)).toEqual('a');
            expect(many.get(1)).toEqual(42);
            expect(many.get(2)).toEqual('37');
        });
    });

    describe('push(element) adds element at the end of the array', function () {
        it('grows when capacity === length()', function () {
            var array = new MyArray(0);

            array.push(42);
            array.push('1');
            array.push(3);
            array.push('hello');
            array.push('hello');
            array.push('hello');

            expect(array.length()).toEqual(6);
            expect(array.get(0)).toEqual(42);
            expect(array.get(1)).toEqual('1');
            expect(array.get(2)).toEqual(3);
            expect(array.get(3)).toEqual('hello');
            expect(array.get(4)).toEqual('hello');
            expect(array.get(5)).toEqual('hello');
        });
    });

    describe('set(index, value) sets the value of element at the specified index', function () {
        it('allows to set the value', function () {
            var array = new MyArray();
            array.push(42);
            array.push('1');

            array.set(0, 'answer');

            expect(array.get(0)).toEqual('answer');
            expect(array.get(1)).toEqual('1');

            array.set(1, 31);

            expect(array.get(0)).toEqual('answer');
            expect(array.get(1)).toEqual(31);
        });

        it('fails to set the value with index < 0', function () {
            var array = new MyArray();
            array.push(1);

            expect(function () {
                array.set(-1, 'nope');
            }).toThrow();
        });

        it('automatically grows capacity when index > length()', function () {
            var array = new MyArray();
            array.push(1);
            array.push('2');

            array.set(42, 'a value');

            expect(array.get(42)).toEqual('a value');
            expect(array.get(41)).toEqual(undefined);
        });

        it('automatically updates the length() when index > length()', function () {
            var array = new MyArray();

            array.set(42, 'a value');

            expect(array.length()).toEqual(43);
        });
    });

    describe('MyArray.of(...elements) creates MyArray from arguments', function () {
        it('creates empty array when no arguments provided', function () {
            var empty = MyArray.of();

            expect(empty.length()).toEqual(0);
        });

        it('creates array with provided arguments as elements', function () {
            var array = MyArray.of(1, '2', 42, 'hello');

            expect(array.length()).toEqual(4);
            expect(array.get(0)).toEqual(1);
            expect(array.get(1)).toEqual('2');
            expect(array.get(2)).toEqual(42);
            expect(array.get(3)).toEqual('hello');
        });
    });

    describe('pop() removes the last element and returns its value', function () {
        it('is undefined for empty array', function () {
            var empty = new MyArray();

            expect(empty.pop()).toEqual(undefined);
            expect(empty.length()).toEqual(0);
        });

        it('returns last item and removes it from array', function () {
            var array = MyArray.of(1, '2', 42);

            expect(array.pop()).toEqual(42);
            expect(array.length()).toEqual(2);
            expect(array.get(2)).toEqual(undefined);
        });
    });

    describe('concat(other) returns new array – result of concatenation' +
        ' of current array with the other array', function () {

        it('concat of two empty arrays is empty', function () {
            var array = new MyArray().concat(new MyArray());

            expect(array.length()).toEqual(0);
        });

        it('concat of array with empty array is the same array', function () {
            var array = MyArray.of(1, '2', 3);

            var result = array.concat(new MyArray());

            expect(result.length()).toEqual(3);
            expect(result.get(0)).toEqual(1);
            expect(result.get(1)).toEqual('2');
            expect(result.get(2)).toEqual(3);
        });

        it('concat of empty array with other array is that other array', function () {
            var other = MyArray.of(1, '2', 3);

            var result = new MyArray().concat(other);

            expect(result.length()).toEqual(3);
            expect(result.get(0)).toEqual(1);
            expect(result.get(1)).toEqual('2');
            expect(result.get(2)).toEqual(3);
        });

        it('concat of two arrays', function () {
            var array = MyArray.of(1, '2', 3);
            var other = MyArray.of('4', 42);

            var result = array.concat(other);

            expect(result.length()).toEqual(5);
            expect(result.get(0)).toEqual(1);
            expect(result.get(1)).toEqual('2');
            expect(result.get(2)).toEqual(3);
            expect(result.get(3)).toEqual('4');
            expect(result.get(4)).toEqual(42);
        });
    });

    describe('indexOf(element) returns the first index of the element', function () {
        it('returns -1 when nothing found', function () {
            var array = MyArray.of(1, '2', 3);

            expect(array.indexOf(42)).toEqual(-1);
        });

        it('returns index of the only occurrence', function () {
            var array = MyArray.of(1, '2', 2, 4);

            expect(array.indexOf(2)).toEqual(2);
        });

        it('returns index of the only occurrence for different element', function () {
            var array = MyArray.of(1, '2', 2, 4);

            expect(array.indexOf(4)).toEqual(3);
        });

        it('returns index of the first occurrence', function () {
            var array = MyArray.of(1, '2', 2, 4, 2);

            expect(array.indexOf(2)).toEqual(2);
        });
    });

    describe('lastIndexOf(element) returns the last index of the element', function () {
        it('returns -1 when nothing found', function () {
            var array = MyArray.of(1, '2', 3);

            expect(array.lastIndexOf(42)).toEqual(-1);
        });

        it('returns index of the only occurrence', function () {
            var array = MyArray.of(1, '2', 2, 4);

            expect(array.lastIndexOf(2)).toEqual(2);
        });

        it('returns index of the last occurrence', function () {
            var array = MyArray.of(1, '2', 2, 4, 2, 5);

            expect(array.lastIndexOf(2)).toEqual(4);
        });
    });

    describe('includes(element) determines if an array includes the element', function () {
        it('returns true if element is present', function () {
            var array = MyArray.of(1, '2', 2, 4, 2);

            expect(array.includes(2)).toEqual(true);
        });

        it('returns false if element is not present', function () {
            var array = MyArray.of(1, '2', 4);

            expect(array.includes(2)).toEqual(false);
        });
    });

    describe('find(fn) returns the first element that satisfies fn(element) criterion', function () {
        it('returns undefined when there is no such element', function () {
            var array = MyArray.of(1, 2, 3, 4);

            var found = array.find(function (x) {
                return x > 5;
            });

            expect(found).toEqual(undefined);
        });

        it('returns the only element that satisfies the criterion', function () {
            var array = MyArray.of(1, 2, 10, 3, 4);

            var found = array.find(function (x) {
                return x > 5;
            });

            expect(found).toEqual(10);
        });

        it('returns the first element that satisfies the criterion', function () {
            var array = MyArray.of(1, 2, 6, 25, 3, 10, 4);

            var found = array.find(function (x) {
                return x > 7;
            });

            expect(found).toEqual(25);
        });
    });

    describe('findIndex(fn) returns the index of the first element that satisfies' +
        ' fn(element) criterion', function () {

        it('returns -1 when there is no such element', function () {
            var array = MyArray.of(1, 2, 3, 4);

            var found = array.findIndex(function (x) {
                return x > 5;
            });

            expect(found).toEqual(-1);
        });

        it('returns the index of the only element that satisfies the criterion', function () {
            var array = MyArray.of(1, 2, 10, 3, 4);

            var found = array.findIndex(function (x) {
                return x > 5;
            });

            expect(found).toEqual(2);
        });

        it('returns the index of the first element that satisfies the criterion', function () {
            var array = MyArray.of(1, 2, 6, 25, 3, 10, 4);

            var found = array.findIndex(function (x) {
                return x > 7;
            });

            expect(found).toEqual(3);
        });
    });

    describe('equals(other) checks if array is equal to the other', function () {
        it('is not equal if length is different', function () {
            var array = MyArray.of(1, '2', 10, 3, 'abc', 4);
            var other = MyArray.of(1, 2, '3');

            expect(array.equals(other)).toEqual(false);
        });

        it('is not equal if length is same, but elements are different', function () {
            var array = MyArray.of(1, '2', 10);

            expect(array.equals(MyArray.of(0, '2', 10))).toEqual(false);
            expect(array.equals(MyArray.of(1, 7, 10))).toEqual(false);
            expect(array.equals(MyArray.of(1, '2', 'a'))).toEqual(false);
        });

        it('is equal if length and elements are same', function () {
            var array = MyArray.of(1, '2', 10, 3);
            var other = MyArray.of(1, '2', 10, 3);

            expect(array.equals(other)).toEqual(true);
        });
    });

    describe('forEach(fn) calls fn(element) for each element in the array in order', function () {
        it('iterates over the array', function () {
            var array = MyArray.of(1, '2', 10, 3, 'abc', 4);
            var receivedElements = new MyArray();

            array.forEach(function (element) {
                receivedElements.push(element);
            });

            expect(receivedElements.equals(array)).toEqual(true);
        });

        it('iterates over the array with index', function () {
            var array = MyArray.of(1, '2', 10, 3, 'abc', 4);
            var receivedElements = new MyArray();

            array.forEach(function (element, index) {
                receivedElements.push(element + ',' + index);
            });

            var expected = MyArray.of('1,0', '2,1', '10,2', '3,3', 'abc,4', '4,5');
            expect(receivedElements.equals(expected)).toEqual(true);
        });

        it('preserves original array', function () {
            var array = MyArray.of(1, '2', 10, 3, 'abc', 4);
            var receivedElements = new MyArray();

            array.forEach(function (element, index) {
                return 'something';
            });

            var expected = MyArray.of(1, '2', 10, 3, 'abc', 4);
            expect(array.equals(expected)).toEqual(true);
        });
    });

    describe('join(separator=",") joins array into string', function () {
        it('joins array into string with default separator = coma', function () {
            var array = MyArray.of('hello', 42, true);
            expect(array.join()).toEqual('hello,42,true');
        });

        it('joins array into string with specified separator', function () {
            var array = MyArray.of('hello', 42, true);
            expect(array.join('||')).toEqual('hello||42||true');
        });

        it('joins array into string with empty separator', function () {
            var array = MyArray.of('hello', 42, true);
            expect(array.join('')).toEqual('hello42true');
        });
    });

    describe('toString() returns string representation of an array', function () {
        it('returns a comma separated list of elements', function () {
            var array = MyArray.of('hello', 42, true);
            expect(array.toString()).toEqual('hello,42,true');
        });
    });

    describe('map(fn) calls fn(element) for each element in the array in order and' +
        ' returns new array composed out of return values', function () {

        it('returns an empty array when called on empty array', function () {
            var empty = new MyArray();

            var result = empty.map(function (x) {
                return x + '_mapped';
            });

            expect(result.length()).toEqual(0);
        });

        it('returns a mapped array when called on the array', function () {
            var array = MyArray.of('a', 'bc', 'def');

            var result = array.map(function (x) {
                return x + '_mapped';
            });

            var expected = MyArray.of('a_mapped', 'bc_mapped', 'def_mapped');
            expect(result.equals(expected)).toEqual(true);
        });

        it('returns a mapped array when called on different array' +
            ' with different mapping function', function () {

            var array = MyArray.of(1, 13, -4);

            var result = array.map(function (x) {
                return x * x + 1;
            });

            var expected = MyArray.of(2, 170, 17);
            expect(result.equals(expected)).toEqual(true);
        });
    });

    describe('filter(fn) returns new array that contains only elements that satisfied' +
        ' fn(element) criterion', function () {

        it('returns an empty array when called on empty array', function () {
            var empty = new MyArray();

            var result = empty.filter(function (x) {
                return x < 15;
            });

            expect(result.length()).toEqual(0);
        });

        it('returns the whole array if all elements satisfy the criterion', function () {
            var array = MyArray.of(1, 3, 2, 10, -5);

            var result = array.filter(function (x) {
                return x < 15;
            });

            expect(result.equals(array)).toEqual(true);
        });

        it('returns only elements that satisfy the criterion', function () {
            var array = MyArray.of(1, 3, 2, 10, -5);

            var result = array.filter(function (x) {
                return x < 5;
            });

            var expected = MyArray.of(1, 3, 2, -5);
            expect(result.equals(expected)).toEqual(true);
        });
    });

    describe('some(fn) return true if ANY of elements satisfied fn(element) criterion', function () {
        it('returns false when no elements satisfied the criterion', function () {
            var array = MyArray.of(1, 3, 2, 10, -5);

            var result = array.some(function (x) {
                return x > 50;
            });

            expect(result).toEqual(false);
        });

        it('returns true when one element satisfies the criterion', function () {
            var array = MyArray.of(1, 3, 2, 10);

            var result = array.some(function (x) {
                return x < 2;
            });

            expect(result).toEqual(true);
        });

        it('returns true when multiple elements satisfy the criterion', function () {
            var array = MyArray.of(1, 2, 3, -2);

            var result = array.some(function (x) {
                return x < 3;
            });

            expect(result).toEqual(true);
        });
    });

    describe('every(fn) return true if ALL of elements satisfied fn(element) criterion', function () {
        it('returns false when at least one element didn’t satisfy the criterion', function () {
            var array = MyArray.of(1, 2, 3, -2);

            var result = array.every(function (x) {
                return x < 3;
            });

            expect(result).toEqual(false);
        });

        it('returns true when at all elements satisfy the criterion', function () {
            var array = MyArray.of(1, 2, 3, -2);

            var result = array.every(function (x) {
                return x < 5;
            });

            expect(result).toEqual(true);
        });

        it('returns true when at all elements satisfy the criterion for different length of array', function () {
            var array = MyArray.of(1, 2, 3);

            var result = array.every(function (x) {
                return x < 5;
            });

            expect(result).toEqual(true);
        });
    });

    describe('fill(value, start=0, end=this.length()) fills array with static value' +
        ' from start index to end index', function () {

        it('fills array from start to the end when no indexes provided', function () {
            var array = MyArray.of(1, '2', 0);

            array.fill(42);

            var expected = MyArray.of(42, 42, 42);
            expect(array.equals(expected)).toEqual(true);
        });

        it('fills array from specified start to the end when no end index provided', function () {
            var array = MyArray.of(1, '2', 0, 5);

            array.fill('Greeting', 2);

            var expected = MyArray.of(1, '2', 'Greeting', 'Greeting');
            expect(array.equals(expected)).toEqual(true);
        });

        it('fills array from specified start to specified end', function () {
            var array = MyArray.of(1, '2', 0, 5);

            array.fill('Hey!', 1, 3);

            var expected = MyArray.of(1, 'Hey!', 'Hey!', 5);
            expect(array.equals(expected)).toEqual(true);
        });
    });

    describe('reverse() reverses the array in place (modifies current array)', function () {
        it('reverses the array with even size', function () {
            var array = MyArray.of(1, 3, 2, 5);

            array.reverse();

            var expected = MyArray.of(5, 2, 3, 1);
            expect(array.equals(expected)).toEqual(true);
        });

        it('reverses the array with odd size', function () {
            var array = MyArray.of(1, 3, 10, 2, 5);

            array.reverse();

            var expected = MyArray.of(5, 2, 10, 3, 1);
            expect(array.equals(expected)).toEqual(true);
        });
    });

    describe('shift() removes the first element and returns its value', function () {
        it('is undefined for empty array', function () {
            var empty = new MyArray();

            expect(empty.shift()).toEqual(undefined);
            expect(empty.length()).toEqual(0);
        });

        it('returns the first item and removes it from array', function () {
            var array = MyArray.of(1, '2', 42);

            expect(array.shift()).toEqual(1);
            expect(array.length()).toEqual(2);
            expect(array.get(2)).toEqual(undefined);

            var expected = MyArray.of('2', 42);
            expect(array.equals(expected)).toEqual(true);
        });
    });

    describe('unshift(element) adds the element at the beginning of the array', function () {
        it('adds an element in the first position', function () {
            var array = MyArray.of(1, '2', 42);

            array.unshift('hello');

            expect(array.get(0)).toEqual('hello');
        });

        it('increases the length of the array', function () {
            var array = MyArray.of(1, '2', 42);

            array.unshift('hello');

            expect(array.length()).toEqual(4);
        });

        it('shifts all the other elements to the right', function () {
            var array = MyArray.of(1, '2', 42);

            array.unshift('hello');

            var expected = MyArray.of('hello', 1, '2', 42);
            expect(array.equals(expected)).toEqual(true);
        });
    });

    describe('slice(start=0, end=this.length()) returns a sub-array from start' +
        ' index to end index', function () {

        it('returns the copy of the whole array when no indexes provided', function () {
            var array = MyArray.of('a', 5, '42', 'hello', 77);

            var slice = array.slice();

            expect(slice.equals(array)).toEqual(true);
        });

        it('returns a suffix of the array when only start index provided', function () {
            var array = MyArray.of('a', 5, '42', 'hello', 77);

            var slice = array.slice(2);

            var expected = MyArray.of('42', 'hello', 77);
            expect(slice.equals(expected)).toEqual(true);
        });

        it('returns a sub-array when start and end indexes are provided', function () {
            var array = MyArray.of('a', 5, '42', 'hello', 77);

            var slice = array.slice(2, 4);

            var expected = MyArray.of('42', 'hello');
            expect(slice.equals(expected)).toEqual(true);
        });
    });

    describe('splice(start, deleteCount=MAX, ...items) replaces contents of the array' +
        ' specified by start and deleteCount with items provided as arguments', function () {

        it('deletes until the end of the array when only start index provided', function () {
            var array = MyArray.of('a', 5, '42', 'hello', 77);

            array.splice(2);

            var expected = MyArray.of('a', 5);
            expect(array.equals(expected)).toEqual(true);
            expect(array.get(2)).toEqual(undefined);
            expect(array.get(3)).toEqual(undefined);
            expect(array.get(4)).toEqual(undefined);
        });

        it('deletes only specified deleteCount elements from start index', function () {
            var array = MyArray.of('a', 5, '42', 'hello', 77);

            array.splice(2, 2);

            var expected = MyArray.of('a', 5, 77);
            expect(array.equals(expected)).toEqual(true);
            expect(array.get(3)).toEqual(undefined);
            expect(array.get(4)).toEqual(undefined);
        });

        it('inserts provided items instead of deleted items', function () {
            var array = MyArray.of('a', 5, '42', 'hello', 77);

            array.splice(2, 2, 'bcd', 'ef', 24);

            var expected = MyArray.of('a', 5, 'bcd', 'ef', 24, 77);
            expect(array.equals(expected)).toEqual(true);
        });

        it('inserts provided items instead of deleted items - less inserted', function () {
            var array = MyArray.of('a', 5, '42', 'hello', 77);

            array.splice(2, 2, 42);

            var expected = MyArray.of('a', 5, 42, 77);
            expect(array.equals(expected)).toEqual(true);
        });

        it('inserts provided items instead of deleted items - no deleted', function () {
            var array = MyArray.of('a', 5, '42', 'hello', 77);

            array.splice(2, 0, 42, 'a');

            var expected = MyArray.of('a', 5, 42, 'a', '42', 'hello', 77);
            expect(array.equals(expected)).toEqual(true);
        });

        it('returns deleted items - none deleted', function () {
            var array = MyArray.of('a', 5, '42', 'hello', 77);

            var result = array.splice(0, 0);

            var expected = new MyArray(0);
            expect(result.equals(expected)).toEqual(true);
        });

        it('returns deleted items - some deleted', function () {
            var array = MyArray.of('a', 5, '42', 'hello', 77);

            var result = array.splice(0, 3);

            var expected = MyArray.of('a', 5, '42');
            expect(result.equals(expected)).toEqual(true);
        });
    });
});
