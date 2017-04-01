var map;
function initMap() {
    navigator.geolocation.getCurrentPosition(getposition);
}
function getposition(position) {

    var location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }

    var contentString =
        "<h2>" + location.lat + "</h2>" +
        "<h2>" + location.lng + "</h2>";


    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: { lat: location.lat, lng: location.lng },
        zoom: 18
    });

    var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Hello World!'
    });

    var infowindow = new google.maps.InfoWindow({
        content: '<h1 style=padding:20px;font-family:"sangsang";font-size:32px;width:100%;text-align:center>현재위치</h1>'
    });
    infowindow.open(map, marker);

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}