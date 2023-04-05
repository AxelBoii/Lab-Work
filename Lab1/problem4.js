function printf(message){
console.log(message)
}

function getFibonacci(n){
    if(typeof n == 'undefined') return "not allowed"
    if(typeof n == 'string') return "not allowed"
    if(typeof n == 'bool') return "not allowed"
    if(n<1) return "not allowed"
    if(n>10) return "not allowed"
    var test = [];
    var a = 0;
    var b = 1;
    for(var i=0;i<n; i++){
        test.push(b);
        b = a+b;
        a = b-a;
    }
    return test;
}