const _ = require('lodash')

function objectsEqual(obj1, obj2) {
    const obj1Keys = Object.keys(obj1).map(key => key);
    const obj2Keys = Object.keys(obj2).map(key => key);
    console.log('obj1Keys', obj1Keys);
    console.log('obj2Keys', obj2Keys);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (let i = 0; i < obj1Keys.length; i++) {
        const key = obj1Keys[i];
        console.log('obj1[key]', obj1[key]);
        console.log('obj2[key]', obj2[key]);

        if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

const obj = { Name: "raj", age: 25 };

const obj2 = { age: 25, Name: "raj" };

// if (objectsEqual(obj, obj2)) {
    if (_.isEqual(obj, obj2)) {
    console.log('true');
    // code to execute if the objects are equal
} else {
    console.log('false');
    // code to execute if the objects are not equal
}
