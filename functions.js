// function clickedCar(carID) {    <--- ternutno nije potrebno
//   nizZaTrku.push(carID);
//   console.log(nizZaTrku);
// }

function alreadyAdded(carID, nzt) {
  var exists = false;
  for (var i=0; i < nzt.length; i++) {
    if (nzt[i].id === carID) {
      exists = true;
    }
  }
  return exists;
}


function crtanjeStaze(carid, dist) {
  var singleRace = $('<div>').attr({'class': 'singleRace', 'data-carID': carid});
  var singleTrack = $('<div>').attr({'class': 'singleTrack'});
  var racer = $('<div>').attr({'class': 'racer', 'id': carid});
  racer.html(carid);  // this will be replaced with image
  var distance = $('<div>').attr({'class': 'distance'}).append(
      $('<div>').attr({'class': 'label'}));
  // racunanje duzina deonica, oznacavanje
  for (var i = 1; i<10; i++) {
    var d = distance.clone();
    d.find('div').html(i*dist/10);
    d.css('left', i*'100');
    singleTrack.append(d);
  }
  singleRace.append(racer, singleTrack);
  $(".raceTracks").prepend(singleRace);
}

function brisanjeStaze(carid) {
  $('[data-carID='+carid+']').remove();
}

//TODO:
// function crtanjeSemafora() {}
// function brisanjeSemafora() {}

function crtanjeOgranicenja(limits, dist) {   //<-- doraditi sa labelima
  brisanjeOgranicenja();

  var pxpkm = 1000/dist; //counts length of each km in pixels
  var limit = $('<div>').attr({'class': 'speedLimit'});
  limit.css("height", $('.raceTracks').css('height'));
  for (var i = 0; i < limits.length; i++) {
    var l = limit.clone();
    l.css("left", limits[i].position*pxpkm);
    l.data('speed', limits[i].speed); // is there a better way to do this?
    var limitLabel = $('<div>').attr({'class': 'speedLimitLabel'}).html(l.data("speed"));
    l.append(limitLabel);
    $(".raceTracks").children(".singleRace").first().children(".singleTrack").append(l);
  }
}


function brisanjeOgranicenja() {
  $(".speedLimit").remove();
}


function crtanjeSemafora(trafficLights, dist) {
  brisanjeSemafora();

  var pxpkm = 1000/dist; //counts length of each km in pixels
  var light = $('<div>').attr({'class': 'trafficLight'});
  light.css("height", $('.raceTracks').css('height'));
  for (var i = 0; i < trafficLights.length; i++) {
    var l = light.clone();
    l.css("left", trafficLights[i].position*pxpkm);
    // Create appropriate elements
    var lightHead = $('<div>').addClass('lightHead').addClass('redLight');
    lightHead.data('duration', trafficLights[i].duration); // is there a better way to do this?
    l.append(lightHead);
    $(".raceTracks").children(".singleRace").first().children(".singleTrack").append(l);
  }
}

function brisanjeSemafora() {
  $(".trafficLight").remove();
}


function brisiAuto(niz, carID) {
  niz = $.grep(niz, function(e){
    return e.id != carID;
  });
  return niz;
}

function changeLights(light_head_element, animation_speed) {  //, animation_speed
    d = $(light_head_element).data("duration");
    setInterval(function(){
      $(light_head_element).toggleClass("redLight greenLight");
    }, d / animation_speed );  // / animation_speed
}

function gimmeMedal(rankingsArray, animation_speed) {
  rankingsArray.sort(function(a,b){
    return a.endTime - b.endTime;
  });
  setTimeout(function(){
    $("#"+rankingsArray[0].id).html("gold");
  }, rankingsArray[0].endTime / animation_speed);
  setTimeout(function(){
    $("#"+rankingsArray[1].id).html("silver");
  }, rankingsArray[1].endTime / animation_speed);
  setTimeout(function(){
    $("#"+rankingsArray[2].id).html("bronze");
  }, rankingsArray[2].endTime / animation_speed);
}
