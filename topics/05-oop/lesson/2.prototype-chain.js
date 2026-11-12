// * OOP

// * 2. Prototype chain

// ? So remember in the previous section when we encountered that weird `null`
// ? Object.create(null);

// ? Well, turns out - that's a very important part of this entire adventure we're on
// ? The problem before us is:
// ? We are currently creating 2 new functions for each user.

// ? We need to figure out a way to have, ideally, only 1 instance of each function (`greet` and `birthday`)
// ? but also "somehow" have them be linked to each user object, so that each time we call them
// ? they would know what user they are working with...

const userFunctions = {
  greet: function () {
    console.log(`${this.username}, a ${this.age} year(s) old user.`);
  },
  birthday: function () {
    this.age++;
  },
};

function createUser(username, age) {
  const user = Object.create(userFunctions);
  user.username = username;
  user.age = age;

  return user;
}

const userA = createUser('userA', 28);
const userB = createUser('userB', 27);

userA.greet(); // "userA, a 28 year(s) old user."
userB.greet(); // "userB, a 27 year(s) old user."

// ! Illustration on how the Prototype chain works with Object.create()

// ? So now we have only 1 copy of each function (`greet` and `birthday`) and they
// ? automatically know which user they are referring to when we call them - that's almost magical!
// ? But how does this magic work? Let's break it down.

// ? Firstly, the way that Object.create() works is that whatever we pass into it as an argument
// ? gets "linked" to the returned object through a hidden property called `[[Prototype]]`.
// ? This `[[Prototype]]` property references `userFunctions` (which houses the `greet` and `birthday` functions).
// ? It's actually not that hidden a property, we can see it in the console, but what it does is it
// ? enables objects to SHARE FUNCTIONALITY without wasting memory.

// ? This means that neither the `userA` nor the `userB` objects actually "have" a `greet` or a `birthday` property.
// ? We can actually check this by running the following code:
console.log(userA.hasOwnProperty('greet')); // false
console.log(userB.hasOwnProperty('birthday')); // false

// ? ...wait what's happening... where did this `hasOwnProperty` method come from? We certainly didn't add it...
// ? Well, it turns out that the thing that the `[[Prototype]]` property references (userFunctions) - has its own hidden `[[Prototype]]` property...

// ? This leads us to the main idea of how JavaScript implements OOP - prototype chaining.
// ? Every object in JavaScript has its own prototype and there is actually a "final boss" prototype - Object.prototype.
// ? This Object.prototype is kind of the final link in this chain that houses all common functionality for all objects,
// ? one of them being the `hasOwnProperty` method - a function which tells us if a property is directly owned by the object.
// ? The final boss btw - Object.prototype - doesn't have a prototype - it's `null`.

// ! Note: Creating an object using Object.create(null) will also make its prototype be `null` and won't point to the "final boss" Object.prototype.

// ? To recap how this linking works in our case, it goes:
// ? 1. User object { username, age, [[Prototype]]: userFunctions }
// ? 2. User functions { greet, birthday, [[Prototype]]: Object.prototype }
// ? 3. Object.prototype { hasOwnProperty, ..., [[Prototype]]: null }

// ? This prototype chain allows JavaScript to go layer by layer in looking for a particular property,
// ? when we are trying to access it in our code. So when we do:
userA.birthday();
// ? JavaScript first looks at the user object - doesn't find the `birthday` property there
// ? it doesn't panic though - it just goes up the prototype chain and checks the user object's prototype - `userFunctions`
// ? this is where it finds the function and then it executes it.
// ? Same thing with `hasOwnProperty` - it goes up the prototype chain, up to Object.prototype where it finally finds it as well.

// ? So, that's how that "link" is made between the user objects and the functions within `userFunctions` - the prototype chain.
// ? But wait, there's still one more piece to the puzzle - how do these functions, when invoked, know which user they are referring to.

// ? Yep, it's that time everyone - let's discuss the THIS keyword!
