//gameboard / game manager class
class Gameboard
{
    //positions for each column (x) and row (y) positions
    positions = [
        [148, 332, 516, 694, 884, 1068, 1246], //x positions  
        [313.24, 500.24, 686.24, 872.24, 1058.24, 1244.24, 1430.24] //y positions
    ];

    //occupancy of the board
    occupation = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ];

    //current player turn
    playerTurn = 0;
    
    //the index of the current token to be used out of the pool
    currentToken = 0;

    //token objects from document
    tokens = document.getElementsByClassName("cls-1");

    //wincheck class instance
    WinCheckManager;

    //animation manager isntance
    animManager;

    //if the player has won
    playerWon = false;

    //constructor
    constructor()
    {
    }

    //Adds a token to the designated slot
    AddToken(value)
    {
        //prevents new tokens from being placed if a player has won
        if(this.playerWon) return;

        let x = value - 1;
        let y = -1;
        let spotFound = false;

        //finds the next available spot in the column
        for(let i = 0; i < 7; i++)
        {
            if(!spotFound)
            {
                if(this.occupation[x][i] != null)
                {
                    y = i - 1;
                    spotFound = true;
                } else if(i == 6) {
                    y = i;
                }
            }
        }

        //if there are no tokens in the column
        if(this.occupation[x][0] == null)
        {
            //select the correct color and assign a team
            let fillColor = (this.playerTurn == 0) ? "#fc031c" : "#0000ff";

            this.tokens[this.currentToken].style.fill = fillColor;
            
            this.tokens[this.currentToken].setAttribute("cx", this.positions[0][x]);
            this.tokens[this.currentToken].setAttribute("cy", -150);
            this.tokens[this.currentToken].setAttribute("val", this.playerTurn);

            //occupies the space in the occupation array with the token object reference
            this.occupation[x][y] = this.tokens[this.currentToken];

            //drops the token in the animation manager with the target y position
            this.animManager.DropToken(this.tokens[this.currentToken], this.positions[1][y]);

            //increment token pool index
            this.currentToken++;
        
            //current player turn decision
            this.playerTurn = (this.playerTurn == 0) ? 1 : 0;

            //checks for a win, and changes the banner and text based on the turn
            this.animManager.ChangeTurn(this.playerTurn, this.WinCheckManager.checkWin(), this.WinCheckManager.winningSpots);          
        }
    }

    //resets the board and variables
    ResetBoard()
    {
        //for each column
        for(let i = 0; i < 7; i++)
        {
            //for each row
            for(let k = 0; k < 7; k++)
            {
                //if it's not null
                if(this.occupation[i][k] != null)
                {
                    //move that token back to the top
                    this.animManager.MoveTokenBack(this.occupation[i][k]);
                }
            }
        }
        
        //reset variables to defualt values
        this.currentToken = 0;
        this.playerWon = false;
        this.playerTurn = 0;
        this.occupation = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
        ];

        //reset the banner to say which turn it is
        this.animManager.ResetBanner();

        //resets the stroke of the winning tokens
        for(let i = 0; i < 4; i++)
        {
            this.WinCheckManager.winningSpots[i].setAttribute("r", 89);

            this.WinCheckManager.winningSpots[i].style.strokeOpacity = 0;
        }
    }
}

//class to handle win condition checks
class WinCheck
{
    //class instance variables
    GameboardInstance;
    animManager;
    winningSpots;

    //sets class instance references
    constructor(GameboardInstance, animManager)
    {
        this.GameboardInstance = GameboardInstance;
        this.animManager = animManager;
        this.winningSpots = [null, null, null, null];
    }

