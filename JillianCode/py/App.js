function calculateCost() {
    let t = document.getElementById("textBox").value;
    let h = document.getElementById("HeaderThing");
    let sG = document.getElementById("sG");
    let sB = document.getElementById("sB");
    let sA = document.getElementById("sA");
    let uG = document.getElementById("uG");
    let uB = document.getElementById("uB");
    let uA = document.getElementById("uA");
    let us = document.getElementById("us");

    let sbox = document.getElementById("1");
    let ubox = document.getElementById("2");

    sbox.id = "salBox";
    ubox.id = "usBox";

    
    let ors = {};
    ors = document.getElementsByClassName("or");

    for(let i = 0; i < 4; i++) {
        ors[i].innerHTML = "or";
    }

    us.innerHTML = "While in the US you could get";

    let wage = parseFloat(t);
    let wage_grape = (Math.floor(wage / 12)).toString();
    let wage_bellpepper = (Math.floor(wage / 5.25)).toString();
    let wage_apple = (Math.floor(wage / 1)).toString();

    h.innerHTML = "For $" + wage.toString() + " in San Salvador you can buy:";
    sG.innerHTML = wage_grape + " bags of grapes";
    sB.innerHTML = wage_bellpepper + " bell peppers";
    sA.innerHTML = wage_apple + " apples";

    wage_grape = (Math.floor(wage / 4.33)).toString();
    wage_bellpepper = (Math.floor(wage / 0.78)).toString();
    wage_apple = (Math.floor(wage / 0.39)).toString();

    uG.innerHTML = wage_grape + " bags of grapes";
    uB.innerHTML = wage_bellpepper + " bell peppers";
    uA.innerHTML = wage_apple + " apples";
}