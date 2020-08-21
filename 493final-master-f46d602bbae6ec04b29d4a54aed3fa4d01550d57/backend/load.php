<?php
//This function is for loading the board of tiles from the database
function load_board(){
  //($board_arr, $boardHeight, $boardWidth)
  require("pdo_save.php");

  //Get boardHeight and boardWidth
  $stmt2 = $pdo_save->query("SELECT * FROM other_vars");
  $row = $stmt2->fetch(PDO::FETCH_ASSOC );
  $boardHeight = (int)$row["boardHeight"];
  $boardWidth =  (int)$row["boardWidth"];

  $arr_row = array();
  $board = array();
  for ($y = 0; $y < $boardWidth; $y++){
    array_push($arr_row, 0);
  }
  for ($x = 0; $x < $boardHeight; $x++){
    array_push($board, $arr_row);
  }


  $stmt2 = $pdo_save->query("SELECT * FROM board");
  while ($row = $stmt2->fetch(PDO::FETCH_ASSOC )){
      $row_num = $row["row_num"];
      $col_num = $row["col_num"];
      $value   = $row["value"];
      $board[$row_num][$col_num] = $value;
  }
  return $board;
}

//This function is for loading the vars related to the active_block from the database
function load_active_block(){
  //($active_pos_x, $active_pos_y, $active_shape_matrix)
  require("pdo_save.php");

  $active_block = array("position"=>array("x"=>0, "y"=>0), "shapeMatrix"=>0);

  $stmt2 = $pdo_save->query("SELECT * FROM active_block");
  $row = $stmt2->fetch(PDO::FETCH_ASSOC );
  $active_block["position"]["x"] = (int)$row["pos_x"];
  $active_block["position"]["y"] = (int)$row["pos_y"];
  $active_block["shapeMatrix"]  = (int)$row["shape_matrix"];
  $active_block["rotation"]  = (int)$row["rotation"];

  return $active_block;
}
//This function is for loading the next_shape_matrix var from the database
function load_next_block(){
  //$next_shape_matrix
  require("pdo_save.php");
  $stmt2 = $pdo_save->query("SELECT * FROM next_block");
  $row = $stmt2->fetch(PDO::FETCH_ASSOC );
  $next_shape_matrix = (int)$row["shape_matrix"];
  return $next_shape_matrix;
}
//This function is for loading assorted vars from the database
function load_other_vars(){
  //$boardHeight, $boardWidth, $changePowerups, $level, $player_name, $score
  require("pdo_save.php");

  $other_vars = array("boardHeight"=>0, "boardWidth"=>0, "changePowerups"=>0, "level"=>0, "player_name"=>0, "score"=>0);

  $stmt2 = $pdo_save->query("SELECT * FROM other_vars");
  $row = $stmt2->fetch(PDO::FETCH_ASSOC );
  $other_vars["boardHeight"] = (int)$row["boardHeight"];
  $other_vars["boardWidth"]  = (int)$row["boardWidth"];
  $other_vars["changePowerups"] = (int)$row["changePowerups"];
  $other_vars["level"]       = (int)$row["level"];
  $other_vars["player_name"] = (string)$row["player_name"];
  $other_vars["score"]       = (int)$row["score"];

  return $other_vars;
}

//This function calls the functions above to load everything from the database
//  It then returns an array of all the loaded variables
function load_game(){
  $board              = load_board();
  $acive_block        = load_active_block();
  $next_shape_matrix  = load_next_block();
  $other_vars         = load_other_vars();
  echo json_encode(array($board, $acive_block, $next_shape_matrix, $other_vars));
  return;
}

//calls load_game()
load_game();

?>
