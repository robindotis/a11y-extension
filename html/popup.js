(async () => {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
  // do something with response here, not outside the function
  const a11yLnks = JSON.parse(response.farewell);

  //populate feedback technical details
  var tech = tab.url + "||" + window.navigator.userAgent;
  document.getElementById("feedbackExtra").value = tech;

  if(!(a11yLnks.st === "none")) {
    const lnkSt = document.getElementById("statement"); 
    lnkSt.href = a11yLnks.st;
    lnkSt.addEventListener("click",loadNewTab);  
    document.getElementById("stSummary").classList.add("ok");
    document.getElementById("stSummary").classList.remove("nok");
  }
  else {
    const lnkFb = document.getElementById("feedback");
    lnkFb.innerText = "This page has not declared an accessibility statement page"; 
    document.getElementById("stSummary").classList.remove("ok");
    document.getElementById("stSummary").classList.add("nok");
  }

  if(!(a11yLnks.fb === "none")) {
    const lnkFb = document.getElementById("feedback"); 
    lnkFb.href = a11yLnks.fb;
    lnkFb.addEventListener("click",loadNewTab);
    document.getElementById("fbSummary").classList.add("ok");
    document.getElementById("fbSummary").classList.remove("nok");
  }
  else {
    const lnkFb = document.getElementById("feedback");
    lnkFb.innerText = "This page has not declared a feedback page"; 
    document.getElementById("fbSummary").classList.remove("ok");
    document.getElementById("fbSummary").classList.add("nok");
  }

  if(!(a11yLnks.cp === "none")) {
    const lnkCp = document.getElementById("complaints"); 
    lnkCp.href = a11yLnks.cp;
    lnkCp.addEventListener("click",loadNewTab);
    document.getElementById("cpSummary").classList.add("ok");
    document.getElementById("cpSummary").classList.remove("nok");
  }
  else {
    const lnkFb = document.getElementById("feedback");
    lnkFb.innerText = "This page has not declared a complaints page"; 
    document.getElementById("cpSummary").classList.remove("ok");
    document.getElementById("cpSummary").classList.add("nok");
  }

  console.log(response);
})();

function loadNewTab(event) {
  //alert(event.target);
  chrome.tabs.create({url: event.target.href});
}

