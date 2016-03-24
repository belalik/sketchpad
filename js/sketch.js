function clearCanvas() {
	$("#clearButton").click(function() {
			$('.box').removeClass("hovered");
			$('.box').css("background-color", "ffffff");

		});

}

/*
* Function to draw the grid of boxes - receives an argument
* that specifies the number of boxes to be drawn (equal for each
* side - we are drawing a square).
* 
* I left some older code just for revision purposes - I initially 
* made it using <br> tags, but I decided to change this.   
* 
*/
function drawCanvas(i) {

// Initialise html table - This will be built and appended at the end. 
var myTable="<table>";

	// Build lines (number = i)
	for (var j = 0; j < i; j++) {

		myTable += "<tr>";
		
		// Inner loop - for every line, draw an i amount of boxes. 
		for (var k = 0; k < i; k++) {
			myTable += "<td> <div class='box'> </div> </td>";	
		}
		myTable += "</tr>";
	}

	// close table tag
	myTable += "</table>";
	
	/*
	* Append html to build table. 
	* I tried to append it line-by-line instead of building a String 
	* but it had some problems.  Might experience something similar in 
	* the future, hence the comment. 
	*/
	$("#canvas").append(myTable);
	
	
  	//console.log("inside drawCanvas, size is "+i);
  	var boxSize = Math.floor(512/i);
  	//console.log("inside drawCanvas, boxSize is "+boxSize);
  	
  
/*
* Old code that worked - Used <br> for breaks. Decided to 
* abandon it, <br> not supposed to be used this way, also 
* adds an arbitrary vertical space for each new line.  
*/
  	  // make HTML for every line
	  /*
	  for (var j = 0; j < i; j++) {
	    line += '<div class="box"> </div>';
	  }	

	  // Add a <br> after each line
	  for (k = 0; k < i; k++) {
	  	$("#canvas").append("<br>"+line);
	  } 
	*/

console.log("boxSize is "+boxSize);
	  $(".box").width(boxSize);
  	$(".box").height(boxSize);

/*
* Old code to make wrapper change size dynamically. 
* Got rid of it in the end - exercise asked for static 
* wrapper size - also too much complexity for no reason. 
*/

// determine dynamic height x width of #wrapper. 
// We need to do the following calculation: 
// height = constant (from top) -- some amount from top
//          + (boxSize x i) -- size of boxes themselves
//          + (i x 4) -- 4px is top margin
//          + (2 x i) -- since we have 1px border on each side
//			+ (2 x i) -- some room for wrapper to 'breathe', 
//						 needed because we have <br> for every line ...  

/*
var wrapperHeight = 200 + (boxSize*i) + (i*4) + (i*3);
var wrapperWidth = 50 + (boxSize*i) + (i*3) + (i*2);

        $("#wrapper").height(wrapperHeight);
        $("#wrapper").width(wrapperWidth);
  */  
	}



function hover() {
	$('.box').hover(function() {
  		$(this).addClass("hovered");
  	});
}

function randomize() {
	$('.box').mouseover(function() {
  		$(this).css("background-color", getRandomColor());
  	});	
}

function solid() {
	$('.box').mouseover(function() {
  		$(this).css("background-color", "#000000");
  	});	
}


// Found this on http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/*
*	Never used .. Tried to randomize the color of the letters
* 	inside the 'Random Colour' button'. 
*/
function forFun() {
	$("#randomColour").css("color: "+getRandomColor());
	
	$("#randomColour").html('blah blah');
	//var myWord = ["R","a","n","d","o", "m", " C", "o", "l", "o", "u", "r"];
	
	//for (var i = 0; i < myWord.length; i++) {
	  //  document.getElementById("randomColour").innerHTML += "<span style='color:" + getRandomColor() + "'>" + myWord[i] + "</span>";
	    //document.getElementById("logo").innerHTML += "<span style='color:" + myColors[i] + "'>" + myWord[i] + "</span>";
	//}
	//document.getElementById("randomColour").css("color: green");
}


function createNewPad(){
    $('#canvas').empty();
   
    var newPad = prompt('Enter new grid size from 1 to 64');
    var size = parseInt(newPad);

  
    if ( size<=0 || size>64 ){
    	alert("You have to choose between 1 to 64");
    	newPad = prompt('Enter new grid size from 1 to 64');
    	size = parseInt(newPad);

/* 	Just for fun - obviously would not have such messages 
*	on another situation :) .. Just wanted to avoid an endless
*	1-64 messages, or an empty canvas. 
*/
    	if ( size<=0 || size>64 ) {
    		alert("You don't get it .. Setting default size=16 ;-)");
    		size=16;
    	}

    }

 	
 		drawCanvas(size);   
      

    /*
    *  Check which button was pressed - solid or random colour. 
    */  
	if ( $("#solidButton").hasClass("highlighted") ) {
		solid();
	}
	else {
		randomize();
	}
  } 

$(document).ready(function() {
  	//forFun();
  	$('#solidButton').toggleClass("highlighted");
  	drawCanvas(16);

	clearCanvas();
	hover();

	$("#randomButton").click(function() {
		$('.box').removeClass("hovered");
		$('.box').css("background-color", "ffffff");
		$(this).toggleClass("highlighted");		
		$('#solidButton').removeClass("highlighted");
		randomize();
	});

	$("#solidButton").click(function() {
		$('.box').removeClass("hovered");
		$('.box').css("background-color", "ffffff");
		$(this).toggleClass("highlighted");
		$('#randomButton').removeClass("highlighted");
		solid();
	});

	$("#newPadButton").click(function() {
		createNewPad();
	});

});



