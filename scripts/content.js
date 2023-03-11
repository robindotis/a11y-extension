chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var stMsg = "none";
    var fbMsg = stMsg; 
    var cpMsg = stMsg;
    const a11y = document.querySelectorAll('meta[property^="a11y:"]');

    if (a11y) {
      //statement link
      const st = document.querySelector('meta[property="a11y:statement"]');
      if(st) {
        stMsg = formatUrl(st.content);
      }
      const fb = document.querySelector('meta[property="a11y:feedback"]');
      if(fb) {
        fbMsg = formatUrl(fb.content);
      }
      const cp = document.querySelector('meta[property="a11y:complaints"]');
      if(cp) {
        cpMsg = formatUrl(cp.content);
      }
    }

    var msg = `{"st": "` + stMsg + `",
            "fb": "` + fbMsg + `",
            "cp": "` + cpMsg + `"
    }`;
    //alert(msg);
    if (request.greeting === "hello") {
      sendResponse({farewell: msg});
    }
  }
);

function formatUrl(linkHref) {
  if(!(linkHref.startsWith("http://") || linkHref.startsWith("https://"))){
    if(!linkHref.startsWith("/")) {
      linkHref = "/" + linkHref;
    }
    linkHref = document.location.protocol + "//" + document.location.host + linkHref;
  }
  return linkHref;
}
