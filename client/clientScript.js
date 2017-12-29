window.onload = function() {
    getCurrency(); 
    
};

function start(){

    let costInput = document.getElementById('InputCurrencyValue').value;
    let currency = document.getElementById('currency').value;
    let button = document.getElementById('button');
    let table = document.getElementsByTagName('table')[0];
    document.styleSheets[0].addRule('table', 'visibility : visible');

    const BYN = document.getElementById('BYN')


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

        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
    
        let daysInMonth = 33 - new Date(year, month, 33).getDate();
        let workDays = 0;

        let monthSalary;
        let enteredCurrency;
        let alternativeCyrrencies;

        for(let i = 1; i <=daysInMonth; i++) {
            if( (new Date(year, month, i)).getDay() > 0 && (new Date(year, month, i)).getDay() < 6 ) {
                workDays++;
            }
        }


    
        getData();

        function getData() {
            let xhr = new XMLHttpRequest();
        
            xhr.open('GET', '/cur', true);
            xhr.send(null);
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && xhr.status === 200){
                    let ansver = JSON.parse(xhr.responseText);
                    monthSalary = ansver.price;
                    enteredCurrency = ansver.mainValue;
                    alternativeCyrrencies = ansver.values;

                    showAll();
                }
            }
        }

        function showAll() {
            let salaryInMilisecond = +monthSalary/workDays/8/60/60/100; 
            let finalCost = 0;
            
            let ms = 0;
            let s = '00';
            let m = '00';
            let h = '00';

            setInterval(function(){
                finalCost += +salaryInMilisecond;

                ms++;
                if ( ms === 100 ) {
                    s++;
                    ms = 0;
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
                    button.innerText = h+":"+m+":"+s;
                }

                alternativeCyrrencies.map( function(item, index) {
                    if (item.abbreviation !== enteredCurrency ) {
                        let tmpCell = document.getElementById(item.abbreviation);
                        tmpCell.innerText = (finalCost*item.scale/item.rate).toFixed(4) + ' '+ item.abbreviation;
                    };
                } )
            }, 10)
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


