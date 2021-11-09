const url = "https://docs.google.com/spreadsheets/d/16OcOCZUWMPCBlQYfzWNelGo_h8SMClCgDb7rGC_sf3g/export?format=csv";
// const objectsBackDiv = document.querySelector("#objects");
const objectsBackDiv = document.querySelectorAll(".objects.back")[0];
const objectsFrontDiv = document.querySelectorAll(".objects.front")[0];
const textDiv = document.querySelectorAll(".sample-text")[0];

// objectsBackDiv.innerHTML = "<p>Loading...</p>";

fetch(url).then(result => result.text()).then(function(csvtext) {
  return csv().fromString(csvtext);
}).then(function(csv) {

  // this works great
  objectsBackDiv.innerHTML = "";
  // csv.forEach(function(object) {
  // 	objectsBackDiv.innerHTML += "<p><strong>" + object.name + "</strong></p>";
  // 	objectsBackDiv.innerHTML += "<p>" + object.definition + "</p>";
  // });

  let objects = csv;


  // Get OTD count
  let avObjects = objects;
  let minOTDProp = 0.2;
  let maxOTDProp = 0.4;

  function randIntWithinRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let OTDCount = randIntWithinRange(minOTDProp * objects.length, maxOTDProp * objects.length);
  // console.log("OTDCount = " + OTDCount);

  // Get OTD list
  let OTDs = [];

  function getOTDs() {
    for (var i = 0; i < OTDCount; i++) {
      let thisOTDID = Math.floor(Math.random() * avObjects.length);
      // console.log("OTD " + i + " / " + OTDCount + ". thisOTDID in avObjects array = " + thisOTDID);
      OTDs.push(avObjects[thisOTDID]);
      avObjects.splice(thisOTDID, 1);
    }
  }
  getOTDs();








  OTDs.forEach(function(object) {

    objectsBackDiv.innerHTML +=
      '<div class="object">' +
      '<div class="block image">' + '<img class="" src="' + object.imageURL + '" alt="">' + '</div>' +
      '<div class="block name">' + '<p>' + object.name + '</p>' + '</div>' +
      '<div class="block definition">' + '<p>' + object.definition + '</p>' + '</div>' +
			'<div class="block cover">' + '</div>' +
      '</div>';

  });


	let cover = document.getElementById('cover');
	let coverIsVisible = true;
  let objectDivs = document.getElementsByClassName('object');
  // console.log(objectDivs);
  // objectDivs.forEach((objectDiv, i) => {
  // 	objectDiv.setAttribute('id',i);
  // });
  // objectDivs.forEach(function(object) {
  // 	objectDiv.setAttribute('id',i);
  // });


  function closeObjectDiv(div) {
    if (div.parentNode == objectsFrontDiv) {
      objectsBackDiv.appendChild(div);
    }
    div.classList.remove('open');
    div.classList.add('closed');
		div.style.zIndex = "";
    let blocks = div.childNodes;
    blocks.forEach((block, i) => {
      if (block.classList.contains("cover")) {
				block.style.display = "block";
			} else if (block.classList.contains("name") || block.classList.contains("definition")) {
        block.style.display = "none";
      }
    });
    // console.log(div);
  }

  function openObjectDiv(div) {
    div.classList.remove('closed');
    div.classList.add('open');
		div.style.zIndex = 1; /*not needed as we move div to another parent*/
    objectsFrontDiv.appendChild(div);
    // cover solution
		// cover.style.display = "block";
    // text div solution
    textDiv.style.opacity = 0.5;
    let blocks = div.childNodes;
    blocks.forEach((block, i) => {
			if (block.classList.contains("cover")) {
				block.style.display = "none";
			} else if (block.classList.contains("name") || block.classList.contains("definition")) {
        block.style.display = "block";
      }
    });
    // console.log(div);
  }

  // function defaultZIndex(div) {
  //   div.style.zIndex = div.getAttribute('id');
  // }

	function roundToNearest(nearest, number) {
		return  Math.round(number/nearest) * nearest;
	}

  let positions = [];
	function randomPos(div) {
    // simple version
		// div.style.top = 50 + roundToNearest(5, (Math.random()-.5)*100*0.75) + "%";
		// div.style.left = 50 + roundToNearest(5, (Math.random()-.5)*100*0.75) + "%";

    // complex version
    let divSide = 30;
    let thisPos = {};
    let hitsSomething = false;

    function calcPos() {
      thisPos.x = randIntWithinRange(15, 85);
      thisPos.y = randIntWithinRange(5, 60);
    }

    function testPos() {
      hitsSomething = false;
      for (var i = 0; i < positions.length; i++) {
        let lowerXPos = positions[i].x-divSide/2;
        let higherXPos = positions[i].x+divSide/2
        let lowerYPos = positions[i].y-divSide/2;
        let higherYPos = positions[i].y+divSide/2

        if (lowerXPos <= thisPos.x && thisPos.x <= higherXPos
        && lowerYPos <= thisPos.y && thisPos.y <= higherYPos) {
          // console.log(lowerXPos + " <= " + thisPos.x + " <= " + higherXPos);
          // console.log(lowerYPos + " <= " + thisPos.y + " <= " + higherYPos);
          hitsSomething = true;
          // console.log("Hit");
          break;
        } else {
          // console.log("No hit");
        }
      }
    }

    var foundSpace = false;
    var currStep = 0;
    while (!foundSpace) {
      // console.log("Trying to find space for " + div + "for the time #:" + currStep);
      currStep++;
      calcPos();
      testPos();
      if (!hitsSomething || currStep > 20) {
        foundSpace = true;
        div.style.left = thisPos.x + "%";
        div.style.top = thisPos.y + "%";
        positions.push(thisPos);
      }
    }
  }

  for (var i = 0; i < objectDivs.length; i++) {
    let objectDiv = objectDivs[i];
    objectDiv.setAttribute('id', i);
    // defaultZIndex(objectDiv);
    closeObjectDiv(objectDiv);
		randomPos(objectDiv);

    // add click listener
    objectDiv.onclick = function(e) {
      // console.log(e.target);
      // console.log(objectDiv.getAttribute('id'));
      if (objectDiv.classList.contains("closed")) {
        openObjectDiv(objectDiv);

				// wait for a click out
        let outsideClickListener = (e) => {
					if (e.target == objectDiv || objectDiv.contains(e.target)) {
            // console.log("in");
					} else {
            // console.log("out");
						closeObjectDiv(objectDiv);
						removeClickListener();
						if (e.target == objectsBackDiv) {
              // cover solution
							// cover.style.display = "none";
              // text div solution
              textDiv.style.opacity = 1;
						}
          }
        }
        let removeClickListener = () => {
          document.removeEventListener('click', outsideClickListener)
        }
        document.addEventListener('click', outsideClickListener)
      } else {
        // nothing particular
      }
    }

  }




});
