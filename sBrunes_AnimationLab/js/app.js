//get all the content divs from the document
let contentDivs = document.getElementsByClassName("Contentdiv");
//gets the header from the document
let textItem = document.getElementById("titleObject");
//gets the banner from the document
let bannerItem = document.getElementsByClassName("Topdiv");
//bool to control whether or not content can be clicked once it has faded out
let clickable = true;

//Fades everything in when the page is loaded
TweenMax.from(textItem, {duration: 3, alpha: 0});
TweenMax.from(bannerItem[0], {duration: 3, alpha: 0});
for(let i = 0; i < contentDivs.length; i++)
{
    TweenMax.from(contentDivs[i], {duration: 3, alpha: 0});
}

//when an element has the mouse go over it
function highlight(id)
{
    TweenMax.to(document.getElementById(id), {duration: .35, backgroundColor: "#5afc03"});
}

//When the mosue exits an item
function deselect(id)
{
    TweenMax.to(document.getElementById(id), {duration: .35, backgroundColor: "#b917ff"});
}

//when one of the content boxes is clicked
function clicked(id)
{
    //don't let them be clicked once they start fading out
    if(clickable)
    {
        clickable = false;

        //fade out all elements
        TweenMax.to(textItem, {duration: 3, alpha: 0});
        TweenMax.to(bannerItem[0], {duration: 3, alpha: 0});
        for(let i = 0; i < contentDivs.length; i++)
        {
            TweenMax.to(contentDivs[i], {duration: 3, alpha: 0});
        }
    }
}

