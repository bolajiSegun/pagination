"use strict";
// fetching data
fetch("https://api.github.com/users/john-smilga/followers?per_page=100")
    .then((res) => {
    return res.json();
})
    .then((data) => {
    paginate(data);
    btnController(data);
})
    .catch((error) => {
    alert(error);
});
// paginate
let currentPage = 1;
let totalPage = 10;
let pageSize = 10;
let btnContainer = document.querySelector(".btn-container");
let prevBtn = document.createElement("button");
let nextBtn = document.createElement("button");
prevBtn.setAttribute("class", "page-btn");
nextBtn.setAttribute("class", "next-btn");
prevBtn.textContent = "--prev--";
nextBtn.textContent = "--next--";
// loop to cfeate btn
for (let i = 1; i <= 10; i++) {
    let button = document.createElement("button");
    button.textContent = `${i}`;
    button.setAttribute("class", "page-btn");
    btnContainer.appendChild(button);
    button.addEventListener("focus", (e) => {
        // button.classList.remove("active-btn");
    });
}
// for the prev/next/btnCON
function btnController(data) {
    btnContainer.insertAdjacentElement("afterbegin", prevBtn);
    btnContainer.insertAdjacentElement("beforeend", nextBtn);
    let pageBtn = document.querySelectorAll(".page-btn");
    prevBtn.addEventListener("click", function () {
        if (prevBtn) {
            if (currentPage === 1) {
                currentPage = totalPage;
            }
            else {
                currentPage--;
            }
            paginate(data);
        }
    });
    nextBtn.addEventListener("click", function () {
        if (nextBtn) {
            if (currentPage === totalPage) {
                currentPage = 1;
            }
            else {
                currentPage++;
            }
            paginate(data);
        }
    });
    // adding pagination to the btn
    pageBtn.forEach((btn) => {
        if (Number(btn.innerText) === currentPage) {
            btn.classList.add(".active-btn");
        }
        btn.addEventListener("click", () => {
            currentPage = Number(btn.innerText);
            paginate(data);
        });
    });
}
// function to paginate
function paginate(querySet) {
    let container = document.querySelector(".container");
    container ? (container.innerHTML = "") : null;
    let startPoint = (currentPage - 1) * pageSize;
    let endPoint = startPoint + pageSize;
    let trimData = querySet.slice(startPoint, endPoint);
    let pages = Math.ceil(querySet.length / pageSize);
    trimData.map((user) => {
        const img = document.createElement("img");
        img.src = user.avatar_url;
        img.alt = "person";
        const text = document.createElement("h4");
        text.textContent = user.login;
        const url = document.createElement("a");
        url.href = user.html_url;
        url.textContent = "show user";
        url.setAttribute("class", "btn");
        let articles = document.createElement("article");
        articles.setAttribute("class", "card");
        articles.append(img, text, url);
        container === null || container === void 0 ? void 0 : container.appendChild(articles);
    });
}
