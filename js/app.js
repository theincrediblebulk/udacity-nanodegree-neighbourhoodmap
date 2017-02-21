//JavaScript Document

//http://transportapi.com/v3/uk/places.json?query=euston&type=train_station&app_id=74eb27d0&app_key=8f060f0fc4779cc6838f3afd3ca7edd6

var map;
var pins = [];

/* ======= Model ======= */

var locations = {
	init: {
			
	},
	restaurants: [{
		name: "Bodean's BBQ",
		address: "10 Poland St, Soho, London W1F 8PZ",
		type: "Restaurant",
		url: "bodeansbbq.com",
		position : {lat: 51.5144742, lng: -0.1369575}
		},{
		name: "Princi",
		address: "135 Wardour St, Soho, London W1F 0UT",
		type: "Restaurant",
		url: "princi.com",
		position : {lat: 51.5138724, lng: -0.1344873}
		}, {
		name: "Suvlaki",
		address: "21 Bateman St, Soho, London W1D 3AL",
		type: "Restaurant",
		url: "suvlaki.co.uk",
		position: {lat: 51.5142474, lng: -0.1314318}
		}, {
		name: "The Delhi Brasserie",
		address: "44 Frith St, Soho, London W1D 4SB",
		type: "Restaurant",
		url: "delhibrasserie.com",
		position : {lat: 51.5133276, lng: -0.1315547}
		}, {
		name: "Balans Soho Society",
		address: "60-62 Old Compton St, Soho, London W1D 4UG",
		type: "Restaurant",
		url: "balans.co.uk",
		position : {lat: 51.5127702, lng: -0.1326081}
		}, {
		name: "Little Italy",
		address: "21 Frith St, Soho, London W1D 4RN",
		type: "Restaurant",
		url: "littleitalysoho.co.uk",
		position: {lat: 51.5135393, lng: -0.1312559}
		}, {
		name: "Bocca di Lupo",
		address: "12 Archer St, Soho, London W1D 7BB",
		type: "Restaurant",
		url: "boccadilupo.com",
		position: {lat: 51.5120049, lng: -0.1342144}
		}], 
	bars: [{
		name: "The Friendly Society",
		address: "79 Wardour St, Soho, London W1D 6QB",
		type: "Bar",
		url: "facebook.com/pages/The-Friendly-Society/136813716365787",
		position: {lat: 51.5123378, lng: -0.1337773}
		}, {
		name: "The Yard Bar",
		address: "57 Rupert St, Greater London W1D 7PL",
		type: "Bar",
		url: "yardbar.co.uk",
		position: {lat: 51.5121582, lng: -0.135941}
		}, {
		name: "Village",
		address: "81 Wardour St, Soho, London W1D 6QD",
		type: "Bar",
		url: "village-soho.co.uk",
		position: {lat: 51.5122166, lng: -0.1345625}
		}, {
		name: "The Duke of Wellington",
		address: "77 Wardour St, Soho, London W1D 6QA",
		type: "Bar",
		url: "the1440.co.uk",
		position: {lat: 51.5121771, lng: -0.1337894}
		}, {
		name: "Comptons of Soho",
		address: "51-53 Old Compton St, Soho, London W1D 6HN",
		type: "Bar",
		url: "faucetinn.com/comptons",
		position: {lat: 51.5125932, lng: -0.1327432}
		}, {
		name: "Admiral Duncan",
		address: "54 Old Compton St, Soho, London W1D 4UB",
		type: "Bar",
		url: "admiral-duncan.co.uk",
		position: {lat: 51.5125932, lng: -0.1327432}
		}, {
		name: "Circa",
		address: "62 Frith St, Soho, London W1D 3JN",
		type: "Bar",
		url: "circasoho.com",
		position: {lat: 51.5143559, lng: -0.1324153}
		}, {
		name: "G-A-Y Bar",
		address: "30 Old Compton St, Soho, London W1D 4UR",
		type: "Bar",
		url: "g-a-y.co.uk",
		position: {lat: 51.5133706, lng: -0.1312351}
		}, {
		name: "Freedom Bar Soho",
		address: "National House, 60-66 Wardour St, Soho, London W1F 0TA",
		type: "Bar",
		url: "freedombarsoho.com",
		position: {lat: 51.5127072, lng: -0.1337418}
		}, {
		name: "Molly Moggs",
		address: "2, Old Compton St, Soho, London W1D 4TA",
		type: "Bar",
		url: "tripadvisor.co.uk/Restaurant_Review-g186338-d1044453-Reviews-Molly_Moggs-London_England.html",
		position: {lat: 51.513876, lng: -0.1298066}
		}, {
		name: "KU Bar",
		address: "30, Lisle St, London WC2H 7BA",
		type: "Bar",
		url: "ku-bar.co.uk",
		position: {lat: 51.5117647, lng: -0.1298059}
		}]
};

