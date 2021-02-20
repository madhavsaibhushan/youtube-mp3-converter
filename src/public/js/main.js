// const handleBars = require("hbs");
// const template = handleBars.compile("Name:{{name}}");
// console.log(template);
let response;
var fileName;
let urlElement = document.getElementById("input-url");
var img = document.createElement("img");
document.addEventListener("input", (event) => {
  console.log("called");
  ListenPaste(event.target.value);
});
async function ListenPaste() {
  const urlElement = document.getElementById("input-url");
  const url = urlElement.value;
  fetch(`/getInfo?url=${url}`).then((resp) => {
    console.log(
      resp.json().then((resp) => {
        const respElement = document.getElementById("resp");

        img.src = resp.info.videoDetails.thumbnails[3].url;
        const duplicateImg = document.querySelector("img");
        if(duplicateImg)
        {
          duplicateImg.remove()
        }
        document.querySelector(".thumbnail").appendChild(img);
        respElement.innerText = resp.info.videoDetails.title;
        fileName = resp.info.videoDetails.title;
      })
    );
  });
}

function Submit() {
  const urlElement = document.getElementById("input-url");
  const url = JSON.stringify(urlElement.value);
  console.log("submit clicked");
  window.location.href = `/download?url=${url}&fileNm=${fileName}`;
}
