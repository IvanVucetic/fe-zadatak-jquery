$( ".searchField-input" ).keyup(function() {
  var input = $(this);
  getJSON(input.val().trim());
});


$(document).on("click", '.car', function(event) {
    nizZaTrku.push($(this).data("id"));
    // unutar ovoga poziv da smestimo ogranicenja u globalni niz
    // ovde iscrtavam staze (za svaki auto)
    // svaki put kad se odabere auto, dodaje se traka za njega, brisu se ogranicenja i iznova iscrtavaju
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

       console.log(filtered);

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

getJSON("");
