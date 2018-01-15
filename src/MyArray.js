function MyArray(initialCapacity) {
    if (initialCapacity === undefined) {
        initialCapacity = 3;
    }

    this.elements = new PlainArray(initialCapacity);
    this.size = 0;
}

MyArray.prototype.length = function () {
    // Return current array size
    return this.size;
};

MyArray.prototype.push = function (value) {
    // Get the index where the new value will be set
    const newValueIndex = this.length();

    // Set the value at the index, and bump size by 1
    this.elements[newValueIndex] = value;
    this.size += 1;
};

MyArray.prototype.get = function (index) {
    // Get the value at the current index
    return this.elements[index];
};

MyArray.prototype.set = function (index, value) {
    // Check that the index chosen is valid
    const isValidIndex = index >= 0;

    // Set bool if the index argument already exists in the array
    const isExistingItem = isValidIndex && index < this.length();

    // Replace the value that exists in the array with the argument value
    if (isExistingItem) {
        this.elements[index] = value;
        return;
    }

    // Set the value at the argument index to the argument value, and increase size of array upto this new index
    if (isValidIndex) {
        this.elements[index] = value;
        this.size = (index + 1);
        return;
    }

    // Throw an error if neither if statement is satisfied
    throw `Can't set value of item in position ${index} - index is below 0`;
};

MyArray.of = function () {
    // Capture all arguments as a new array
    const argumentsArray = Array.prototype.slice.call(arguments);
    const newArray = new MyArray(argumentsArray.length);

    // Iterate through arguments and set each value into the new array
    for (i = 0; i < argumentsArray.length; i += 1) {
        newArray.set(i, argumentsArray[i]);
    }

    return newArray;
};

MyArray.prototype.pop = function () {
    // Return undefined if the array is empty
    if (this.length() <= 0) {
        return undefined;
    }

    // Get the index and value of the last item in the array
    const finalIndex = (this.length() - 1);
    const finalItem = this.get(finalIndex);

    // Set last item to undefined, and reduce array size by 1
    this.set(finalIndex, undefined);
    this.size -= 1;

    // Return value of the now-removed item
    return finalItem;
};

MyArray.prototype.concat = function (other) {
    // Store the original array
    const newArray = this;

    // Iterate through the length of the argument array, pushing to to the new array
    for (let i = 0; i < other.length(); i += 1) {
        newArray.push(other.get(i));
    }

    return newArray;
};

MyArray.prototype.indexOf = function (element) {
    // Assume the value is not found in the array
    let index = -1;

    // Iterate (increasing) through the array
    for (let i = 0; i < this.length(); i += 1) {
        const value = this.get(i);

        // If current index value is equal to the argument value, break for loop and set index
        if (value === element) {
            index = i;
            break;
        }
    }

    return index;
};

MyArray.prototype.lastIndexOf = function (element) {
    // Assume the value is not found in the array
    let index = -1;

    // Iterate (decreasing) through the array
    for (let i = this.length(); i > 0; i -= 1) {
        const value = this.get(i);

        // If current index value is equal to the argument value, break for loop and set index
        if (value === element) {
            index = i;
            break;
        }
    }

    return index;
};

MyArray.prototype.includes = function (element) {
    // Assume the value is not found in the array
    let exists = false;

    // Iterate through the array
    for (let i = 0; i < this.length(); i += 1) {
        const value = this.get(i);

        // If current index value is equal to the argument value, break for loop and set bool
        if (value === element) {
            exists = true;
            break;
        }
    }

    return exists;
};

MyArray.prototype.find = function (fn) {
    // Assume the value is not found in the array
    let value = undefined;

    // Iterate through the array
    for (let i = 0; i < this.length(); i += 1) {
        const indexValue = this.get(i);

        // Run function against the current index value, if it returns true, break the for loop
        if (fn(indexValue)) {
            value = indexValue;
            break;
        }
    }

    return value;
};

