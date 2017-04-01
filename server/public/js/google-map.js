var map;
var marker;

function initMap() {
    navigator.geolocation.getCurrentPosition(getposition);
}
function getposition(position) {

    var location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }
    $.ajax({
        method: "POST",
        url: "/sendGPSInfo",
        data: location,
    })
        .done(function (data) {
            console.log(data);
            $("#info-city").html(data.weatherdata.weather.hourly[0].grid.city + "시 " + data.weatherdata.weather.hourly[0].grid.county);
            $("#info-temp").html("온도 : " + data.weatherdata.weather.hourly[0].temperature.tc + "°C");
            $("#info-humi").html("습도 : " + data.weatherdata.weather.hourly[0].humidity + "%");
            $("#info-angry").html("불쾌지수 : " + data.angry);
            $("#info-dust").html("미세먼지 : " + data.dust + " ㎍/㎥ ");
        });

    var contentString =
        "<h2>" + location.lat + "</h2>" +
        "<h2>" + location.lng + "</h2>";


    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: { lat: location.lat, lng: location.lng },
        zoom: 18
    });

    marker = new google.maps.Marker({
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

$(function () {
    var lastLocation;
    $("#search-submit").on('click', function () {
        $.ajax({
            method: "POST",
            url: "/searchCity",
            data: $("#search-input")
        }).done(function (data) {
            $(".result-column h4").html(data.result.items[0].address);
            lastLocation = {
                lng: data.result.items[0].point.x,
                lat: data.result.items[0].point.y
            };
            $.ajax({
                method: "POST",
                url: "/sendGPSInfo",
                data: {
                    lng: data.result.items[0].point.x,
                    lat: data.result.items[0].point.y
                }
            }).done(function (data) {
                $("#search-city").html(data.weatherdata.weather.hourly[0].grid.city + "시 " + data.weatherdata.weather.hourly[0].grid.county);
                $("#search-temp").html("온도 : " + data.weatherdata.weather.hourly[0].temperature.tc + "°C");
                $("#search-humi").html("습도 : " + data.weatherdata.weather.hourly[0].humidity + "%");
                $("#search-angry").html("불쾌지수 : " + data.angry);
                $("#search-dust").html("미세먼지 : " + data.dust + " ㎍/㎥ ");

            });
            console.log(data);
        });
    });
    $(".result-column").on('click', function () {
        $.ajax({
            method: "POST",
            url: "/sendGPSInfo",
            data: lastLocation,
        })
            .done(function (data) {
                console.log(data);
                $("#info-city").html(data.weatherdata.weather.hourly[0].grid.city + "시 " + data.weatherdata.weather.hourly[0].grid.county);
                $("#info-temp").html("온도 : " + data.weatherdata.weather.hourly[0].temperature.tc + "°C");
                $("#info-humi").html("습도 : " + data.weatherdata.weather.hourly[0].humidity + "%");
                $("#info-angry").html("불쾌지수 : " + data.angry);
                $("#info-dust").html("미세먼지 : " + data.dust + " ㎍/㎥ ");
            });

        marker = new google.maps.Marker({
            position: lastLocation,
            map: map,
            title: 'Hello World!'
        });
        map.setCenter(lastLocation);
        map.setZoom(15);

        var infowindow = new google.maps.InfoWindow({
            content: '<h1 style=padding:20px;font-family:"sangsang";font-size:32px;width:100%;text-align:center>현재위치</h1>'
        });
        infowindow.open(map, marker);

        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    });
});