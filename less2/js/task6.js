function zero(callback) {
    if (callback) {
        return callback(0);
    } else {
        return 0;
    }
}
function one(callback) {
    if (callback) {
        return callback(1);
    } else {
        return 1;
    }
}
function two(callback) {
    if (callback) {
        return callback(2);
    } else {
        return 2;
    }
}
function three(callback) {
    if (callback) {
        return callback(3);
    } else {
        return 3;
    }
}
function four(callback) {
    if (callback) {
        return callback(4);
    } else {
        return 4;
    }
}
function five(callback) {
    if (callback) {
        return callback(5);
    } else {
        return 5;
    }
}
function six(callback) {
    if (callback) {
        return callback(6);
    } else {
        return 6;
    }
}
function seven(callback) {
    if (callback) {
        return callback(7);
    } else {
        return 7;
    }
}

function eight(callback) {
    if (callback) {
        return callback(8);
    } else {
        return 8;
    }
}

function nine(callback) {
    if (callback) {
        return callback(9);
    } else {
        return 9;
    }
}

function plus(firstOperand) {
    return function (secondOperand) {
        return firstOperand + secondOperand;
    }
}

function minus(firstOperand) {
    return function (secondOperand) {
        return secondOperand - firstOperand;
    }
}

function multiply(firstOperand) {
    return function (secondOperand) {
        return firstOperand * secondOperand;
    }
}

function divide(firstOperand) {
    return function (secondOperand) {
        return secondOperand / firstOperand;
    }
}

three(multiply(five())); // 15
three(plus(five())); // 8
three(minus(five())); // 2
eight(divide(two())); // 4
seven(multiply(five())); // 35
four(plus(nine())); // 13
eight(minus(three())); // 5
six(divide(two())); // 3