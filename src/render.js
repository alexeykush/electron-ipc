const { ipcRenderer } = require("electron");

const ul = document.querySelector("ul");

ipcRenderer.on("item:add", (e, item) => {
    const li = document.createElement("li");
    const itemText = document.createTextNode(item);
    li.appendChild(itemText);
    ul.appendChild(li);
});


ipcRenderer.on("item:clear", () => {
   ul.innerHTML = "";
});

ul.addEventListener("dblclick", e => e.target.remove());