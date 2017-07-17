$(document).ready(function () {

	var yoda = {
		health: 80,
		attack: 10,
		counterAttack: 20,
		name: "#yodaHealth",
		realName: "Yoda"
	}

	var luke = {
		health: 100,
		attack: 8,
		counterAttack: 15,
		name: "#lukeHealth",
		realName: "Luke Skywalker"
	}
	
	var maul = {
		health: 150,
		attack: 10,
		counterAttack: 10,
		name: "#maulHealth",
		realName: "Darth Maul"
	}

	var hans = {
		health: 125,
		attack: 9,
		counterAttack: 15,
		name: "#hansHealth",
		realName: "Hans Solo"
	}	

	var playerList = {
		"yoda":yoda,
		"luke":luke,
		"maul":maul,
		"hans":hans
	}

	var enemyObject; // Grabs object of selected enemy
	var userObject; // Grabs object of selected user
	var buttonThere; // Prevents multiple attack buttons from appearing
	var remainingEnemies; // used to store detached enemies
	var nextEnemy;
	var attackNotes;
	var previousAttack = 0;
	var characterChosen = false;
	var enemyChosen = false;
	var fighting = false;
	$("#yodaHealth").text(yoda.health);
	$("#lukeHealth").text(luke.health);
	$("#maulHealth").text(maul.health);
	$("#hansHealth").text(hans.health);
	
	 // User selects a character card
	$(".character-box").on("click", function() {
			
		  // If you have not chosen a user character yet...
		 if(characterChosen === false) {
		 	 // Connects the object to the user via id
		 	userObject = playerList[$(this).attr("id")];
			 // Places the selected user into its own div
			$(".hero-div").append($(this));
			 // Inserts a message above the user "You picked (object.name)"$(this).children("h2").text()
			$(".character-header").text("You picked " + userObject.realName + "!");
			 // Every other character put into the enemy-div and given "enemies" class
			$(".character-div").addClass("enemies").appendTo($(".enemy-div"));
			 // Each character card in "enemies" given its own "enemy" class
			$(".character-div").children().addClass("enemy");
			$("<h2 class='enemy-header'>Select an enemy to fight...</h2>").insertBefore($(".enemies"));
			characterChosen = true;
		}
	});

	 // Selecting dynamically created html, needs $(document.body).
	 // When you select an enemy from the enemy-div
	$(document.body).on('click', '.enemy' ,function(){

		// enemyClicked = $(this).children("h2").text().toLowerCase();
		 enemyObject = playerList[$(this).attr("id")];
		 // enemyClicked = enemyObject.realName;

		if(enemyChosen === false) {
			$(".enemy-div").append($(this));
			$(".enemy-header").text("Press any key to fight " + enemyObject.realName + "...");
			 // Removes unselected enemies and saves contents
			remainingEnemies = $(".character-div.enemies").detach();
			console.log(remainingEnemies);
			enemyChosen = true;
		}

	 // Press any key to continue to fight scene
	$(document).keyup(function() {
		if (fighting === false) {
			if(enemyChosen === true) {
			    	$("<button class='attack-button'>Attack</button>").insertAfter($(".fight-div"));
					$("<p class='attackNotes'></p>").insertBefore($(".fight-div"));
			    	 // Inserts the user into fight
			    	$(".hero-div").appendTo($(".fight-div"));
				     // Gives the user card a class of hero
				    $(".hero-div").children(".character-box").addClass("hero");
				     // Inserts the selected enemy into the fight
				    $(".enemy-div").appendTo($(".fight-div"));
				     // CSS creating fight scene and enlarging character cards
				    $(".fight-div").css("padding","15vh 15vw");
				    $(".character-box").css({"width":"30vw", "height":"45vh", "margin":"0 1vw", "font-size":"1.5em"});
				   
				    $(".enemy-header").remove();
				    $(".main-header").remove();
				    $(".character-header").remove();
				}	
			fighting = true;	
			}

	});

	});

	

$(document.body).on('click','.attack-button', function(){
	// nextEnemy = $(".nextEnemy").detach();
	// attackNotes = $(".attackNotes").detach();
	$(".fight-div").prepend(attackNotes);
    $(".attackNotes").css("color","yellow");


	$(".fight-div").css("padding","0 15vw 15vh 15vw");
		 // If both the hero and enemy are still alive
		if(userObject.health > 0 && enemyObject.health > 0) {
			 // Attack notes
			$(".attackNotes").html(userObject.realName + " attacked " + enemyObject.realName + " for " + (userObject.attack + previousAttack) + " damage.<br>" + enemyObject.realName + " counter-attacked for " + enemyObject.counterAttack + " damage.") ;
 			 // Subtract user attack from enemy health, display new value to html
			enemyObject.health -= (userObject.attack + previousAttack);
			$(enemyObject.name).text(enemyObject.health);
			previousAttack += userObject.attack;
			 // Subtract enemy counter-attack from user health, display new value to html
			userObject.health -= enemyObject.counterAttack;
			$(userObject.name).text(userObject.health);
	   		
		}
		 // If the enemy dies
		if (enemyObject.health < 1) {

			 // Attack notes
			$(".attackNotes").html("You killed " + enemyObject.realName + "!");
			$(".attackNotes").css({"color":"green", "margin":"0 0vw 0 20vw"});
			$(".enemy").remove();
			$(".enemy-div").append(remainingEnemies);
			$(".character-div").children($(".character-box")).addClass("alive");
			$("<h2 class='nextEnemy'> Select your next enemy</h2>").insertAfter($(".attackNotes"));

		}
		 // If the user dies
		if (userObject.health < 1) {
			 // Attack notes
			$(".attackNotes").html("You died!");
			$(".attackNotes").css("color","red");
		}


		});

$(document.body).on('click', '.alive' , function() {		
	remainingEnemies = $(".character-div.enemies").detach();
	nextEnemy = $(".nextEnemy").detach();
	attackNotes = $(".attackNotes").detach();
	$(".enemy-div").append($(this));
	 // CSS creating fight scene and enlarging character cards
	$(".fight-div").css("padding","15vh 15vw");
	$(".character-box").css({"width":"30vw", "height":"45vh", "margin":"0 1vw", "font-size":"1.5em"});
		   
});



}); //document.ready
