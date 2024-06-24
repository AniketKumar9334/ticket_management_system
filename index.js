const tableBody = document.querySelector("tbody");
const titleText = document.getElementById("title");
const description = document.getElementById("description");
const progressStatus = document.getElementById("status");
const dateTime = document.getElementById("dueDate");
const btnSubmit = document.getElementById("submit");
const URL = "http://localhost:3000";

let updateId = ""
let dataArray = []
btnSubmit.addEventListener("click", () => {
  if (btnSubmit.innerText === "Update Ticket") {
    updateTicket(
      updateId  ,
      title.value,
      description.value,
      progressStatus.value,
      dateTime.value
    );

    titleText.innerText = "";
    description.innerText = "";
    progressStatus.innerText = "";
    dateTime.innerText = "";
  } else {
    let id = makeid();
    createTicket(
      id,  
      title.value,
      description.value,
      progressStatus.value,
      dateTime.value
    );
    titleText.innerText = "";
    description.innerText = "";
    progressStatus.innerText = "";
    dateTime.innerText = "";
  }
});
const displayData = (data) => {
  data.map((item) => {
    let date = new Date(item.dueDate).toString();
    let formatDate = date.slice(0, 25);
    tableBody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.title}</td>
                <td>${item.description}</td>
                <td>${item.status}</td>
                <td>${formatDate}</td>
                <td><Button onclick="editTicket(${item.id})">Edit</Button></td>
                <td><button onclick="deleteTicket(${item.id})">Delete</button></td>
            </tr>
        `;
  });
};

const fetchTicket = async () => {
  try {
    const response = await fetch(`${URL}/ticket`);
    dataArray = await response.json();
    displayData(dataArray);
  } catch (error) {
    console.log(error);
  }
};
const createTicket = async (id, title, description, progressStatus, dateTime) => {
  try {
    if(!title, !description, !dateTime){
        alert("Please fill all the fields");
        return
    }
    const responce = await fetch(`${URL}/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        description,
        status: progressStatus,
        dueDate: dateTime,
      }),
    });
    const data = await responce.json();
  } catch (error) {
    console.log(error);
  }
};
const editTicket = async (id) => {
    console.log(id)
  try {
    const response = await fetch(`${URL}/ticket/${id.toString()}`);
    const item = await response.json();
    titleText.value = item?.title;
    description.value = item?.description;
    progressStatus.value = item?.status;
    dateTime.value = item?.dueDate;
    btnSubmit.innerText = "Update Ticket";
    updateId = item.id;
  } catch (error) {
    console.log(error);
  }
};
const updateTicket = async (id, title, description, status, dueDate) => {
  try {
    const res = await fetch(`${URL}/ticket/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, status, dueDate }),
    });
    const data = await res.json();

  } catch (error) {
    console.log(error);
  }
};
const deleteTicket = async (id) =>{
    console.log(id)
    try {
        let altMessage = confirm("Do you want to delete this ticket???")
        if(altMessage){
            const res = await fetch(`${URL}/ticket/${id}`, {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }
    
            })
        }else{
            return
        }
    } catch (error) {
        
    }
}

function makeid() {
    let result = '';
    const characters = '123456789134567981345679756168';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 4) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
fetchTicket();
