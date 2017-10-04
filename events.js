$( ".searchField-input" ).keyup(function() {
  var input = $(this);
  getJSON(input.val());
});


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
         var li = $('<li></li>');
         var carImage = $('<img>').attr({'src': n.image, 'height': 130, 'alt': 'Photo of '+n.name});
         var carName = $('<h4></h4>').html(n.name);
         $(li).append(carImage, carName);
         $("ul").append(li);
       });
     }
   });
};

getJSON("");
