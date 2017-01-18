var apiKey = "218b0cb02df6c26cbdf97d13b83383d9";
var photoSetId = "72157626579923453";

window.onload = start;

function start() {
	httpGetAsync("https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + apiKey + "&photoset_id=" + photoSetId, populatePhotos);
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.responseType = 'text';
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

/**
	Gets each photo id from the Flickr API response and calls
	getPhotoSizes
*/
function populatePhotos(response) {
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(response,"text/xml");
	var ownerName = xmlDoc.getElementsByTagName("photoset")[0].getAttribute("ownername").replace(' ', '');

	var photoElements = xmlDoc.getElementsByTagName("photo");

	lightbox.initModal("lightbox", new Array());

	for (var x = 0; x < photoElements.length; ++x) {
		getPhotoSizes(photoElements[x].getAttribute("id"), photoElements[x].getAttribute("title"), photos);
	}
}

/**
	Gets all photo sizes for a photo ID from the Flickr API then
	populates all photo details into an array to be passed into
	the lightbox modal. Each thumbnail opens the modal with its
	own image.
*/
function getPhotoSizes(id, caption, photos) {

	function populatePhotoDetails(response) {
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(response,"text/xml");
		var sizes = xmlDoc.getElementsByTagName("size");
		for (var x = 0; x < sizes.length; ++x) {
			if (sizes[x].getAttribute("label") == "Thumbnail") {
				var photoUrl = sizes[x].getAttribute("source");
				var imageElement = document.createElement("img");
				imageElement.src = photoUrl;
				var index = photos.length;
				imageElement.addEventListener("click", function() { lightbox.openModal();lightbox.currentSlide(index); }, false);
				document.getElementById("photos").appendChild(imageElement);
			}
			if (sizes[x].getAttribute("label") == "Large") {
				photo = {
					url: sizes[x].getAttribute("source"),
					caption: caption
				}
				lightbox.addImage(photo);
			}
		}
	}

	httpGetAsync("https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + apiKey + "&photo_id=" + id, populatePhotoDetails);
}