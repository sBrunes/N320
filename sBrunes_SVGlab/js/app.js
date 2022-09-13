//class that contains the logic for the game
class Game
{
    //class properties
    foundCircles = 0;
    totalCircles = 0;
    searchColor = "#99FF00";
    normalColor = "#7700AA";
    gameZone = document.getElementById("gameZone");
    foundBar = new FoundBar();

    constructor()
    {
        //make the circles
        for(var i = 0; i < 25; i++)
        {
            new gameCircle(this.foundBar, this.gameZone, this);
        }
    }
}

//class for the circle objects
class gameCircle
{
    foundBar;
    gameZone;
    newCirc;
    gameInstance;

    //takes in the percent bar, gamezone, and game instance as parameters for the constructor
    constructor(pBar, gameZone, gameInstance)
    {
        this.foundBar = pBar;
        this.gameZone = gameZone;
        this.gameInstance = gameInstance;
    
        //create the circle
        this.newCirc = document.createElementNS("http://www.w3.org/2000/svg", "circle");

        this.newCirc.classList.add("gameCirc");
        this.newCirc.setAttribute("cx", Math.random() * 400);
        this.newCirc.setAttribute("cy", Math.random() * 400);

        //randomly choose what reveal color the circle is
        if(Math.random() < .3)
        {
            this.newCirc.dataset.hiddenColor = gameInstance.searchColor;
            gameInstance.totalCircles ++;
        } else {
            this.newCirc.dataset.hiddenColor = gameInstance.normalColor;
        }

        //mouse events
        //on mouse voer, show thie hidden color in the data hidden color attribute
        this.newCirc.addEventListener("mouseover", (event) => {
            event.target.style.fill = this.newCirc.dataset.hiddenColor;
        });

        this.newCirc.addEventListener("mouseout", (event) => {
            event.target.style.fill = "#000";
        });

        console.log(this.newCirc.dataset.hiddenColor);

        this.newCirc.addEventListener("click", (event) => {
            //if the user clicked on something with the looking for color
            if(event.target.dataset.hiddenColor == gameInstance.searchColor)
            {
                event.target.remove();

                //store how many have been clicked on 
                gameInstance.foundCircles++;

                //update the found UI
                this.foundBar.SetPercent(gameInstance.foundCircles / gameInstance.totalCircles);
            }
        });

        //add circle to the screen
        this.gameZone.appendChild(this.newCirc);
    }
}

//class for the percent bar at the bottom
class FoundBar
{
    element = document.getElementById("foundBar")
    maxsize = 130;
    percent = 0;

    SetPercent(percent)
    {
        //sets the percentage of the max size based on current collected circles
        this.percent = percent;
        this.element.setAttribute("width", this.percent * this.maxsize);
    }
}

//Game instance
let g = new Game();