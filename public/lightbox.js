/**
	Lightbox by Alberto Pareja-Lecaros

	Usage: add the following HTML to your body

	<div id="id" class="modal">
	  <span class="close cursor" onclick="lightbox.closeModal()">&times;</span>
	  <div class="modal-content">
	    <div class="caption-container">
	      <p class="caption"></p>
	    </div>
	    <div class="photo">
	    	<img src="" align="middle">
	    </div>
	    <a class="prev" onclick="lightbox.plusSlides(-1)">&#10094;</a>
	    <a class="next" onclick="lightbox.plusSlides(1)">&#10095;</a>
	  </div>
	</div>

	then in your JavaScript call:

	lightbox.initModal(id, photos)

	where id is the id of the div, and photos is an array of objects
	that contain an image URL and a caption
	e.g.
		{
			url: imageUrl,
			caption: caption
		}
*/
var lightbox = {

	photos: new Array(),
	slideIndex: 0,
	id: null,

	/**
		Initializes the modal
		ModalId - the id of the element containing this instance of the modal
		Images - An array of objects that contain an image URL (string) and a caption (string)
		e.g.
		{
			url: imageUrl,
			caption: caption
		}
	*/
	initModal: function(modalId, images) {
		photos = images;
		id = modalId;
		supportsOrientationChange = "onorientationchange" in window,
	    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
		window.addEventListener(orientationEvent, this.setModalDimensions, false);
	},

	/**
		Adds a new image to the photos array
		Image - An object that contains an image URL (string) and a caption (string)
		e.g.
		{
			url: imageUrl,
			caption: caption
		}
	*/
	addImage: function(image) {
		photos.push(image);
	},

	openModal: function() {
	  document.getElementById(id).style.display = "block";
	},

	closeModal: function() {
	  document.getElementById(id).style.display = "none";
	},

	plusSlides: function(n) {
	  this.setImage(slideIndex += n);
	},

	currentSlide: function(n) {
	  this.setImage(slideIndex = n);
	},

	setImage: function(n) {
	  var i;
	  var modalElement = document.getElementById(id);
	  var contentElement = modalElement.children[1];
	  var captionElement = contentElement.children[0];
	  var photoElement = contentElement.children[1];

	  if (n >= photos.length) {slideIndex = 0}
	  if (n < 0) {slideIndex = photos.length - 1}

	  photoElement.children[0].src = photos[slideIndex].url;

	  if (photos[slideIndex].caption == "") {
	  	captionElement.style.color = "black";
	  	captionElement.innerHTML = "Title";
	  }
	  else {
	  	captionElement.style.color = "white";
	  	captionElement.innerHTML = photos[slideIndex].caption;
	  }

	  this.setModalDimensions();
	},

	setModalDimensions: function() {
		var height = window.innerHeight*0.8;
		var width = height * (4/3); //4:3 aspect ratio
		if (width > window.innerWidth) { //if the height is much greater than the width then we need to be bound by the width instead
			width = window.innerWidth*0.8;
			height = width * (3/4);
		}
		var modalElement = document.getElementById(id);
	  	var contentElement = modalElement.children[1];
		contentElement.setAttribute("style", "height:" + height + "px; width: " + width + "px");
		contentElement.style.height = height + "px;";
		contentElement.style.width = width + "px;";
		contentElement.children[2].setAttribute("style", "margin-top:" + (-height/2) + "px;");
		contentElement.children[2].style.top = (-height/2) + "px;";
		contentElement.children[3].setAttribute("style", "margin-top:" + (-height/2) + "px;");
		contentElement.children[3].style.top = (-height/2) + "px;";
	}
}