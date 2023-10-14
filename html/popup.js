(async () => {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
  // do something with response here, not outside the function
  const a11yLnks = JSON.parse(response.farewell);

  //populate feedback technical details
  var tech = tab.url + "||" + window.navigator.userAgent;
  document.getElementById("feedbackExtra").value = tech;

  if(!(a11yLnks.st === "none")) {
    AddLink(document.getElementById("statement"),a11yLnks.st);
    ToggleOkClass("stSummary");
  }
  else {
    AddMissingStatement(document.getElementById("statement"),"This site has not declared an accessibility statement page");
    ToggleNokClass("stSummary");
  }

  if(!(a11yLnks.fb === "none")) {
    AddLink(document.getElementById("feedback"),a11yLnks.fb);
    ToggleOkClass("fbSummary");
  }
  else {
    AddMissingStatement(document.getElementById("feedback"),"This site has not declared a feedback page");
    ToggleNokClass("fbSummary");
  }

  if(!(a11yLnks.cp === "none")) {
    AddLink(document.getElementById("complaints"),a11yLnks.cp);
    ToggleOkClass("cpSummary");
  }
  else {
    AddMissingStatement(document.getElementById("complaints"),"This site has not declared a complints page");
    ToggleNokClass("cpSummary");
  }

  console.log(response);
})();

function loadNewTab(event) {
  //alert(event.target);
  chrome.tabs.create({url: event.target.href});
}

function ToggleOkClass(el){
  document.getElementById(el).classList.add("ok");
  document.getElementById(el).classList.remove("nok");
}

function ToggleNokClass(el){
  document.getElementById(el).classList.add("nok");
  document.getElementById(el).classList.remove("ok");
}

function AddLink(el,link){
  el.href = link;
  el.addEventListener("click",loadNewTab);  
}

function AddMissingStatement(el,msg) {
  const newMsg = document.createElement("span");
  newMsg.innerText = msg; 
  el.after(newMsg);
  el.remove();
}
