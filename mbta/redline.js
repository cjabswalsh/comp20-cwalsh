var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 42.352271, lng: -71.05524200000001},
		zoom: 11.5
    });

    setMarkers(map);
    setPolyLine(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        	var pos = {
            	lat: position.coords.latitude,
            	lng: position.coords.longitude
            };

            map.setCenter(pos);

            var infowindow = new google.maps.InfoWindow({
				content: 'Fetching stop data...',
			});
            var marker = new google.maps.Marker({
            	position: pos,
            	infowindow: infowindow,
            	map: map
            });
            marker.addListener('click', function() {
				getClosestStop(map, this);
				return this.infowindow.open(map, this);
			});
        });
    }
}

function getClosestStop(map, marker) {
	var closestStopIndex = 0;
	var stationLatLng = new google.maps.LatLng(stations[0][1]);
	var smallestDistance = google.maps.geometry.spherical.computeDistanceBetween(marker.position, stationLatLng);
	for (var i = 1; i < stations.length; i++) {
		var stationLatLng = new google.maps.LatLng(stations[i][1]);
		var distance = google.maps.geometry.spherical.computeDistanceBetween(marker.position, stationLatLng);
		if (distance < smallestDistance) {
			smallestDistance = distance;
			closestStopIndex = i;
		}
	}
	var returnContent = '<p>Closest Stop: ' + stations[closestStopIndex][0] + '</p>';
	returnContent += '<p>Distance: ' + Math.round(smallestDistance) + ' Meters</p>';
	marker.infowindow.setContent(returnContent);

	var coords = [marker.position, stations[closestStopIndex][1]];
	var redLine2 = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: '#00FF00',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });
}

function setMarkers(map) {
	var symbol = {
	    url: 'T_symbol4.png',
	    size: new google.maps.Size(32, 32),
	    origin: new google.maps.Point(0, 0),
	    anchor: new google.maps.Point(16, 16)
	};

	for (var i = 0; i < stations.length; i++) {
		var station = stations[i];
		var infowindow = new google.maps.InfoWindow({
			content: 'Fetching stop data...',
		});
		infowindow.content = 'Working';
		var marker = new google.maps.Marker({
		    position: station[1],
		    title: station[0],
		    id: station[2],
		    icon: symbol,
		    infowindow: infowindow,
		    map: map
		});
		marker.addListener('click', function() {
			getDataFor(this);
			return this.infowindow.open(map, this);
		});
	}
}

function getDataFor(marker) {
	request = new XMLHttpRequest();
	request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + marker.id, true);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			// Step 5: when we get all the JSON data back, parse it and use it
			theData = request.responseText;
			stopInfo = JSON.parse(theData);
			//data = "<p>" + stopInfo.data[1].attributes.departure_time + "</p>";
			returnHTML = "<ul>";
			for (i = 0; i < stopInfo.data.length; i++) {
				returnHTML += "<li>" + stopInfo.data[i].attributes.departure_time + "</li>";
			}
			returnHTML += "</ul>";
			marker.infowindow.setContent(returnHTML);
		}
		else if (request.readyState == 4 && request.status != 200) {
			marker.infowindow.setContent('Whoops, something went terribly wrong!');
		}
		else if (request.readyState == 3) {
			marker.infowindow.setContent('Come back soon!');
		}
	}
	request.send();
}

function setPolyLine(map) {
	var coords1 = stations.slice(0, 17).map(x => x[1]);
	var redLine1 = new google.maps.Polyline({
        path: coords1,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });

    var coords2 = stations.slice(17).map(x => x[1]);
    coords2.unshift(stations[12][1]);
    var redLine2 = new google.maps.Polyline({
        path: coords2,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });
}

var stations = [
	['Alewife', {lat: 42.395428, lng: -71.142483}, 'place-alfcl'],
	['Davis', {lat: 42.39674, lng: -71.121815}, 'place-davis'],
	['Porter Square', {lat: 42.3884, lng: -71.11914899999999}, 'place-portr'],
	['Harvard Square', {lat: 42.373362, lng: -71.118956}, 'place-harsq'],
	['Central Square', {lat: 42.365486, lng: -71.103802}, 'place-cntsq'],
	['Kendall/MIT', {lat: 42.36249079, lng: -71.08617653}, 'place-knncl'],
	['Charles/MGH', {lat: 42.361166, lng: -71.070628}, 'place-chmnl'],
	['Park Street', {lat: 42.35639457, lng: -71.0624242}, 'place-pktrm'],
	['Downtown Crossing', {lat: 42.355518, lng: -71.060225}, 'place-dwnxg'],
	['South Station', {lat: 42.352271, lng: -71.05524200000001}, 'place-sstat'],
	['Broadway', {lat: 42.342622, lng: -71.056967}, 'place-brdwy'],
	['Andrew', {lat: 42.330154, lng: -71.057655}, 'place-andrw'],
	['JFK/UMass', {lat: 42.320685, lng: -71.052391}, 'place-jfk'],
	['Savin Hill', {lat: 42.31129, lng: -71.053331}, 'place-shmnl'],
	['Fields Corner', {lat: 42.300093, lng: -71.061667}, 'place-fldcr'],
	['Shawmut', {lat: 42.29312583, lng: -71.06573796000001}, 'place-smmnl'],
	['Ashmont', {lat: 42.284652, lng: -71.06448899999999}, 'place-asmnl'],
	['North Quincy', {lat: 42.275275, lng: -71.029583}, 'place-nqncy'],
	['Wollaston', {lat: 42.2665139, lng: -71.0203369}, 'place-wlsta'],
	['Quincy Center', {lat: 42.251809, lng: -71.005409}, 'place-qnctr'],
	['Quincy Adams', {lat: 42.233391, lng: -71.007153}, 'place-qamnl'],
	['Braintree', {lat: 42.2078543, lng: -71.0011385}, 'place-brntn']
];