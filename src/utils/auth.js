function register(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
  
    if (localStorage.getItem(username)) {
      alert("User already exists!");
      return;
    }
  
    const userData = {
        password,
        todos: {
            done: [],
            notDone: []
        }
    };
  
    localStorage.setItem(username, JSON.stringify(userData));
    window.location.href = "tasks.html";
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const storedUser = JSON.parse(localStorage.getItem(username));

    if (!storedUser || storedUser.password !== password) {
        alert("Invalid credentials!");
        return;
    }

    localStorage.setItem('currentUser', username);
    window.location.href = "tasks.html";
}
