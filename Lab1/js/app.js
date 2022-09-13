class RandomPicker {
    items

    constructor(items) {
        this.items = items;
    }

    pickRandom() {
        return this.items[Math.floor(Math.random() * this.items.length)];
    }
    
}

class MagicEight extends RandomPicker {
    outputElement

    constructor(element) {
        super(["It is certain", "Ask again later", "perhaps", "very doubtful"]);
        this.outputElement = element;
    }

    shake() {
        let reply = this.pickRandom();
        this.outputElement.innerHTML = reply;
    }
}

let myEightBall = new MagicEight(document.getElementById("magicResponse"));
myEightBall.shake();