    //checks for a win
    checkWin()
    {
        //variables
        let numInRow = 0;
        let currColor = 0;
        let playerWon = false
        let keepGoing = true;

        //check vertical win

        //for each row
        for(let i = 0; i < 7; i++)
        {
            numInRow = 0;
            //for each spot in the row
            for(let k = 0; k < 7; k++)
            {
                //if a player has not won yet
                if(!playerWon)
                {
                    //if the spot has a token in it
                    if(this.GameboardInstance.occupation[i][k] != null)
                    {
                        //if the current token doesnt match the previous token
                        if(this.GameboardInstance.occupation[i][k].getAttribute('val') != currColor)
                        {
                            //reset num in row to 1
                            numInRow = 1;
                            
                            //change current color
                            currColor = this.GameboardInstance.occupation[i][k].getAttribute('val');
                        } else {
                            //increment number in a row
                            numInRow++;

                            //checks for if player has 4
                            playerWon = this.WinCondition(numInRow);

                            if(playerWon)
                            {
                                //sets the winning tokens
                                this.winningSpots = [
                                    this.GameboardInstance.occupation[i][k],
                                    this.GameboardInstance.occupation[i][k - 1],
                                    this.GameboardInstance.occupation[i][k - 2],
                                    this.GameboardInstance.occupation[i][k - 3]
                                ];
                            }
                        }
                    } else {
                        numInRow = 0;
                    }
                }
            }
        }
        
        //check horizontal win

        //for each row
        for(let i = 0; i < 7; i++)
        {
            numInRow = 0;
            //for each spot in the row
            for(let k = 0; k < 7; k++)
            {
                //if a player has not won yet
                if(!playerWon)
                {
                    //if it's not null
                    if(this.GameboardInstance.occupation[k][i] != null)
                    {
                        //if it's a different color from the previous piece
                        if(this.GameboardInstance.occupation[k][i].getAttribute('val') != currColor)
                        {
                            //reset num in row
                            numInRow = 1;

                            //change current clor
                            currColor = this.GameboardInstance.occupation[k][i].getAttribute('val');
                        } else {
                            //incremenet num in row
                            numInRow++;

                            //check for if player has won
                            playerWon = this.WinCondition(numInRow);

                            //set winning spots
                            if(playerWon)
                            {
                                this.winningSpots = [
                                    this.GameboardInstance.occupation[k][i],
                                    this.GameboardInstance.occupation[k - 1][i],
                                    this.GameboardInstance.occupation[k - 2][i],
                                    this.GameboardInstance.occupation[k - 3][i]
                                ];
                            }
                        }
                    } else {
                        numInRow = 0;
                    }
                }
            }
        }
        
        //check diagonal
        //forward slash
        //for each row
        for(let i = 3; i < 7; i++)
        {
            //for each spot in each row
            for(let k = 0; k < 4; k++)
            {
                //Check the four to the bottom left
                if(this.GameboardInstance.occupation[i][k] != null && !playerWon)
                {
                    numInRow = 0;
                    keepGoing = true;
                    currColor = this.GameboardInstance.occupation[i][k].getAttribute('val');

                    //for each possible piece, if it's not null, chick the four pieces to the bottom left to see if they all match
                    for(let p = 0; p < 4; p++)
                    {
                        if(this.GameboardInstance.occupation[i - p][k + p] != null)
                        {
                            if(keepGoing && this.GameboardInstance.occupation[i - p][k + p].getAttribute('val') == currColor)
                            {
                                numInRow++;

                                //check if player has won
                                playerWon = this.WinCondition(numInRow);

                                //set winning pieces
                                if(playerWon)
                                {
                                    this.winningSpots = [
                                        this.GameboardInstance.occupation[i][k],
                                        this.GameboardInstance.occupation[i - 1][k + 1],
                                        this.GameboardInstance.occupation[i - 2][k + 2],
                                        this.GameboardInstance.occupation[i - 3][k + 3]
                                    ];
                                }
                            } else {
                                keepGoing = false;
                            }
                        } else {
                            keepGoing = false;
                        }
                    }
                }
            }
        }

        //back slash
        //for each row
        for(let i = 0; i < 4; i++)
        {
            //for each spot in each row
            for(let k = 0; k < 4; k++)
            {
                //Check the four to the bottom left
                //for each possible piece, if it's not null, chick the four pieces to the bottom right to see if they all match
                if(this.GameboardInstance.occupation[i][k] != null && !playerWon)
                {
                    numInRow = 0;
                    keepGoing = true;
                    currColor = this.GameboardInstance.occupation[i][k].getAttribute('val');

                    for(let p = 0; p < 4; p++)
                    {
                        if(this.GameboardInstance.occupation[i + p][k + p] != null)
                        {
                            //if the next piece matches
                            if(keepGoing && this.GameboardInstance.occupation[i + p][k + p].getAttribute('val') == currColor)
                            {
                                numInRow++;

                                //check if win
                                playerWon = this.WinCondition(numInRow);

                                //set winning pieces
                                if(playerWon)
                                {
                                    this.winningSpots = [
                                        this.GameboardInstance.occupation[i][k],
                                        this.GameboardInstance.occupation[i + 1][k + 1],
                                        this.GameboardInstance.occupation[i + 2][k + 2],
                                        this.GameboardInstance.occupation[i + 3][k + 3]
                                    ];
                                }
                            } else {
                                keepGoing = false;
                            }
                        } else {
                            keepGoing = false;
                        }
                    }
                }
            }
        }

        //set it in gameboard instance
        this.GameboardInstance.playerWon = playerWon;

        //return true if a player won, and false if not
        if(playerWon)
        {
            return true;
        } else {
            return false;
        }
    }

