browser.runtime.onMessage.addListener(request => {
  console.log("Showing UMD Alert Modal...");
  AppendToDOM(request.error_url);
});

function AppendToDOM(url)
{
	try
	{
		var httpRequest = new XMLHttpRequest();
		httpRequest.onload = function(data) {
		    httpRequest.onload = null;

		    var template = document.createElement('template');
		    template.innerHTML = data.target.responseText;

		    var element = template.content.firstChild;
		    document.body.appendChild(element);
		    InsertURL(url);
			ShowAlertModal();
		}

		httpRequest.open('GET', browser.runtime.getURL('/umdalertmodal.html'));
		httpRequest.send();
	}
	catch(error)
	{
		console.log(error);
	}
}

function InsertURL(url)
{
	document.body.innerHTML = document.body.innerHTML.replace(/umd-download-failed-url/g, url);
}

function ShowAlertModal()
{
	try
	{
		// Get the modal
		var modal = document.getElementById("umdDownloadAlertModal");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("umd-download-alert-modal-close")[0];

 		modal.style.display = "block";


		span.onclick = function() {
		  modal.style.display = "none";
		}

		window.onclick = function(event) {
		  if (event.target == modal) {
		    modal.style.display = "none";
		  }
		}
	}
	catch(error)
	{
		console.log(error);
	}
}