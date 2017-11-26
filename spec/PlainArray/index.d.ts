class PlainArray<T> {
    constructor(capacity: number)
    get(index: number): T
    set(index: number, value: T)
}

class ArrayIndexOutOfBoundsError extends Error {

}
