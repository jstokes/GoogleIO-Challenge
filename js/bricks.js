//Bricks 
/*
Jeffrey Stokes Google IO Challenge-Chrome
*/

var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var fill_style =  [null,
				  "rgb(64,102,219)", 
				  "rgb(228,34,50)", 
				  "rgb(253,173,10)", 
				  "rgb(64,102,219)", 
				  "rgb(1,163,21)",
				  "rgb(228,34,50)"];


function init_bricks() {
  NROWS = 18;
  NCOLS = 28;
  BRICKWIDTH = 20;
  BRICKHEIGHT = 10;
  PADDING = 0;

  /*
  The google logo, as represented by a non-zero number being a block
  that is occupied, and a zero number being a block that contains 
  part of a letter
  */ 
  var row = new Array(NROWS);
	
	row[0]  = "0111000000000000000005500000";
	row[1]  = "1000100000000000000000500000";
	row[2]  = "1000100000000000000000500000";
	row[3]  = "1000000000000000000000500000";
	row[4]  = "1000000000000000000000500000";
	row[5]  = "1000000220003300044440500660";
	row[6]  = "1000002002030030400400506006";
	row[7]  = "1000002002030030400400506006";
	row[8]  = "1001102002030030400400506066";
	row[9]  = "1000102002030030400400506600";
	row[10] = "1000102002030030044000506000";
	row[11] = "1000102002030030004000506000";
	row[12] = "1000102002030030040400506006";
	row[13] = "0111000220003300400400500660";
	row[14] = "0000000000000000400400000000";
	row[15] = "0000000000000000400400000000";
	row[16] = "0000000000000000400400000000";
	row[17] = "0000000000000000044000000000";
  
  google = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
	  google[i] = new Array(NCOLS);
      for (j=0; j < NCOLS; j++) {
		  google[i][j] = parseInt(row[i].charAt(j));
	  }
  }
}

function drawBricks() {
  for (i=0; i < NROWS; i++) {
    for (j=0; j < NCOLS; j++) {
      if (google[i][j] >= 1) {
        rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
             (i * (BRICKHEIGHT + PADDING)) + PADDING,
             BRICKWIDTH, BRICKHEIGHT, fill_style[google[i][j]]);
      }
    }
  }
}

function brickHit() {
  //have we hit a brick?
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //if so, reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && google[row][col] >= 1) {
    dy = -dy;
    google[row][col] = 0;
  }
}