import secrets from "../config.json" assert { type: "json" };
import projectsData from "../projects.json" assert { type: "json" };
var projectsList = projectsData.projectsData;

const previousButton = document.querySelector(".previousButton");
const forwardButton = document.querySelector(".forwardButton");
const projectDiv = document.querySelector(".project-item");
const submitBtn = document.querySelector(".btn-submit");
previousButton.addEventListener("mouseover", function (e) {
    e.target.src = "../assets/img/red-back.png";
});
previousButton.addEventListener("mouseout", function (e) {
    e.target.src = "../assets/img/back.png";
});
forwardButton.addEventListener("mouseover", function (e) {
    e.target.src = "../assets/img/red-fwd.png";
});
forwardButton.addEventListener("mouseout", function (e) {
    e.target.src = "../assets/img/fwd.png";
});

window.onload = function () {
    projectDiv.children[0].innerText = projectsList[0].name;
    projectDiv.children[1].innerText = projectsList[0].details;
    projectDiv.children[2].children[0].src = projectsList[0].src;
};

let pos = 0;
forwardButton.addEventListener("click", function (e) {
    pos++;
    if (pos >= projectsList.length) {
        pos = 0;
    }
    projectDiv.children[0].innerText = projectsList[pos].name;
    projectDiv.children[1].innerText = projectsList[pos].details;
    projectDiv.children[2].children[0].src = projectsList[pos].src;
});
previousButton.addEventListener("click", function (e) {
    pos--;
    if (pos < 0) {
        pos = projectsList.length - 1;
    }
    projectDiv.children[0].innerText = projectsList[pos].name;
    projectDiv.children[1].innerText = projectsList[pos].details;
    projectDiv.children[2].children[0].src = projectsList[pos].src;
});

submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.querySelector(".input-fields-0");
    const message = document.querySelector(".input-fields-1");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        chat_id: secrets.secrets.CHAT_ID,
        text: `${name.value} sent message - ${message.value}`,
        disable_notification: true,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    fetch(
        "https://api.telegram.org/bot" +
            secrets.secrets.BOT_ID +
            "/sendMessage",
        requestOptions
    )
        .then((response) => response.text())
        .then((response) => alert("Message sent successfully, Thank You!"))
        .catch((error) => console.log("error", error));
    name.value = "";
    message.value = "";
});
