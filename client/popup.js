window.onload = function () {
  // Add event listeners to filter buttons
  document.getElementById('all').addEventListener('click', filterChats);
  document.getElementById('unread').addEventListener('click', filterUnread);
  document.getElementById('awaiting').addEventListener('click', filterAwaiting);
  document.getElementById('needsReply').addEventListener('click', filterNeedsReply);

  // Function to filter chats
  function filterChats() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: "All" });
    });
  }



  function filterUnread() {
    // Your logic to filter unread chats
    // console.log("clicked unread");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: "unread" });
    });
  }

  function filterAwaiting() {
    // Your logic to filter chats awaiting reply
    console.log("clicked unread");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: "awaiting" });
    });
  }

  function filterNeedsReply() {
    // Your logic to filter chats needing reply
    console.log("clicked unread");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: "needs" });
    });
  }

  // function extractContactData() {
  //   const contacts = [];
  //   const mainEle = document.querySelectorAll("._ak8l");
  //   console.log("mainEle - ");
  //   console.log(mainEle);
  //   mainEle.forEach((ele) => {
  //     // let unread = ele.querySelector("._ahlk");
  //     // if (unread) {
  //     //   console.log(unread.textContent);
  //     // }
  //     console.log("yeah");
  //   })
  //   return " yeah buddy";
  // }

  // // Function to log contact data
  // function logContactData() {
  //   const contacts = extractContactData();
  //   console.log('Contacts:', contacts);
  // }

  // // Call function to extract and log contact data
  // logContactData();

  // console.log("loaded");
};
