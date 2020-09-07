function fetchAdmin() {
  $.getJSON('http://covermeonline.com/db.php', function(data) {
    updateCover(data);
    updateLastUpdated(data);
    updateLine();
    updateDeals(data);
    loadDealsInTextBoxes(data);
  });
}

function updateCover(data) {
  var lion_cover = data[2]["Bar Cover"];
  document.getElementById("lion-cover").innerHTML = lion_cover;
}

function updateDeals(data) {
  var lion_deals = processBreaks(data[2]["Drink Deals"]);

  document.getElementById("lion-deals").innerHTML = lion_deals;
}

function processBreaks(text) {
  var res = text.replace(/\n/g, "<br>");
  return res;
}

function getPassword(str) {
  var res = "h";
  for (i = 0; i < str.length; i++) {
    var curr = str.charAt(i);
    if (curr != '<' || curr != '=' || curr != '-') {
      for (j = 0; j < 9; j++) {
        curr = scramble(curr);
      }
    }
    if (curr == "<") {
      curr = ":";
    }
    if (curr == '=') {
      curr = "/";
    }
    if (curr == '-') {
      curr = ".";
    }
    res += curr;
  }
  return res;
}

function updateLastUpdated(data) {
  var lion_time = calculateTime(data[2]["Last_Updated"]);
  document.getElementById("lion-time").innerHTML = lion_time;
}


function calculateTime(time) {
  var current = new Date();
  var currentHour = current.getHours();
  var currentMinute = current.getMinutes();

  var updatedHour = parseInt(time);
  var updatedMinute = parseInt(time[time.length -2] + time[time.length -1]);

  var difference = 0;
  while (currentHour != updatedHour || currentMinute != updatedMinute) {
    updatedMinute++;
    if (updatedMinute > 59) {
      updatedHour++;
      updatedMinute = 0;
    }
    if (updatedHour > 23) {
      updatedHour = 1;
    }
    difference++;
  }

  if (difference < 60) {
    return difference + " minutes ago";
  } else {
    var hours = Math.floor(difference / 60);
    return "Over " + hours + " hours ago";
  }
}

function updateLine() {
  $.getJSON('http://covermeonline.com/line_db.php', function(line) {
    var lion_line = line[0]["Line Length"];
    document.getElementById("lion-line").innerHTML = lion_line;
  });
}

function loadDealsInTextBoxes(data) {
  var lion_deals = data[2]["Drink Deals"];
  document.getElementById("lion-input").value = lion_deals;
}

function submitDeals(bar) {
  var deal;
  if (bar == 'a') {
    deal = document.getElementById("lion-input").value;
  }
  deal = deal.replace(/'/g, "");
  deal = deal.replace(/\n/g, "%0A");
  deal = deal.split(' ').join('+');
  var url = "http://covermeonline.com/submitdeals.php?a=" + bar + "&b=" + deal;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.send();
  setTimeout(function(){
    $.getJSON('http://covermeonline.com/db.php', function(data) {
      updateDeals(data);
      loadDealsInTextBoxes(data);
    });
  }, 100);
}

/*function login() {
    var password = prompt("Please enter password:");
    while (password != "lion") {
      password = prompt("Wrong password, try again:");
    }
}*/

function submitButtonDatas(url, url2) {
  submitButtonData(url);
  submitButtonData(url2);
  setTimeout(function(){
    $.getJSON('http://covermeonline.com/db.php', function(data) {
      updateCover(data);
      updateLastUpdated(data);
      updateLine();
    });
  }, 100);
}

function submitButtonData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.send();
}
