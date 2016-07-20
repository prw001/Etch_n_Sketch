
$(document).ready(function(){
	var colorCode;
	var table = makeGrid(20);
	var inputs = [];
	for(i = 16; i < 65; i++){
		inputs[(i - 16)] = i.toString();
	};
	$('#tableBody').append(table);
	$('#container-title-sidebar').hide();
	$('#main-grid').hide();
	$('#website-title').hide();
	$('#side-panel-left').hide();
	$('#container-title-sidebar').fadeIn(350);
	$('#website-title').fadeIn(400);
	$('#side-panel-left').fadeIn(600);
	$('#main-grid').fadeIn(800);
	$('#grid-dim').hide();
	$('#grid-dim').val(16);

	$('#clearGrid').click(function(){
		$('#main-grid').fadeOut('slow');
		$('#right-panel-info').empty();
	});

	$('#newGrid').click(function(){
		/*toggles new grid parameter input & 'create!'' button*/
		$('#grid-input').slideToggle('slow');
		$('#grid-dim').fadeIn(1000);
		});

	$('#create').click(function(){
		/*creates new grid*/
		$('#grid-input').slideToggle('fast');
		$('#grid-dim').hide();
		$('#tableBody').empty();
		var userDim = $('#grid-dim').val();
		var valid = false;
		for(item in inputs){
			if(userDim === inputs[item]){
				valid = true;
				break;
			};
		};
		if(valid === true){
			var newTable = makeGrid(userDim);
			$('#tableBody').append(newTable);
			$('#main-grid').fadeIn('slow');
			$(document).off();
		}else{
			alert("Please enter a number between 16 and 64");
		};
		var newDim = getNewCellDim(userDim) + "px";
		$('.cell').css({"height":newDim, "width":newDim});
	
	});

	$('#Random').click(function(){
	/*generates random colors*/
		$(document).off();
		$('#right-panel-info').empty();
		$(document).on('mouseenter', '.cell', function(){
			var randomColor = getRandomColor();
			$(this).css({"background-color": randomColor, "opacity": 1});
		});
		$('#right-panel-info').text('"Random Color" generates a random color for each individual area passed over by the mouse, even if it already has a color in it.');
	});

	$('#Black').click(function(){
		$(document).off();
		$('#right-panel-info').empty();
		$(document).on('mouseenter', '.cell', function(){
			$(this).css({"opacity": 1, "background-color": "black"});
		});
		$('#right-panel-info').text('"Black Sq." turns the areas passed over by the mouse into solid black squares');
	});
	
	$('#Trails').click(function(){
		/*generates trails of gray that fade*/
		$(document).off();
		$('#right-panel-info').empty();
		$(document).on('mouseenter', '.cell', function(){
			$(this).css("opacity", 1);
		});
		$(document).on('mouseleave', '.cell', function(){
			$(this).fadeTo(650, .2);}
		);
		$('#right-panel-info').text('"Fleeting Trails" creates black squares which fade into the original opacity.');
	});

	$('#Ink').click(function(){
		/*layers strokes by increasing opacity until black*/
		$(document).off();
		$('#right-panel-info').empty();
		$(document).on('mouseenter', '.cell', function(){
			var currentOpac = $(this).css("opacity");
			var newOpac = getOpacity(currentOpac);
			$(this).css("opacity", newOpac);
		});
		$('#right-panel-info').text('"Ink Wash" will gradually darken an area passed over by the mouse by adding 10% opacity.');
	});
});

function getRandomColor(){
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for(var i=0; i<6; i++){
		color += letters[Math.floor(Math.random() * 16)];
	};
	return color;
};

function makeGrid(dim){
	var height = dim;
	var cellHeight = (600 / dim);
	var width = dim;
	var cellWidth = cellHeight;
	var cssHeight = cellHeight.toString() + "px";
	var cssWidth = cellWidth.toString() + "px";
	var table = $('<table></table>');
	for(i = 0; i < height; i++){
		var row = $('<tr></tr>');
		for(j = 0; j < width; j++){
			var cell = $('<td class="cell"></td>');
			row.append(cell);
		};
		table.append(row);
	};
	return table;
};

function getNewCellDim(dim){
	/*takes an int, returns an int*/
	return ((600 - (dim * 4)) / dim);
}

function getOpacity(opac){
	switch(opac){
		case "0.2":
			opac = '.3';
			break;
		case '0.3':
			opac = '.4';
			break;
		case '0.4':
			opac = '.5';
			break;
		case '0.5':
			opac = '.6';
			break;
		case '0.6':
			opac = '.7';
			break;
		case '0.7':
			opac = '.8';
			break;
		case '0.8':
			opac = '.9';
			break;
		case '0.9':
			opac = '1.0';
			break;
		default:
			opac = '1';
			break;
	};
	return opac;
};
