/*
 The new "Batman v Superman: Dawn of Justice" movie has just been released!
 There are a lot of people at the cinema box office standing in a huge line.
 Each of them has a single 100, 50 or 25 dollars bill. A "Batman v Superman: Dawn of Justice" ticket costs 25 dollars.
 Vasya is currently working as a clerk. He wants to sell a ticket to every single person in this line.
 Can Vasya sell a ticket to each person and give the change if he initially has no money and sells the
 tickets strictly in the order people follow in the line?
 Return YES, if Vasya can sell a ticket to each person and give the change. Otherwise return NO.
 */

/**
 * Can Vasya sell a ticket to each person and give the change
 * @param person
 * @return String
 */

function tickets (person) {
    var acceptableNominals = [25, 50, 100];
    var cash = {
        greenback25: 0,
        greenback50: 0,
        greenback100: 0
    };
    var total = 0;
    var payback;

    function sendMessage(message) {
        payback = message;
    }

    function addCash (given) {
        if (acceptableNominals.indexOf(given) === -1) {
            sendMessage('We do not accept ' + given + ' nominal!');
            return false;
        }

        // Adding cash
        cash['greenback' + given] += 1;
        total += given;

        // Calculating payback
        if(given === 100) {
            if (cash.greenback25 >= 3) {
                cash.greenback25 -= 3;
            } else if (cash.greenback25 >= 1 && cash.greenback50 >= 1) {
                cash.greenback25 -= 1;
                cash.greenback50 -= 1;
            } else {
                sendMessage('NO. Vasya will not have enough money to give change to ' + given + ' dollars.');
                return false;
            }
        }

        if (given === 50) {
            if (cash.greenback25 >= 1) {
                cash.greenback25 -= 1;
            } else {
                sendMessage('NO. Vasya will not have enough money to give change to ' + given + ' dollars.');
                return false;
            }
        }
    }

    for (var i = 0; i < person.length; i++) {
         if(addCash(person[i]) == false) {
                console.log(payback);
                return false;
         }
    }

    console.log('YES');
    return payback;
}

//Examples:
tickets([25, 50, 25, 25, 50]); // => YES
tickets([25, 100]);    // => NO. Vasya will not have enough money to give change to 100 dollars
tickets([25, 50, 25, 100]);    // => YES
tickets([25, 50, 25, 50, 25, 100]);    // => YES
tickets([100, 25, 50, 25, 50, 25, 100]);    // => NO
tickets([25, 30, 100, 25, 50, 25, 50, 25, 100]);    // => Not acceptable nominal
tickets([100, 25, 50, 100, 30, 75]);    // => Not acceptable nominal
tickets([50, 25, 50, 100, 30, 75]);    // => Not acceptable nominal
tickets([75, 25, 50, 100, 30, 75]);    // => Not acceptable nominal


