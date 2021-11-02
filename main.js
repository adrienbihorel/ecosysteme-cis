const url = "https://docs.google.com/spreadsheets/d/16OcOCZUWMPCBlQYfzWNelGo_h8SMClCgDb7rGC_sf3g/export?format=csv";
const objectsDiv = document.querySelector("#objects");

// objectsDiv.innerHTML = "<p>Loading...</p>";

fetch(url).then(result => result.text()).then(function(csvtext) {
  return csv().fromString(csvtext);
}).then(function(csv) {

  // this works great
  objectsDiv.innerHTML = "";
  // csv.forEach(function(object) {
  // 	objectsDiv.innerHTML += "<p><strong>" + object.name + "</strong></p>";
  // 	objectsDiv.innerHTML += "<p>" + object.definition + "</p>";
  // });

  let objects = csv;


  // Get OTD count
  let avObjects = objects;
  let minOTDProp = 0.2;
  let maxOTDProp = 0.4;

  function getOTDCount() {
    // return Math.floor(Math.random())
    min = Math.ceil(minOTDProp * objects.length);
    max = Math.floor(maxOTDProp * objects.length);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  let OTDCount = getOTDCount();
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

    objectsDiv.innerHTML +=
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
    console.log(div);
  }

  function openObjectDiv(div) {
    div.classList.remove('closed');
    div.classList.add('open');
		div.style.zIndex = 1;
		cover.style.display = "block";
    let blocks = div.childNodes;
    blocks.forEach((block, i) => {
			if (block.classList.contains("cover")) {
				block.style.display = "none";
			} else if (block.classList.contains("name") || block.classList.contains("definition")) {
        block.style.display = "block";
      }
    });
    console.log(div);
  }

  // function defaultZIndex(div) {
  //   div.style.zIndex = div.getAttribute('id');
  // }

	function roundToNearest(nearest, number) {
		return  Math.round(number/nearest) * nearest;
	}

	function randomPos(div) {
		div.style.top = 50 + roundToNearest(5, (Math.random()-.5)*100*0.75) + "%";
		div.style.left = 50 + roundToNearest(5, (Math.random()-.5)*100*0.75) + "%";
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
						if (e.target == objectsDiv) {
							cover.style.display = "none";
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
