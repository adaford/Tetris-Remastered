//Board Set Up
board = [];
boardWidth = 10;
boardHeight = 20;
for (i = 0; i < boardHeight; ++i) {
    board.push(new Array(boardWidth).fill(0));
}
board[boardHeight - 1] = new Array(boardWidth).fill(0);

//Block that the player controls
var activeBlock = {
    position: {
      x: 0,
      y:0
    },
    shapeMatrix: null,
    rotation: 0
}
var nextBlock = {
    shapeMatrix: null
}

//------GLOBAL VARIABLES--------------------------------------------------

player_name = "Playername";
score = 0;
level = 1;
changePowerups = 1;

// PLEASE TELL MEGAN IF THERE IS ANYTHING ABOVE HERE IS ADDED OR DELETED
//--------------------------SAVE EVERYTHING ABOVE THIS----------------------------

num_leaderboard_scores = 10;

timeBetweenDrops = 1000;
paused = true;
start = false;
gameOver = false;
loadGame = false;

//----------------------------------

function music(src) {
    this.music = document.createElement("audio");
    this.music.src = src;
    this.music.setAttribute("preload", "auto");
    this.music.setAttribute("controls", "none");
    this.music.style.display = "none";
    this.music.loop = "true";
    document.body.appendChild(this.music);
    this.play = function(){
        this.music.play();
    }
    this.stop = function(){
        this.music.pause();
    }
}
song1 = new music("music/mainTetris.mp3");
song2 = new music("music/pianoTetris.mp3");
song3 = new music("music/tetrisHouse.mp3");
currentSong = song1;
muted = false;

//------ Save Game --------------------------------------------------

function get_matrix_number(shape_matrix){
  var top = 0;
  for (var out = 0; out < shape_matrix.length; out++){
    for (var inner = 0; inner < shape_matrix[out].length; inner++){
      if (shape_matrix[out][inner] > top)
        top = shape_matrix[out][inner]
    }
  }
  return top
}

//returns how many times to rotate
function getRotation(shape_matrix, num) {
	switch(num){
      case 1:
        if (shape_matrix[0][1] != 0){
        	return 0;
        } else {
        	return 1;
        }
      break;
      case 2:
        return 0;
      break;
      case 3:
      	if (shape_matrix[0][0] != 0 ){
      		return 2;
      	}
      	else if (shape_matrix[2][0] != 0){
      		return 3;
      	}
      	else if (shape_matrix[0][2] != 0) {
      		return 1;
      	}
      	else {
      		return 0;
      	}
      break;
      case 4:
        if (shape_matrix[2][0] != 0) {
        	return 0;
        }
        else if (shape_matrix[2][2] != 0) {
        	return 1;
        }
        else if (shape_matrix[0][2] != 0) {
        	return 2;
        }
        else {
        	return 3;
        }
      break;
      case 5:
        if (shape_matrix[0][2] != 0) {
        	return 0;
        }  else {
        	return 1;
        }
      break;
      case 6:
        if (shape_matrix[0][0] != 0) {
        	return 0;
        }
        else {
        	return 1;
        }
      case 7:
        if (shape_matrix[0][1] != 0 && shape_matrix[1][0] != 0 && shape_matrix[1][1] != 0 && shape_matrix[1][2] != 0){
        	return 0;
        }
        else if (shape_matrix[0][1] != 0 && shape_matrix[1][0] != 0 && shape_matrix[1][1] != 0 && shape_matrix[2][1] != 0){
        	return 1;
        }
        else if (shape_matrix[2][1] != 0 && shape_matrix[1][0] != 0 && shape_matrix[1][1] != 0 && shape_matrix[1][2] != 0){
        	return 2;
        }
        else {
        	return 3;
        }
      break;
      case 8:
        return 0;
      break;
    }
}

