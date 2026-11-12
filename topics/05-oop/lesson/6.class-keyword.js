// * OOP

// * The "class" keyword

// ? Enter - classic OOP syntax using the "class" keyword
// ? This now is just straight up syntactic sugar, nothing different than the previous
// ? approach in terms of how things work under the hood

// ? The syntax differences are as follows:
// ? - We use the "class" keyword to define the `User` class - a blueprint for a "User" object
// ? - We use the special function named "constructor" which will create our "User" object
// ? - We define the methods (greet, birthday) inside the class

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

// ! Note: There are other differences between a constructor function and a class, which are not important for this course.
// ! However if you are still interested:
// ! - Calling a class constructor without the "new" keyword will throw an error,
// !   as opposed to the constructor function where nothing can stop you from doing so and it is up to the person that wrote the constructor function to handle it.
// ! - Classes are NOT hoisted, as opposed to constructor functions.
// ! - A few other details that are really not important... why are we still talking about this? I wanna go home...
