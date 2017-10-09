$( ".searchField-input" ).keyup(function() {
  var input = $(this);
  getJSON(input.val().trim());
});


$(document).on("click", '.car', function(event) {
    // unutar ovoga poziv da smestimo ogranicenja u globalni niz
    // ovde iscrtavam staze (za svaki auto)
    // svaki put kad se odabere auto, dodaje se traka za njega, brisu se ogranicenja i iznova iscrtavaju

    var carid = $(this).data("id");
    if (alreadyAdded(carid, nizZaTrku)) {
      //  proveri da li je to jedini auto u nizu;
      //  ako jeste, obrisi ogranicenja;
      // svakako obisi iz nizZaTrku i ukloni stazu
      if (nizZaTrku.length == 1) {
        azuriranjeStaze(carid, 0, 0, 1);
        console.log(nizZaTrku);
        nizZaTrku.pop();
      } else {
        azuriranjeStaze(carid, 0, 0, 0);
        nizZaTrku = brisiAuto(nizZaTrku, carid);
        console.log(nizZaTrku);
      }

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
          // ovde jos treba da se iscrta traka za ovaj auto + ogranicenja
          if (nizZaTrku.length==0) {
            azuriranjeStaze(tempCar["id"], jsonData.distance, 1, 1);  //treba ogranicenja
            // ^^ treba i labele azurirati
          } else {
            azuriranjeStaze(tempCar["id"], jsonData.distance, 1, 0); //ne treba ogranicenja
            // ^^ treba i labele azurirati
          }
          //testing drawing of elements
          console.log(nizZaTrku);
        }
      });
      nizZaTrku.push(tempCar);
      // console.log(nizZaTrku);
    }


});

var nizZaTrku = [];


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


getJSON("");
