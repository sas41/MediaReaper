async function GetURL(isVideo) {
    try{
        var gettingTabs = browser.tabs.query({currentWindow: true, active: true});
        gettingTabs.then(function(tabs) {SendRequest(tabs, isVideo);}, LogError())
    }
    catch(error)
    {
        console.log(error)
    }
}



async function SendRequest(tabs, isVideo)
{
    var url = tabs[0].url;

    var apiLink = '/api/DownloadAPI/v1.0/audio/';

    if (isVideo) {
        apiLink = '/api/DownloadAPI/v1.0/video/';
    }

    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    var request_body = {
        "DownloadURL": url
    };

    console.log(url);
    var init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(request_body)
    };


    var response = await fetch("https://sasrip.cf" + apiLink, init);
    var json = await response.json();

    if (json.success) {
        downloadURI(json.downloadPath);
    }
    else if (json.Status === "file_processing") {
        // If file is processing from another request, check every 5 seconds.
        setTimeout(function () { Download(url, isVideo); }, 5000);
    }
    else
    {
        ShowAlertModal(url);
        console.log(`Download for [${url}] failed.`);
    }
}



function downloadURI(downloadUrl) {
    var downloading = browser.downloads.download({
        url : downloadUrl,
        conflictAction : 'uniquify'
    });
}



function ShowAlertModal(url)
{
    browser.tabs.query({currentWindow: true, active: true})
                .then(function (tabs) { sendMessageToTab(tabs, url); })
                .catch(LogError);
}



function sendMessageToTab(tabs, url) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(tab.id, {error_url: url})
                    .then(response =>   {
                                            console.log("Message from the content script:");
                                            console.log(response.response);
                                        })
                    .catch(LogError);
    }
}



function LogError(error)
{
    console.log(error);
    console.log(browser.runtime.lastError);
}