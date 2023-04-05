function printf(message){
console.log(message)
}

$("#equals").on("click", calculate)

function calculate(){
    var first = parseInt($("#firstNumber").val())
    var second = parseInt($("#secondNumber").val())

    var res
    var rem

    if(isNaN(first)||isNaN(second)) {
        $("#res").html("please only input numbers")
        return 0
    }

    var sign = $("#sgn").val();
    switch(sign){
        case "plus": {
            res = first+second
            $("#res").html("sum is: "+res)
            break
        }
        case "minus": {
            res = first-second
            $("#res").html("difference is: "+res)
            break
        }
        case "times":{
            res = first*second
            $("#res").html("product is: "+res)
            break
        }
        case "divid":{
            res = parseInt(first/second)
            rem = first%second
            $("#res").html("quotient is: "+res+" and reminder is "+rem)
            break
        }
    }
}

