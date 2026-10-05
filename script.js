const form = document.getElementById("registrationForm");
const output = document.getElementById("output");
const outputContent = document.getElementById("outputContent");
const clearBtn = document.getElementById("clearBtn");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const confirmEmail = document.getElementById("confirmEmail").value.trim();

  const userId = document.getElementById("userId").value.trim();
  const confirmUserId = document.getElementById("confirmUserId").value.trim();
  const toggleBtn = document.getElementById("toggleBtn");

  const currentTheme = document.getElementById("theme").value;

  if(currentTheme === "dark") {
   document.body.classList.add("dark-theme");
   toggleBtn.textContent = "Switch to Light Mode";
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle("dark-theme");
    let theme = 'light';
    if(document.body.classList.contains("dark-theme")) {
      theme = 'dark';
      toggleBtn.textContent = "Switch to Light Mode";
    } else {
      toggleBtn.textContent = "Switch to Dark Mode";
    }
    localStorage.setItem('theme', theme);

  // Check if email addresses match
  if (email !== confirmEmail) {
    alert("Email addresses do not match.");
    return;
  }

  // Check User ID format
  const userIdPattern = /^[A-Za-z][A-Za-z0-9_]{7,19}$/;

  if (!userIdPattern.test(userId)) {
    alert("User ID must be 8-20 characters, start with a letter, and use only letters, numbers, and underscore.");
    return;
  }

  if (userId !== confirmUserId) {
    alert("Preferred User IDs do not match.");
    return;
  }
//I hate this part
  const data = {
    crn: document.getElementById("crn").value.trim(),
    email: email,
    surname: document.getElementById("surname").value.trim(),
    givenName: document.getElementById("givenName").value.trim(),
    middleName: document.getElementById("middleName").value.trim(),
    dob: document.getElementById("dob").value,
    userId: userId,
    room: document.getElementById("room").value.trim(),
    house: document.getElementById("house").value.trim(),
    street: document.getElementById("street").value.trim(),
    subdivision: document.getElementById("subdivision").value.trim(),
    location:
      document.getElementById("metroManila").checked ? "Metro Manila" :
      document.getElementById("province").checked ? "Province" : "Not selected"
  };

  outputContent.innerHTML = `
    <p><strong>CRN / SS Number:</strong> ${escapeHTML(data.crn)}</p>
    <p><strong>Email:</strong> ${escapeHTML(data.email)}</p>
    <p><strong>Preferred User ID:</strong> ${escapeHTML(data.userId)}</p>
    <p><strong>Name:</strong> ${escapeHTML(data.givenName)} ${escapeHTML(data.middleName)} ${escapeHTML(data.surname)}</p>
    <p><strong>Date of Birth:</strong> ${escapeHTML(data.dob)}</p>
    <p><strong>Address:</strong> ${escapeHTML(data.room)}, ${escapeHTML(data.house)}, ${escapeHTML(data.street)}, ${escapeHTML(data.subdivision)}</p>
    <p><strong>Location:</strong> ${escapeHTML(data.location)}</p>
    <p><strong>Status:</strong> Registration submitted successfully.</p>
  `;

  output.classList.remove("hidden");
  output.scrollIntoView({ behavior: "smooth" });
});

clearBtn.addEventListener("click", function () {
  form.reset();
  output.classList.add("hidden");
  outputContent.innerHTML = "";
});

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, function (char) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return entities[char];
  });
}})
