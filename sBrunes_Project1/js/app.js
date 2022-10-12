class Gameboard
{
    positions = [
        [148, 332, 516, 694, 884, 1068, 1246], //x positions  
        [313.24, 500.24, 686.24, 872.24, 1058.24, 1244.24, 1430.24] //y positions
    ];

    //vacancy for each position on the board
    occupation = [
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1],
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
                if(this.occupation[x][i] > -1)
                {
                    y = i - 1;
                    spotFound = true;
                } else if(i == 6) {
                    y = i;
                }
            }
        }

        //animate the thingy


        if(this.occupation[x][0] == -1)
        {
            //select the correct color and assign a team
            let fillColor = (this.playerTurn == 0) ? "#fc031c" : "#0000ff";

            this.tokens[this.currentToken].style.fill = fillColor;
            
            this.tokens[this.currentToken].setAttribute("cx", this.positions[0][x]);
            this.tokens[this.currentToken].setAttribute("cy", this.positions[1][y]);

            this.occupation[x][y] = this.playerTurn;

            this.animManager.DropToken(this.tokens[this.currentToken]);

            this.currentToken++;
        
            this.playerTurn = (this.playerTurn == 0) ? 1 : 0;

            this.WinCheckManager.checkWin();

            this.animManager.ChangeTurn(this.playerTurn);
        }
    }
}

class WinCheck
{
    GameboardInstance;

    constructor(GameboardInstance)
    {
        this.GameboardInstance = GameboardInstance;
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
                    if(this.GameboardInstance.occupation[i][k] != currColor && this.GameboardInstance.occupation[i][k] != -1)
                    {
                        numInRow = 1;

                        currColor = this.GameboardInstance.occupation[i][k];
                    } else {
                        if(this.GameboardInstance.occupation[i][k] != -1)
                        {
                            numInRow++;

                            playerWon = this.WinCondition(numInRow);
                        } else {
                            numInRow = 0;
                        }
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
                    if(this.GameboardInstance.occupation[k][i] != currColor && this.GameboardInstance.occupation[k][i] != -1)
                    {
                        numInRow = 1;

                        currColor = this.GameboardInstance.occupation[k][i];
                    } else {
                        if(this.GameboardInstance.occupation[k][i] != -1)
                        {
                            numInRow++;

                            playerWon = this.WinCondition(numInRow);
                        } else {
                            numInRow = 0;
                        }
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
                if(i == 6 && k == 0)
                {
                    keepGoing = true;
                    console.log("currCOlor: " + currColor);
                    console.log(this.GameboardInstance.occupation[i][k]);

                    for(let p = 0; p < 4; p++)
                    {
                        if(keepGoing && this.GameboardInstance.occupation[i - p][k + p] == currColor)
                        {
                            console.log(this.GameboardInstance.occupation[i - p][k + p] + "  p = " + p);
                        } else {
                            keepGoing = false;
                        }
                    }
                }
                //Check the four to the bottom left
                if(this.GameboardInstance.occupation[i][k] != -1)
                {
                    numInRow = 0;
                    keepGoing = true;
                    currColor = this.GameboardInstance.occupation[i][k];

                    for(let p = 0; p < 4; p++)
                    {
                        if(keepGoing && this.GameboardInstance.occupation[i - p][k + p] == currColor)
                        {
                            numInRow++;

                            if(!playerWon)
                            {
                                playerWon = this.WinCondition(numInRow);
                            }

                            if(i == 6 && k == 0)
                            {
                                console.log("Num in row: " + numInRow);
                                console.log("Player won? " + playerWon);
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
                if(i == 6 && k == 0)
                {
                    keepGoing = true;
                    console.log("currCOlor: " + currColor);
                    console.log(this.GameboardInstance.occupation[i][k]);

                    for(let p = 0; p < 4; p++)
                    {
                        if(keepGoing && this.GameboardInstance.occupation[i - p][k + p] == currColor)
                        {
                            console.log(this.GameboardInstance.occupation[i - p][k + p] + "  p = " + p);
                        } else {
                            keepGoing = false;
                        }
                    }
                }
                //Check the four to the bottom left
                if(this.GameboardInstance.occupation[i][k] != -1)
                {
                    numInRow = 0;
                    keepGoing = true;
                    currColor = this.GameboardInstance.occupation[i][k];

                    for(let p = 0; p < 4; p++)
                    {
                        if(keepGoing && this.GameboardInstance.occupation[i + p][k + p] == currColor)
                        {
                            numInRow++;

                            if(!playerWon)
                            {
                                playerWon = this.WinCondition(numInRow);
                            }

                            if(i == 6 && k == 0)
                            {
                                console.log("Num in row: " + numInRow);
                                console.log("Player won? " + playerWon);
                            }
                        } else {
                            keepGoing = false;
                        }
                    }
                }
            }
        }

        this.GameboardInstance.playerWon = playerWon;

        if(playerWon)
        {
            console.log("Player " + currColor + "won!");
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
        
        //TweenMax.from(token, {duration: 10, cy: 0});
        console.log(token);
        //token.setAttribute("cx", 0);
    }

    ChangeTurn(newTurn)
    {
        let newText = (newTurn == 0) ? "Red's turn" : "Blue's turn";
        let newTextColor = (newTurn == 0) ? "#d10011" : "#0010bd";
        let newBoxColor = (newTurn == 0) ? "#ffb0b0" : "#a6adff";

        this.announcementText.innerHTML = newText;
        this.announcementText.style.color = newTextColor;
        this.announceBox.style.backgroundColor = newBoxColor;
    }
}

let myGameboard = new Gameboard();
let gameWinManager = new WinCheck(myGameboard);
let animManager = new AnimationManager(document.getElementById('announceText'), document.getElementById('announceBox'));
myGameboard.WinCheckManager = gameWinManager;
myGameboard.animManager = animManager;