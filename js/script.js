let totalGames = 0;
let draws = 0;

let playerOne = {
    name: 'Player One',
    assigned: null,
    wins: 0,
    loses: 0
};

let playerTwo = {
    name: 'Player Two',
    assigned: null,
    wins: 0,
    loses: 0
};

let playerTurn = null;

function assignPlayers() {
    //decide which player is going first
    if (Math.floor(Math.random() * 2) == 0) {
        playerOne.assigned = 'X';
        playerTwo.assigned = 'O';
        playerTurn = playerOne;
    } else {
        playerTwo.assigned = 'X';
        playerOne.assigned = 'O';
        playerTurn = playerTwo;
    }
    $('.winner').hide();
    $('.player-turn').text(playerTurn.name + "'s Turn").show();
}

function savePlayerStats() {
    //save to local storage
    localStorage.setItem('playerOne', JSON.stringify(playerOne));
    localStorage.setItem('playerTwo', JSON.stringify(playerTwo));
    localStorage.setItem('draws', draws);
    localStorage.setItem('totalGames', totalGames);
}

// Check if player stats exist
if (localStorage.getItem('totalGames')) {
    totalGames = Number(localStorage.getItem('totalGames'));
    draws = Number(localStorage.getItem('draws'));
    playerOne = JSON.parse(localStorage.getItem('playerOne'));
    playerTwo = JSON.parse(localStorage.getItem('playerTwo'));

    //display data
    $('#player-one-name').text(playerOne.name);
    $('#player-two-name').text(playerTwo.name);
    $('#p1-wins').text(playerOne.wins);
    $('#p1-loses').text(playerOne.loses);
    $('#p2-wins').text(playerTwo.wins);
    $('#p2-loses').text(playerTwo.loses);
    $('.draws').text(draws);
    $('.total-games').text(totalGames);

    assignPlayers();

    //hide start game, show board
    $('#game-start').hide();
    $('#game').show();
}

// Set Player Names
$('#player-one').on('input', function(){
    playerOne.name = $(this).val();
});

$('#player-two').on('input', function(){
    playerTwo.name = $(this).val();
});

//Start Game
$('#start-game').on('click', function(){
    //set player names
    $('#player-one-name').text(playerOne.name);
    $('#player-two-name').text(playerTwo.name);

    assignPlayers();

    //hide start game, show board
    $('#game-start').hide();
    $('#game').show();

    savePlayerStats();
});

let turns = 0;
let winningRuns = ['.row-1', '.row-2', '.row-3', '.col-1', '.col-2', '.col-3', '.diag-1', '.diag-2']

//Player Turn
$('.flex-box').on('click', function(){
    if (!$(this).hasClass('disabled')) {

        $(this).text(playerTurn.assigned);

        //disable clicked box
        $(this).addClass('disabled');

        //add one to player turns
        turns += 1;

        //check if there is a winner
        if (turns > 4 && turns < 9) {
            winningRuns.forEach(run => checkForWinner(run));
        } else if (turns == 9) {
            //draw
            draws += 1;
            $('.draws').text(draws);
            $('.player-turn').hide();
            $('.winner').text('Draw!').show();
            $('#result').show();

            //add one to total games
            totalGames += 1;
            $('.total-games').text(totalGames);

            savePlayerStats();
        }

        //change players
        if (playerTurn == playerOne) {
            playerTurn = playerTwo;
        } else {
            playerTurn = playerOne;
        }
        $('.player-turn').text(playerTurn.name + "'s Turn");
    }
});

function checkForWinner(run) {
    if ($(run).text() == 'XXX' || $(run).text() == 'OOO') {
        $(run).addClass('bg-teal');
        $('.flex-box').addClass('disabled');
        if (playerTurn == playerOne) {
            playerOne.wins += 1;
            $('#p1-wins').text(playerOne.wins);
            playerTwo.loses += 1;
            $('#p2-loses').text(playerTwo.loses);
        } else {
            playerTwo.wins += 1;
            $('#p2-wins').text(playerTwo.wins);
            playerOne.loses += 1;
            $('#p1-loses').text(playerOne.loses);
        }
        $('.player-turn').hide();
        $('.winner').text(playerTurn.name + ' Wins!').show();
        $('#result').show();

        //add one to total games
        totalGames += 1;
        $('.total-games').text(totalGames);

        savePlayerStats();
    }
}

//Play Again
$('#play-again').on('click', function(){
    $('#result').hide();

    //clear all squares
    $('.flex-box').text('').removeClass('disabled bg-teal');

    //reset turn count
    turns = 0;

    assignPlayers();
})

//New Players
$('#new-players').on('click', function(){
    //delete local storage
    localStorage.removeItem('playerOne');
    localStorage.removeItem('playerTwo');
    localStorage.removeItem('draws');
    localStorage.removeItem('totalGames');

    //reset variables
    totalGames = 0;
    draws = 0;
    playerOne = {
        name: 'Player One',
        assigned: null,
        wins: 0,
        loses: 0
    };
    playerTwo = {
        name: 'Player Two',
        assigned: null,
        wins: 0,
        loses: 0
    };

    //reload game
    window.location.reload();
})