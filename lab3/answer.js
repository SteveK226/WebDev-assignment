//Exercise 1 

function exercise1A() {
  console.log("A");
  setTimeout(() => {
    console.log("B");
  }, 0);
  console.log("C");
}

function exercise1B() {
  console.log("1");
  setTimeout(() => {
    console.log("2");
  }, 1000);
  setTimeout(() => {
    console.log("3");
  }, 0);
  console.log("4");
}

function exercise1C() {
  console.log("Start");
  setTimeout(() => {
    console.log("Timer 1");
  }, 2000);
  setTimeout(() => {
    console.log("Timer 2");
  }, 1000);
  console.log("End");
}

//Exercise 2 

function delay(message, seconds, callback) {
  setTimeout(() => {
    console.log(message);
    callback();
  }, seconds * 1000);
}

function exercise2A() {
  delay("Hello!", 2, () => {
    console.log("Finished");
  });
}


function exercise2B() {
  delay("Step 1", 1, () => {
    delay("Step 2", 1, () => {
      delay("Step 3", 1, () => {
        console.log("Done!");
      });
    });
  });
}

// Exercise 3

function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${seconds} seconds have passed!`);
    }, seconds * 1000);
  });
}

function exercise3A() {
  wait(2).then(() => {
    console.log("Two seconds have passed!");
  });
}

function exercise3B() {
  wait(2).then((message) => {
    console.log(message);
  });
}

function exercise3C() {
  console.log("Start");
  wait(1)
    .then(() => {
      console.log("1 second");
      return wait(1);
    })
    .then(() => {
      console.log("2 seconds");
      return wait(1);
    })
    .then(() => {
      console.log("3 seconds");
      console.log("Finished");
    });
}

// Exercise 4 

function checkServer() {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.5) {
      resolve("Server is online");
    } else {
      reject("Server is unavailable");
    }
  });
}

function exercise4() {
  checkServer()
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      console.log("Request finished.");
    });
}

//Exercise 5 

async function run() {
  await wait(1);
  console.log("Step 1");

  await wait(1);
  console.log("Step 2");

  await wait(1);
  console.log("Step 3");
}

async function runWithErrors() {
  try {
    await wait(1);
    console.log("Step 1");

    const message = await checkServer();
    console.log(message);

    await wait(1);
    console.log("Step 2");
  } catch (error) {
    console.error("Error:", error);
  }
}

//Exercise 6 
async function loadUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  console.log(response);
  console.log(response.status);
  console.log(response.ok);

  const users = await response.json();
  console.log(users);
}

async function loadMissing() {
  const response = await fetch("https://jsonplaceholder.typicode.com/does-not-exist");
  console.log(response.status);
  console.log(response.ok);
}

//Exercise 7 and 8

function renderUsers(users, list) {
  list.innerHTML = "";
  for (const user of users) {
    const li = document.createElement("li");
    const name = document.createElement("strong");
    name.textContent = user.name;
    const email = document.createElement("div");
    email.textContent = user.email;
    li.append(name, email);
    list.append(li);
  }
}

// Exercise 7
async function exercise7() {
  const status = document.querySelector("#status");
  const list = document.querySelector("#users");

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    status.textContent = "Request failed";
    return;
  }
  const users = await response.json();
  renderUsers(users, list);
  status.textContent = `${users.length} users`;
}

// Exercise 8 
async function exercise8() {
  const status = document.querySelector("#status");
  const list = document.querySelector("#users");

  status.textContent = "Loading...";
  let message = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const users = await response.json();
    renderUsers(users, list);
    message = "Users loaded successfully";
  } catch (error) {
    message = "Could not load users.";
  } finally {
    status.textContent = message;
  }
}

//Exercise 9

function getCourses() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Courses loaded");
    }, 2000);
  });
}

function getNews() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("News loaded");
    }, 1000);
  });
}

function getEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Events loaded");
    }, 1500);
  });
}

async function loadSequentially() {
  console.time("sequential");

  const courses = await getCourses();
  const news = await getNews();
  const events = await getEvents();

  console.log(courses);
  console.log(news);
  console.log(events);

  console.timeEnd("sequential");
}

async function loadInParallel() {
  console.time("parallel");

  const [courses, news, events] = await Promise.all([
    getCourses(),
    getNews(),
    getEvents()
  ]);

  console.log(courses);
  console.log(news);
  console.log(events);

  console.timeEnd("parallel");
}

//  Exercise 10 

function exercise10() {
  const form = document.querySelector("#search-form");
  const input = document.querySelector("#search");
  const status = document.querySelector("#search-status");
  const results = document.querySelector("#results");

  function showMessage(message) {
    status.textContent = message;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = input.value.trim();
    showMessage("Searching...");
    results.innerHTML = "";

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const users = await response.json();
      const found = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );

      if (found.length === 0) {
        showMessage("No users found.");
      } else {
        renderUsers(found, results);
        showMessage(`${found.length} user(s) found`);
      }
    } catch (error) {
      showMessage("Could not load users.");
    }
  });
}

//  Exercise 11 

function search(query) {
  const delay = Math.random() * 3000;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Results for "${query}"`);
    }, delay);
  });
}

