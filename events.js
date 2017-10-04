$( ".searchField-input" ).keyup(function() {
  var input = $(this);
  getJSON(input.val());
});


// function renderCar(car) {
//   var li = document.createElement('li');
//   li.innerHTML = '<h4>' + car.name + '</h4>';
//   var ul = document.querySelector('ul');
//   ul.appendChild(li);
// }


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
           return car.name.search(inputStr) > -1;
         });
       }

       console.log(filtered);

       $("ul").empty();
       $.map(filtered, function(n, i){
         $( "ul" ).append( "<li>" + n.name + "</li>" );
       });
     }
   });
};

getJSON("");
