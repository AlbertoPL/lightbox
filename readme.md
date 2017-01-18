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