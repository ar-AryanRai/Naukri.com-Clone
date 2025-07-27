let data;
getdata();
async function getdata() {
  try {
    let res = await fetch(
      "https://68854529f52d34140f69818b.mockapi.io/api/v1/companyData"
    );
    if (res.ok) {
      data = await res.json();
      console.log(data);
      items(data);
      let filt = document.querySelectorAll(".filt");
      console.log(filt);
      let filterData = data;
      for (let i = 0; i < filt.length; i++) {
        filt[i].addEventListener("change", () => {
          if (filt[i].value == "title") {
            sortTitle(filterData);
          } else if (filt[i].value == "rate") {
            sortRating(filterData);
          } else if (filt[i].value == "review") {
            sortReview(filterData);
          } else {
            items(data);
          }
        });
      }
    } else {
      console.log("Error");
    }
  } catch (error) {
    console.error(error);
  }
}
function sortTitle(data) {
  data.sort((a, b) => {
    return a.titles.localeCompare(b.titles);
  });
  items(data);
}
function sortReview(data) {
  data.sort((a, b) => {
    return a.numberOfReviews - b.numberOfReviews;
  });
  console.log(data);
  items(data);
}

function sortRating(data) {
  data.sort((a, b) => {
    return a.rating - b.rating;
  });
  console.log(data);
  items(data);
}
let show_data = document.querySelector("#tasks");

function items(data) {
  show_data.innerHTML = "";
  display = [];
  for (let i = 0; i < 27; i++) {
    let display_data = `  <div class="task">
        <div  class="content">
            <img  src=${data[i].link} alt="">
        </div>
        <div class="actions">
        <h2>${data[i].titles}</h2>
            <p style="text-align: center;"><i class="fa-solid fa-star"></i><span>${data[i].rating}</span><span> ||</span> <span>${data[i].numberOfReviews}</span>reviews</p>
        </div>
    </div>`;
    display.push(display_data);
  }

  show_data.innerHTML = display.join("");
}
