var derivative = require('math-lib');
var output;

//function takeDerivative(equation, xValue){
output = ('foo1', derivative().computeSecondDerivative(function(x) {
  return x*x*x*x;
}, 2));
//}
console.log(output);
// console.log('foo1', derivative().computeSecondDerivative(function(x) {
//   return x*x;
// }, 4));
