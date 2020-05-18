// Roll timers
var rollTimeout = 3000; // Time in millisecounds
var rollInterval = 300; // Time in millisecounds

// Show player name
var playerName = "";

// AI dice score
var aiScore = 0;

// Dice interval defined
var diceTimer;

$('#start-game').click(function() {
    // Get player name from input
    playerName = $("#player_name").val();

    if(playerName == "") {
        alert("Please set your name!");
        return;
    }

    // Hide leaderboard
    $(".leaderboard").hide();

    // Hide start game button
    $(".start-game").slideUp();

    // Show dices
    $("#game").show();

    // Show score
    $(".score").show();

    // Hide title
    $("h1").hide();

    // Define dices
    $('<div/>', {
        class: 'dice part1',
    }).appendTo('#dice');

    $('<div/>', {
        class: 'dice part2',
    }).appendTo('#dice');

    rollTurn("ai");
});

// When player push the GO button
$('#turn-now').click(function() {
    // Hide GO Button
    $("#turn-now").addClass("none");
    // Roll the dice
    rollTurn("human");
});


// Dice roll effect
function diceExecute() {
    var part1 = Math.floor(Math.random() * 6) + 1; 
    $('#dice .part1').attr('class', 'dice part1 dice-' + part1);

    var part2 = Math.floor(Math.random() * 6) + 1; 
    $('#dice .part2').attr('class', 'dice part2 dice-' + part2);
}

function rollTurn(turnNow) {
    // Start dice roll
    diceTimer = setInterval(diceExecute, rollInterval);

    // Call ajax to retrieve dice numbers
    $.ajax({
        url: "dice.php",
        data: {
            turn: turnNow,
            playerName: playerName,
            score: aiScore
        },
        dataType: 'json'
    }).done(function( msg ) {

        setTimeout(function(){
            // Stop interval
            clearInterval(diceTimer);

            // Set dice final number
            $('#dice .part1').attr('class', 'dice part1 dice-' + msg.part1);
            $('#dice .part2').attr('class', 'dice part2 dice-' + msg.part2);


            // AI Turn
            if(turnNow == "ai") {
                // Create item from template
                $("#score").prepend($('#score-template').html());

                // Add dice's
                $("#score .item:first .aiTurn .dice-one").addClass("dice-" + msg.part1);
                $("#score .item:first .aiTurn .dice-two").addClass("dice-" + msg.part2);

                // Change player name
                $("#score .item:first .humanTurn .player").html(playerName);

                // Add player name to title
                $("#game .title").html(playerName + " turn");

                // Show player go button
                $("#turn-now").removeClass("none");

                // Calculate AI score
                aiScore = msg.part1+msg.part2;
            }

            // Human Turn
            if(turnNow == "human") {
                // Set human dice's
                $("#score .item:first .humanTurn .dice-one").addClass("dice-" + msg.part1);
                $("#score .item:first .humanTurn .dice-two").addClass("dice-" + msg.part2);

                // Change title to AI
                $("#game .title").html("AI turn");

                // Hide dice's
                rollTurn("ai");

                // Calculate user score
                var playerScore = msg.part1 + msg.part2;

                // Calculate how win and set win text
                if(aiScore > playerScore) { // AI win
                    $("#score .item:first .result").html("AI Win!");
                } else if (aiScore === playerScore) { // Score is equal to both players
                    $("#score .item:first .result").html("Draw!");
                } else if (aiScore < playerScore) { // Human Win
                    $("#score .item:first .result").html(playerName + " Win!");
                }

            }

        }, rollTimeout);
    });
}