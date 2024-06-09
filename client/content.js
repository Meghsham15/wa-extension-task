let chats;
let chatsNode;
let notesFunc;
window.onload = async function () {
  // logContactData();
  setTimeout(function () {
    appendNav();
    createPopup();
    chats = new WaChats();
    // chatsNode = new Notes();
  }, 5000);

  notesFunc = new FetchReq();



  // function listenClick() {
  //   let mainChatsContainer = document.querySelector('[aria-label="Chat list"]');

  //   if (mainChatsContainer) {
  //     let chatEle = mainChatsContainer.querySelectorAll('[role="listitem"]');
  //     chatsNode.setChats(chatEle);
  //     chatsNode.setClickListener();
  //     console.log("got ya");
  //     return;
  //   } else {
  //     setTimeout(function () {
  //       console.log("retrying");
  //       return listenClick();
  //     }, 5000);
  //   }
  // }

  // listenClick();

  // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   if (request.message === "All") {
  //     console.log("Message received in content script: " + request.message);
  //     let res = chats.extractContactData();
  //     if (res) {
  //       let allChats = chats.getAll();
  //       console.log("all - ");
  //       console.log(allChats);
  //     }
  //   }
  //   if (request.message === "unread") {
  //     console.log("Message received in content script: " + request.message);
  //     let res = chats.extractContactData();
  //     if (res) {
  //       let allChats = chats.getUnread();
  //       console.log("unread - ");
  //       console.log(allChats);
  //     }
  //   }
  //   if (request.message === "awaiting") {
  //     console.log("Message received in content script: " + request.message);
  //     let res = chats.extractContactData();
  //     if (res) {
  //       let allChats = chats.getAwaitingReply();
  //       console.log("awaiting - ");
  //       console.log(allChats);
  //     }
  //   }
  //   if (request.message === "needs") {
  //     console.log("Message received in content script: " + request.message);
  //     let res = chats.extractContactData();
  //     if (res) {
  //       let allChats = chats.getNeedsReply();
  //       console.log("needs - ");
  //       console.log(allChats);
  //     }
  //   }
  // });


  console.log("loaded");
}

// class Notes {

//   setChats(chatsNode) {
//     this.chatsNode = chatsNode;
//   }

//   setClickListener() {
//     // this.chatsNode.forEach((ele) => {
//     //   ele.addEventLisener("click", function () {
//     //     console.log("clicked");
//     //   })
//     // })

//     for (let i = 0; i < this.chatsNode; i++) {
//       let chat = this.chatsNode[i].querySelector("._ak72");
//       chat.addEventLisener("click", function () {
//         console.log("clicked");
//       })
//     }
//   }

// }


function appendNav() {
  // Create navbar element
  const navbar = document.createElement('nav');
  navbar.classList.add('navbar');

  // Create unordered list element
  const ul = document.createElement('ul');
  ul.classList.add('navbar-list');

  // Array of link texts
  const links = ['All Chats', 'Unread', 'Awaiting Reply', 'Needs Reply', "+ Add Note"];

  // Loop through links array to create list items and links
  links.forEach(linkText => {
    // Create list item element
    const li = document.createElement('li');
    li.classList.add('navbar-item');

    // Create paragraph element for link text
    const p = document.createElement('p');
    p.classList.add('navbar-link');
    p.onclick = function () {
      handleClick(linkText);
    };
    p.textContent = linkText;

    // Append paragraph to list item
    li.appendChild(p);

    // Append list item to unordered list
    ul.appendChild(li);
  });

  // Append unordered list to navbar
  navbar.appendChild(ul);

  // Append navbar to the document body or any other desired container
  document.body.appendChild(navbar);

}

// Function to create and insert the popup component
function createPopup() {
  // Create popup container
  const crmPopup = document.createElement('div');
  crmPopup.id = 'crmPopup';
  crmPopup.classList.add('hidden');

  // Create close button
  const closePopupButton = document.createElement('span');
  closePopupButton.id = 'closePopupButton';
  closePopupButton.innerHTML = '&times;';
  crmPopup.appendChild(closePopupButton);

  // Create and append title
  const title = document.createElement('h2');
  title.innerText = 'Contact Info';
  crmPopup.appendChild(title);

  // Create and append name label and input
  const nameLabel = document.createElement('label');
  nameLabel.htmlFor = 'name';
  nameLabel.innerText = 'Name:';
  crmPopup.appendChild(nameLabel);

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.name = 'name';
  crmPopup.appendChild(nameInput);

  // Create and append number label and input
  const numberLabel = document.createElement('label');
  numberLabel.htmlFor = 'number';
  numberLabel.innerText = 'Number:';
  crmPopup.appendChild(numberLabel);

  const numberInput = document.createElement('input');
  numberInput.type = 'text';
  numberInput.id = 'number';
  numberInput.name = 'number';
  crmPopup.appendChild(numberInput);

  // Create and append notes label and textarea
  const notesLabel = document.createElement('label');
  notesLabel.htmlFor = 'notes';
  notesLabel.innerText = 'Notes:';
  crmPopup.appendChild(notesLabel);

  const notesTextarea = document.createElement('textarea');
  notesTextarea.id = 'notes';
  notesTextarea.name = 'notes';
  crmPopup.appendChild(notesTextarea);

  // Create and append save button
  const saveButton = document.createElement('button');
  saveButton.id = 'saveButton';
  saveButton.innerText = 'Save';
  crmPopup.appendChild(saveButton);

  // Append the popup to the body
  document.body.appendChild(crmPopup);

  // Event listeners
  closePopupButton.addEventListener('click', () => {
    crmPopup.classList.add('hidden');
  });

  saveButton.addEventListener('click', async() => {
    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const notes = document.getElementById('notes').value;

    await notesFunc.addUserNotes(name,Number(number),notes);

    alert('Saved successfully!');
  });

  // Button to open the popup
  // const openPopupButton = document.createElement('button');
  // openPopupButton.id = 'openPopupButton';
  // openPopupButton.innerText = 'Open CRM Popup';
  // openPopupButton.addEventListener('click', () => {
  //   crmPopup.classList.remove('hidden');
  // });
  // document.body.appendChild(openPopupButton);
}

