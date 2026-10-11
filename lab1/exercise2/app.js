function check(label, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "✔" : "✘"} ${label}`, ok ? "" : { actual, expected });
}

// TODO 1 — Return a letter for a grade out of 20 with if / else if / else:
//   16 or more → "A",  14 or more → "B",  12 or more → "C",  10 or more → "D",  otherwise "F"
function letter(grade) {
  if (grade >= 16) {
    return "A";
  } else if (grade >= 14) {
    return "B";
  } else if (grade >= 12) {
    return "C";
  } else if (grade >= 10) {
    return "D";
  } else {
    return "F";
  }
}

// TODO 2 — Return "Pass" if the grade is 10 or more, "Fail" otherwise.
// Use the ternary operator ( condition ? a : b ) in ONE line.
function status(grade) {
  return grade >= 10 ? "Pass" : "Fail";
}

// TODO 3 — Return the sum of the numbers. Use for...of and a variable declared with let.
function sum(numbers) {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total;
}

// TODO 4 — Return HOW MANY grades are 10 or more. Use for...of and if.
function countPassed(grades) {
  let count = 0;
  for (const g of grades) {
    if (g >= 10) {
      count++;
    }
  }
  return count;
}

// TODO 5 — Return an array counting down from n to 1, for example countdown(3) → [3, 2, 1].
// Use a classic for loop ( for (let i = …; …; …) ) and push.
function countdown(n) {
  const result = [];
  for (let i = n; i >= 1; i--) {
    result.push(i);
  }
  return result;
}

// ---------- Do not change ----------
check("letter A",    letter(17), "A");
check("letter B",    letter(14), "B");
check("letter D",    letter(10), "D");
check("letter F",    letter(9.5), "F");
check("status",      [status(10), status(9)], ["Pass", "Fail"]);
check("sum",         sum([4, 6, 10]), 20);
check("countPassed", countPassed([8, 12, 10, 15, 3]), 3);
check("countdown",   countdown(3), [3, 2, 1]);