MyArray.prototype.findIndex = function (fn) {
    // Assume the value is not found in the array
    let index = -1;

    // Iterate through the array
    for (let i = 0; i < this.length(); i += 1) {
        const value = this.get(i);

        // Run function against the current index value, if it returns true, break the for loop
        if (fn(value)) {
            index = i;
            break;
        }
    }

    return index;
};

MyArray.prototype.equals = function (other) {
    // Store boolean to distinguish if lengths are the same
    const hasSameLength = this.length() === other.length();

    const equalsCompare = (array) => {
        // Assume all values match
        let allValuesMatch = true;

        // Iterate through entire array, set bool & break if the values don't match
        for (let i = 0; i < this.length(); i += 1) {
            if (this.get(i) !== array.get(i)) {
                allValuesMatch = false;
                break;
            }
        }

        return allValuesMatch;
    };

    // Return true if the lengths are different
    if (!hasSameLength) {
        return false;
    }

    // Execute function comparing the two arrays
    return equalsCompare(other);
};

MyArray.prototype.forEach = function (fn) {
    // Iterate through entire array, running func argument against each value
    for (let i = 0; i < this.length(); i += 1) {
        fn(this.get(i), i);
    }

    return;
};

MyArray.prototype.join = function (separator) {
    // Resolve the current separator defaulting to comma (empty string is also a valid option)
    const resolveSeparator = (userChoice) => {
        if (userChoice === '' || userChoice) {return userChoice;}
        
        return ',';
    }

    let stringValue = null;

    // Iterate through the entire array
    for (let i = 0; i < this.length(); i +=1) {
        /*
            If stringValue is still null (no items added), add a string version of the item at current index,
            otherwise add a separator between the two values
        */
        if (!stringValue) {
            stringValue = String(this.get(i));
        } else {
            stringValue =
                stringValue +
                resolveSeparator(separator) +
                String(this.get(i));
        }
    }

    return stringValue;
};

MyArray.prototype.toString = function () {
    // Run the join function created previously
    const stringArray = this.join();
    return stringArray;
};

MyArray.prototype.map = function (fn) {
    // Create empty new array
    let newArray = new MyArray();

    // Iterate through the entire array and run the func argument against each value, storing the result
    for (let i = 0; i < this.length(); i += 1) {
        const value = fn(this.get(i));

        // Push the result of the function onto the new array created
        newArray.push(value);
    }

    return newArray;
};

MyArray.prototype.filter = function (fn) {
    // Create empty new array
    let newArray = new MyArray();

    // Iterate through the entire array and run the func argument against each value
    for (let i = 0; i < this.length(); i += 1) {
        const currentValue = this.get(i);
        const funcIsSatisfied = fn(currentValue);

        // Is the function returns true, add the current value to the new array
        if(funcIsSatisfied) {
            newArray.push(currentValue);
        }
    }

    return newArray;
};

MyArray.prototype.some = function (fn) {
    // By default, assume no values match the statement in the fn argument
    let doSomeMatch = false;

    // Iterate through the array and run the func argument against each value
    for (let i = 0; i < this.length(); i += 1) {
        const currentValue = this.get(i);
        const funcIsSatisfied = fn(currentValue);

        // If function returns true, modify the doSomeMatch variable and stop the loop
        if(funcIsSatisfied) {
            doSomeMatch = true;
            break;
        }
    }

    return doSomeMatch;
};

MyArray.prototype.every = function (fn) {
    // By default, assume values match the statement within the fn argument
    let doAllMatch = true;

    // Iterate through array, running the function on each value
    for (let i = 0; i < this.length(); i += 1) {
        const currentValue = this.get(i);
        const funcIsSatisfied = fn(currentValue);

        // If function returns false, modify the doAllMatch variable and stop the loop
        if(!funcIsSatisfied) {
            doAllMatch = false;
            break;
        }
    }

    return doAllMatch;
}

