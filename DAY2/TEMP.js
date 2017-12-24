/*
 let a = 12;
 let b = 13;
 a = a + b;//=>25
 b = a - b;//=>25-13=12
 a = a - b;//=>25-12=13
 console.log(a, b);*/

let a = 12;
let b = 13;
[a, b] = [b, a];
console.log(a, b);