function exercise11() {
  search("web").then(console.log);
  search("web development").then(console.log);
}


let latestSearch = 0;

async function showLatest(query) {
  latestSearch++;
  const id = latestSearch;
  const result = await search(query);
  if (id === latestSearch) {
    console.log(result);
  }
}

function exercise11Challenge() {
  showLatest("web");
  showLatest("web development");
}

// Exercise 12

function getDashboardCourses() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { code: "CS210", title: "Web Development" },
        { code: "CS220", title: "Mobile Development" }
      ]);
    }, 1500);
  });
}

function getAnnouncements() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { title: "Exam registration opens Monday" },
        { title: "No class on Friday" }
      ]);
    }, 1000);
  });
}

function exercise12() {
  const button = document.querySelector("#load-dashboard");
  const coursesList = document.querySelector("#courses");
  const announcementsList = document.querySelector("#announcements");
  const status = document.querySelector("#dashboard-status");

  button.addEventListener("click", async () => {
    status.textContent = "Loading dashboard...";
    button.disabled = true;
    coursesList.innerHTML = "";
    announcementsList.innerHTML = "";

    try {
      const [courses, announcements] = await Promise.all([
        getDashboardCourses(),
        getAnnouncements()
      ]);

      for (const course of courses) {
        const li = document.createElement("li");
        li.textContent = `${course.code} — ${course.title}`;
        coursesList.append(li);
      }

      for (const announcement of announcements) {
        const li = document.createElement("li");
        li.textContent = announcement.title;
        announcementsList.append(li);
      }

      status.textContent = "Dashboard loaded";
    } catch (error) {
      status.textContent = "Could not load the dashboard.";
    } finally {
      button.disabled = false;
    }
  });
}

//Final Challenge Option D: Task Manager

function finalChallenge() {
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const filter = document.querySelector("#task-filter");
  const status = document.querySelector("#task-status");
  const list = document.querySelector("#tasks");

  let tasks = [];

  function renderTasks() {
    list.innerHTML = "";
    let shown = tasks;
    if (filter.value === "done") {
      shown = tasks.filter((task) => task.completed);
    } else if (filter.value === "todo") {
      shown = tasks.filter((task) => !task.completed);
    }

    for (const task of shown) {
      const li = document.createElement("li");
      li.textContent = task.title;
      if (task.completed) {
        li.classList.add("done");
      }
      li.addEventListener("click", () => {
        task.completed = !task.completed;
        renderTasks();
      });
      list.append(li);
    }
  }

  async function loadTasks() {
    status.textContent = "Loading tasks...";
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
      if (!response.ok) {
        throw new Error("Request failed");
      }
      tasks = await response.json();
      renderTasks();
      status.textContent = "";
    } catch (error) {
      status.textContent = "Could not load tasks.";
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = input.value.trim();
    if (title === "") return;

    status.textContent = "Adding task...";
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title, completed: false })
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const newTask = await response.json();
      tasks.unshift(newTask);
      renderTasks();
      input.value = "";
      status.textContent = "";
    } catch (error) {
      status.textContent = "Could not add the task.";
    }
  });

  filter.addEventListener("change", renderTasks);

  loadTasks();
}



// Page exercises (index.html)
if (typeof document !== "undefined") {
  exercise8(); // exercise7() is the first version of the same page
  exercise10();
  exercise12();
  finalChallenge();
}
