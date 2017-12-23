window.onload = function() {
   getCurrency();
};

function post(){
    let costInput = document.getElementById('InputCurrencyValue').value;
    let currency = document.getElementById('currency').value;
    if(!/\D/.test(costInput) && costInput.length > 2) { 
        let price =  costInput+' '+currency;
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST','/cur', true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send(price);
    } else { alert('wrong!') }

    go();

    function go() {
        let timer = document.getElementById('timer');
        let inSecond;
        let cost = 0;
    
        get();
        summ();
    
        function get() {
            let xhr = new XMLHttpRequest();
        
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200) {
                    let ansver = xhr.responseText;
                    console.log(JSON.parse(ansver));
                    inSecond = JSON.parse(ansver).sec;
                }
            }
            xhr.open('GET', '/cur', true);
            xhr.send();
        }
    
        function summ() {
            let secs = 0;
            setInterval(function(){
                secs++;
                cost += +inSecond;
                timer.innerHTML = (cost/10).toFixed(4) + ' за - ' + (secs/10).toFixed(0) + 'секунд';
            }, 100);
        };
    };
};



function getCurrency(){
    let curr = [];

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.nbrb.by/API/ExRates/Rates?Periodicity=0', true);
    xhr.send();

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200) {
                let currency = JSON.parse( xhr.responseText);
                currency.map( function(val, i) {
                    if(val.Cur_Abbreviation === "USD" || 
                    val.Cur_Abbreviation === "EUR" || 
                    val.Cur_Abbreviation === "RUB" ||
                    val.Cur_Abbreviation === "UAH") {
                        curr.push({'scale':val.Cur_Scale, 'name':val.Cur_Name, 'rate':val.Cur_OfficialRate})
                    };
                    return curr;
                } );
                let sendCurr = JSON.stringify(curr)
                console.log( sendCurr );

                let newXhr = new XMLHttpRequest();
                newXhr.open('POST','/allCurrency', true);
                newXhr.setRequestHeader('Content-Type', 'text/plain');
                newXhr.send(sendCurr);
            }
            
        }
};