//Ajax to make Async call to save state
saves_pending = 0;
function save_game(){
  var board_string = JSON.stringify(board);
  saves_pending++;
  document.getElementById('save').innerHTML = "Saving...";
  document.getElementById('save').style.left = "20%";
  document.getElementById('sound').style.left = "21%";
  document.getElementById('nextSong').style.left = "23%";
  $.ajax({
    type: "POST",
    url: "backend/save.php",
    data: {
      //board
      board : board_string,
      //active_block
      pos_x : activeBlock['position']['x'],
      pos_y : activeBlock['position']['y'],
      active_shape_matrix : get_matrix_number(activeBlock['shapeMatrix']),
      rotation : getRotation(activeBlock['shapeMatrix'], get_matrix_number(activeBlock['shapeMatrix'])),
      //next_block
      next_shape_matrix : get_matrix_number(nextBlock['shapeMatrix']),
      // other_vars
      boardHeight: boardHeight,
      boardWidth : boardWidth,
      changePowerups: changePowerups,
      level: level,
      player_name : player_name,
      score: score
    },
    dataType: "text",
    success: function (d) {
      console.log("State Saved successfully")
      console.log(d)
      saves_pending--
      if (saves_pending == 0){
        $("#load").prop("disabled", false);
        document.getElementById("load").innerHTML = "Load";
        document.getElementById('save').innerHTML = "Save"
        document.getElementById('save').style.left = "24%";
        document.getElementById('sound').style.left = "25%";
  		document.getElementById('nextSong').style.left = "27%";
      }
    },
    error: function (error) {
      console.log("Error in ajax call for save_game")
      console.log(error)
      saves_pending--
      if (saves_pending == 0){
      	$("#load").prop("disabled", false);
        $("#save").prop("disabled", false);
        document.getElementById('save').innerHTML = "Save"
        document.getElementById('save').style.left = "24%";
        document.getElementById('sound').style.left = "25%";
  		document.getElementById('nextSong').style.left = "27%";
      }
    }
  })
};

//Ajax to load game from database
function load_game(){
  $.ajax({
    type: "POST",
    url: "backend/load.php",
    data: {
    },
    dataType: "text",
    success: function (d) {
      console.log("Game Loaded Successfully")
      console.log(d)
      var result = $.parseJSON(d);
      board = result[0];
      activeBlock = result[1];
      activeBlock.shapeMatrix = GenerateShape((activeBlock.shapeMatrix - 1) * 10);
      activeBlock.rotation = activeBlock["rotation"]
      for (var i = 0; i < activeBlock.rotation; i++){
        Rotate(-1);
      }
      EraseOldActiveBlockPosition();
      nextBlock["shapeMatrixNum"] = result[2];
      nextBlock.shapeMatrix = GenerateShape((nextBlock.shapeMatrixNum - 1) * 10);
      var other_vars = result[3];
      boardHeight = other_vars["boardHeight"];
      boardWidth  = other_vars["boardWidth"];
      changePowerups = other_vars["changePowerups"];
      level = other_vars["level"];
      player_name = other_vars["player_name"];
      score = other_vars["score"];

      $('#NewGame').click();
    },
    error: function (error) {
      console.log("Error in ajax call for get_high_scores")
      console.log(error)
    }
  });
}

//Game currently exists in a matrix (board)
//Arrow keys and z, x to rotate

//--------------------------ON SCREEN GRID EDITING-----------------------------------------------------

//creates all the divs in the html file for the game board
function createGrid(){
  for (var i = 0; i < 200; i++) {
    var div = document.createElement("div");
    div.id = i;
    div.style.visibility = "hidden";
    document.getElementById("board").appendChild(div);
  }
  if (!start) {
    for (var i = 0; i < 16; i++) {
  	  var div = document.createElement("div");
      div.id = i.toString() + "side";
      div.style.visibility = "hidden";
      document.getElementById("upcoming").appendChild(div);
    }
  }
}

function addColor(i, j, x) {
  if (x == 0) {
    var id = (i * 10 + j).toString();
    var y = board[i][j];
  } else {
    var id = (i * 4 + j).toString() + "side"
    var y = x;
  }
  var colorMap = {1: "darkOrange", 2: "blue", 3: "yellow", 4: "#DC143C", 5: "#7FFF00", 6: "#3D9970", 7: "#9400D3"};
  document.getElementById(id).style.backgroundColor = colorMap[y];
}

