<?php
    // check if all needed GET variables is sets
    if(!isset($_GET["playerName"]) || !isset($_GET["turn"]) || !isset($_GET["score"])) {
        die("Not allow.");
    }

    // Create SQLite instance & database
    $db = new SQLite3('score.db');
    $db->exec("CREATE TABLE IF NOT EXISTS score(id INTEGER PRIMARY KEY, playerName TEXT, playerScore INT, aiScore INT)");

    // Dice
    $dice = array(
        "part1" => rand(1,6),
        "part2" => rand(1,6)
    );

    // Log turn in DB
    if($_GET["turn"] == "human") {
        // Vars for insert
        $playerName = SQLite3::escapeString ($_GET["playerName"]);
        $playerScore = $dice["part1"]+$dice["part2"];
        $aiScore = SQLite3::escapeString ($_GET["score"]);

        // Insert in SQLite DB
        $db->exec("INSERT INTO score(playerName, playerScore, aiScore) VALUES('{$playerName}', '{$playerScore}', {$aiScore})");
    }

    // Send to view
    echo json_encode($dice);
