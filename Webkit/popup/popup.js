var coreAPI = chrome;

var isVideo = false;

async function AccessBackgroundPage(page)
{
    page.GetURL(isVideo);
}

async function BackgroundPage(isVid) {
    try {
        PleaseWait();
        isVideo = isVid;
        AccessBackgroundPage(chrome.extension.getBackgroundPage());
    }
    catch (error) {
        console.log(error);
    }
}
document.getElementById('download-video').addEventListener('click', function(){BackgroundPage(true);});
document.getElementById('download-audio').addEventListener('click', function(){BackgroundPage(false);});



function PleaseWait() {
    var element = document.getElementsByTagName("main")[0];
    element.classList.add("loading");
    setTimeout(function () { window.close(); }, 3000);
}



function About()
{
    if(document.getElementById('about').style.display=='none')
    {
            document.getElementById('about') .style.display='block'
    }
    else
    {
        document.getElementById('about') .style.display='none'
    }
}
document.getElementById('showAbout').addEventListener('click', About);
