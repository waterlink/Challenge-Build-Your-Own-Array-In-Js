function PlainArray(capacity) {
    capacity = capacity || 0;
    var underlyingArray = new Array(capacity);

    Object.defineProperty(this, 'length', {
        value: capacity,
        writable: false,
    });

    this.get = function (index) {
        checkBounds(index);
        return underlyingArray[index];
    };

    this.set = function (index, value) {
        checkBounds(index);
        underlyingArray[index] = value;
    };

    var checkBounds = function (index) {
        if (index < 0 || index >= capacity) {
            throw new ArrayIndexOutOfBoundsError(
                'index ' + index +
                ' is out of bounds [0, ' + capacity + ')');
        }
    };
}

function ArrayIndexOutOfBoundsError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
}

ArrayIndexOutOfBoundsError.prototype = Object.create(Error.prototype);
ArrayIndexOutOfBoundsError.prototype.name = 'ArrayIndexOutOfBoundsError';

var mayTestPlainArray = false;

if (mayTestPlainArray) {
    describe('PlainArray', function () {
        describe('length', function () {
            it('is 0 when empty', function () {
                var empty = new PlainArray();
                expect(empty.length).toEqual(0);
            });

            it('is 1 when created with capacity 1', function () {
                var one = new PlainArray(1);
                expect(one.length).toEqual(1);
            });

            it('is > 1 when created with capacity > 1', function () {
                var many = new PlainArray(3);
                expect(many.length).toBeGreaterThan(1);
            });

            it('cannot be assigned', function () {
                var aLot = new PlainArray(42);
                expect(aLot.length).toEqual(42);

                aLot.length = 57;

                expect(aLot.length).toEqual(42);
            });
        });

        describe('set(index, value) + get(index)', function () {
            it('returns undefined as a default value', function () {
                var one = new PlainArray(1);
                expect(one.get(0)).toEqual(undefined);
            });

            it('returns value that was set at 0th index', function () {
                var one = new PlainArray(1);
                one.set(0, 'hello');
                expect(one.get(0)).toEqual('hello');
            });

            it('returns undefined when other index was set', function () {
                var one = new PlainArray(3);
                one.set(1, 42);
                expect(one.get(0)).toEqual(undefined);
            });

            it('returns value that was set at 1st index', function () {
                var many = new PlainArray(4);
                many.set(2, 42);
                expect(many.get(2)).toEqual(42);
            });
        });

        describe('get(index) out of bounds', function () {
            it('fails when index < 0', function () {
                var many = new PlainArray(2);
                expect(function () {
                    many.get(-1);
                }).toThrow(new ArrayIndexOutOfBoundsError('index -1 is out of bounds [0, 2)'));
            });

            it('mentions index and capacity in the error message', function () {
                var many = new PlainArray(3);
                expect(function () {
                    many.get(-3);
                }).toThrow(new ArrayIndexOutOfBoundsError('index -3 is out of bounds [0, 3)'));
            });

            it('fails when index >= capacity', function () {
                var many = new PlainArray(2);

                expect(function () {
                    many.get(2);
                }).toThrow(new ArrayIndexOutOfBoundsError('index 2 is out of bounds [0, 2)'));

                expect(function () {
                    many.get(3);
                }).toThrow(new ArrayIndexOutOfBoundsError('index 3 is out of bounds [0, 2)'));
            });
        });

        describe('set(index, value) out of bounds', function () {
            it('fails when index < 0', function () {
                var many = new PlainArray(2);
                expect(function () {
                    many.set(-1, 0);
                }).toThrow(new ArrayIndexOutOfBoundsError('index -1 is out of bounds [0, 2)'));
            });

            it('mentions index and capacity in the error message', function () {
                var many = new PlainArray(3);
                expect(function () {
                    many.set(-3, 0);
                }).toThrow(new ArrayIndexOutOfBoundsError('index -3 is out of bounds [0, 3)'));
            });

            it('fails when index >= capacity', function () {
                var many = new PlainArray(2);

                expect(function () {
                    many.set(2, 0);
                }).toThrow(new ArrayIndexOutOfBoundsError('index 2 is out of bounds [0, 2)'));

                expect(function () {
                    many.set(3, 0);
                }).toThrow(new ArrayIndexOutOfBoundsError('index 3 is out of bounds [0, 2)'));
            });
        });
    });
}