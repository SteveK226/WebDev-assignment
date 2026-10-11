# Lab 1 — Answers

## Exercise 1
`e` is still `" A@B.org "`. Strings can't be changed, so `trim` and `toLowerCase` make a new string and the original stays the same.

## Exercise 2
Every grade of 10 or more would get "D", so `letter(17)` returns "D" instead of "A". The first condition that is true wins, so the higher grades have to be tested first.

## Exercise 3
Objects are passed by reference, so `product` and `products[0]` are the same object. Writing `product.price = newPrice` would change `products[0].price` to 600 too. The spread makes a new copy.

## Exercise 4
It found the `<title>` element in the head, so the tab text changed. Without `#`, "title" is a tag name, not an id.

## Exercise 5
A sixth line appears in the list and the count goes to 6 meals. The page is built from the array, so we only change the data and the HTML updates by itself.

## Exercise 6
`addOne()` runs right away, only once, when the page loads, and its return value (`undefined`) is given to addEventListener. So clicking + does nothing. We have to pass the function itself: `addOne`.

## Exercise 7
The form submits normally and the page reloads, so the list is lost. Without `preventDefault()` the browser does its default submit action.
