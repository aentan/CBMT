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

// Make new faces

var pos;
var neg = [];
var amb = [];
var faces = [];

function make_faces_array() {

  // Get 1 random positive
  pos = "pos_" + getRandomInt(1, 30);

  // Construct shuffled array of 12 negatives
  for (i=0;i<83;i++) {
    neg[i] = "neg_" + (i + 1);
  }
  neg.shuffle();
  neg = neg.slice(0, 12);

  // Construct shuffled array of 3 ambiguous
  for (i=0;i<13;i++) {
    amb[i] = "amb_" + (i + 1);
  }
  amb.shuffle();
  amb = amb.slice(0, 3);

  // Combine all into faces array
  faces = neg.concat(amb);
  faces.push(pos);
  faces.shuffle();
}

$(function() {
  
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