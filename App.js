// //  news fetch
async function fetchNews(limit, page) {
  try {
    const url = `https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews?limit=${limit}&page=${page}`;
    const resp = await fetch(url, {
      method: "GET",
    });
    return await resp.json();
  } catch (error) {
    console.log("couldn't fetch news api", error);
  }
}


let newsArr = [];
let page = 0;
const homeLoadBtn = document.getElementById("load-saved-news");
const loadNewNewsBtn = document.getElementById("load-new-news-btn");

// mew news page
addEventListener("DOMContentLoaded", async (event) => {
  page = page + 1;
  newsArr = await fetchNews(10, page);
  renderNews(newsArr);
});

// new news btn on new news feed page
const newNewsBtn = document.querySelector(".new-news-btn");
newNewsBtn.addEventListener("click", handleNewNewsBtn);

const newnewsContainer = document.getElementById("new-news-container");
// show newArr news to the UI
function renderNews(newsArr) {
  newsArr.map((news, indx) => {
    const { category, author, content, url } = news;
    let listItem = document.createElement("li");
    listItem.className = "card";
    listItem.innerHTML = `
      <div class="auther-category-container">
        <p>BY 
          <span class="author"> ${author} </span>
        </p>
        <p>CATEGORY 
          <span class="category"> ${category} </span>
        </p>
      </div>
      <p class="content">${content} 
        <a href=${url}>READ MORE.</a> 
      </p>
      <div class="fav-icon">
        <i class="fa-regular fa-heart"></i> 
      </div>
    `;

    newnewsContainer.appendChild(listItem);
    const favIcon = document.querySelector(".fa-heart");
    favIcon.addEventListener("click", handleFavIconClcik);

    function handleFavIconClcik() {
      //   if (favIcon.includes("fa-solid")) {
      //     favIcon.classList.remove("fa-solid");
      //   } else {
      favIcon.classList.add("fa-solid");
      //   }
    }
  });
}

// load more btn handling
loadNewNewsBtn.addEventListener("click", handleLoadNewNewsBtn);
function handleLoadNewNewsBtn() {
  handleNewNewsBtn();
}

async function handleNewNewsBtn() {
  page = page + 1;
  newsArr = await fetchNews(10, page);
  renderNews(newsArr);
}
