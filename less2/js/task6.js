function five(callback) {
    if (callback) {
        return callback(5);
    } else {
        return 5;
    }
}

function three(callback) {
    if (callback) {
        return callback(3);
    } else {
        return 3;
    }
}

function multiply(firstOperand) {
    return function (secondOperand) {
        return firstOperand * secondOperand;
    }
}

three(multiply(five()));