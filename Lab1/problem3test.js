function printf(message){
    console.log(message)
}

(function(){
    printf(sum(0)+"; "+(sum(0)==0?"passed":"failed"))
    printf(sum(2)+"; "+(sum(2)==3?"passed":"failed"))
    printf(sum(4)+"; "+(sum(4)==10?"passed":"failed"))
    printf(sum()+"; "+(sum()=="n is undefined"?"passed":"failed"))
    printf(sum("sal")+"; "+(sum("sal")=="not a number"?"passed":"failed"))
    printf(sum(true)+"; "+(sum(true)=="not a number"?"passed":"failed"))
})();