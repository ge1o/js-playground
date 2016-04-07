/*
 Convert object to query-string
 Function argument should be simple object without nested objects. Object properties
 should be string or number
 */
/**
 * Convert object to query-string
 * @param queryData Object
 * @return String
 */
function toSearchString (queryData) {
    var resultString = '';

    for (val in queryData) {
        resultString = resultString += val + '=' + queryData[val] + '&';
    }

    resultString = resultString.slice(0, -1);
    console.log(resultString);
    return resultString;
}
//Examples:
toSearchString({}); // ''
toSearchString({test: true}); // 'test=true'
toSearchString({num: 10, test: true}); // 'num=10&test=true'
toSearchString({num: 10, test: true, user: 'admin'}); // 'num=10&test=true&user=admin'