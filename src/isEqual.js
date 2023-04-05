const _ = require('lodash')

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}
const occupied_arr = [1, 2, 4, 3];
const input_arr = [1, 2, 4, 3];
if (_.isEqual(occupied_arr, input_arr)) {
    // if (arraysEqual(occupied_arr, input_arr)) {
    console.log('true');
    // code to execute if the arrays are equal
} else {
    console.log('false');
    // code to execute if the arrays are not equal
}
