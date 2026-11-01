// * OOP

// * 3. The "this" keyword

// ? In JavaScript, every function has this implicit parameter that we can use, called `this`
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
// ? Run it with "bun" -> 28
// ? Run it with "node/deno" -> TypeError: Cannot set properties of undefined (setting 'age')
// ? Run it with "node/deno" + Change "type" to "commonjs" in `package.json` file -> 28

// ? In that case, `userA`'s age won't change... but why??

// ? When we use arrow functions, the `this` keyword behaves differently
// ? In that case, the `this` keyword refers to the LEXICAL SCOPE IN WHICH THAT FUNCTION WAS DEFINED
// ? and that is generally:
// ? - the `globalThis` a.k.a. `window` (in Browsers)
// ? - runtime-dependent value in server environments (Node/Bun/Deno)

// ? In other words, arrow functions are "lexically scoped"
// ? Meaning their scope is defined by the LOCATION AT WHICH THEY WERE CREATED

// ? Sometimes this can be detrimental, as we saw above, but sometimes it can actually be helpful...

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? Note: In server-side JS (Node/Bun/Deno), the value of top-level `this` depends on the runtime and module system.
// ? This can make arrow functions behave differently than in Browsers.
// ? But the core principle remains: arrow functions do not have their own `this` - they capture it lexically.
