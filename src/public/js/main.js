// const handleBars = require("hbs");
// const template = handleBars.compile("Name:{{name}}");
// console.log(template);
let response;
var fileName;
let urlElement = document.getElementById("input-url");
var img = document.createElement("img");
// triggers when the user paste url
document.addEventListener("input", (event) => {
  ListenPaste(event.target.value);
});

// displays THUMBNAIL AND VIDEO TITLE
async function ListenPaste() {
  const urlElement = document.getElementById("input-url");
  const respElement = document.getElementById("resp");
  const duplicateImg = document.querySelector("img");
  if (duplicateImg) {
    duplicateImg.remove()
    respElement.innerText = ''
  }
  const loader = document.createElement('div')
  loader.innerHTML = '<div class="loader">Loading...</div>'
  const url = urlElement.value;
  respElement.appendChild(loader)
  const response = await fetch(`/getInfo?url=${url}`);
  const resp = await response.json()
  if(resp){
    loader.remove()
    img.src = resp.info.videoDetails.thumbnails[3].url;
    if (duplicateImg) {
      duplicateImg.remove()
    }
    document.querySelector(".thumbnail").appendChild(img);
    respElement.innerText = resp.info.videoDetails.title;
    fileName = resp.info.videoDetails.media.song || resp.info.videoDetails.title;
  }
    
}

function Submit() {
  
  const urlElement = document.getElementById("input-url");
  const url = urlElement.value;
  window.location.href = `/download?url=${url}&fileNm=${fileName}`;
}
