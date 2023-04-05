function printf(message){
console.log(message)
}

(function(){
    printf(getFibonacci(2).toString()=="1,1"?"passed":"failed")
    printf(getFibonacci(5).toString()=="1,1,2,3,5"?"passed":"failed")
    printf(getFibonacci().toString()=="not allowed"?"passed":"failed")
    printf(getFibonacci(-1).toString()=="not allowed"?"passed":"failed")
    printf(getFibonacci(11).toString()=="not allowed"?"passed":"failed")
})()