const URL_API = "https://exchangemonitor.net/api/ve?user=DAVID_LINAREZ&token=A93aar@*uyHZA$aJxsku&currency=USD";

fetch(URL_API)
    .then(response => response.json())
    .then(data => {
        chrome.storage.local.set(
            {
                "priceDolarParalelo": data["data"]["2"]["data"]["rate"],
                "priceDateParalelo": data["data"]["2"]["format"]["date"]
            })
    });

    //

