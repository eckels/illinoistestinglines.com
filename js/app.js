var currentData = [
  {
     "Name":"1st and Armory",
     "Address":"209 E. Armory ",
     "Latitude":"40.104990",
     "Longitude":"-88.236250",
     "Hours":"12 PM - 4 PM",
     "Line_Length":"5 Min wait",
     "Last_Updated":"10 minutes ago"
  },
  {
     "Name":"1st and Daniel",
     "Address":"51 E. Daniel St. ",
     "Latitude":"40.107680",
     "Longitude":"-88.240120",
     "Hours":"8 AM - 5 PM ",
     "Line_Length":"30 Minute Wait",
     "Last_Updated":"30 Minutes ago "
  }
];

function loadData() {
  //generateNoOrderList(currentData);
  $.getJSON('http://covermeonline.com/db.php', function(data) {
    currentData = data;
    //generateNoOrderList(currentData);
  });
}

function generateNoOrderList(data) {
  for (i = 0; i < data.length; i++) {
    var current = data[i];
    var name = current["Name"];
    var hours = current["Hours"];
    var wait = current["Line_Length"].toLowerCase();
    var lastUpdated = "Last updated " + current["Last_Updated"].toLowerCase();
    var directions = "https://www.google.com";
    var waitStatus = getWaitStatus(wait);
    createCard(name, hours, wait, waitStatus, lastUpdated, directions);
  }
}

function createCard(name, hours, wait, waitStatus, lastUpdated, directions) {
  var card = document.createElement("div");
  card.classList.add("card");

  var cardTop = document.createElement("div");
  cardTop.classList.add("card-top");
  
  var cardBottom = document.createElement("div");
  cardBottom.classList.add("card-bottom");

  var locationName = document.createElement("h5");
  locationName.appendChild(document.createTextNode(name));

  var locationHours = document.createElement("p");
  locationHours.classList.add("hours");
  locationHours.appendChild(document.createTextNode(hours));

  var locationWaitDesktop = document.createElement("div");
  locationWaitDesktop.classList.add("desktop-wait");
  var locationWaitMobile = document.createElement("div");
  locationWaitMobile.classList.add("desktop-wait-mobile");
  
  var waitCircle = document.createElement("div");
  waitCircle.classList.add("circle");
  waitCircle.classList.add(waitStatus);
  var waitTime = document.createElement("p");
  waitTime.appendChild(document.createTextNode(wait));

  locationWaitDesktop.appendChild(waitCircle.cloneNode(true));
  locationWaitDesktop.appendChild(waitTime.cloneNode(true));

  locationWaitMobile.appendChild(waitCircle.cloneNode(true));
  locationWaitMobile.appendChild(waitTime.cloneNode(true));

  var locationUpdated = document.createElement("p");
  locationUpdated.classList.add("last-updated");
  locationUpdated.appendChild(document.createTextNode(lastUpdated));

  var directionButton = document.createElement("a");
  directionButton.classList.add("desktop-button");
  var directionButtonActual = document.createElement("button");
  directionButtonActual.appendChild(document.createTextNode("Get Directions"));

  directionButton.appendChild(directionButtonActual);
  directionButton.title = "Directions to location";
  directionButton.href = directions;
  directionButton.setAttribute('target', '_blank');

  divider = document.createElement("div");
  divider.classList.add("divider");

  var directionText = document.createElement("a");
  directionText.appendChild(document.createTextNode("Get Directions"));

  cardTop.appendChild(locationName);
  cardTop.appendChild(locationHours);
  cardTop.appendChild(locationWaitDesktop);
  cardTop.appendChild(locationUpdated);
  cardTop.appendChild(directionButton);

  cardBottom.appendChild(locationWaitMobile);
  cardBottom.appendChild(divider);
  cardBottom.appendChild(directionText);

  card.appendChild(cardTop);
  card.appendChild(cardBottom);

  document.getElementById("target-div").appendChild(card);
}

function getWaitStatus(wait) {
  if (wait === "No wait" || wait === "5 minute wait") return "green";
  if (wait === "15 minute wait") return "orange";
  if (wait === "30 minute wait" || wait === "1 hour wait") return "red";
  return "green";
}