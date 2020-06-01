const { ipcRenderer } = require("electron");

const form = document.querySelector("form");

form.addEventListener("submit", e => {
   e.preventDefault();

   const item = document.getElementById("item").value;

   ipcRenderer.send("item:add", item);
});