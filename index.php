<?php
    $db = new SQLite3('score.db');
    $results = $db->query('SELECT playerName, count(*) total FROM score WHERE playerScore > aiScore GROUP BY playerName order by total desc');
?>

<html>
    <head>
        <title>Dice</title>
        <link rel="stylesheet" href="assets/css/dice-1.0.min.css">
        <link rel="stylesheet" href="assets/css/main.css">
    </head>
    <body>
        <h1>Welcome to the dice game!</h1>

        <div class="content">

            <div class="score">
                <div class="title">Score</div>
                <div id="score"> </div>
            </div>

            <script id="score-template" type="text/x-custom-template">
                <div class="item">
                    <div class="left aiTurn">
                        <div class="player">AI</div>
                        <span class="dice dice-one"></span>
                        <span class="dice dice-two"></span>
                    </div>
                    <div class="right humanTurn">
                        <div class="player">Human</div>
                        <span class="dice dice-one" ></span>
                        <span class="dice dice-two"></span>
                    </div>
                    <div class="clearfix"> </div>
                    <div class="result"> </div>
                </div>
                <div class="clearfix"> </div>
            </script>

            <div class="start-game">
                <input type="text" name="player_name" placeholder="Enter your name" id="player_name">
                <button id="start-game">GO</button>
            </div>
            
            <div class="game" id="game">
                <div class="title">AI turn</div>
                <button id="turn-now" class="none">GO</button>

                <div id="dice"> </div>
            </div>

            <div class="leaderboard">
                <div class="title">Leaderboard</div>
                <?php while ($row = $results->fetchArray()): ?>
                    <div class="item">
                        <div class="lead-name"><?=$row['playerName']?></div>
                        <div class="lead-score"><?=$row['total']?> score</div>
                    </div>
                <?php endwhile; ?>
            </div>


        </div>

        <script src="assets/js/jquery-3.4.1.min.js"></script>
        <script src="assets/js/main.js"></script>
    </body>
</html>