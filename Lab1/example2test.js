
function printf(message){
    console.log(message)
}

(function(){
    printf(sum(0)==0?"passed":"failed")
    printf(sum(2)==3?"passed":"failed")
    printf(sum(4)==10?"passed":"failed")
    printf(sum()=="n is undefined"?"passed":"failed")
})();