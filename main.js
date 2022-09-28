fetch("http://localhost:8000/manifest.json", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "http://localhost:8000/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then((d) => d.json())
  .then((manifest) => {
    const output = document.getElementById("output");
    const eventLog = document.getElementById("event-log");

    function sendEvent(data) {
      eventLog.value = `${eventLog.value}\n\n=> ${JSON.stringify(data)}`;
      return true;
    }

    function manifestLookup(id) { 
      // i secretly hate that this is an object, and not a collection
      return manifest[id];
    }

    function clickHandler(e) {
      const target = e.target;
      output.value = `target: ${e.target}
    tagName: ${target.tagName}`;
      const tagsToTrack = ['A', 'BUTTON'];
      if (!tagsToTrack.includes(target.tagName)) return null;

      const shapow = e.target?.getAttribute('shapow');
      const payload = manifestLookup(shapow); 
      
      if (payload) return sendEvent(payload); 
      sendEvent({ eventType: "log_click_event", description: "This is a generic Event without any mapping" })
    }

    document.onclick = clickHandler;
  })
  .catch(err => console.error(err));
