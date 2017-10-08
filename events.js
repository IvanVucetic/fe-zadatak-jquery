$( ".searchField-input" ).keyup(function() {
  var input = $(this);
  getJSON(input.val().trim());
});


$(document).on("click", '.car', function(event) {
    // nizZaTrku.push($(this).data("id")); // <-- moze vise puta isti auto, srediti
    // unutar ovoga poziv da smestimo ogranicenja u globalni niz
    // ovde iscrtavam staze (za svaki auto)
    // svaki put kad se odabere auto, dodaje se traka za njega, brisu se ogranicenja i iznova iscrtavaju

    // if (auto vec u nizZaTrku) {
    //  proveri da li je to jedini auto u nizu;
    //  ako jeste, obrisi ogranicenja;
    //  obrisi traku tog auta (svakako);
    //  izbrisi objekat iz nizZaTrku;
    //  vrati my normalan izgled;
    // } else (nema auta, crtamo ga) {
    var carid = $(this).data("id");
    if (alreadyAdded(carid, nizZaTrku)) {
      alert("already added");
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
        }
      });
      nizZaTrku.push(tempCar);
      console.log(nizZaTrku);
    }


});

var nizZaTrku = []; //KORISTITI DICT UMESTO ARRAYA? id:speed ili id:[speed, stanjeprikaza]


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
         var buttonErase = $('<button class="deleteCar" value="Obrisi">Obrisi</button>');
         $(li).append(carImage, carName, buttonErase);
         $("ul").append(li);
       });
     }
   });
};

getJSON("");
