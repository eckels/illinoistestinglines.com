function loadPage() {
  document.getElementById("deals").style.display = "none";
}

function loadCoverPage() {
  document.getElementById("deals").style.display = "none";
  document.getElementById("cover").style.display = "block";
  $.getJSON('http://covermeonline.com/db.php', function(data) {
    updateCover(data);
    updateLastUpdated(data);
    updateLine();
    getReports();
  });
}

function loadDealsPage() {
  document.getElementById("cover").style.display = "none";
  document.getElementById("deals").style.display = "block";
  $.getJSON('http://covermeonline.com/db.php', function(data) {
    updateDeals(data);
    loadDealsInTextBoxes(data);
  });
}

function fetchAdmin() {
  loadPage();
  $.getJSON('http://covermeonline.com/db.php', function(data) {
    updateCover(data);
    updateLastUpdated(data);
    updateLine();
    getReports();
    updateDeals(data);
    loadDealsInTextBoxes(data);
  });
}

function refreshAdmin() {
  $.getJSON('http://covermeonline.com/db.php', function(data) {
    updateCover(data);
    updateLastUpdated(data);
    updateLine();
    getReports();
    updateDeals(data);
    loadDealsInTextBoxes(data);
  });
}

function fetchGeneral() {
  $.getJSON('http://covermeonline.com/db.php', function(data) {
    updateCover(data);
    updateDeals(data);
    updateLastUpdated(data);
    updateLine();
  });
}

function getReports() {
  getLionReports();
  getKamsReports();
  getJoesReports();
  getHubReports();
  getBrothersReports();
}

function updateCover(data) {
  var kams_cover = data[0]["Bar Cover"];
  var joes_cover = data[1]["Bar Cover"];
  var lion_cover = data[2]["Bar Cover"];
  var bros_cover = data[6]["Bar Cover"];
  var hub_cover = data[8]["Bar Cover"];

  document.getElementById("lion-cover").innerHTML = lion_cover;
  document.getElementById("kams-cover").innerHTML = kams_cover;
  document.getElementById("joes-cover").innerHTML = joes_cover;
  document.getElementById("hub-cover").innerHTML = hub_cover;
  document.getElementById("bros-cover").innerHTML = bros_cover;
}

function updateDeals(data) {
  var kams_deals = processBreaks(data[0]["Drink Deals"]);
  var joes_deals = processBreaks(data[1]["Drink Deals"]);
  var lion_deals = processBreaks(data[2]["Drink Deals"]);
  var bros_deals = processBreaks(data[6]["Drink Deals"]);
  var hub_deals = processBreaks(data[8]["Drink Deals"]);
  var inn_deals = processBreaks(data[3]["Drink Deals"]);
  var legends_deals = processBreaks(data[4]["Drink Deals"]);
  var murphy_deals = processBreaks(data[5]["Drink Deals"]);
  var canopy_deals = processBreaks(data[7]["Drink Deals"]);

  document.getElementById("lion-deals").innerHTML = lion_deals;
  document.getElementById("kams-deals").innerHTML = kams_deals;
  document.getElementById("joes-deals").innerHTML = joes_deals;
  document.getElementById("hub-deals").innerHTML = hub_deals;
  document.getElementById("bros-deals").innerHTML = bros_deals;
  document.getElementById("inn-deals").innerHTML = inn_deals;
  document.getElementById("legends-deals").innerHTML = legends_deals;
  document.getElementById("murphy-deals").innerHTML = murphy_deals;
  document.getElementById("canopy-deals").innerHTML = canopy_deals;
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
  var kams_time = calculateTime(data[0]["Last_Updated"]);
  var joes_time = calculateTime(data[1]["Last_Updated"]);
  var lion_time = calculateTime(data[2]["Last_Updated"]);
  var bros_time = calculateTime(data[6]["Last_Updated"]);
  var hub_time = calculateTime(data[8]["Last_Updated"]);

  document.getElementById("lion-time").innerHTML = lion_time;
  document.getElementById("kams-time").innerHTML = kams_time;
  document.getElementById("joes-time").innerHTML = joes_time;
  document.getElementById("hub-time").innerHTML = hub_time;
  document.getElementById("bros-time").innerHTML = bros_time;
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

function scramble(s){
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a){
        var c= a.charCodeAt(0);
        switch(c){
            case 90: return 'A';
            case 122: return 'a';
            default: return String.fromCharCode(++c);
        }
    });
}

function updateLine() {
  $.getJSON('http://covermeonline.com/line_db.php', function(line) {
    var kams_line = line[1]["Line Length"];
    var joes_line = line[2]["Line Length"];
    var lion_line = line[0]["Line Length"];
    var bros_line = line[3]["Line Length"];
    var hub_line = line[4]["Line Length"];

    document.getElementById("lion-line").innerHTML = lion_line;
    document.getElementById("kams-line").innerHTML = kams_line;
    document.getElementById("joes-line").innerHTML = joes_line;
    document.getElementById("hub-line").innerHTML = hub_line;
    document.getElementById("bros-line").innerHTML = bros_line;
  });
}

