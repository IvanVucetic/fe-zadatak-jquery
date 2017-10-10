// SEARCH FUNCTIONALITY FOR CARS
$(".searchField-input").keyup(function () {
    var input = $(this);
    getJSON(input.val().trim());
});

// DRAW RACERS
$(document).on("click", '.car', function (event) {
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
                crtanjeSemafora(jsonData.traffic_lights, jsonData.distance);
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
                tempCar["speed"] = jsonData.cars[tempCar["id"] - 1]["speed"];
                crtanjeStaze(tempCar["id"], jsonData.distance);
                crtanjeOgranicenja(jsonData.speed_limits, jsonData.distance);
                $(".raceTracks :not(:first-child) .singleTrack .distance .label").remove();
                crtanjeSemafora(jsonData.traffic_lights, jsonData.distance);
            }
        });
        nizZaTrku.push(tempCar);
    }


});

// GET CARS AND DRAW THEM ON PAGE
var getJSON = function (inputStr) {
    $.ajax({
        url: "data.json",
        dataType: "json",
        method: "GET",
        success: function (jsonData) {
            window.data = jsonData;
            var niz = jsonData;

            var cars = niz.cars;

            var filtered = [];
            if (inputStr == "") {
                filtered = cars;
            } else {
                filtered = $.grep(cars, function (car, i) {
                    //  caps sensitive
                    return car.name.search(inputStr) > -1;
                });
            }

            $("ul").empty();
            $.map(filtered, function (n, i) {
                var carImage = $('<img>').attr({'src': n.image, 'height': 130, 'alt': 'Photo of ' + n.description});
                var li = $('<li class="car" data-id="' + n.id + '"></li>');
                var carName = $('<h4></h4>').html(n.name);
                $(li).append(carImage, carName);
                $("ul").append(li);
            });
        }
    });
};

function getCarById(id) {
    for (var i = 0; i < window.nizZaTrku.length; i++) {
        if (window.nizZaTrku[i].id == id)
            return window.nizZaTrku[i];
    }
    return null;
}

// testing animation
$(document).on("click", '.racer', function () {
    var car = getCarById($(this).attr('id'));
    car.distance = 0;
    var conditions = [];
    window.data.traffic_lights.forEach(function (light) {
        conditions.push($.extend({}, light, {type: 'trafficLight'}))
    });
    window.data.speed_limits.forEach(function (limit) {
        conditions.push($.extend({}, limit, {type: 'speedLimit'}))
    });


    conditions.sort((a, b) => {
        return a.position - b.position
    });
    conditions.push({type: 'speedLimit', speed: 0, position: window.data.distance});
    console.log(conditions);


    var pathParts = [];
    var currentSpeed = car.speed;

    for (let i = 0; i < conditions.length; i++) {
        let pathPart = {};

        pathPart.speed = currentSpeed;
        pathPart.length = conditions[i].position - (conditions[i - 1] ? conditions[i - 1].position : 0);
        pathPart.duration = (pathPart.length / currentSpeed) * 3600000;
        pathPart.endTime = pathParts[pathParts.length - 1] ? pathParts[pathParts.length - 1].endTime + pathPart.duration : pathPart.duration;

        pathParts.push(pathPart);
        if (conditions[i].type === 'speedLimit') {
            currentSpeed = conditions[i].speed; // dodati i ogranicenje automobila
        }
        else {

            let lightChangesCount = Math.floor((pathParts[pathParts.length - 1] ? pathParts[pathParts.length - 1].endTime : 0) / conditions[i].duration);
            let moduo = lightChangesCount % 2;  // da li je red ili green
            let redLight = !moduo;

            let moduo2 = (pathParts[pathParts.length - 1] ? pathParts[pathParts.length - 1].endTime : 0) % conditions[i].duration;

            if (redLight) {
                console.log('cekaj')
                let pathPart = {};
                pathPart.speed = 0;
                pathPart.length = 0;
                pathPart.duration = conditions[i].duration - moduo2;
                pathPart.endTime = pathParts[pathParts.length - 1].endTime + pathPart.duration;

                pathParts.push(pathPart);
            }
        }
    }

    console.log(pathParts);
    let distance = 0;
    for (let i = 0; i < pathParts.length; i++) {
        console.log(pathParts[i].speed)
        distance += pathParts[i].length * 1000 / window.data.distance;
        $(this).animate({
            // left: pathParts[i].length * 1000 / window.data.distance
            left: distance
        }, pathParts[i].duration / 50, "linear", function () {
            // console.log(distance);

            // $(this).css('left', distance);
        })
    }    ;

    // $(this).animate({
    //     left: 1000
    // }, 5000, "linear", function (){
    //
    // })

});

// function run(runtime){
//   // runtime.time +=10;
//   // console.log(runtime.car.distance)
//   var predjenaDistancaKm = runtime.car.speed * 100 / (1 * 60 * 60 * 1000));
//   runtime.car.distance += predjenaDistancaKm ;
//   $('#'+runtime.car.id).css('left',(1000/window.data.distance)* runtime.car.distance);
//   // runtime
//
// }

var nizZaTrku = [];

getJSON("");
