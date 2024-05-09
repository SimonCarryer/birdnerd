
// The following example creates five accessible and
// focusable markers.

function changeBird(band) {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    var next = document.getElementById(band);
    next.className += " active";
}

function makeMarker(bird, map, infoWindow) {
    var url = "images/toutouwai.svg"
    if (bird.confirmed_missing != "") {
        url = "images/grave.svg"
    }
    const icon = {
        url: url,
        scaledSize: new google.maps.Size(40, 40)
    }   
    const marker = new google.maps.Marker({
        position: { lat: bird.territory.lat, lng: bird.territory.lng},
        map: map,
        icon: icon
      });

      marker.addListener("click", () => {
        changeBird(bird.band);
      });
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: { lat: -41.3023325, lng: 174.7541021 },
      mapTypeId: 'hybrid',
      minZoom: 15,
      maxZoom: 19,
      mapId: 'DEMO_MAP_ID',
      restriction: {
        latLngBounds: {
          north: -41.29252013624898,
          south: -41.30653554645328,
          east: 174.77082087254317,
          west: 174.73653057868395,
        },
      },
    
    });

    const infoWindow = new google.maps.InfoWindow();

    data.forEach(bird =>
        makeMarker(bird, map, infoWindow)
        )

    // Create an info window to share between markers.
  
  }
  window.initMap = initMap;