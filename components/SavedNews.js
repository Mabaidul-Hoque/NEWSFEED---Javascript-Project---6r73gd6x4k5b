function getNewsFromLocalStorage() {
    const favouriteNews = JSON.parse(localStorage.getItem("favouriteNews"));
    return favouriteNews === null ? [] : favouriteNews;
}

// function removeNewsFromLocalStorage(newsItem) {
//     const favMoviesNames = getNewsFromLocalStorage();
//     localStorage.setItem(
//       "favouriteNews",
//       JSON.stringify(favMoviesNames.filter((newsData) => newsData?.content !== newsItem))
//     );
// }

function removeNewsFromLocalStorage(newsItem) {
    const favNewsList = getNewsFromLocalStorage();
    const updatedList = favNewsList.filter((newsData) => newsData?.content !== newsItem);
    localStorage.setItem("favouriteNews", JSON.stringify(updatedList));
    return updatedList; // Return the updated list after removal
}

const myNewsfeedEle = document.getElementById("my-newsfeed");
function renderFarouritNews(favoriteNews) {
    myNewsfeedEle.innerHTML = "";
    const favouriteNewsList = getNewsFromLocalStorage(); 
    favoriteNews.forEach((news, indx) => {
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
        <div class="xmark-box">
            <i class="favorite-icon fa-solid fa-xmark fa-xl xmark" id="${content}"></i>
        </div>
        </div>
      `;
  
      const removeFromWishlistBtn = listItem.querySelector(".xmark");
      removeFromWishlistBtn.addEventListener("click", (event) => {
        const { id } = event.target;
        const updatedList = removeNewsFromLocalStorage(id); // Remove item and get updated list
        renderFarouritNews(updatedList); // Render updated list
      });
      
      myNewsfeedEle.appendChild(listItem);
    });
  }

document.addEventListener("DOMContentLoaded", showFavouriteNews)

  
const savedNewsBtn = document.querySelector(".saved-news-btn");

savedNewsBtn.addEventListener("click", showFavouriteNews);
function showFavouriteNews() {
  const favoriteNews = getNewsFromLocalStorage();
  if(favoriteNews.length !== 0){
    renderFarouritNews(favoriteNews);
  }else {
    alert("There are no favourite news right now!")
  }
 
}