//turns a square on
function addSquare(i, j){
    var id = (i * 10 + j).toString();
    document.getElementById(id).style.visibility = "visible";
    addColor(i, j, 0)
}

//turns a square off
function removeSquare(i, j){
    var id = (i * 10 + j).toString();
    document.getElementById(id).style.visibility = "hidden";
}

//goes through entire grid to see which squares need to be changed
function updateGrid(){
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 10; j++) {
      	document.getElementById((i * 10 + j).toString()).style.animationName = "none";
        if (board[i][j] != 0){
          addSquare(i,j);
        } else {
          removeSquare(i,j);
        }
        if (board[i][j] == 8){
        	document.getElementById((i * 10 + j).toString()).style = "animation-name: color_change; " +
        	"animation-duration: .25s; animation-iteration-count: infinite;animation-direction: alternate;"
        }
      }
    }
}

function arrayClone(arr) {
    var i, copy;
    if( Array.isArray( arr ) ) {
        copy = arr.slice( 0 );
        for(i = 0; i < copy.length; i++) {
            copy[i] = arrayClone(copy[i]);
        }
        return copy;
    }
    else {
    	return arr;
    }
}

//helper function for updateSideGrid
function change(matrix){
  var len = matrix.length;
  var mat = arrayClone(matrix);
  for (var i = len; i < 4; i++){
    mat.push([0,0,0,0]);
    for (var j = 0; j < len; j++){
      mat[j].push(0)
    }
  }
  return mat;
}

//shows next block
function updateSideGrid(){
	var matrix = change(nextBlock.shapeMatrix);
	for (var i = 0; i < 4; i++){
		for (var j = 0; j < 4; j++){
			document.getElementById((i * 4 + j).toString() + "side").style.animationName = "none";
			if (matrix[i][j] != 0){
				document.getElementById((i * 4 + j).toString() + "side").style.visibility = "visible";
        		addColor(i, j, matrix[i][j]);
			}
			else {
				document.getElementById((i * 4 + j).toString() + "side").style.visibility = "hidden";
			}
			if (matrix[i][j] == 8){
				document.getElementById((i * 4 + j).toString() + "side").style = "animation-name: color_change; " +
        			"animation-duration: .25s; animation-iteration-count: infinite;animation-direction: alternate;"
			}
		}
	}
	document.getElementById("changePowerups").innerHTML = changePowerups;
}

//----------------------------------------------------------------------------------------

//changes score/level on screen and updates timeBetweenDrops
function updateLevel(){
	level = 1 + Math.floor(score / 1000);
	timeBetweenDrops = 1000 * Math.pow(.75, level - 1);
	document.getElementById("gameStatus").innerHTML = "Level : " +
		level.toString() + "<br> Score : " + score.toString();
}


//-------------------------TETRIS PLAY FUNCTIONS------------------------------------

//Starts the game
function GameTimer(){
  document.getElementById("pause").style.visibility = "visible";
  if (!loadGame) {
  	   nextshape = Math.floor(Math.random() * 72);
  	   SpawnBlock();
  }
  else {
  	   loadGame = false;
  }
  function run(){
	   BlockDrop();
	   updateLevel();
	   timer = setTimeout(function() {run()}, timeBetweenDrops);
  }
  run();
}

function SpawnBlock(){
    score += 5;
    activeBlock.position.y = 0;
    activeBlock.position.x = (boardWidth/2) - 1;
    shape = nextshape;
    nextshape = Math.floor(Math.random() * 72);
    activeBlock.shapeMatrix = GenerateShape(shape);
    nextBlock.shapeMatrix = GenerateShape(nextshape)
    updateSideGrid();

    //Game Over
    if(CheckCollision(activeBlock, board)){
      console.log("game over");
      paused = true;
      gameOver = true;
      currentSong.stop();
      nextBlock.shapeMatrix = [[0]];
      updateSideGrid();
      document.getElementById("pause").style.visibility = "hidden";
      document.getElementById("board").style.backgroundColor = "black";

      $(".HighScore").css("display", "block");
      $(".top").css("display", "block");

      get_high_scores(num_leaderboard_scores, player_name, score);

    }
      else{
        UpdateBoard();
      }
}

