//1) var complexFunction = function(arg1, arg2) {
//    /* complex calculation in here */
//    return arg1 + arg2; //Example
//};
//var cachedFunction = cache(complexFunction);
//
//cachedFunction('foo', 'bar'); // complex function should be executed
//cachedFunction('foo', 'bar'); // complex function shouldn`t be invoked again,
//                              // instead the cached result should be returned
//cachedFunction('foo', 'baz'); // should be executed,
////because the method wasn't invoked before with these arguments
//написать функцию cache