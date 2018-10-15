var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 42.352271, lng: -71.05524200000001},
		zoom: 11.5
    });

    setMarkers(map);
    setPolyLine(map);
}

var stations = [
	['Alewife', {lat: 42.395428, lng: -71.142483}],
	['Davis', {lat: 42.39674, lng: -71.121815}],
	['Porter Square', {lat: 42.3884, lng: -71.11914899999999}],
	['Harvard Square', {lat: 42.373362, lng: -71.118956}],
	['Central Square', {lat: 42.365486, lng: -71.103802}],
	['Kendall/MIT', {lat: 42.36249079, lng: -71.08617653}],
	['Charles/MGH', {lat: 42.361166, lng: -71.070628}],
	['Park Street', {lat: 42.35639457, lng: -71.0624242}],
	['Downtown Crossing', {lat: 42.355518, lng: -71.060225}],
	['South Station', {lat: 42.352271, lng: -71.05524200000001}],
	['Broadway', {lat: 42.342622, lng: -71.056967}],
	['Andrew', {lat: 42.330154, lng: -71.057655}],
	['JFK/UMass', {lat: 42.320685, lng: -71.052391}],
	['Savin Hill', {lat: 42.31129, lng: -71.053331}],
	['Fields Corner', {lat: 42.300093, lng: -71.061667}],
	['Shawmut', {lat: 42.29312583, lng: -71.06573796000001}],
	['Ashmont', {lat: 42.284652, lng: -71.06448899999999}],
	['North Quincy', {lat: 42.275275, lng: -71.029583}],
	['Wollaston', {lat: 42.2665139, lng: -71.0203369}],
	['Quincy Center', {lat: 42.251809, lng: -71.005409}],
	['Quincy Adams', {lat: 42.233391, lng: -71.007153}],
	['Braintree', {lat: 42.2078543, lng: -71.0011385}]
];

function setMarkers(map) {
	var symbol = {
	    url: 'T_symbol4.png',
	    size: new google.maps.Size(32, 32),
	    origin: new google.maps.Point(0, 0),
	    anchor: new google.maps.Point(16, 16)
	};

	for (var i = 0; i < stations.length; i++) {
		var station = stations[i];
		var marker = new google.maps.Marker({
		    position: station[1],
		    title: station[0],
		    icon: symbol,
		    shape: circle,
		    map: map
		});
	}
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