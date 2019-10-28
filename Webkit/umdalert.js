chrome.runtime.onMessage.addListener(request => {
  console.log("Showing UMD Alert Modal...");
  AppendToDOM(request.error_url);
});

function AppendToDOM(url)
{
	// Yes, the entire fkn modal is in this string, why? Because For no good reason, Chrome is failing GET requests to internal extension files with a network error...A network error to a local file...
	var pagecontent="<div id=\"umdDownloadAlertModal\" class=\"umd-download-alert-modal\">\r\n  <div class=\"umd-download-alert-modal-content\">\r\n  \r\n    <div class=\"umd-download-alert-modal-header\">\r\n      <span class=\"umd-download-alert-modal-close\">&times;<\/span>\r\n      <h2>Universal Media Downloader<\/h2>\r\n    <\/div>\r\n    \r\n    <div class=\"umd-download-alert-modal-body\">\r\n    \r\n      <p class=\"umd-download-alert-p\">A download has failed.<\/p>\r\n      <p class=\"umd-download-alert-p\">Your download of [<a class=\"umd-download-alert-a\" href=\"umd-download-failed-url\">umd-download-failed-url<\/a>] has failed.<\/p>\r\n      <p class=\"umd-download-alert-p\">Please try again later, or send an e-mail about your issue to <a class=\"umd-download-alert-a\" href=\" mailto:berkonvo@gmail.com?subject=Universal%20Media%20Downloader\">berkonvo@gmail.com<\/a>.<\/p>\r\n      \r\n    <\/div>\r\n\r\n  <\/div>\r\n<\/div>"
	try
	{
		var template = document.createElement('template');
		template.innerHTML = pagecontent;

		var element = template.content.firstChild;
		document.body.appendChild(element);
		InsertURL(url);
		ShowAlertModal();
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