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

function azuriranjeStaze(carid, iscrtavanje, ogranicenja) {
  if (iscrtavanje) {
    //iscraj traku za auto
    //iscrtaj distance + dodaj labele
    var singleRace = $('<div>').attr({'class': 'singleRace', 'data-carID': carid});
    var singleTrack = $('<div>').attr({'class': 'singleTrack'});
    var racer = $('<div>').attr({'class': 'racer', 'id': carid});
    racer.html(carid);  // this will be replaced with image
    var distance = $('<div>').attr({'class': 'distance'}).append(
                      $('<div>').attr({'class': 'label'}));
    for (var i = 1; i<10; i++) {
      singleTrack.append(distance);
      // dodaj i*100 za left i za label
    }
    singleRace.append(racer, singleTrack);
    $(".raceTracks").prepend(singleRace);

    if (ogranicenja) {
      //iscrtaj ogranicenja
    }
  } else {
    var carToRemove = '[data-carID='+carid+']';
    $('.raceTracks').remove($(carToRemove));
    if (ogranicenja) {
      //obrisi ogranicenja
    }
  }
}
