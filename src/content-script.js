const exchangeContainer = document.querySelector("#exchange-container"),
      ammountFrom = document.querySelector("#amount-container #from"),
      ammountTo = document.querySelector("#amount-container #to"),
      currency = document.querySelectorAll("#amount-container strong");

let select, currentAmmountSelected, actualDollarPrice;

//Get dollar price on localStorage
chrome.storage.local.get(["priceDolarParalelo"], (res)=>{
  actualDollarPrice = res.priceDolarParalelo;
});
//Set ammount in exchangeContainer 
const setAmmount = (ammount) =>{
  if(currency[0].textContent === ".Bs"){
    ammountFrom.textContent = ammount;
    ammountTo.textContent = String((ammount / actualDollarPrice).toFixed(2));
  }else{
    ammountFrom.textContent = ammount;
    ammountTo.textContent = String((ammount * actualDollarPrice).toFixed(2));
  } ;
}
//Content Main Script
const mainFunc = () => {
  document.addEventListener("mouseup", (e)=>{
  
    select = document.getSelection().toString()
    if ( select && (/^\d+/.test(select)) ) {
  
      currentAmmountSelected = Number(select
      .match(/\d{1,2}\,?\d{0,2}?/g)
      .join("")
      .replace(/\./g, "")
      .replace(/\,/g, "."));
  
        setAmmount(currentAmmountSelected);
  
        let xCoord = getSelectionCoordinates(true).dx - window.pageXOffset - 50;
        let yCoord = getSelectionCoordinates(true).dy + window.pageYOffset - 40;
  
        let currDisplay = window.getComputedStyle(exchangeContainer);
        if(currDisplay.getPropertyValue("display") === "none"){
          setPositionElement(exchangeContainer, yCoord, xCoord);
          exchangeContainer.style.display = "block";
        }
    }
  });
  //Script Arrows exchange of Container
  arrowIcon.addEventListener("click", ()=>{
    //Change currency type
    if(currency[0].textContent === ".$"){
      currency[0].textContent = ".Bs"
      currency[1].textContent = ".$"
      setAmmount(currentAmmountSelected);
    }else if(currency[0].textContent === ".Bs"){
      currency[0].textContent = ".$"
      currency[1].textContent = ".Bs"
      setAmmount(currentAmmountSelected);
    }
  });
  //Script icon X of Container
  document.querySelector("#amount-container #exit").addEventListener("click", ()=>{
    exchangeContainer.style.display = "none";
  });
}
//Gets status of the checkbox
chrome.storage.sync.get(['key'], function(result) {
  if(result.key){
    mainFunc();
  }
});
//Capture changes in the Checkbox
chrome.storage.onChanged.addListener(function(changes, namespace) {
  chrome.storage.sync.get(['key'], function(result) {
    if(result.key){
      mainFunc();
    }
  });
});













