<?php
//Calls function to clear high scores
clear_high_scores((int)$_POST['num_scores']);   //sql-queries-functions.php
//Deletes all rows from scores database and displays placeholder entries
function clear_high_scores($num_scores_to_display){
  require_once("pdo.php");

  $stmt = $pdo->prepare('DELETE FROM Scores');
  $stmt->execute();

  echo "<p><h1>Tetris High Scores</h1>\n";
  //foreach($arr as $k => $v){
  for ($x = 0; $x < $num_scores_to_display; $x++) {
    echo "Playername";
    echo " ";
    echo 0;
    echo" <br>";
  }
  return;
}
?>
