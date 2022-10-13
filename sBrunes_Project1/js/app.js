class Gameboard
{
    positions = [
        [148, 332, 516, 694, 884, 1068, 1246], //x positions  
        [313.24, 500.24, 686.24, 872.24, 1058.24, 1244.24, 1430.24] //y positions
    ];

    //vacancy for each position on the board
    // occupation = [
    //     [-1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1],
    //     [-1, -1, -1, -1, -1, -1, -1],
    // ];

    occupation = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ];

    playerTurn = 0;
    
    //the index of the current token to be used out of the pool
    currentToken = 0;

    tokens = document.getElementsByClassName("cls-1");

    WinCheckManager;

    animManager;

    playerWon = false;

    constructor()
    {
    }

    AddToken(value)
    {
        //prevents new tokens from being placed if a player has won
        if(this.playerWon) return;

        let x = value - 1;
        let y = -1;
        let spotFound = false;

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

        //animate the thingy


        if(this.occupation[x][0] == null)
        {
            //select the correct color and assign a team
            let fillColor = (this.playerTurn == 0) ? "#fc031c" : "#0000ff";

            this.tokens[this.currentToken].style.fill = fillColor;
            
            this.tokens[this.currentToken].setAttribute("cx", this.positions[0][x]);
            this.tokens[this.currentToken].setAttribute("cy", this.positions[1][y]);
            this.tokens[this.currentToken].setAttribute("val", this.playerTurn);

            this.occupation[x][y] = this.tokens[this.currentToken];

            this.animManager.DropToken(this.tokens[this.currentToken]);

            this.currentToken++;
        
            this.playerTurn = (this.playerTurn == 0) ? 1 : 0;

            this.animManager.ChangeTurn(this.playerTurn, this.WinCheckManager.checkWin(), this.WinCheckManager.winningSpots);
                            
        }
    }
}

class WinCheck
{
    GameboardInstance;
    animManager;
    winningSpots;

    constructor(GameboardInstance, animManager)
    {
        this.GameboardInstance = GameboardInstance;
        this.animManager = animManager;
        this.winningSpots = [null, null, null, null];
    }

    checkWin()
    {
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
                if(!playerWon)
                {
                    if(this.GameboardInstance.occupation[i][k] != null)
                    {
                        if(this.GameboardInstance.occupation[i][k].getAttribute('val') != currColor)
                        {
                            numInRow = 1;

                            currColor = this.GameboardInstance.occupation[i][k].getAttribute('val');
                        } else {
                            numInRow++;

                            playerWon = this.WinCondition(numInRow);

                            if(playerWon)
                            {
                                console.log(this.winningSpots)

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
                        // winSpotIndex = 0;
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
                if(!playerWon)
                {
                    if(this.GameboardInstance.occupation[k][i] != null)
                    {
                        if(this.GameboardInstance.occupation[k][i].getAttribute('val') != currColor)
                        {
                            numInRow = 1;

                            currColor = this.GameboardInstance.occupation[k][i].getAttribute('val');
                        } else {
                            numInRow++;

                            playerWon = this.WinCondition(numInRow);

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

                    for(let p = 0; p < 4; p++)
                    {
                        if(this.GameboardInstance.occupation[i - p][k + p] != null)
                        {
                            if(keepGoing && this.GameboardInstance.occupation[i - p][k + p].getAttribute('val') == currColor)
                            {
                                numInRow++;

                                playerWon = this.WinCondition(numInRow);

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
                if(this.GameboardInstance.occupation[i][k] != null && !playerWon)
                {
                    numInRow = 0;
                    keepGoing = true;
                    currColor = this.GameboardInstance.occupation[i][k].getAttribute('val');

                    for(let p = 0; p < 4; p++)
                    {
                        if(this.GameboardInstance.occupation[i + p][k + p] != null)
                        {
                            if(keepGoing && this.GameboardInstance.occupation[i + p][k + p].getAttribute('val') == currColor)
                            {
                                numInRow++;

                                playerWon = this.WinCondition(numInRow);

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

        this.GameboardInstance.playerWon = playerWon;
        console.log(this.winningSpots[0]);

        if(playerWon)
        {
            return true;
        } else {
            return false;
        }
    }

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

class AnimationManager
{
    announcementText;
    announceBox;

    constructor(announcementText, announceBox)
    {
        this.announcementText = announcementText;
        this.announceBox = announceBox;
    }

    DropToken(token)
    {
        let tween = gsap.from(token, {
            duration: .5,
            ease: "bounce.out",
            cy: 0,
            paused: true
        });
        
        tween.play();
    }

    ChangeTurn(newTurn, playerWon, winningSpots)
    {
        let newText;
        let newTextColor;
        let newBoxColor;

        if(playerWon)
        {
            newTurn = (newTurn == 0) ? 1 : 0;

            newText = (newTurn == 0) ? "Red has won!" : "Blue has won!";

            console.log(winningSpots);

            for(let i = 0; i < 4; i++)
            {
                console.log(winningSpots[i]);

                winningSpots[i].setAttribute("r", 70);

                winningSpots[i].style.stroke = "#46eb34";
                winningSpots[i].style.strokeWidth = "50px";
            }
        } else {
            newText = (newTurn == 0) ? "Red's turn" : "Blue's turn";
        }

        newTextColor = (newTurn == 0) ? "#d10011" : "#0010bd";
        newBoxColor = (newTurn == 0) ? "#ffb0b0" : "#a6adff";

        this.announcementText.innerHTML = newText;
        this.announcementText.style.color = newTextColor;
        this.announceBox.style.backgroundColor = newBoxColor;
    }
}

let myGameboard = new Gameboard();
let animManager = new AnimationManager(document.getElementById('announceText'), document.getElementById('announceBox'));
let gameWinManager = new WinCheck(myGameboard, animManager);
myGameboard.WinCheckManager = gameWinManager;
myGameboard.animManager = animManager;