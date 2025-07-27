let url = "https://68854529f52d34140f69818b.mockapi.io/api/v1/jobs";

async function FetchTodoData(url) {
  try {
    let fetch_todo_request = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Optional: remove this if you're not using access_token
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
    });

    if (fetch_todo_request.ok) {
      try {
        let real_data = await fetch_todo_request.json();
        RenderData(real_data);
      } catch (err) {
        alert("Server did not return valid JSON.");
      }
    } else {
      const text = await fetch_todo_request.text();
      alert(`Error ${fetch_todo_request.status}: ${text}`);
    }
  } catch (error) {
    alert("Something went wrong!! Please try again later.");
  }
}

FetchTodoData(url);

function RenderData(real_data) {
  let container = document.getElementById("Job_section_All_Jobs");
  container.innerHTML = ""; // Clear old data before rendering again

  console.log(real_data);

  real_data.map(function (elem) {
    var innerdiv = document.createElement("div");
    innerdiv.setAttribute("class", "innerdiv");

    var title = document.createElement("h3");
    title.innerText = elem.jobProfilename;
    title.setAttribute("class", "title");

    var companyName = document.createElement("p");
    companyName.innerHTML = `<span class="boldText">Company Name:</span> ${elem.Companyname}`;

    var experience = document.createElement("p");
    experience.innerHTML = `<span class="boldText">Experience (in years): </span> ${elem.experenceInYear}`;

    var salary = document.createElement("p");
    salary.innerHTML = `<span class="boldText">Salary:</span> ${elem.salary}`;

    var address = document.createElement("p");
    address.innerHTML = `<span class="boldText">Location:</span> ${elem.address}`;

    var description = document.createElement("p");
    description.innerHTML = `<span class="boldText">Job Description:</span> ${elem.JobDescription}`;

    var btn = document.createElement("button");
    btn.setAttribute("class", "saveButton");
    btn.innerText = "1 Day ago";
    btn.addEventListener("click", function () {
      saveJob(elem);
    });

    innerdiv.append(
      title,
      companyName,
      experience,
      salary,
      address,
      description,
      btn
    );

    container.append(innerdiv);
  });
}

// Hover functionality for menu
document.querySelector("#job").addEventListener("mouseover", () => {
  document.querySelector(".hover1").style.display = "grid";
});
document.querySelector("#job").addEventListener("mouseleave", () => {
  document.querySelector(".hover1").style.display = "none";
});

document.querySelector("#recruit").addEventListener("mouseover", () => {
  document.querySelector(".hover2").style.display = "grid";
});
document.querySelector("#recruit").addEventListener("mouseleave", () => {
  document.querySelector(".hover2").style.display = "none";
});

// Search functionality
let bag = [];
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    bag = [...data];
  })
  .catch((err) => console.log(err));

function search() {
  let x = document.querySelector("#input1").value;
  let newData = bag.filter((element) => {
    return element.jobProfilename.toLowerCase().includes(x.toLowerCase());
  });
  RenderData(newData);
}
