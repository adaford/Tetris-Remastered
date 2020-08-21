<<<<<<< HEAD
Frontend: 
Tetris 2000 is a reimplementation of the original game Tetris. Users can hover their
mouse over the "?" button to show the "How to Play" instruction. Before starting a
new game, the player can enter their name and click the submit button, which will
store player name in our database that keeps track of high scores. Users can start 
a new game by clicking on the "New Game" button and save their progress by clicking 
on the "Save" button. Once clicked, the "Save" button will say "Saving...". The game 
is saved once the button shows "Save" again. Users can reload their saved game by 
clicking on the "Load" button. 

Users can also pause the game, turn on/off background music and switch between 3 different tetris songs.
When pausing, the music turns off and the button switches to a play button.  
The music turns back on when played and the button turns back into a pause button.  
Additionally, the mute button becomes transparent when muted.

The tetris board itself is defined by a 10x20 matrix filled with numbers 0-8 
that represent blocks when not 0 and different colors corresponding to each shape.  
X and Z are used to rotate the dropping piece and arrow keys move it left/right/down.  Standard tetris rules apply.
The next piece to come is shown on the left side grid along with the current level and score and the number of change powerups the player currently has.  
These change powerups are increased by destroying 2+ rows at a time and the player can press C to use one of these powerups to change their next piece.
Score is increased by adding pieces and destroying lines.  Level increments with score.  The speed of the pieces dropping increases with each level.
Lastly, random bombs spawn that destroy every adjacent block upon collision.

Backend:
The backend of the project involves primarily interfacing to a database.  The database details are detailed in the New Techincal Component section of the readme.  The PHP portions are laid out such that there is one main file that is called for each backend function.  This meand that there is a file for inserting a new score and displaying them, a file for saving the state of the game, and a file for loading the state of the game.  
Each of the load and display state functions are subdivided into functions to make calling the functions and debugging it easier.  Interfacing with the database takes the form of SQL statements that are prepared and then executed.  This implementation only uses Select, Insert, and Delete SQL statements.

When the game is supposed to be saved, an ajax call should be made and any variables we want saved are passed to the php and then stored in the database. 
Upon load, the variables are all returned and returned from the PHP in an array form and in the success function of the ajax call, the variables are restored to the js.

When the game ends, the ending score and the player's name are sent to the php along with the number of scores to display on the leaderboard.  The PHP prepares and executes a SQL statement to insert the new name and score into the scores table.  A Select statement is then prepared and the top X scores (as denoted by a var passed in) are organized into a string of html and returned from the PHP.  This string is then appended to a leaderboard div.

Only one state is saved at a time, so if multiple calls are made to the database at the same time to save, only the latest one will stay in the database.  In addition, a load will not be possible until any pending saves are completed.  This is accomplished in the Javascript.

New Tech Component:
For our new technical component, we created a database through locally hosted phpmyadmin.  There are two databases for this project.  One of these is for high scores and the other is for save states.  
The high scores database contains one table with three columns.  The columns are 'Name', 'Score', and 'order_inserted'.  The order_inserted column is used to ensure that if two people get the same score, the person who got it first shows up higher in the database.  This column is set to auto increment.
=======
Backend:
The backend of the project involves primarily interfacing to a database.  The database details are detailed in the New Techincal Component section of the readme.  The PHP portions are laid out such that there is one main file that is called for each backend function.  This means that there is a file for inserting a new score and displaying them, a file for saving the state of the game, and a file for loading the state of the game.  
Each of the load and display state functions are subdivided into functions to make calling the functions and debugging it easier.  Interfacing with the database takes the form of SQL statements that are prepared and then executed.  This implementation only uses Select, Insert, and Delete SQL statements.

When the game is supposed to be saved, an ajax call should be made and any variables we want saved are passed to the php and then stored in the database. 
Upon load, the variables are all returned and returned from the PHP in an array form and in the success function of the ajax call, the variables are restored to the js.

When the game ends, the ending score and the player's name are sent to the php along with the number of scores to display on the leaderboard.  The PHP prepares and executes a SQL statement to insert the new name and score into the scores table.  A Select statement is then prepared and the top X scores (as denoted by a var passed in) are organized into a string of html and returned from the PHP.  This string is then appended to a leaderboard div.

Only one state is saved at a time, so if multiple calls are made to the database at the same time to save, only the latest one will stay in the database.  In addition, a load will not be possible until any pending saves are completed.  This is accomplished in the Javascript.

New Tech Component:
For our new technical component, we created a database through locally hosted phpmyadmin.  There are two databases for this project.  One of these is for high scores and the other is for save states.  
The high scores database contains one table with three columns.  The columns are 'Name', 'Score', and 'order_inserted'.  The order_inserted column is used to ensure that if two people get the same score, the person who got it first shows up higher in the database.  This column is set to auto increment.
>>>>>>> master
The save state database contains four tables.  Each table contains columns that hold either the variables we wanted to save, or info used to recreate a variable needed to save state (ie. The Gameboard).