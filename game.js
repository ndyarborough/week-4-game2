$(document).ready(function () {

	var yoda = {
		health: 100,
		attack: 10,
		counterAttack:25
	}

	var luke = {
		health: 80,
		attack: 15,
		counterAttack:20
	}
	
	var maul = {
		health: 175,
		attack: 20,
		counterAttack:20
	}

	var hans = {
		health: 125,
		attack: 15,
		counterAttack:20
	}	


	var heroClicked;
	var enemyClicked;
	var characterChosen = false;
	var enemyChosen = false;
	$("#yodaHealth").text(yoda.health);
	$("#lukeHealth").text(luke.health);
	$("#maulHealth").text(maul.health);
	$("#hansHealth").text(hans.health);
	
	$(".character-box").on("click", function() {
		 heroClicked = $(this).children("h2").text().toLowerCase();

		 if(characterChosen === false) {
			$(".hero-div").append($(this));
			characterChosen = true;
			$(".character-header").text("You picked " + $(this).children("h2").text() + "!");
			$(".character-div").addClass("enemies").insertBefore($(".enemy-div"));
			$(".character-div").children().addClass("enemy");
			$("<h2 class='enemy-header'>Select an enemy to fight...</h2>").insertBefore($(".enemies"));
		}
	});

	 // Has to be called in this manner because it is selecting dynamically created html
	$(document.body).on('click', '.enemy' ,function(){
		enemyClicked = $(this).children("h2").text().toLowerCase();
		
		if(enemyChosen === false) {
			$(".enemy-div").append($(this));
			$(".enemy-header").text("Prepare to fight " + $(this).children("h2").text() + "...");
			$(".character-div.enemies").detach();
			enemyChosen = true;
		}

		if(enemyChosen = true) {
			$(".hero-div").appendTo($(".fight-div"));
			$(".enemy-div").appendTo($(".fight-div"));
			$(".fight-div").css("padding","15vh 15vw");
			$(".character-box").css({"width":"30vw", "height":"45vh", "margin":"0 1vw", "font-size":"1.5em"})
			$("<button class='attack-button'>Attack</button>").insertAfter($(".fight-div"));
			$(".enemy-header").remove();
			$(".main-header").remove();
			$(".character-header").remove();
		}
	});

$(document.body).on('click', '.attack-button' ,function(){
			if($(".hero-div").children(".character-box").hasClass("yoda")) {
				$(".enemy").children("h4").text($(".enemy").children("h4").text() - yoda.attack);
			}
			if($(".hero-div").children(".character-box").hasClass("luke")) {
				$(".enemy").children("h4").text($(".enemy").children("h4").text() - luke.attack);
			}
			if($(".hero-div").children(".character-box").hasClass("maul")) {
				$(".enemy").children("h4").text($(".enemy").children("h4").text() - maul.attack);
			}
			if($(".hero-div").children(".character-box").hasClass("hans")) {
				$(".enemy").children("h4").text($(".enemy").children("h4").text() - hans.attack);
			}
		})



}); //document.ready
