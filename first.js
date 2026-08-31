let tombol = document.getElementById("btn");

tombol.onclick = function () {
    tombol.textContent = "Udah Diklik!";
};

const text = "Welcome To My Website 👋";
const typingText = document.getElementById("typing-text");

let index = 0;

function typing() {
    if (index < text.length) {
        typingText.textContent += text[index];
        index++;
        setTimeout(typing, 100);
    }
}

typing();

const projectCount = document.getElementById("project-count");

let projects = 1;

projectCount.textContent = projects + "+";

const contactBtn = document.getElementById("contact-btn");
const contactPopup = document.getElementById("contact-popup");
const closeContact = document.getElementById("close-contact");

contactBtn.onclick = function () {
    contactPopup.style.display = "flex";
};

closeContact.onclick = function () {
    contactPopup.style.display = "none";
};

const readMore = document.getElementById("read-more");
const moreAbout = document.getElementById("more-about");

readMore.onclick = function () {
    if (moreAbout.style.display === "none") {
        moreAbout.style.display = "block";
        readMore.textContent = "Read Less 👀";
    } else {
        moreAbout.style.display = "none";
        readMore.textContent = "Read More 👀";
    }
};

