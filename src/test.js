const _ = require('lodash')

function ArrayChallenge(arr) {

    let total_desk = arr[0]
    if ((total_desk >= 2) && (total_desk <= 24) && (total_desk % 2 === 0)) {
        let occupied_desks_max = -Infinity;
        let occupied_desks_min = +Infinity;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > occupied_desks_max) occupied_desks_max = arr[i];
            if (arr[i] < occupied_desks_min) occupied_desks_min = arr[i];
        }
        if ((occupied_desks_max <= total_desk) && (occupied_desks_min >= 0)) {
            const occupied_arr = arr.slice(1)
            const input_arr = arr.slice(1)

            for (let i = 0; i < occupied_arr.length - 1; i++) {
                let smaller = i;
                for (let j = i + 1; j < occupied_arr.length; j++) {
                    if (occupied_arr[j] < occupied_arr[smaller]) smaller = j;
                }
                if (smaller != i) {
                    let temp = occupied_arr[i];
                    occupied_arr[i] = occupied_arr[smaller];
                    occupied_arr[smaller] = temp;
                }
            }
            if (_.isEqual(occupied_arr, input_arr)) {

                // some code rest becouse time issue
                const a = arr.slice(0, -1).slice(1)
                return a;

            } else console.log('occupied will be sorted')

        } else console.log(`The number of occupied desks will not less then 0 or more then Total number of desk`)
    } else console.log(`The number of desks in a classroom will range from 2 to 24 and will always be an evev number.`);


}
const output = ArrayChallenge([8, 1, 2, 4, 6, 8])
// keep this function call here 
console.log(output);