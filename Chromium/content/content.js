var coreAPI = chrome;

coreAPI.runtime.onMessage.addListener(request => {
  CheckForiFrame(request.error_url);
});

function CheckForiFrame(url)
{
	try
	{
		if (document.getElementById("MediaReaperAlertModaliFrame") != null) {
			setTimeout(function(){ CheckForiFrame(url); }, 1000);
		}
		else {
  			console.log("[Media Reaper] Showing MediaReaper Alert Modal...");
			GetiFrameHtml(url);
		}
	}
	catch(error)
	{
		console.log(error);
	}
}

function GetiFrameHtml(url) {
	try
	{
		var htmlFile = 'alert/media-reaper-alert-modal.html';

	    var xmlhttp = new XMLHttpRequest();
	    xmlhttp.open("GET", chrome.extension.getURL(htmlFile), true);

	    xmlhttp.onreadystatechange = function (data) {
	        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	            AppendToDOM(data.target.responseText, url);
	        }
	    };
	    xmlhttp.send();
	}
	catch(error)
	{
		console.log(error);
	}
}

function AppendToDOM(body, url)
{
	try
	{
		var iframe = document.createElement('iframe');
		iframe.id = "MediaReaperAlertModaliFrame";
		iframe.onload = function () {

			console.log("[Media Reaper] Replacing URL...");
			iframe.contentDocument.body.innerHTML = body.replace(/MediaReaper-download-failed-url/g, url);
			ShowAlertModal(url);
		}
		document.body.appendChild(iframe);
	}
	catch(error)
	{
		console.log(error);
	}	
			
}

function ShowAlertModal(url)
{
	try
	{
		var modal = document.getElementById("MediaReaperAlertModaliFrame");
		var span = modal.contentDocument.getElementsByClassName("modal-close")[0];


		console.log("[Media Reaper] Adding Hooks...");
		span.onclick = function() {
			modal.parentNode.removeChild(modal);
		}
		console.log(modal.contentDocument);

		modal.contentDocument.onclick = function(event) {
			if (event.target == modal.contentDocument.body) {
				modal.parentNode.removeChild(modal);
			}
		}
	}
	catch(error)
	{
		console.log(error);
	}
}
