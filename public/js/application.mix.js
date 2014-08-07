// Imports
// @import "bootstrap.js";


// Apllication

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  if ( i == 0 ) return this;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = this[i];
     this[i] = this[j];
     this[j] = temp;
  }
  return this;
}

function preload(images) {
  $(images).each(function(){
    $('<img/>')[0].src = "/public/img/faces/" + this + ".jpg";
  });
}

// Make new faces

var pos = [];
var neg = [];
var amb = [];
var faces = [];

// Construct array of positives then get 1 random positive
for (i=0;i<30;i++) {
  pos[i] = "pos_" + (i + 1);
}
// Construct array of 12 negatives
for (i=0;i<83;i++) {
  neg[i] = "neg_" + (i + 1);
}
// Construct array of 3 ambiguous
for (i=0;i<13;i++) {
  amb[i] = "amb_" + (i + 1);
}

preload(pos.concat(amb, pos));

function make_faces_array() {

  // SHuffle them
  pos.shuffle();
  neg.shuffle();
  amb.shuffle();

  pos = pos.slice(0, 1);
  neg = neg.slice(0, 12);
  amb = amb.slice(0, 3);

  // Combine all into faces array
  faces = neg.concat(amb, pos);
  faces.shuffle();
}

$(window).load(function() {
  
  function make_faces() {
    make_faces_array();
    var face_grid = "";
    for (i=0;i<16;i++) {
      face_grid += '<div class="face"><img src="/public/img/faces/' + faces[i] + '.jpg"></div>'
    }
    $('#face-grid').empty().append(face_grid);
  }
  
  make_faces();
  
  $(document).on('click', '.face', make_faces);

});