// SEARCH FUNCTIONALITY FOR CARS
$( ".searchField-input" ).keyup(function() {
  var input = $(this);
  getJSON(input.val().trim());
});

// DRAW RACERS
$(document).on("click", '.car', function(event) {
    // unutar ovoga poziv da smestimo ogranicenja u globalni niz
    // svaki put kad se odabere auto, dodaje se traka za njega, brisu se ogranicenja i iznova iscrtavaju

    var carid = $(this).data("id");
    //BRISANJE
    if (alreadyAdded(carid, nizZaTrku)) {
      brisanjeStaze(carid);
      nizZaTrku = brisiAuto(nizZaTrku, carid);
      // must make new call to update speed limits
      $.ajax({
        url: "data.json",
        dataType: "json",
        method: "GET",
        success: function (jsonData) {
          crtanjeOgranicenja(jsonData.speed_limits, jsonData.distance);
        }
      });
    //CRTANJE
    } else {
      var tempCar = {};
      tempCar["id"] = carid;
      // promeniti izgled elementa (prevrnuti ga)
      $.ajax({
        url: "data.json",
        dataType: "json",
        method: "GET",
        success: function (jsonData) {
          tempCar["speed"] = jsonData.cars[tempCar["id"]-1]["speed"];
          crtanjeStaze(tempCar["id"], jsonData.distance);
          crtanjeOgranicenja(jsonData.speed_limits, jsonData.distance);
          $(".raceTracks :not(:first-child) .singleTrack .distance .label").remove();
        }
      });
      nizZaTrku.push(tempCar);
    }


});

// GET CARS AND DRAW THEM ON PAGE
var getJSON = function (inputStr){
  $.ajax({
     url: "data.json",
     dataType: "json",
     method: "GET",
     success: function(jsonData) {
       var niz = jsonData;

       var cars = niz.cars;

       var filtered = [];
       if (inputStr == "") {
         filtered = cars;
       } else {
         filtered = $.grep(cars, function(car, i){
          //  caps sensitive
           return car.name.search(inputStr) > -1;
         });
       }

       $("ul").empty();
       $.map(filtered, function(n, i){
         var carImage = $('<img>').attr({'src': n.image, 'height': 130, 'alt': 'Photo of '+n.description});
         var li = $('<li class="car" data-id="'+n.id+'"></li>');
         var carName = $('<h4></h4>').html(n.name);
         $(li).append(carImage, carName);
         $("ul").append(li);
       });
     }
   });
};

//testing animation
// $(document).on("click", '.racer', function() {
//   $(this).animate({
//       left: 1000
//   }, 5000, "linear", function (){
//
//   })
// });

var nizZaTrku = [];

getJSON("");
