// //  news fetch
async function fetchNews(limit, page, category="") {
  try {
    const selectedCategory = category !== "" ? `&category=${category}` : "" ;
    const url = `https://content.newtonschool.co/v1/pr/64e3d1b73321338e9f18e1a1/inshortsnews?limit=${limit}&page=${page}${selectedCategory}`;
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
let category = "";
const homeLoadBtn = document.getElementById("load-saved-news");
const loadNewNewsBtn = document.getElementById("load-new-news-btn");
const newnewsContainer = document.getElementById("new-news-container");

// new news page
addEventListener("DOMContentLoaded", (e) => {
  handleNewNewsBtn();
});


function getNewsFromLocalStorage() {
  const favouriteNews = JSON.parse(localStorage.getItem("favouriteNews"));
  return favouriteNews === null ? [] : favouriteNews;
}

function addNewsToLocalStorage(news) {
  const newsFromLS = getNewsFromLocalStorage();
  localStorage.setItem(
    "favouriteNews",
    JSON.stringify([...newsFromLS, news])
  );
}

function removeNewsFromLocalStorage(newsItem) {
  const favMoviesNames = getNewsFromLocalStorage();
  localStorage.setItem(
    "favouriteNews",
    JSON.stringify(favMoviesNames.filter((newsData) => newsData?.content !== newsItem))
  );
}

// show newArr news to the UI
function renderNews(newsArr) {
  const favouriteNewsList = getNewsFromLocalStorage(); 
  newsArr.forEach((news, indx) => {
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
      <div class="fav-icon-box">
        <i class="favorite-icon fa-regular fa-heart 
        ${favouriteNewsList.includes(content) ? "fa-solid" : ""}" id="${content}" ></i> 
      </div>
    `;

    const favouriteIconBtn = listItem.querySelector(".favorite-icon");
    favouriteIconBtn.addEventListener("click", handleFavIconClcik);
  
    function handleFavIconClcik(e) {
      const {id} = e.target;
      // console.log("favicon cliked",  id );
      if (favouriteIconBtn.classList.contains("fa-solid")) {
        removeNewsFromLocalStorage(id);
        favouriteIconBtn.classList.remove("fa-solid");
      } else {
        addNewsToLocalStorage(news);
        favouriteIconBtn.classList.add("fa-solid");
      }
    }
    newnewsContainer.appendChild(listItem);
    console.log("newsfrom ls", getNewsFromLocalStorage());
  });
}



// load more btn handling
loadNewNewsBtn.addEventListener("click", handleLoadNewNewsBtn);
function handleLoadNewNewsBtn() {
  handleNewNewsBtn();
}

//SELECT CATEGORY HANDLING
// Get all list items
const listItems = document.querySelectorAll('.list-item');
// Add click event listener to each list item
listItems.forEach(item => { 
  item.addEventListener('click', function() {
    // Remove 'active' class from all list items
    listItems.forEach(item => {
      item.classList.remove('active');
    });
    // Add 'active' class to the clicked list item
    this.classList.add('active');
    // Capitalize the first letter of the clicked item's text
    const text = item.textContent.toLowerCase();
    category = text.charAt(0).toUpperCase() + text.slice(1);
    if(category === "All"){
      page = 0;
      handleNewNewsBtn();
      loadNewNewsBtn.disabled = false;
    } else {
      handleSelectCategory(category);
      loadNewNewsBtn.disabled = true;
      loadNewNewsBtn.style.backgroundColor = "lightgray"; 
    }

    if(item.classList.contains("active")){
      renderNews(newsArr);
    }
  });
});


async function handleSelectCategory(category) {
  newsArr = await fetchNews(10, 1, category);
  newnewsContainer.innerHTML = '';
  renderNews(newsArr);
}

async function handleNewNewsBtn() {
  page +=1;
  newsArr = await fetchNews(10, page);
  renderNews(newsArr);
}


// TOP AND BOTTOM NAVIGATOR
const topNavigator = document.querySelector('.top-navigator');
const bottomNavigator = document.querySelector('.bottom-navigator');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    topNavigator.style.display = 'block';
    bottomNavigator.style.display = 'none';
  } else {
    topNavigator.style.display = 'none';
    bottomNavigator.style.display = 'block';
  }
});

// SHOW FAVOURITE NEWS

const savedNewsBtn = document.querySelector(".saved-news-btn");

savedNewsBtn.addEventListener("click", showFavouriteNews);
function showFavouriteNews() {
  const favoriteNews = getNewsFromLocalStorage();
  console.log("favoriteNews", favoriteNews);
  renderNews(favoriteNews);
}

