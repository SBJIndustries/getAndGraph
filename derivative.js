var derivative = require('math-lib');

function takeDerivative(equation, xValue){

console.log('foo1', derivative().computeSecondDerivative(function(x) {
  return equation
  return x*x;
}, xValue));
}

// console.log('foo1', derivative().computeSecondDerivative(function(x) {
//   return x*x;
// }, 4));
