var counter = 0

function printf(message){
    console.log(message)
}

function printValue(divId, value){
    $("#"+divId).html(value)
} printValue("counter", 0)

$("#inc").on('click', increment)
$("#dec").on('click', decrement)

function increment(){
    counter<10?counter++:printf("too much increment")
    printValue("counter", counter);
}

function decrement(){
    counter>0?counter--:printf("too much decrement")
    printValue("counter", counter);
}