//0 - Line, 1 - Square, 2 - L, 3 - J, 4 - S, 5 - Z, 6 - T
function GenerateShape(shape){
    switch(Math.floor(shape / 10)){
      case 0:
      return[
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ];
      case 1:
      return[
        [2, 2],
        [2, 2],
      ];
      case 2:
      return[
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
      ];
      case 3:
      return[
        [0, 4, 0],
        [0, 4, 0],
        [4, 4, 0],
      ];
      case 4:
      return[
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0]
      ];
      case 5:
      return[
        [6, 6, 0],
        [0, 6, 6],
        [0, 0, 0]
      ];
      case 6:
      return[
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0]
      ];
      case 7:
      return[
        [8]
      ];
    }
}

//Lower the active block by one unit
function BlockDrop(){
    if (paused) {
      return
    }
    EraseOldActiveBlockPosition();
    activeBlock.position.y = activeBlock.position.y + 1;

    if(CheckCollision(activeBlock, board)){
          activeBlock.position.y--;
          UpdateBoard();
          if (activeBlock.shapeMatrix[0][0] == 8){detonate();}
          CheckForFullLines();
          SpawnBlock();
    }else{
          UpdateBoard();
    }
}

//explodes a bomb
function detonate(){
	var col = activeBlock.position.x;
	var row = activeBlock.position.y;
	board[row][col] = 0;
	if (row < boardHeight - 1) {
		if (col > 0){
			board[row + 1][col - 1] = 0;
		}
		if (col < boardWidth - 1) {
			board[row + 1][col + 1] = 0;
		}
		board[row + 1][col] = 0;
	}
	if (col < boardWidth - 1) {
		board[row][col + 1] = 0;
		if (row > 0){
			board[row - 1][col + 1] = 0;
		}
	}
	if (col > 0) {
		board[row][col - 1] = 0;
		if (row > 0){
			board[row - 1][col - 1] = 0;
		}
	}
	if (row > 0){
		board[row - 1][col] = 0;
	}
	score += 250;
}

//Checks if activeBlock will be colliding with something else
function CheckCollision(activeShape, boardState){
    for(var i = 0; i < activeShape.shapeMatrix[0].length; i++){
      for(var j = 0; j < activeShape.shapeMatrix[0].length; j++){
          if(activeShape.shapeMatrix[i][j] != 0){

            //if hits ground
            if(activeShape.position.y + i >= boardHeight){
              return true;
            }
            //if hits another block
            if(boardState[activeShape.position.y + i][activeShape.position.x + j] != 0){
              return true;
            }

            //if hits the left wall
            if(activeShape.position.x + j < 0){
              return true;
            }
            //if hits the right wall
            if(activeShape.position.x + j >= boardWidth){
              return true;
            }
          }
      }
    }
    return false;
}

//Checks if player filled a line and should score
function CheckForFullLines(){
  var linesCleared = 0;

    //Checking each line for blank units
    for(var i = 0; i < boardHeight; ++i){
      var confirmedLineNotFull = false;
      for(var j = 0; j < boardWidth; ++j){
          if(board[i][j] == 0){
            confirmedLineNotFull = true;
          }
      }

      //If line filled, move down all lines above
      if(confirmedLineNotFull == false){
        for(var k = i; k > 0; --k){
          board[k] = board[k-1];
        }
        board[0] = new Array(boardWidth).fill(0);
        linesCleared++;
      }
    }

    if(linesCleared == 1){
      score += 100;
    }else if(linesCleared == 2){
      changePowerups += 1;
      score += 250;
    }else if(linesCleared == 3){
      changePowerups += 1;
      score += 400;
    }else if(linesCleared == 4){
      changePowerups += 1;
      score += 1000;
    }
}

