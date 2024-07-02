let myLeads = [];
let oldLeads = [];
const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#save-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = [];
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <a href="${leads[i]}" target="_blank">
        <li> 
          ${leads[i]} 
        </li>
      </a>
    `;
  }
  ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
