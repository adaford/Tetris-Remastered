<?php
//Calls function to display the high scores
display_scores((int)$_POST['num_scores'], $_POST['name'], (int)$_POST['score']);   //sql-queries-functions.php

//Inserts a high score then displays the top X number of them
function display_scores($num_scores_to_display, $name_to_insert, $score_to_insert){
  require_once("pdo.php");

  $arr = array();

  if ( !isset($score_to_insert) ){
      echo "Score is required";
      return;
  }else if ( !is_numeric($score_to_insert) ) {
      echo "Score must be numberic";
      return;
  }else{
      $stmt = $pdo->prepare('INSERT INTO Scores
       (Name, Score) VALUES ( :nm, :sc )');
      $stmt->execute(array(
       ':nm' => htmlentities($name_to_insert),
       ':sc' => $score_to_insert
     ));
  }

  $stmt2 = $pdo->query("SELECT * FROM Scores ORDER BY score DESC, order_inserted");
  for ($x = 0; $x < $num_scores_to_display; $x++) {
    if ($row = $stmt2->fetch(PDO::FETCH_ASSOC )){
      echo htmlentities($row["Name"]);
      echo " ";
      echo $row["Score"];
      echo" <br>";
    } else {
      echo "Playername";
      echo "     ";
      echo 0;
      echo" <br>";
    }
  }
  return;
}
?>
