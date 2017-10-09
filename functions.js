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

// argumenti: carid- id auta, dist- duzina staze, iscrtavanje:0-brisanje/1-crtanje, ogranicenja:0-nema/1-ima
function azuriranjeStaze(carid, dist, iscrtavanje, ogranicenja) {
  // CRTANJE
  if (iscrtavanje) {
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

    if (ogranicenja) {
      //iscrtaj ogranicenja
    }
  // BRISANJE
  } else {
    $('[data-carID='+carid+']').remove();
    if (ogranicenja) {
      //obrisi ogranicenja
    }
  }
}









function brisiAuto(niz, carID) {
  niz = $.grep(niz, function(e){
    return e.id != carID;
  });
  return niz;
}