function getLionReports() {
  $.getJSON('http://covermeonline.com/lion_reports.php', function(reports) {
    console.log(reports);
    renderReports(reports, "lion-data");
  });
}

function getKamsReports() {
  $.getJSON('http://covermeonline.com/kams_reports.php', function(reports) {
    console.log(reports);
    renderReports(reports, "kams-data");
  });
}

function getJoesReports() {
  $.getJSON('http://covermeonline.com/joes_reports.php', function(reports) {
    console.log(reports);
    renderReports(reports, "joes-data");
  });
}

function getHubReports() {
  $.getJSON('http://covermeonline.com/hub_reports.php', function(reports) {
    console.log(reports);
    renderReports(reports, "hub-data");
  });
}

function getBrothersReports() {
  $.getJSON('http://covermeonline.com/bros_reports.php', function(reports) {
    console.log(reports);
    renderReports(reports, "bros-data");
  });
}

function renderReports(reports, textBoxId) {
  var report = "";
  var arrLength = Object.keys(reports).length - 1;
  var floor = arrLength - 10;
  if (floor < 0) {
    floor = 0;
  }
  for (i = arrLength; i >= floor; i--) {
    var user = reports[i]["user_id"];
    report += "<span style='font-size: 0.9em; font-weight: 400; font-family: monospace;'>";
    report += user.substring(0, 3);
    report += "</span> ";

    report += timeDiff(reports[i]["Date"].substring(reports[i]["Date"].length - 8, reports[i]["Date"].length - 3));

    report += parseCover(reports[i]["Cover"]);
    report += parseLine(reports[i]["Line_length"]);

    report += "<br>";
  }
  document.getElementById(textBoxId).innerHTML = report;
}

function parseLine(line) {
  if (line == "dummy variable") {
    return "";
  }
  return " - <b>" + line + "</b>";
}

function parseCover(cover) {
  if (cover == "") {
    return "";
  }
  if (cover == "No Cover!") {
    return " - <b>$0</b> - ";
  }
  if (cover == "0") {
    return " - <b>$0</b> - ";
  }
  if (cover == "5") {
    return " - <b>$5</b> - ";
  }
  if (cover == "10") {
    return " - <b>$10</b> - ";
  }
  if (cover == "20") {
    return " - <b>$20</b> - ";
  }
  return " - <b>" + cover + "</b> - ";
}

function timeDiff(time) {
  var current = new Date();
  var currentHour = current.getHours();
  var currentMinute = current.getMinutes();

  var updatedHour = parseInt(time);
  var updatedMinute = parseInt(time[time.length -2] + time[time.length -1]);

  var difference = 0;
  while ((currentHour != updatedHour || currentMinute != updatedMinute) && difference < 1440) {
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
  difference -= 60;

  if (difference < 10) {
    return "<b>" + difference + "</b> mins/ago";
  } else if (difference < 60) {
    return "<b>" + difference + "</b> min/ago";
  } else {
    difference = Math.round(difference / 60);
    return "<b>" + difference + "</b> hr/ago";
  }
}

function loadDealsInTextBoxes(data) {
  var kams_deals = data[0]["Drink Deals"];
  var joes_deals = data[1]["Drink Deals"];
  var lion_deals = data[2]["Drink Deals"];
  var bros_deals = data[6]["Drink Deals"];
  var hub_deals = data[8]["Drink Deals"];
  //var inn_deals = data[3]["Drink Deals"];
  //var legends_deals = data[4]["Drink Deals"];
  //var murphy_deals = data[5]["Drink Deals"];
  //var canopy_deals = data[7]["Drink Deals"];

  document.getElementById("lion-input").value = lion_deals;
  document.getElementById("kams-input").value = kams_deals;
  document.getElementById("joes-input").value = joes_deals;
  document.getElementById("hub-input").value = hub_deals;
  document.getElementById("bros-input").value = bros_deals;
  //document.getElementById("inn-input").value = inn_deals;
  //document.getElementById("legends-input").value = legends_deals;
  //document.getElementById("murphy-input").value = murphy_deals;
  //document.getElementById("canopy-input").value = canopy_deals;
}

function submitDeals(bar) {
  var deal;
  if (bar == 'a') {
    deal = document.getElementById("lion-input").value;
  }
  if (bar == 'b') {
    deal = document.getElementById("kams-input").value;
  }
  if (bar == 'c') {
    deal = document.getElementById("joes-input").value;
  }
  if (bar == 'e') {
    deal = document.getElementById("hub-input").value;
  }
  if (bar == 'd') {
    deal = document.getElementById("bros-input").value;
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

/*
function login() {
  $.getJSON(getPassword("kkg<==tfmvidvfeczev-tfd=jdjxcfsrctfewzxnzwzykdcjvtliv-gyg"), function(pass) {
    var password = prompt("Please enter password:");
    while (password != pass[0]["user_name"]) {
      password = prompt("Wrong password, try again:");
    }
  });
}*/

function submitButtonData(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.send();
  setTimeout(function(){
    $.getJSON('http://covermeonline.com/db.php', function(data) {
      updateCover(data);
      updateLastUpdated(data);
      updateLine();
      getReports();
    });
  }, 100);
}
