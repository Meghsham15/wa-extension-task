chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "All") {
      console.log("Message received from extension: " + request.message);
      // Do something in response to the message from the extension
  }
});