    //checks if a player has four
    WinCondition(numInRow)
    {
        if(numInRow == 4)
        {
            return true;
        } else {
            return false;
        }
    }
}

//class to handle animation
class AnimationManager
{
    announcementText;
    announceBox;

    //sets the document element variables
    constructor(announcementText, announceBox)
    {
        this.announcementText = announcementText;
        this.announceBox = announceBox;
    }

    //drops a token to the target cy location
    DropToken(token, target)
    {
        let tween = gsap.to(token, {
            duration: .5,
            ease: "bounce.out",
            cy: target,
            paused: true
        });

        tween.play();
    }

    //changes the banner color and text
    ChangeTurn(newTurn, playerWon, winningSpots)
    {
        let newText;
        let newTextColor;
        let newBoxColor;

        //if a player has won
        if(playerWon)
        {
            newTurn = (newTurn == 0) ? 1 : 0;

            //show which player won
            newText = (newTurn == 0) ? "Red has won!" : "Blue has won!";

            //mark the winning pieces with a green outline
            for(let i = 0; i < 4; i++)
            {
                winningSpots[i].setAttribute("r", 70);

                winningSpots[i].style.stroke = "#46eb34";
                winningSpots[i].style.strokeOpacity = 1;
                winningSpots[i].style.strokeWidth = "50px";
            }
        } else {
            //set banner text to next players turn
            newText = (newTurn == 0) ? "Red's turn" : "Blue's turn";
        }

        //set banner background color
        newTextColor = (newTurn == 0) ? "#d10011" : "#0010bd";
        newBoxColor = (newTurn == 0) ? "#ffb0b0" : "#a6adff";

        //set the stuff
        this.announcementText.innerHTML = newText;
        this.announcementText.style.color = newTextColor;
        this.announceBox.style.backgroundColor = newBoxColor;
    }

    //moves a token back to the top after the board is reset
    MoveTokenBack(token)
    {
        let tween = gsap.to(token, {
            duration: .5,
            ease: "power1.in",
            cy: -150,
            paused: true
        });

        tween.play();
    }

    //resets the banner to its default value
    ResetBanner()
    {
        this.announcementText.innerHTML = "Red goes first";
        this.announcementText.style.color = "#d10011";
        this.announceBox.style.backgroundColor = "#ffb0b0";
    }
}

//class instances
let myGameboard = new Gameboard();
let animManager = new AnimationManager(document.getElementById('announceText'), document.getElementById('announceBox'));
let gameWinManager = new WinCheck(myGameboard, animManager);

//sets instance references in two managers
myGameboard.WinCheckManager = gameWinManager;
myGameboard.animManager = animManager;