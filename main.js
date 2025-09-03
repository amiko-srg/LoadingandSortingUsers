let users = [];
let filteredUsers = [];

const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const userListEl = document.querySelector("#userList");


async function fetchUsers() {
  try {
    let res = await fetch("https://randomuser.me/api/?results=100");
    let data = await res.json();
    users = data.results;
    filteredUsers = [...users]; 
    renderUsers(filteredUsers);
  } catch (err) {
    console.error("Xatolik:", err);
  }
}


searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();
  filteredUsers = users.filter((item) =>
    `${item.name.first} ${item.name.last}`
      .toLowerCase()
      .includes(searchText)
  );
  renderUsers(filteredUsers);
});


sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;

  if (value === "name-asc") {
    filteredUsers.sort((a, b) =>
      a.name.first.localeCompare(b.name.first)
    );
  } else if (value === "name-desc") {
    filteredUsers.sort((a, b) =>
      b.name.first.localeCompare(a.name.first)
    );
  } else if (value === "age-asc") {
    filteredUsers.sort((a, b) => a.dob.age - b.dob.age);
  } else if (value === "age-desc") {
    filteredUsers.sort((a, b) => b.dob.age - a.dob.age);
  }

  renderUsers(filteredUsers);
});


function renderUsers(list) {
  userListEl.innerHTML = list
    .map(
      (user) => `
      <div class="card">
        <img src="${user.picture.large}" alt="${user.name.first}">
        <h3>${user.name.first} ${user.name.last}</h3>
        <p>Age: ${user.dob.age}</p>
        <p>${user.location.city}, ${user.location.country}</p>
      </div>
    `
    )
    .join("");
}


fetchUsers();
