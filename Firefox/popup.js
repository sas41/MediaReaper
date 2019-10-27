var isVideo = false;

async function AccessBackgroundPage(page)
{
    page.GetURL(isVideo);
}

async function BackgroundPage(isVid) {
    try {
        PleaseWait();
        isVideo = isVid;
        var getting = browser.runtime.getBackgroundPage();
        getting.then(AccessBackgroundPage, Fail);
    }
    catch (error) {
        Fail();
        console.log(error);
    }
}
document.getElementById('download-video').addEventListener('click', function(){BackgroundPage(true);});
document.getElementById('download-audio').addEventListener('click', function(){BackgroundPage(false);});


function PleaseWait() {
    var element = document.getElementsByTagName("main")[0];
    element.classList.add("loading");
}

function Done() {
    var element = document.getElementsByTagName("main")[0];
    element.classList.remove("loading");
    blocked = false;
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
