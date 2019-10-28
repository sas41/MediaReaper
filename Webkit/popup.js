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
        Fail();
    }
}
document.getElementById('download-video').addEventListener('click', function(){BackgroundPage(true);});
document.getElementById('download-audio').addEventListener('click', function(){BackgroundPage(false);});


function PleaseWait() {
    var element = document.getElementsByTagName("main")[0];
    element.classList.add("loading");
}


function Fail(page = null) {
    var element = document.getElementsByTagName("main")[0];
    element.classList.remove("loading");
    element.classList.add("failed");
}







function About()
{
    if(document.getElementById('about').style.display=='none')
    {
            document.getElementById('about') .style.display=''
    }
    else
    {
        document.getElementById('about') .style.display='none'
    }
}
document.getElementById('showAbout').addEventListener('click', About);
