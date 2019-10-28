async function GetURL(isVideo) {
    try{
        chrome.tabs.getSelected(null, function(tab) {
            tabUrl = tab.url;
            SendRequest(tab.url, isVideo);
        });
    }
    catch(error)
    {
        LogError(error)
    }
}



async function SendRequest(url, isVideo)
{
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
    var downloading = chrome.downloads.download({
        url : downloadUrl,
        conflictAction : 'uniquify'
    });
}



function ShowAlertModal(url)
{
    chrome.tabs.getSelected(null, function(tab) {
        tabUrl = tab;
        SendMessageToTab(tab.id, url);
    });
}



function SendMessageToTab(tabid, url) {
    chrome.tabs.sendMessage(tabid, {error_url: url});
}



function LogError(error)
{
    console.log(error);
    console.log(chrome.runtime.lastError);
}