// * OOP

// * The "class" keyword

// ? Enter - classic OOP syntax using the "class" keyword
// ? This now is just straight up syntactic sugar, nothing different than the previous
// ? approach in terms of how things work under the hood

// ? The only thing different is the syntax:
// ? We use the "class" keyword to define the `User` class - a blueprint for a "User" object
// ? We use the special name "constructor" for the function that creates our "User" object
// ? We define the methods (greet, birthday) inside the class

class User {
  constructor(username, age) {
    this.username = username;
    this.age = age;
  }

  greet() {
    console.log(`${this.username}, a ${this.age} year(s) old user.`);
  }

  birthday() {
    this.age++;
  }
}

const userA = new User('userA', 25);
console.log(userA.age); // 25
