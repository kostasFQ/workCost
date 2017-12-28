window.onload = function() {
    getCurrency(); 
};

function start(){

    let costInput = document.getElementById('InputCurrencyValue').value;
    let currency = document.getElementById('currency').value;
    let button = document.getElementById('button');


    if(!/\D/.test(costInput) && costInput.length > 2 && costInput[0] != 0) { 
        let price =  costInput+' '+currency;
        
        let xhr = new XMLHttpRequest();
        xhr.open('POST','/cur', true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send(price);

        button.setAttribute("disabled", "disabled");
    } else { alert('wrong!'); return }

    go();

    function go() {

        let tmpObj = {
            price:null,
            mainCurrencies:null,
            values:null
        };
        let obj = {};
    
        get();
        showAll();

        function get() {
            
            let xhr = new XMLHttpRequest();
        
            xhr.open('GET', '/cur', false);
            xhr.send(null);
            let ansver = xhr.responseText;
            obj = ansver;
            /*xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200) {
                    let ansver = JSON.parse(xhr.responseText);
                    tmpObj.price = ansver.price;
                    tmpObj.mainCurrencies = ansver.mainValue;
                    tmpObj.values = ansver.values;
                    console.log(tmpObj);
                    return tmpObj;
                }
            }*/
        }

        function showAll() {
            let s = '00';
            let m = '00';
            let h = '00';

            setInterval(function(){

                s++;
                if(+s < 10) s = "0"+s;
                if( +s === 60 ) {
                    s = '0'+0;
                    m++;
                    if(m > 0 && m < 10) m = '0'+m;
                    if(+m === 60 ) {
                        m = '0'+0; 
                        h++;
                        if(+h < 10) h = '0'+h;
                    }
                }
                button.innerText = h+":"+m+":"+s    ;

            }, 1000)
        }



        

        

        

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
                        curr.push({'scale':val.Cur_Scale, 'name':val.Cur_Name, 'rate':val.Cur_OfficialRate, abbreviation: val.Cur_Abbreviation})
                    };
                    //console.log( 'curr' ,curr);
                } );
                let sendCurr = JSON.stringify(curr)

                let newXhr = new XMLHttpRequest();
                newXhr.open('POST','/allCurrency', true);
                newXhr.setRequestHeader('Content-Type', 'text/plain');
                newXhr.send(sendCurr);    
            }
        }
};

