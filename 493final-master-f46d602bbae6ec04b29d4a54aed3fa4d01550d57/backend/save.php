<?php
//This function clears the existing save state from the database
function clear_save_state(){
  require("pdo_save.php");

  $stmt = $pdo_save->prepare('DELETE FROM active_block');
  $stmt->execute();

  $stmt = $pdo_save->prepare('DELETE FROM board');
  $stmt->execute();

  $stmt = $pdo_save->prepare('DELETE FROM next_block');
  $stmt->execute();

  $stmt = $pdo_save->prepare('DELETE FROM other_vars');
  $stmt->execute();

  return;
}

//This function saves the values of the board into the database
function save_board($board_arr, $boardHeight, $boardWidth){
  require("pdo_save.php");
  $pdo_save;
  $board = json_decode($board_arr, true);

  for ($y = 0; $y < $boardHeight; $y++){
    for ($x = 0; $x < $boardWidth; $x++){

      $value = $board[$y][$x];
      $stmt = $pdo_save->prepare('INSERT INTO board
       (col_num, row_num, value) VALUES ( :cn, :rn, :va )');
      $stmt->execute(array(
       ':cn' => $x,
       ':rn' => $y,
       ':va' => $value
      ));

    }
  }
  return;
}
//This function saves the values relating to the active_block into the database
function save_active_block($active_pos_x, $active_pos_y, $active_shape_matrix, $rotation){
  require("pdo_save.php");
  $stmt = $pdo_save->prepare('INSERT INTO active_block
   (pos_x, pos_y, shape_matrix, rotation) VALUES ( :x, :y, :sm , :ro)');
  $stmt->execute(array(
   ':x' => $active_pos_x,
   ':y' => $active_pos_y,
   ':sm' => $active_shape_matrix,
   ':ro' => $rotation
  ));
  return;
}
//this saves the next_shape_matrix into the database
function save_next_block($next_shape_matrix){
  require("pdo_save.php");
  $stmt = $pdo_save->prepare('INSERT INTO next_block
   (shape_matrix) VALUES ( :nsm )');
  $stmt->execute(array(
   ':nsm' => $next_shape_matrix
   ));
  return;
}
//This saves assorted otehr variables into the database
function save_other_vars($boardHeight, $boardWidth, $changePowerups, $level, $player_name, $score){
  require("pdo_save.php");
  $stmt = $pdo_save->prepare('INSERT INTO other_vars
   (boardHeight, boardWidth, changePowerups, level, player_name, score) VALUES ( :bh, :bw, :cp, :lv, :pn, :sc )');
  $stmt->execute(array(
   ':bh' => $boardHeight,
   ':bw' => $boardWidth,
   ':cp' => $changePowerups,
   ':lv' => $level,
   ':pn' => $player_name,
   ':sc' => $score
  ));
  return;
}
//This function clears the database then saves new info into it
function save_game($board_arr, $active_pos_x, $active_pos_y, $active_shape_matrix, $rotation, $next_shape_matrix, $boardHeight, $boardWidth, $changePowerups, $level, $player_name, $score){
  clear_save_state();
  save_board($board_arr, $boardHeight, $boardWidth);
  save_active_block($active_pos_x, $active_pos_y, $active_shape_matrix, $rotation);
  save_next_block($next_shape_matrix);
  save_other_vars($boardHeight, $boardWidth, $changePowerups, $level, $player_name, $score);
  return;
}

//This calls save_game
save_game($_POST['board'], (int)$_POST['pos_x'], (int)$_POST['pos_y'], (int)$_POST['active_shape_matrix'], (int)$_POST['rotation'], (int)$_POST['next_shape_matrix'], (int)$_POST['boardHeight'], (int)$_POST['boardWidth'], (int)$_POST['changePowerups'],(int)$_POST['level'], $_POST['player_name'], (int)$_POST['score']);

?>