//Erases previous position of block to draw new one
function EraseOldActiveBlockPosition(){
  for(var i = 0; i < activeBlock.shapeMatrix[0].length; ++i){
    for(var j = 0; j < activeBlock.shapeMatrix[0].length; ++j){
      if(activeBlock.shapeMatrix[i][j] != 0){
        board[activeBlock.position.y + i][activeBlock.position.x + j] = 0;
      }
    }
  }
  updateGrid();
}

//Draws activeBlock on board
function UpdateBoard(){
  for(var i = 0; i < activeBlock.shapeMatrix[0].length; ++i){
    for(var j = 0; j < activeBlock.shapeMatrix[0].length; ++j){
      if(activeBlock.shapeMatrix[i][j] != 0){
        board[activeBlock.position.y + i][activeBlock.position.x + j] = activeBlock.shapeMatrix[i][j];

      }
    }
  }
  updateGrid();
}

//Move the blocks based on player input
function MoveBlocks(xChange, yChange){
    activeBlock.position.x += xChange;
    activeBlock.position.y += yChange;
    if(CheckCollision(activeBlock, board)){
      activeBlock.position.x -= xChange;
      activeBlock.position.y -= yChange;
    }
}

//Rotate the block based on player input
function Rotate(dir){
    var origMatrix = [];
    var tempMatrix = [];
    var length = activeBlock.shapeMatrix[0].length;

    for (var i = 0; i < length; i++){
        origMatrix[i] = activeBlock.shapeMatrix[i].slice();
        tempMatrix[i] = activeBlock.shapeMatrix[i].slice();
    }


     for(var i = 0; i < length; ++i){
       for(var j = 0; j < length; ++j){
         tempMatrix[i][j] = activeBlock.shapeMatrix[j][i];
       }
     }
    if(dir == -1){
      for(var i = 0; i < length; ++i){
        for(var j = 0; j < length; ++j){
          activeBlock.shapeMatrix[i][j] = tempMatrix[length - 1 - i][j];
        }
      }
    }
    else{
      for(var i = 0; i < length; ++i){
        for(var j = 0; j < length; ++j){
          activeBlock.shapeMatrix[i][j] = tempMatrix[i][length - 1 - j];
        }
      }
    }

    if(CheckCollision(activeBlock, board) && !loadGame){
      console.log("COLLISION")
      activeBlock.shapeMatrix = origMatrix;
    }

}

//-----------------------KEYBOARD INPUTS--------------------------------------
document.addEventListener('keydown', function(event) {
    if (paused) {
      return;
    }
    //left arrow
    if(event.keyCode == 37) {
        EraseOldActiveBlockPosition();
        MoveBlocks(-1, 0);
        UpdateBoard();
    }
    //right arrow
    else if(event.keyCode == 39) {
        EraseOldActiveBlockPosition();
        MoveBlocks(1, 0);
        UpdateBoard();
    }
    //down arrow
    else if(event.keyCode == 40) {
        EraseOldActiveBlockPosition();
        MoveBlocks(0, 1);
        UpdateBoard();
    }
    //x
    else if(event.keyCode == 88) {
        EraseOldActiveBlockPosition();
        Rotate(1);
        UpdateBoard();
    }
    //z
    else if(event.keyCode == 90) {
        EraseOldActiveBlockPosition();
        Rotate(-1);
        UpdateBoard();
    }
    //c for change powerup
    else if(event.keyCode == 67) {
    	if (changePowerups > 0) {
    		var same = true;
    		while (same) {
    			nextshape = Math.floor(Math.random() * 72);
    			matrix = GenerateShape(nextshape);
    			if (matrix.length != nextBlock.shapeMatrix.length){same = false;}
    			else {
    				var count = 0;
    				for (var i = 0; i < matrix.length; i++){
    					if (matrix[0][i] == nextBlock.shapeMatrix[0][i]){count++;}
    				}
    				if (count != matrix.length){same = false;}
    			}
    		}
    		nextBlock.shapeMatrix = matrix;
    		changePowerups -= 1;
    		updateSideGrid();
    	}
    }
    //b for bomb (CHEAT MODE)
    else if(event.keyCode == 66) {
    	nextshape = 71;
    	nextBlock.shapeMatrix = GenerateShape(71);
    	updateSideGrid();
    }
});

