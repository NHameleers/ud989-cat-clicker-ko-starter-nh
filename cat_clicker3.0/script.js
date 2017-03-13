// a cat object
function cat(name, imageUrl) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.counter = 0;
}

// let's get some cats
var cat1 = new cat("Murca", "http://placekitten.com/300");
var cat2 = new cat("Herman", "http://placekitten.com/300/301");
var cat3 = new cat("Miep", "http://placekitten.com/301");
var cat4 = new cat("Sjaak", "http://placekitten.com/301/302");
var cat5 = new cat("Flip", "http://placekitten.com/302");

// put them in an array together
var cats = [cat1, cat2, cat3, cat4, cat5];

// and give them some spaces to show themselves
var catSection = document.getElementById("cats");
var catList = document.getElementById("cat-list");
var catDisplay = document.getElementById("cat-display");
var catToDisplay = cat1;

var displayCat = function(){
// --- The Cat Display ---
var mainCatDiv = document.createElement("div");
mainCatDiv.className = "cat-div";
var mainCatName = document.createElement("h2");
mainCatName.innerHTML = catToDisplay.name;
var mainCatImage = document.createElement("img");
mainCatImage.src = catToDisplay.imageUrl;
mainCatImage.style.width = "50%";
mainCatImage.style.height = "auto";
mainCatImage.addEventListener("click", function(){
    catToDisplay.counter++;
    score.innerHTML = "You clicked " + catToDisplay.name + " " + catToDisplay.counter + " times!";
}, false);
// create the scoreboard
var score = document.createElement("h3");
score.innerHTML = "You clicked " + catToDisplay.name + " " + catToDisplay.counter + " times!";
// and make them visible in the cat-display
mainCatDiv.appendChild(mainCatName)
mainCatDiv.appendChild(mainCatImage)
mainCatDiv.appendChild(score);
catDisplay.appendChild(mainCatDiv);

}

// --- The Cat List ---
// Let's make the cat-list!
cats.forEach(function(cat){
    // one div for each cat
    var catDiv = document.createElement("div");
    var catName = document.createElement("h2");
    catName.innerHTML = cat.name;

    // get the cat-image and...
    var catImage = document.createElement("img");
    catImage.src = cat.imageUrl;

    // ...when it's clicked
    catImage.addEventListener("click", function(){
        catDisplay.innerHTML = '';
        catToDisplay = cat;
        catToDisplay.counter++;
        displayCat();
    }, false);

    // add name image to the catDiv
    catDiv.appendChild(catName);
    catDiv.appendChild(catImage);
    catDiv.className = 'cat-div';
    // and the catDiv to the catSection
    catList.appendChild(catDiv);
});

