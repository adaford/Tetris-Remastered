//The Ajax to get the high scores
//Takes in the newest score and
function get_high_scores(num_scores, new_name, new_score){
  $.ajax({
    type: "POST",
    url: "backend/scores.php",
    data: {
      // pass values (format = paramName: value)
      num_scores: num_scores,
      name : new_name,
      score: new_score
    },
    dataType: "text",
    success: function (d) {
      $("#PlayerList").html(d)
    },
    error: function (error) {
      console.log("Error in ajax call for get_high_scores")
      console.log(error)
    }
  });
}
//Ajax to clear high scores.  Unused.
function clear_high_scores(num_scores){
  $.ajax({
    type: "POST",
    url: "backend/clear_scores.php",
    data: {
      num_scores: num_scores
    },
    dataType: "text",
    success: function (d) {
      $("#PlayerList").html(d)
    },
    error: function (error) {
      console.log("Error in ajax call for clear_high_scores")
      console.log(error)
    }
  });
}
