

function push(){
    let message;
    let costInput = document.getElementById('InputCurrencyValue').value;
    let currency = document.getElementById('currency').value;
    if(!/\D/.test(costInput) && costInput.length > 2) { 
        document.getElementById('ansverCost').innerHTML = costInput+' '+currency;
    } else { alert('wrong!') }
};

