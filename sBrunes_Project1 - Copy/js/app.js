let currentToken = 0;

const tokens = document.getElementsByClassName("cls-1");

let positions = [
    [148, 332, 516, 694, 884, 1068, 1246], //x positions  
    [313.24, 500.24, 686.24, 872.24, 1058.24, 1244.24, 1430.24], //y positions
];

//vacancy for each position on the board
let occupation = [
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1],
];

function AddToken(value)
{
    x = value - 1;
    y = -1;
    spotFound = false;

    for(i = 0; i < 7; i++)
    {
        if(!spotFound && occupation[x][0] != -1)
        {
            if(occupation[x][i] > -1)
            {
                y = i - 1;
                spotFound = true;
            } else if(i == 6) {
                y = i;
            }
        }
    }

    //animate the thingy

    if(occupation[x][0] != -1)
    {
        //select the correct color and assign a team
        tokens[currentToken].style.fill = "#000";
        
        tokens[currentToken].setAttribute("cx", positions[0][x]);
        tokens[currentToken].setAttribute("cy", positions[1][y]);

        occupation[x][y] = 0;

        currentToken++;
    }
}