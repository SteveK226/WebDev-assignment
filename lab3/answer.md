Lab 3 — Asynchronous JavaScript — Answers

 Exercise 1

Part A
1- The output is:
text
A
C
B

2- setTimeout does not run the function right away. It schedules it for later, and JavaScript continues with console.log("C").The callback only runs when the synchronous code is finished.

3.The order is the same (A, C, B). The only difference is that B appears after 1 second instead of right away.

Part B
Prediction:
text
1
4
3
2

The 0 ms timer still waits for the synchronous code to finish. A timer callback only runs when the call stack is empty, so "4" is printed first.

Part C
Timeline:
text
Start        (0 s, synchronous)
  ↓
End          (0 s, synchronous)
  ↓
Timer 2      (after 1 s)
  ↓
Timer 1      (after 2 s)

"Start" and "End" are synchronous, so they print first. The two timers are scheduled at the same time, and Timer 2 has the shorter delay (1 s), so it finishes before Timer 1 (2 s). The order they were written in doesn't matter.

Exercise 2 — Part C
1- Each step has to go inside the callback of the step before it, so every new step is one level deeper.
2- With ten steps we would have ten levels of nested callbacks, and the code would be very hard to read.
3- This is called "callback hell" (the pyramid of doom). The code is hard to read and to change, and handling errors at every level is difficult.

Exercise 3 — Part C
If we only write `wait(1);`, the next `.then()` does not wait for it. It runs right away, so "1 second", "2 seconds" and "3 seconds" would almost all print at the same time. When we `return wait(1)`, the next `.then()` waits until that promise is resolved.

Exercise 4 — Part B
1- `.then()` runs when the promise is resolved (success).
2- `.catch()` runs when the promise is rejected (error).
3- `.finally()` always runs at the end, after success or after error.

Exercise 5 — Part C
I find the `async/await` version with `try/catch` easier to read, because it reads from top to bottom like normal code. But both versions do the same thing, because `await` also works with promises.

Exercise 6

Part B
`response.status` is the HTTP status code (200 means OK). `response.ok` is `true` when the status is between 200 and 299.
With `/does-not-exist` the status is 404 and `response.ok` is `false`. But `fetch` does not throw an error, so we have to check it ourselves.

Part C
`fetch()` only gives us the `Response` object once the headers arrive. The body (the data) is not read yet. `response.json()` reads the body and turns it into a JavaScript object, and that also takes time, so it returns a promise and needs `await`.

Exercise 9
1- The sequential version takes about 4.5 seconds (2 + 1 + 1.5).
2- The parallel version takes about 2 seconds.
3- In the parallel version all three start at the same time, so we only wait for the longest one (2 s). In the sequential version each one waits for the one before.
4- No. If `getNews()` needs the result of `getCourses()`, it has to wait for it, so they must run one after the other with `await`.

Exercise 11
We can give each search a number and remember the number of the latest one. When a result comes back, we only show it if its number is still the latest one; otherwise we ignore it (this is `showLatest` in answer.js). Another way is `AbortController`: when a new search starts, we call `abort()` on the old request so it is cancelled.

Final Challenge
I chose Option D (Task Manager). It loads tasks from `https://jsonplaceholder.typicode.com/todos` with `fetch`, shows a loading and an error message, filters done and not done tasks, and adds a new task with a POST request. Clicking a task marks it done or not done.

Reflection Questions

1- `fetch("/api/users")` returns a Promise right away, not the data. `await fetch("/api/users")` waits for the Promise to resolve and gives us the `Response` object.

2- A Promise represents a value that is not available yet but will be later: the result of an asynchronous operation, or its error.

3- Pending (still waiting), fulfilled (resolved with a value) and rejected (failed with an error).

4- `setTimeout` puts the callback aside, even with 0 ms. JavaScript first finishes the synchronous code (A and C), and the callback (B) only runs after that, when the call stack is empty.

5- Both wait for a Promise. `.then()` takes a callback function that runs when the Promise is resolved. `await` pauses the `async` function until the Promise is resolved and gives the value directly, so the code looks synchronous. `await` can only be used inside an `async` function (or a module).

6- `fetch` resolves when the response headers arrive, but the body is not read yet. `response.json()` reads the body and converts it to JSON, which is also asynchronous.

7- Because `fetch` does not reject on errors like 404 or 500. It only rejects if the network fails. So we must check `response.ok` to know if the request really worked.

8- When we have several asynchronous operations that do not depend on each other, so they can run at the same time and we wait for all of them.

9- Because responses don't always come back in the same order as the requests. A slow old request can finish after a newer one and replace the newer result on the page.
