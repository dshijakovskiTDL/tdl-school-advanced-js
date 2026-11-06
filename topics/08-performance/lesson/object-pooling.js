// * Object Pooling

// ? Let's say you are making Space Invaders and you need to have a bunch of enemies appear in waves
// ? You would also need to track their location and make sure when your player shoots them, they die and disappear

// ? the naive way to do it would be just adding the enemies to an array and removing them once they die

const enemies = [];

class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  hasBeenShot(bullet) {
    // Calculating enemy and bullet position
  }
}

// ? What's more, you would also need to keep track of your bullets' positions to be able to calculate collision with enemies

const bullets = [];

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// ? Then your game logic would look something like this

class SpaceInvaders {
  static WAVE_SIZE = 1000;

  static checkCollision({ bullet, bulletIdx, enemy, enemyIdx }) {
    if (enemy.hasBeenShot(bullet)) {
      enemies.splice(enemyIdx, 1);
      bullets.splice(bulletIdx, 1);
    }
  }

  static nextWave() {
    for (let i = 0; i < SpaceInvaders.WAVE_SIZE; i++) {
      enemies.push(new Enemy(i, i));
    }
  }

  static shoot(player) {
    bullets.push(new Bullet(player.x, player.y));
  }
}

// ? Now, at each frame of animation, you are calculating collision detections
// ? and you also can shoot as many bullets as you want.

// ? Each new wave - you will need to create a bunch of new Enemy objects
// ? Each time you shoot - you will need to create a new Bullet object
// ? Each time you hit an enemy - you will remove and destroy both the Enemy and the Bullet object that hit it

// ? ...this is a lot of hard work on your program, as well as the GC - as it has to do a lot of object creation and deletion
// ? to mitigate this, we can implement Object Pooling and reuse already created Enemies as well as Bullets

// ? --------------------------------------------------------------------------------------------------------------------------- ?

// ? We can create a generic Pool class to keep track of a pre-created array of objects
// ? while also keeping track of their "active" state (i.e. whether they are currently in the game)

// ? Note: For this to work, we will need to enforce that each object (Enemy and Bullet) has a `reset` method
// ? So that we can reset their positions/properties when we spawn them and also kill them

class Pool {
  #pool;
  #objectIndexes;

  constructor(size, constructorFn) {
    this.#pool = Array.from({ length: size }, () => {
      const object = constructorFn();

      // Enforce our objects to have a `reset` method
      if (typeof object.reset !== 'function') {
        throw new Error('Pooled objects must have a `reset` method!');
      }

      return { object, active: false };
    });

    // We can use a WeakMap to keep track of each object's index (useful for lookups - ex. kill method)
    this.#objectIndexes = new WeakMap(this.#pool.map((entry, i) => [entry.object, i]));
  }
  // Get an object from the Pool
  spawn(...args) {
    for (let i = 0; i < this.#pool.length; i++) {
      const { object, active } = this.#pool[i];

      if (active) continue;

      object.reset(...args); // set its initial position, velocity etc.
      this.#pool[i].active = true; // activate it - ready to use in the game

      return object;
    }

    return null;
  }

  // Deactivate the object and reset it
  kill(object) {
    const targetIdx = this.#objectIndexes.get(object);
    if (targetIdx === undefined) return;

    if (!this.#pool[targetIdx].active) return;

    object.reset(); // Reset the object to its initial state
    this.#pool[targetIdx].active = false; // set it back to inactive
  }

  processActiveObjects(processFn) {
    for (let i = 0; i < this.#pool.length; i++) {
      const { object, active } = this.#pool[i];

      if (active) {
        processFn(object);
      }
    }
  }
}

// ? Then we can use this Pool class to create a pool of enemies and bullets, reusing them the entire game
class Enemy {
  constructor() {
    this.reset();
  }

  update() {
    // Update position, check collision etc
  }

  checkCollision(bullet) {
    // Check bullet collision
  }

  reset(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Bullet {
  constructor() {
    this.reset();
  }

  reset(x = 0, y = 0, velocity = 0) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
  }
}

const enemyPool = new Pool(1000, () => new Enemy());
const bulletsPool = new Pool(10_000, () => new Bullet());

// Spawn an enemy/bullet
enemyPool.spawn(100, 200);
bulletsPool.spawn(player.x, player.y, 100);

// Process enemies/bullets
enemyPool.processActiveObjects((enemy) => {
  enemy.update();

  bulletsPool.processActiveObjects((bullet) => {
    bullet.update();

    // Kill an enemy/bullet
    if (enemy.checkCollision(bullet)) {
      enemyPool.kill(enemy);
      bulletsPool.kill(bullet);
    }
  });
});

// ? This approach makes it so that the GC doesn't have to do a lot of work cleaning up after us
// ? We just activate and deactivate (spawn and kill) objects as we need them in our game
