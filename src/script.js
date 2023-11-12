console.clear();

var map = '';

function customMarker(latlng, map, args) {
	// Initialize all properties.
	this.latlng = latlng;
	this.args = args;
// inside the customMarker function...

	// Explicitly call setMap on this overlay.
	this.setMap(map);
}

customMarker.prototype = new google.maps.OverlayView();

customMarker.prototype.draw = function () {
	var self = this,
	div = this.div;
	var popupContent = '<div class="marker-title">' + this.price + '</div>' +
	'<div class="marker-description">' + this.description + '</div>';

	var infoWindow = new google.maps.InfoWindow({
	content: popupContent
	});


	if (!div) {
		div = this.div = document.createElement('div');

		div.className = self.args.class_name;

		if (typeof (self.args.marker_id) !== 'undefined') {
			div.dataset.marker_id = self.args.marker_id;
		}
		if (typeof (self.args.price) !== 'undefined') {
			div.innerHTML = self.args.price + '<span class="currency"></span>';
		}

		google.maps.event.addDomListener(div, 'click', function (event) {
			google.maps.event.trigger(self, 'click');
		});

		var panes = self.getPanes();
		panes.overlayImage.appendChild(div);
	}

	var point = self.getProjection().fromLatLngToDivPixel(self.latlng);

	if (point) {
		div.style.left = point.x + 'px';
		div.style.top = point.y + 'px';
	}
};

function initialize() {
	var mapCanvas = document.getElementById('map');
	var mapCenter = new google.maps.LatLng(51.509865, -0.118092);
	var mapOptions = {
		center: mapCenter,
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		disableDefaultUI: true,
		zoomControl: true,

		// Custom Styling
		// https://snazzymaps.com/style/132/light-gray
		styles: [
			{
				"featureType": "water",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#d3d3d3"
					}
				]
			},
			{
				"featureType": "transit",
				"stylers": [
					{
						"color": "#808080"
					},
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#b3b3b3"
					}
				]
			},
			{
				"featureType": "road.highway",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#ffffff"
					},
					{
						"weight": 1.8
					}
				]
			},
			{
				"featureType": "road.local",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#d7d7d7"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#ebebeb"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry",
				"stylers": [
					{
						"color": "#a7a7a7"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#ffffff"
					}
				]
			},
			{
				"featureType": "landscape",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#efefef"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#696969"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"visibility": "on"
					},
					{
						"color": "#737373"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"elementType": "labels",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road.arterial",
				"elementType": "geometry.stroke",
				"stylers": [
					{
						"color": "#d6d6d6"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{

			},
			{
				"featureType": "poi",
				"elementType": "geometry.fill",
				"stylers": [
					{
						"color": "#dadada"
					}
				]
			}
		]
	};

	map = new google.maps.Map(mapCanvas, mapOptions);

	// Get list of hotels
	var hotels = document.getElementById('hotel-list').children;
	var infoWindow = new google.maps.InfoWindow({
		content: popupContent
	 });

	// Go thru list of hotels
	for (var a = 0, al = hotels.length; a < al; a++) {
		// Make marker for every hotel using the data properties from the hotel list
		var hotelMarker = new customMarker(new google.maps.LatLng(hotels[a].getAttribute('data-lat'), hotels[a].getAttribute('data-lng')), map, {
			class_name: 'hotel-marker',
			marker_id: hotels[a].id,
			price: hotels[a].getAttribute('data-title'),
			description: hotels[a].getAttribute('data-description') 
		});

		var popupContent = '<div class="marker-title">' + hotels[a].getAttribute('data-title') + '</div>' +
		'<div class="marker-description">' + hotels[a].getAttribute('data-description') + '</div>';

		(function(marker) {
			var infoWindow = new google.maps.InfoWindow({
			  content: popupContent
			});
		
			hotelMarker.addListener('click', function() {
			  infoWindow.open(map, marker);
			});
		  })(hotelMarker);
	}	
}

google.maps.event.addDomListener(window, 'load', initialize);


// Custom markers
// http://humaan.com/custom-html-markers-google-maps/
// https://developers.google.com/maps/documentation/javascript/customoverlays
// https://developers.google.com/maps/documentation/javascript/reference