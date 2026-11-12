// * OOP

// * The "new" keyword

// ? Beyond this point, we are only talking about syntactic sugar
// ? The previous approach to having a factory function is good and it works
// ? However, it's pretty verbose

// ? To solve this issue, we can use the "new" keyword, which changes the behavior of these functions.
// ? When calling a function with the "new" keyword, the following things happen:
// ? - We get that "user" object implicitly defined within the function - we don't have to create it
// ? - That same "user" object is automatically returned for us - we don't have to write that return statement

// ? This makes our code so much cleaner and more readable, but it does leave us with a couple of questions:
// ? 1. What label do we use to refer to that implicit object defined in the function?
// ? 2. How do we connect the functions to this object? How do we link the `[[Prototype]]` property and to what?

// ? The answer to the first question won't surprise you - it's the "this" keyword
// ? Anytime we use the "new" keyword to call a "constructor" function like `userCreator`
// ? the "this" keyword automatically refers to an implicit object created within `userCreator`
// ? we then need to add properties to it (like username and age) and that implicit object (our user object) will be automatically returned to us

function userCreator(username, age) {
  this.username = username;
  this.age = age;
}

const userA = new userCreator('userA', 25);
console.log(userA); // { username: 'userA', age: 25 }

// ? To answer the second question however, we need to take a little detour and
// ? find out about a hidden secret that JavaScript functions are hiding...
// ? When we create a regular function in JavaScript, that function is actually
// ? an Object + Function combination held in memory

// ? What this means is that behind the scenes, every JavaScript function is also an Object
function doSomething() {
  console.log('Doing something...');
}

doSomething.age = 30;

doSomething(); // 'Doing something...'
console.log(doSomething.age); // 30

// ? This Object is not empty by default - it has a property assigned to it at the start
// ? and that property is called `prototype`. The value of it is just an empty Object.
// ! It technically isn't an empty object, but has a `constructor` property that references the function itself, but that's not important to us now.
console.log(doSomething.prototype); // { }

// ? This `prototype` object, attached to the Object-part of a JavaScript function is
// ? how we can attach the functions to our user and they basically replace the `userFunctions` Object.

// ? When we call a function using the `new` keyword - Its implicit "this" object's `[[Prototype]]` property is linked
// ? to the function's `prototype` property automatically.
// ? That's how this syntactic sugar gives us prototype chaining.

// ? Note: We usually use capital letters to start the function name, so that we
// ? help other developers and let them know this is a function that
// ? needs to be called with the "new" keyword
function UserCreator(username, age) {
  this.username = username;
  this.age = age;
}

UserCreator.prototype.greet = function () {
  console.log(`${this.username}, a ${this.age} year(s) old user.`);
};

UserCreator.prototype.birthday = function () {
  this.age++;
};

// ? This approach to "mimicking" OOP is widely used even today
// ? However it too has a couple of disadvantages...
// ? For one, it's kind of verbose still, especially defining the functions
// ? And for another, we have no way of actually preventing other developers
// ? from calling this function WITHOUT the "new" keyword

// ! QUIZ
// ! What will happen if we call `UserCreator` without the "new" keyword?

// ? In that case, the "this" object will refer to the `globalThis` object (in non-strict mode) and will be `undefined` in strict mode
// ? so then nothing will work as we want it to at that point

// ? So how do we fix this? How do we make sure that we must use the "new" keyword to call this function?

// ? Well, one way is to use `new.target`, which refers to the function that was called with the "new" keyword, if it was called with the "new" keyword, otherwise it's `undefined`
// ? So we can use this to check if the function was indeed called with the "new" keyword, and if not, throw an error

function UserCreatorSafe(username, age) {
  if (!new.target) {
    throw new Error('You must use the "new" keyword to call this function');
  }

  this.username = username;
  this.age = age;
}

new UserCreatorSafe('userA', 25); // All good
UserCreatorSafe('userA', 25); // `new.target` is `undefined` so an error is thrown

// ? But who wants to write the same if statement in all of their "constructor" functions? There must be a better way...
