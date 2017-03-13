var model = {
    cats: [],
    generateCats: function(n){
        for (var i = 0; i < n; i++) {
            cat = {
                name: "Cute Cat " + i,
                imageUrl: "http://placekitten.com/" + Math.round(Math.random()*400 + 200),
                counter: 0
            }
            model.cats.push(cat);            
        }
    },
    catToDisplay: {}
};

var controller = {
    init: function() {
        // model.init()
        model.generateCats(5);
        model.catToDisplay = model.cats[0];
        viewDisplay.init()
        viewList.init()
    },
    incrementScore : function() {
        // tell model to update.
        model.catToDisplay.counter++;
        // and re-render the viewDisplay
        viewDisplay.render()
    },
    getCats: function() {
        return model.cats;
    },
    setCatToDisplay: function(cat) {
        model.catToDisplay = cat;
    },
    getCatToDisplay: function() {
        return model.catToDisplay;
    }
};

var viewDisplay = {
    init: function() {
        this.mainCatName = document.getElementById('cat-name');
        this.mainCatImage = document.getElementById("cat-image");
        this.mainCatScore = document.getElementById("score");

        this.mainCatImage.addEventListener("click", function(){
            controller.incrementScore()
        }, false);

        this.render();
    },
    render: function() {
        var catToDisplay = controller.getCatToDisplay();
        this.mainCatName.innerHTML = catToDisplay.name;
        this.mainCatImage.src = catToDisplay.imageUrl;
        var scoreMessage = "You clicked " + catToDisplay.name + " " + catToDisplay.counter + " times!";
        this.mainCatScore.innerHTML = scoreMessage; 
    }
};

var viewList = {
    init: function() {
        // --- The Cat List ---
        // Let's make the cat-list!
        var cats = controller.getCats()

        cats.forEach(function(cat){
            // one div for each cat
            var catDiv = document.createElement("div");
            var catName = document.createElement("h4");
            catName.innerHTML = cat.name;

            // get the cat-image and...
            var catImage = document.createElement("img");
            catImage.src = cat.imageUrl;

            // ...when it's clicked
            catImage.addEventListener("click", function(){
                controller.setCatToDisplay(cat);
                viewDisplay.render();
            }, false);

            // add name image to the catDiv
            catDiv.appendChild(catName);
            catDiv.appendChild(catImage);
            catDiv.className = 'cat-div';
            // and the catDiv to the catSection
            var catList = document.getElementById("cat-list");
            catList.appendChild(catDiv);
        });
    }


};

controller.init()
