document.body.insertAdjacentHTML("beforeend", `
<div id="exchange-container">
  <div id="amount-container">
    <a id="exit">&#10006;</a>
    <span id="from">999</span><strong>.Bs</strong>
    <img id="icon-arrow">
    <span id="to">999</span><strong>.$</strong>
  </div>
</div>
`);

let arrowIcon = document.getElementById("icon-arrow");
arrowIcon.src = chrome.runtime.getURL("/images/exchange-arrow.svg");





