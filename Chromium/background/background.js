var coreAPI = chrome;

async function GetURL(isVideo) {
    try{
        coreAPI.tabs.getSelected(null, function(tab) {
            tabUrl = tab.url;
            SendRequest([tab], isVideo);
        });
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
        "DownloadURL": url,
        "CallSource": "MR Chrmium"
    };

    var init = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(request_body)
    };


    var response = await fetch("https://sasrip.sas41.com" + apiLink, init);
    var json = await response.json();

    if (json.success) {
        DownloadURI(json.downloadPath);
    }
    else if (json.status === "file_processing") {
        // If file is processing from another request, check every 5 seconds.
        setTimeout(function () { SendRequest(tabs, isVideo); }, 5000);
    }
    else
    {
        ShowAlertModal(url);
        console.log(`Download for [${url}] failed.`);
    }
}



function DownloadURI(downloadUrl) {
    var downloading = coreAPI.downloads.download({
        url : downloadUrl,
        conflictAction : 'uniquify'
    });
}



function ShowAlertModal(url)
{
    coreAPI.tabs.getSelected(null, function(tab) {
        SendMessageToTab([tab], url);
    });
}



function SendMessageToTab(tabs, url) {
    for (let tab of tabs) {
        coreAPI.tabs.sendMessage(tab.id, {error_url: url});
    }
}



function LogError(error)
{
    console.log(error);
    console.log(coreAPI.runtime.lastError);
}