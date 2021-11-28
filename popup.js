const dollarProvider = document.querySelector("#dollar-provider");
const checkbox = document.querySelector("#switch-input");
//let enabled = true;

chrome.storage.local.get(["priceDolarParalelo","priceDateParalelo"], (res)=>{
    
    //set Dollar Provider
    document.querySelector("#dollar-price")
    .textContent = res.priceDolarParalelo;

    document.querySelector("#price-date")
    .textContent = res.priceDateParalelo;
})

checkbox.addEventListener("change", ()=>{
    chrome.storage.sync.set({key: checkbox.checked}, function() {
        console.log('Value is set to ' + checkbox.checked);
      });
});

chrome.storage.sync.get(['key'], function(result) {
    checkbox.checked = result.key;
});

// if(chrome.storage.local.get(["checkBtn"], obj => obj.checkBtn) !== undefined){
//     checkBtn.checked = chrome.storage.local.get(["checkBtn"], obj => obj.checkBtn)
// }else{
//     checkBtn.checked = checkBtn.checked;
// }

// checkBtn.addEventListener("change", ()=>{
//     chrome.storage.local.set({"checkBtn": checkBtn.checked});
// })

// checkbox.addEventListener('change', (event) => {
// const { checked } = event.target;
// toggleContent(checked);
// });

// const toggleContent = (checked) => {
//     chrome.runtime.sendMessage({"checkbox": checked}, (response) => {
//     console.log(`Checkbox is turned ${checked ? 'on' : 'off'}`)
//     });
// };






