$(document).ready(function () {

	var executed = false;	
	
	$(".character-box").on("click", function() {
		 
		 if(executed === false) {
			$(".hero-div").append($(this));
			executed = true;
			$(".character-div").appendTo($(".enemy-div"));
			$(".character-div").children().addClass("enemy");
			$(".enemy-div").prepend("<h1 class='enemy-header'>Enemies</h1>")
			
		}
	});

	$(".enemy").on("click", function() {
		alert("true");
	});





}); //document.ready