MyArray.prototype.fill = function (value, start, end) {
    const checkExists = (v, fallback) => {
        if (v || v === 0) {return v};
        return fallback;
    };

    // If no arguments exist, start and end are relative to array
    const first = checkExists(start, 0);
    const last = checkExists(end, this.length());

    // Iterate from first to last, setting each index to the argument value
    for (let i = first; i < last; i += 1) {
        this.set(i, value);
    }

    return;
};

MyArray.prototype.reverse = function () {
    /*
        Iterate through half the array, keeping track of both the 
        current item index (same as i) and it's 'mirror' (last item in array minus i)
    */
    for (let i = 0; i < this.length() / 2; i += 1) {
        const lastIndex = this.length() - 1;
        const lowIndex = i;
        const highIndex = lastIndex - i;

        // Get the items from each position
        const lowValue = this.get(lowIndex);
        const highValue = this.get(highIndex);

        // Set the low 
        this.set(lowIndex, highValue);
        this.set(highIndex, lowValue);
    }

    return;
};

MyArray.prototype.shift = function () {
    // If array is empty, return undefined
    if (this.length() <= 0) {
        return undefined;
    }

    // Get the value at position 0 (this will be removed)
    const removedValue = this.get(0);

    // Iterate through each array value (increasing), and copy the value below it e.g. 1, 2, 3 > 2, 3, 3
    for (let i = 0; i < this.length(); i += 1) {
        const newValue = this.get(i + 1);
        this.set(i, newValue);
    }

    // Pop the last value from the array (see pop function method for more details)
    this.pop()

    // Return the value which was at position 0 (now removed)
    return removedValue;
};

MyArray.prototype.unshift = function (element) {
    // If array is empty, add the value and return
    if (this.length() <= 0) {
        this.push(element);

        return;
    }

    // Add a copy of the current final item onto the end of the array
    const finalItemKey = this.length() - 1;
    this.push(this.get(finalItemKey));

    // Iterate through each array value (decreasing), and copy the value below it e.g. 1, 2, 3 > 1, 1, 2
    for (let i = finalItemKey; i > 0; i -= 1) {
        const newValue = this.get(i - 1);
        this.set(i, newValue);
    }

    // Set the first item in the array to the argument's value
    this.set(0, element);

    return;
};

MyArray.prototype.slice = function (start, end) {
    const checkExists = (v, fallback) => {
        if (v || v === 0) {return v};
        return fallback;
    };

    // Get start and end position of slice
    const startPos = checkExists(start, 0);
    const endPos = checkExists(end, this.length());

    // Create a new array to populate
    const newArray = new MyArray();

    // Iterate through the base array, from start to end and push the new values into the new array
    for (let i = startPos; i < endPos; i += 1) {
        newArray.push(this.get(i));
    }

    return newArray;
};

MyArray.prototype.splice = function (start, deleteCount) {
    const checkExists = (v, fallback) => {
        if (v || v === 0) {return v};
        return fallback;
    };
    // If deleteCount wasn't provided, get the remaining items after start value
    const numToDelete = checkExists(deleteCount, (this.length() - start));

    // Determine where to stop deleting values
    const end = start + numToDelete;

    // Make a new array with items which will be deleted
    const deletedItems = this.slice(start, end);

    // Make a new array with items in positions before those which will be deleted
    const preDeleteItems = this.slice(0, start);

    // Make a new array with items in positions after those which will be deleted
    const postDeleteItems = this.slice(end);

    // Make a new MyArray of argument items
    const argumentsArray = Array.prototype.slice.call(arguments);
    const argumentItems = new MyArray.of(...argumentsArray.slice(2));

    // Make a new array, adding pre-delete items with argument items
    const preWithArguments = preDeleteItems.concat(argumentItems);

    // Make a new array, with the values which weren't deleted added to pre + argument array
    const finalArray = preWithArguments.concat(postDeleteItems);

    // Change the elements in the parent array
    this.elements = finalArray.elements;
    this.size = finalArray.size;

    return deletedItems;
};
