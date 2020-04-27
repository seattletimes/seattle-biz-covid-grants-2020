//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var dataZip = require("../assets/onlySeattle.json");

// console.log('hi mom');

//ICH code for popup template if needed----------
// var ich = require("icanhaz");
// var templateFile = require("./_popup.html");
// ich.addTemplate("popup", templateFile);

// var onEachFeature = function(feature, layer) {
//   layer.bindPopup(ich.popup(feature.properties))
// };
var markers = [];
var markergroup = L.featureGroup()

window.course.forEach(function(data) {
  // let dotColor = "";

  let address2 = (data.Address2.length > 1) ? ", " + data.Address2 : '';

  // var space = function() {
  //   return ( (dotColor.length > 1) ? ' ' : '');
  // }



  // dotColor = (data.Opentogeneralpublic === 1) ? "pub" : 'spec';
  // dotColor = (data.AllHourAccess === 1) ? (dotColor + space() + "open") : dotColor;


  // if ( data.Laundry === 1 ) {
  //   dotColor = dotColor + space() + "laundry-icon marker";
  // } else if ( data.Showers === 1 ) {
  //   dotColor = dotColor + space() + "showers-icon marker";
  // } else {
  //   dotColor = dotColor + space() + "restrooms-icon marker";
  // }

  // console.log(dotColor);

  var marker = L.marker([data.Lat, data.Long], {
    icon: L.divIcon({
      className: 'restrooms-icon'
    })
  });
  var html = `
    <b>${data.BusinessNames}</b><br>
    Address: <a href="https://www.google.com/maps/search/?api=1&query=${data.Lat},${data.Long}" target="_blank" rel="noopener noreferrer"/>${data.Address}${ address2 } ${data.City}, ${data.State} ${data.zip}</a><br>


  `;
  marker.bindPopup(html);
  markers.push(marker);
  marker.addTo(markergroup);
});

markergroup.addTo(map);

 map.scrollWheelZoom.disable();
 // map.fitBounds(markergroup.getBounds())

 // map.setZoom(16);

// var filterMarkers = function() {
//   // console.log( this.getAttribute("id") );
//   for (var i = 0; i < filterButtons.length; i++) {
//      filterButtons[i].classList.remove("selected");
//    }
//   this.classList.add("selected");
//   var all_markers = document.getElementsByClassName("marker");
//
//   if ( this.getAttribute("id") === "open" ) {
//     var open_markers = document.getElementsByClassName("open");
//     for (var i = 0; i < all_markers.length; i++) {
//        all_markers[i].style.visibility = "hidden";
//     }
//     for (var i = 0; i < open_markers.length; i++) {
//       open_markers[i].style.visibility = "visible";
//     }
//
//
//
//   } else if ( this.getAttribute("id") === "pub" ) {
//     var pub_markers = document.getElementsByClassName("pub");
//     for (var i = 0; i < all_markers.length; i++) {
//          all_markers[i].style.visibility = "hidden";
//      }
//      for (var i = 0; i < pub_markers.length; i++) {
//         pub_markers[i].style.visibility = "visible";
//      }
//
//
// } else if ( this.getAttribute("id") === "spec" ) {
//     var spec_markers = document.getElementsByClassName("spec");
//     for (var i = 0; i < all_markers.length; i++) {
//        all_markers[i].style.visibility = "hidden";
//     }
//    for (var i = 0; i < spec_markers.length; i++) {
//       spec_markers[i].style.visibility = "visible";
//    }
//
//   } else {
//     for (var i = 0; i < all_markers.length; i++) {
//        all_markers[i].style.visibility = "visible";
//    }
//   }
// }
//
//
// var filterButtons = document.getElementsByClassName("button");
//
//  for (var i = 0; i < filterButtons.length; i++) {
//     filterButtons[i].addEventListener('click', filterMarkers, false);
// }

var onEachFeature = function(feature, layer) {
  console.log(feature.properties["ZIPCODE"]);
}

var style = function(feature) {
  var s = {
    fillColor: "blue",
    weight: 1,
    opacity: .2,
    color: '#000',
    fillOpacity: 0.7
  };
  return s;
}

geojson = L.geoJson(dataZip, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map);