//------------------------------------------------------------------------------------------

function reset(){
	if (start){
		clearTimeout(timer);
	}
  else {
    createGrid();
  }

  if (!loadGame) {
    	score = 0;
    	level = 0.0;
    	board = [];
    	paused = false;
    	timeBetweenDrops = 1000;
    	changePowerups = 1;
    	for (i = 0; i < 20; ++i) {
        	board.push(new Array(boardWidth).fill(0));
    	}
    	board[boardHeight - 1] = new Array(boardWidth).fill(0);
    	if (start == true && gameOver == false) {
      		for (var i = 0; i < 20; i++) {
        		for (var j = 0; j < 10; j++) {
          			removeSquare(i,j);
        		}
      		}
    	}
    }

    document.getElementById("p").src = "img/pause.button.png";
    document.getElementById("p").style = "width: 235%;max-height: 235%";
    document.getElementById("pause").style.visibility = "hidden";
    document.getElementById("board").style.display = "grid";
    document.getElementById("board").style.backgroundColor = "black";
    $("#playerNameForm").css("display", "none");
}

//---------IN GAME BUTTONS-----------------------------------------------

document.getElementById("NewGame").addEventListener("click", function(){
  console.log("start");
  reset();
  if (!muted) {
  	currentSong.play();
  }
  start = true;
  gameOver = false;
  paused = false;
  $(".HighScore").css("display", "none");
  $(".top").css("display", "block");
  GameTimer();
})

document.getElementById("pause").addEventListener("click", function(){
  paused = !paused;
  //changes icon
  if (paused == true) {
    console.log("paused");
    document.getElementById("p").src = "img/play.button.gif";
    document.getElementById("p").style = "width: 225%;max-height: 225%";
    currentSong.stop();
  } else {
    console.log("played");
    document.getElementById("p").src = "img/pause.button.png";
    document.getElementById("p").style = "width: 235%;max-height: 235%";
    if (document.getElementById("mute").style.opacity == "1"){
    	currentSong.play();
    }
  }
})

document.getElementById("save").addEventListener("click", function(){
   if (!start || gameOver){
   	  return
   }
   console.log("Saving Game...");
   save_game();
});

document.getElementById("load").addEventListener("click", function(){
    console.log("Loading Game...");
    if (saves_pending > 0){
        document.getElementById("load").innerHTML = "Wait...";
        $("#load").prop("disabled", true);
      } else {
        document.getElementById("load").innerHTML = "Load";
        loadGame = true;
    	load_game();
    }

});

//mute the music
document.getElementById("sound").addEventListener("click", function(){
	if (!muted) {
		document.getElementById("mute").style.opacity = "0.5";
		currentSong.stop();

	} else {
		document.getElementById("mute").style.opacity = "1";
		if(!paused) {
			currentSong.play();
		}
	}
	muted = !muted;
})

//change songs
document.getElementById("nextSong").addEventListener("click", function(){
	currentSong.stop();
	if (currentSong == song1) {
		currentSong = song2;
	}
	else if (currentSong == song2) {
		currentSong = song3;
	}
	else {
		currentSong = song1;
	}
	if (!muted && !paused) {
		currentSong.play()
	}
})

//get playername
$('#submitName').click(function(){
  player_name = $('#getName').val()
  $('#thanks').text("Thanks "+player_name+'!')
})

//help menu
$("#help").hover( function(){
	$("#tutorial").css("display", "block");
}, function() {
	$("#tutorial").css("display", "none");
});

//---------------------------------------------------------------------//
