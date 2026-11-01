// * OOP

// * 1. Objects and Factory Functions

// ! At this point, we are starting off with no knowledge of OOP's existence in JavaScript
// ! we are trying to BUILD OUT the reasoning behind it step by step

// ? Let's say we want our app to have users. How would we create a User object in JavaScript?
// ? We can do it a couple of ways

// ? 1. Object literal
const user1 = {
  username: 'user1',
  age: 28,
  greet: function () {
    console.log(`${user1.username}, ${user1.age} year(s) old.`);
  },
  birthday: function () {
    user1.age++;
  },
};

// ? 2. Object-dot notation
const user2 = {};
user2.username = 'user2';
user2.age = 25;
user2.greet = function () {
  console.log(`${user2.username}, ${user2.age} year(s) old.`);
};
user2.birthday = function () {
  user2.age++;
};

// ? 3. Object.create() - yes that old thing
const user3 = Object.create(null);
user3.username = 'user3';
user3.age = 25;
user3.greet = function () {
  console.log(`${user3.username}, ${user3.age} year(s) old.`);
};
user3.birthday = function () {
  user3.age++;
};

// ? ...well this is getting very repetitive don't you think?
// ? We are basically doing the same thing over and over again and are already up to 40+ lines of code for 3 users...
// ? Imagine if we had a million users... sucks to be popular huh?

// ? But hold up, we already have a way of "abstracting" (cool word) away repetitive code - Functions!
function createUser(username, age) {
  const user = {};

  user.username = username;
  user.age = age;
  user.greet = function () {
    console.log(`${user.username}, ${user.age} year(s) old.`);
  };
  user.birthday = function () {
    user.age++;
  };

  return user;
}

const userA = createUser('userA', 26);
const userB = createUser('userB', 27);

// ? There - all better! Who needs OOP...right?

// ! QUIZ
// ! What is the problem with this approach?

// ! Illustration of the memory space of each user object

// ? Using this approach, we are adding 2 functions to each user object.
// ? However, each new user gets 2 new functions just for them, so 1 million users === 2 million functions
// ? 2 million functions in memory that do the EXACT SAME THING...dude. No.

// ? Also, if that's not enough - if we want to add a new feature to our users,
// ? we will now need to manually add it to each user object - since they have already been created...

// ? So what's the solution?
