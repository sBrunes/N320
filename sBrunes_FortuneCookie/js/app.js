class RandomFortune
{
    items

    //makes items an array of strings for possible fortunes
    constructor(items)
    {
        this.items = items;
    }

    //Selects a random fortune from items
    pickFortune() 
    {
        return this.items[Math.floor(Math.random() * this.items.length)];
    }
}

//Class that inherits from the randomfortune class
class FortuneCookie extends RandomFortune
{
    outElement

    canOpen;

    //gets the list of possible responses and gets the text in the div for the response
    constructor(items, outElement) 
    {
        super(items);
        this.outElement = outElement;
    }

    //sets the text in the div to the fortune text, and changes canopen to false
    open() 
    {
        if(this.canOpen)
        {
            let reply = "*crunch*" + this.pickFortune();
            this.outElement.innerHTML = reply;
            this.canOpen = false;
        }
    }

    //Changes the text in the div and sets canopen back to true
    reset() 
    {
        if(!this.canOpen)
        {
            this.canOpen = true;
            this.outElement.innerHTML = "Please open your cookie";
        }
    }

    // pickFortune() 
    // {
    //     return this.items[Math.floor(Math.random() * this.items.length)];
    // }

    canOpen = true;
}

//array of possible fortunes given to the user
let replies = ["You will have a pleasant lunch tomorrow", "Your next restaraunt order will be over-salted", "A wizard will cross your path sometime within the next two months", "Mathew Powers will leave the doorstopper from 255 in the middle of the hallway, which you will eventually trip over", "Remember to tie your shoes or they will cause you to lose money on all of your future investments", "The next show you watch will have a disappointing season finale", "If you run for mayor within the next 10 years, you will win"];

//creates a new FortuneCookie object
let newCookie = new FortuneCookie(replies, document.getElementById("FortunePrompt"));