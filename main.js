const url = "https://docs.google.com/spreadsheets/d/16OcOCZUWMPCBlQYfzWNelGo_h8SMClCgDb7rGC_sf3g/export?format=csv";
const objectsDiv = document.querySelector("#objects");

objectsDiv.innerHTML = "<p>Loading...</p>";

fetch(url).then(result=>result.text()).then(function(csvtext) {
	return csv().fromString(csvtext);
}).then(function(csv) {

	// this works great
	objectsDiv.innerHTML = "";
	// csv.forEach(function(object) {
	// 	objectsDiv.innerHTML += "<p><strong>" + object.name + "</strong></p>";
	// 	objectsDiv.innerHTML += "<p>" + object.definition + "</p>";
	// });

	let objects = csv;

	objects.forEach(function(object) {

		objectsDiv.innerHTML +=
			'<div class="object">'
				+ '<div class="block image">' + '<img class="" src="' + object.imageURL + '" alt="">' + '</div>'
				+ '<div class="block name">' + '<p>' + object.name + '</p>' + '</div>'
				+ '<div class="block definition">' + '<p>' + object.definition + '</p>' + '</div>'
			+ '</div>';

	});

});








// $(document).ready(function() {
// 	var $html = $('html');
// 	var $viewport = $html.find('#viewport');
// 	var $button = $(document).find('#right');
// 	var windowWidthBase = 1440;
// 	var gridSizeBase = 10;
//
// 	var $fil = $viewport.find('#fil');
// 	// nouvo
// 	// var $pubs = $fil.find('.pub');
// 	// var $blocs = $fil.find('.bloc');
// 	var pubs = [];
// 	var auts = [];
// 	var meds = [];
// 	var diss = [];
//
// // fil functions
//
// 	var resizeViewport = function(event, ui) {
// 		console.log("resizeViewport");
// 		var windowWidth = $(window).width();
// 		var scale = windowWidth / windowWidthBase;
// 		// $viewport.css({
// 		// 	transform: "scale(" + scale + ")"
// 		// });
// 		$html.css({
// 			'font-size': scale * gridSizeBase + "px"
// 		});
// 	};
//
// 	var selectEls = function() {
// 		console.log('selectEls');
// 		$fil.find('.pub').each(function() {
// 			var $thisPub = $(this);
// 			pubs.push($thisPub);
// 			auts.push($thisPub.find('.aut'));
// 			meds.push($thisPub.find('.med'));
// 			diss.push($thisPub.find('.dis'));
// 		});
// 	}
//
// 	var attrBlocIds = function() {
// 		console.log('attrIds');
// 		$(pubs).each(function(i) {
// 			var $thisPub = $(this);
// 			// $thisPub.attr('pub-index', i)
// 			$thisPub.children().each(function() {
// 				$(this).attr('bloc-id', i);
// 			});
// 		});
// 	}
//
// 	var attrBlocZIds = function() {
// 		console.log('attrZIds');
// 		$(auts).each(function() {
// 			$(this).css({
// 				'z-index': 2
// 			});
// 		});
// 		$(meds).each(function() {
// 			$(this).css({
// 				'z-index': 0
// 			});
// 		});
// 		$(diss).each(function() {
// 			$(this).css({
// 				'z-index': 1
// 			});
// 		});
// 	}
//
// 	var initialize = function() {
// 		// resizeViewport();
// 		// selectEls();
// 		// attrBlocIds();
// 		// attrBlocZIds();
// 	};
//
//
// 	// execute
//
// 	initialize();
// 	// $(window).resize(function() {
// 	// 	resizeViewport();
// 	// });
//
// })