/* ======= ViewModel ======= */

	
var ViewModel = {
	init: function() {
		ViewModel.initMap();
		ViewModel.createPins();
		ViewModel.showPins();
	},
	

	initMap: function () {
	// Constructor creates a new map - only center and zoom are required.
		var soho = {lat: 51.5136143, lng: -0.1365486};
		map = new google.maps.Map(document.getElementById('map'), {
			zoom:17,
			center: soho,
			styles: [
			  {
				"featureType": "poi.business",
				"stylers": [
				  {
					"visibility": "off"
				  }
				]
			  },
			  {
				"featureType": "poi.park",
				"elementType": "labels.text",
				"stylers": [
				  {
					"visibility": "off"
				  }
				]
			  }
			]
        });
	},
	
	buildMenuItem: function(item, list) {
		var menuItem = '<div id="' + list + 'List">' + item + '</div>';
		var listName = "#" + list + "List";
		$(listName).append(menuItem);
	},
	
	createPins: function(filter) {
		var violetIcon = this.makePinIcon('FF318F');
		var highlightedVioletIcon = this.makePinIcon('B23870');
		var blueIcon = this.makePinIcon('3145FF');
		var highlightedBlueIcon = this.makePinIcon('0011B2');
		var largeInfowindow = new google.maps.InfoWindow();
		
		//Restaurants
		for (var i=0; i < locations.restaurants.length; i++) {
			(function () {
				var pin = new google.maps.Marker({
					title: locations.restaurants[i].name,
					address: locations.restaurants[i].address,
					type: locations.restaurants[i].type,
					url: locations.restaurants[i].url,
					position: locations.restaurants[i].position,
					animation: google.maps.Animation.DROP,
					icon: blueIcon,
					map: map
				});
				
				ViewModel.buildMenuItem(locations.restaurants[i].name, "restaurant");
				
				pin.addListener('click', function() {
					ViewModel.populateInfoWindow(this, largeInfowindow);
				});
				pin.addListener('mouseover', function() {
					this.setIcon(highlightedBlueIcon);
				});
				pin.addListener('mouseout', function() {
					this.setIcon(blueIcon);
				});
				pins.push(pin);
			
			}());
		}
		//Bars
		for (i=0; i < locations.bars.length; i++) {
			(function () {
				var pin = new google.maps.Marker({
					title: locations.bars[i].name,
					address: locations.bars[i].address,
					type: locations.bars[i].type,
					url: locations.bars[i].url,
					position: locations.bars[i].position,
					animation: google.maps.Animation.DROP,
					icon: violetIcon,
					map: map
				});
				ViewModel.buildMenuItem(locations.bars[i].name, "bar");
				
				pin.addListener('click', function() {
					ViewModel.populateInfoWindow(this, largeInfowindow);
				});
				pin.addListener('mouseover', function() {
					this.setIcon(highlightedVioletIcon);
				});
				pin.addListener('mouseout', function() {
					this.setIcon(violetIcon);
				});
				pins.push(pin);
			
			}());
		}
		console.log(pins);
	},

    populateInfoWindow: function (marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + '<h3><a href="' + marker.url + '" target="_blank">' + marker.title + '</a></h3>' + '<p><em>' + marker.address + '</em></p>' + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      },
  
  	// This function will loop through the pins array and display them all.
  	showPins: function() {
		var bounds = new google.maps.LatLngBounds();
		// Extend the boundaries of the map for each pin and display the pin
		for (var i = 0; i < pins.length; i++) {
			pins[i].setMap(map);
	  		bounds.extend(pins[i].position);
		}
		map.fitBounds(bounds);
  	},

  	// This function will loop through the listings and hide them all.
  	hidePins: function () {
		for (var i = 0; i < pins.length; i++) {
	  		pins[i].setMap(null);
		}
  	},
  	// This function takes in a COLOR, and then creates a new pin icon of that color. The icon will be 21 px wide by 34 high, have an origin of 0, 0 and be anchored at 10, 34).

  	makePinIcon: function (pinColor) {
		var pinImage = new google.maps.MarkerImage(
			'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ pinColor + '|40|_|%E2%80%A2',
		  	new google.maps.Size(21, 34),
		  	new google.maps.Point(0, 0),
		  	new google.maps.Point(10, 34),
		  	new google.maps.Size(21,34)
		);
			return pinImage;
  	}	
};