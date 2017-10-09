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
// function crtanjeOgranicenja() {}
// function brisanjeOgranicenja() {}
// function crtanjeSemafora() {}
// function brisanjeSemafora() {}

function crtanjeOgranicenja(limits, dist) {   //<-- doraditi sa labelima
  //should delete limits first
  var pxpkm = 1000/dist; //counts length of each km in pixels
  var limit = $('<div>').attr({'class': 'speedLimit'});
  limit.css("height", $('.raceTracks').css('height'));
  for (var i = 0; i < limits.length; i++) {
    var l = limit.clone();
    l.css("left", limits[i].position*pxpkm);
    $(".singleTrack").append(l);
  }
}






function brisiAuto(niz, carID) {
  niz = $.grep(niz, function(e){
    return e.id != carID;
  });
  return niz;
}
