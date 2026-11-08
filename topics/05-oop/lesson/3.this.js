// * OOP

// * 3. The "this" keyword

// ? In JavaScript, every regular (non-arrow) function has this implicit parameter that we can use, called `this`
// ? The tricky thing about it is, we often have a hard time figuring out what "this" is...

// ? In our case, `this` refers to the OBJECT THAT CALLED THE FUNCTION
// * userA.greet();
// ? Since `userA` called the `greet` method - the `this` keyword gets automatically "bound" to `userA`

// ? An easy trick to know here is:
// ? Look at the left side of the "dot" notation, whatever that object is, that's what `this` refers to

// ? ...but is this always the case?
// ? Let's say we wanted to have a new function `setAge` that sets the user's age to a particular number

function createUser(username, age) {
  const user = Object.create(userFunctions);
  user.username = username;
  user.age = age;

  return user;
}

let userFunctions = {
  birthday: function () {
    this.age++;
  },
  setAge: (newAge) => {
    this.age = newAge;
  },
};

const userA = createUser('userA', 28);

// ! QUIZ
// ! What will happen if `setAge` is an arrow function and we call userA.setAge(30) ?

userA.setAge(30);
console.log(userA.age); // ?

// ? When we use arrow functions, the `this` keyword behaves differently
// ? In that case, the `this` keyword refers to the `this` of the LEXICAL SCOPE IN WHICH THAT FUNCTION WAS DEFINED
// ? and in this case, that scope is the top-level scope, whose `this` is generally:
// ? - The `window` object (in Browsers as regular scripts)
// ? - `undefined` in ES modules
// ? - `module.exports` (initially an empty object) in CommonJS modules

// ? ...phew

// ? In other words, arrow functions are "lexically scoped"
// ? Meaning their `this` keyword is defined by the LOCATION AT WHICH THEY WERE CREATED

// ? Sometimes this can be detrimental, as we saw above, but sometimes it can actually be helpful...
