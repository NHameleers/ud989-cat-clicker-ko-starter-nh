// a cat object
function cat(name, imageUrl) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.counter = 0;
}

// let's get some cats
var cat1 = new cat("Murca", "http://placekitten.com/300");
var cat2 = new cat("Herman", "http://placekitten.com/301");

// put them in an array together
var cats = [cat1, cat2];
// and give them a nice window to show themselves
var catSection = document.getElementById("cats");

// Let's do some stuff for each cat!
cats.forEach(function(cat){
    // one div for each cat
    var catDiv = document.createElement("div");

    // create the scoreboard
    var score = document.createElement("h2");
    score.innerHTML = "You clicked " + cat.name + " " + cat.counter + " times!";

    // get the cat-image and...
    var catImage = document.createElement("img");
    catImage.src = cat.imageUrl;
    // ...make it clickable
    catImage.addEventListener("click", function(){
    cat.counter++;
    score.innerHTML = "You clicked " + cat.name + " " + cat.counter + " times!";
    }, false);

    // add image and score to the catDiv
    catDiv.appendChild(catImage);
    catDiv.appendChild(score);
    catDiv.className = 'cat-div';
    // and the catDiv to the catSection
    catSection.appendChild(catDiv);
});