// Call the function to create the popup component
createPopup();


function handleClick(action) {
  let main = chats.checkMain();
  if (!main) {
    chats.extractAll();
  }
  if (action === "All Chats") {
    chats.getAll();
  }
  if (action === "Unread") {
    chats.getUnread();
  }
  if (action === "Awaiting Reply") {
    chats.getAwaitingReply();
  }
  if (action === "Needs Reply") {
    chats.getNeedsReply();
  }
  if (action === "+ Add Note") {
    let infoEle = document.querySelector("._amie");
    infoEle.click();
    setTimeout(async function () {
      let mainEle = document.querySelector(".x13mwh8y");
      let name = mainEle.querySelector("._aou8").innerText;
      let number = mainEle.querySelector(".x1evy7pa").innerText;
      let cleanedNumber = Number(number.replace(/[\s+]/g, ''));
      let crmPopup = document.getElementById("crmPopup");
      crmPopup.classList.remove('hidden');
      let response = await notesFunc.getNotes(cleanedNumber);
      if (response) {
        let userData = notesFunc.getUser();
        notesFunc.displayData(userData.name,userData.number,userData.note);
      }else{
        notesFunc.displayData(name,cleanedNumber,"")
      }
    }, 1000);
    // console.log(action+" clicked");
  }
}

class FetchReq {

  async addUserNotes(){
    let contactName = document.getElementById('name').value;
    let phoneNumber =  document.getElementById('number').value;
    let note = document.getElementById('notes').value;
    let res = await this.makePostRequest("http://localhost:3000/addUserNotes", {contactName,phoneNumber,note});
    console.log(res);
  }

  displayData(name,number,note) {
    // console.log(this.user);
    document.getElementById('name').value = name;
    document.getElementById('number').value = number;
    document.getElementById('notes').value = note;
    this.user={
      contactName:name,
      phoneNumber:number,
      note:note
    };
  }

  getUser(){
    return this.user;
  }

  async getNotes(number) {
    let res = await this.makePostRequest("http://localhost:3000/getUserNotes", { phoneNumber: number });
    // console.log(res);
    if (res.status) {
      // this.user = res;
      // console.log(this.user);
      this.user = {
        name: res.contactName,
        number: res.phoneNumber,
        note: res.note
      };
      return true;
    } else {
      console.log(res);
      return false;
    }

  }

  handleErrors(response) {
    if (!response.status) {
      throw Error(response.statusText);
    }
    return response.json();
  }
  async makeGetRequest(url) {
    return await fetch(url)
      .then(this.handleErrors)
      .then(data => {
        // console.log('GET Request Successful:', data);
        return JSON.stringify(data);
      })
      .catch(error => {
        console.error('GET Request Failed:', error);
      });
  }

  async makePostRequest(apiUrl, postData) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        // throw new Error('Network response was not ok ' + response.statusText);
        return { response:await response.json(), status: false };
      }

      const data = await response.json();
      data.status = true;
      // console.log('POST Request Successful:', data);
      return data; // Return the actual data, not a JSON string

    } catch (error) {
      console.error('POST Request Failed:', error);
      return { status: false };
    }
  }

}


class WaChats {
  constructor() {
    this.contacts = [];
  }
  extractAll() {
    console.log("runned extract");
    this.mainChatsContainer = document.querySelector('[aria-label="Chat list"]');
    this.allChats = this.mainChatsContainer.querySelectorAll('[role="listitem"]');
  }

  checkMain() {
    if (this.mainChatsContainer) {
      // console.log("exists");
      return true;
    } else {
      // console.log("dont exists");
      return false;
    }
  }

  getAll() {
    // let allChats = this.mainChatsContainer.querySelectorAll('[role="listitem"]');
    this.display(this.allChats);
  }

  display(chats) {
    let chatContainer = document.querySelector('[aria-label="Chat list"]');
    chatContainer.innerHTML = "";
    setTimeout(function () {
      chats.forEach((ele) => {
        chatContainer.appendChild(ele);
      })
    }, 1000);

  }

  getUnread() {
    let allChats = this.allChats;
    let allChatsArr = [...allChats];
    let unreadChats = allChatsArr.filter((ele) => {
      let msgsunread = ele.querySelector("._ahlk");
      if (msgsunread) {
        return ele;
      }
    })
    // console.log(unreadChats);
    this.display(unreadChats);
  };

  getAwaitingReply() {
    let allChats = this.allChats;
    let awaitingChatsArr = [...allChats];
    let awaiting = awaitingChatsArr.filter((ele) => {
      let res = ele.querySelector('[data-icon="status-dblcheck"]');
      if (res) {
        return ele;
      }
    })
    this.display(awaiting);
  };

  getNeedsReply() {
    let allChats = this.allChats;
    let allChatsArr = [];
    allChats.forEach(ele => {
      allChatsArr.push(ele);
    })
    let unreadChats = allChatsArr.filter((ele) => {
      let msgsunread = ele.querySelector("._ahlk");
      if (msgsunread) {
        return ele;
      }
    })
    // console.log(unreadChats);
    this.display(unreadChats);
  };




}

