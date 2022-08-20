
// var product = document.querySelector('#order-list');
var addBtnAll = document.querySelectorAll('.add-one');//+
var subBtnAll = document.querySelectorAll('.sub-one');
var amountAll = document.querySelectorAll('.amount');//數量
var singlePayAll = document.querySelectorAll('.single-pay');//10.5
var totalAmount = document.querySelector('#all-amount');
var smallPay = document.querySelector('#small-pay');
var shippingFee = document.querySelector('#shippingl-fee');
var sumPay = document.querySelector('#sum-pay');
var unitPrice = [];
var amountBefore=0;

all_count();

amountAll.forEach(function (amount, index) {
    get_unit_price(index);
    var amountBefore = amount.value;

    amount.addEventListener('focus',function(){
        amountBefore = amount.value;
    })

    amount.addEventListener('change',function(){ //輸入框
        var reg = /^([0]|[1-9][0-9]*)$/; //正則表示式,正規表示式
        if (reg.test(amount.value)){  // && amount.value < 100){
            add_or_sub("x",index); //x表示計算輸入框
        }else{
            amount.value = amountBefore;  //不合規則就回復原來數量
        }
    })
})


addBtnAll.forEach(function (addBtn, index) { //+
    addBtn.addEventListener('click',function(){ //對每一個+設監聽事件
        add_or_sub("+",index);
    })
})

subBtnAll.forEach(function (subBtn, index) { //-
    subBtn.addEventListener('click',function(){//對每一個-設監聽事件
        add_or_sub("-",index);
    })
})

function add_or_sub(choice,index) {
    var tempAmount =  parseInt(amountAll[index].value)  ;
    switch(choice) {
        case "+" :
            amountAll[index].value = ++tempAmount ;  //計算數量
            break;
        case "-" :
            amountAll[index].value = (tempAmount > 0) ?  --tempAmount : tempAmount;        
            break;
        default :
            amountAll[index].value = tempAmount ; //用輸入框的數量來算
       }   
    singlePayAll[index].innerHTML = "$" + (unitPrice[index] * tempAmount).toFixed(2) ; //算那一樣要花的錢

    all_count(); //重算下面總和
}

function all_count() { //算下面總和
    var temp_totalAmount = 0;     
    var temp_smallPay = 0; 

    amountAll.forEach(x => temp_totalAmount += parseInt(x.value)); 
    totalAmount.innerHTML = temp_totalAmount; 

    singlePayAll.forEach(x => temp_smallPay += get_digital_price(x)); 
    smallPay.innerHTML = "$" + (temp_smallPay).toFixed(2);
    sumPay .innerHTML = "$" + (temp_smallPay +  get_digital_price(shippingFee)).toFixed(2);
} 

function  get_unit_price(index) {//計算真正的單價
    var tempPrice = get_digital_price(singlePayAll[index]);
    var tempAmount =  parseInt(amountAll[index].value)  ;
    unitPrice[index]= tempPrice / tempAmount;
}

function get_digital_price(price_str) {
    return tempPrice = parseFloat((price_str.innerHTML.split('$'))[1]);
}
 