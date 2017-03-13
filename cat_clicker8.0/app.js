var model = {
    cats: [],
    generateCats: function(n){
        for (var i = 0; i < n; i++) {
            cat = {
                name: "Cute Cat " + i,
                imageUrl: "http://placekitten.com/" + Math.round(Math.random()*400 + 200),
                score: 0
            }
            model.cats.push(cat);            
        }
    },
    catToDisplay: {},
    adminStatus: ""
};

var controller = {
    init: function() {
        // model.init()
        model.generateCats(5);
        model.catToDisplay = model.cats[0];
        model.adminStatus = "hidden";
        viewDisplay.init()
        viewList.init()
    },
    incrementScore : function() {
        // tell model to update.
        model.catToDisplay.score++;
        // and re-render the viewDisplay
        viewDisplay.render()
    },
    getCats: function() {
        return model.cats;
    },
    setCatToDisplay: function(cat) {
        model.catToDisplay = cat;
        viewDisplay.render();
    },
    getCatToDisplay: function() {
        return model.catToDisplay;
    },
    getAdminStatus: function() {
        return model.adminStatus;
    },
    toggleAdminStatus: function() {
        if (model.adminStatus === "hidden") {
            model.adminStatus = "visible";
        }
        else {
            model.adminStatus = "hidden";
        }
        viewDisplay.render();
    }
};

var viewDisplay = {
    init: function() {
        // mainCat's name, image and score.
        this.mainCatName = document.getElementById("cat-name");
        this.mainCatImage = document.getElementById("cat-image");
        this.mainCatScore = document.getElementById("score");
        // the admin form and it's buttons
        this.adminForm = document.getElementById("admin-form");
        this.adminButton = document.getElementById("admin-button");
        this.adminSaveButton = document.getElementById("admin-save-button");
        this.adminCancelButton = document.getElementById("admin-cancel-button");
        // and it's inputs
        this.mainCatNameInput = document.getElementById("name-input");
        this.mainCatImageInput = document.getElementById("image-url-input");
        this.mainCatScoreInput = document.getElementById("score-input");
        // hide the admin-form
        this.adminForm.style.visibility = controller.getAdminStatus();

        // event listener for mainCat
        this.mainCatImage.addEventListener("click", function(){
            controller.incrementScore()
        }, false);

        // Add event listeners to admin buttons.
        this.adminButton.addEventListener("click", function() {
            controller.toggleAdminStatus();
        }, false);
        this.adminCancelButton.addEventListener("click", function() {
            controller.toggleAdminStatus();
        }, false);
        // TODO: Save the new name, img and score for the cat. NOT WORKING!
        // updates to the new values for a moment, but then renders and gives back the original values.
        this.adminSaveButton.addEventListener("click", function() {
            var newCat = {
                name: viewDisplay.mainCatNameInput.value,
                imageUrl: viewDisplay.mainCatImageInput.value,
                score: viewDisplay.mainCatScoreInput.value
            };
            controller.setCatToDisplay(newCat);
        }, false);

        this.render();
    },
    render: function() {
        var catToDisplay = controller.getCatToDisplay();
        this.mainCatName.innerHTML = catToDisplay.name;
        this.mainCatImage.src = catToDisplay.imageUrl;
        var scoreMessage = "You clicked " + catToDisplay.name + " " + catToDisplay.score + " times!";
        this.mainCatScore.innerHTML = scoreMessage; 

        this.mainCatNameInput.value = catToDisplay.name;
        this.mainCatImageInput.value = catToDisplay.imageUrl;
        this.mainCatScoreInput.value = catToDisplay.score;

        this.adminForm.style.visibility = controller.getAdminStatus();
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
