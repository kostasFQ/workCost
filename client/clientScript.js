

function push(){
    let costInput = document.getElementById('InputCurrencyValue').value;
    let currency = document.getElementById('currency').value;
    if(!/\D/.test(costInput) && costInput.length > 2) { 
        let price =  costInput+' '+currency;
        
        
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST','/cur', true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        /*xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        }*/
        xhr.send(price);


    } else { alert('wrong!') }

};

function get() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('ansverCost').innerHTML = xhr.responseText;
            console.log(xhr.responseText);
        }
    }
    xhr.open('GET', '/cur', true);
    xhr.send();
}

