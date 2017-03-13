var model = {
    cats: [],
    generateCats: function(n){
        for (var i = 0; i < n; i++) {
            cat = {
                name: model.makeName(),
                imageUrl: "http://placekitten.com/" + Math.round(Math.random()*400 + 200),
                counter: 0
            }
            model.cats.push(cat);            
        }
    },
    catToDisplay: {},
    makeName: function() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
};

var controller = {
    init: function() {
        // model.init()
        model.generateCats(50);
        model.catToDisplay = model.cats[0];
        viewDisplay.init()
        viewList.init()
    },
    mainCatClicked : function(cat) {
        // tell model to update.
        cat.counter++;
        // and re-render the viewDisplay
        viewDisplay.render()
    }
};

var viewDisplay = {
    init: function() {
        var mainCatImage = document.getElementById("cat-image");
        mainCatImage.addEventListener("click", function(){
            controller.mainCatClicked(model.catToDisplay)
        }, false);
        viewDisplay.render();
    },
    render: function() {
        document.getElementById("cat-name").innerHTML = model.catToDisplay.name;
        document.getElementById("cat-image").src = model.catToDisplay.imageUrl;
        var scoreMessage = "You clicked " + model.catToDisplay.name + " " + model.catToDisplay.counter + " times!";
        document.getElementById("score").innerHTML = scoreMessage; 
    }
};

var viewList = {
    init: function() {
        // --- The Cat List ---
        // Let's make the cat-list!
        model.cats.forEach(function(cat){
            // one div for each cat
            var catDiv = document.createElement("div");
            var catName = document.createElement("h4");
            catName.innerHTML = cat.name;

            // get the cat-image and...
            var catImage = document.createElement("img");
            catImage.src = cat.imageUrl;

            // ...when it's clicked
            catImage.addEventListener("click", function(){
                model.catToDisplay = cat;
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
