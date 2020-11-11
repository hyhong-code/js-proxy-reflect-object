// Target Object
const videoGame = {
  yearOfRelease: 1996,
  difficulty: "extreme",
  isMultiplayer: false,
};

// A Proxy object can intercept and re-define fundamental
//  operations for a target object.

// targe object: The target object to wrap the proxy around
// handler object: An object that contains trap methods to control the target
const videoGameProxy = new Proxy(videoGame, {
  // `get` trap - called when accessing a property on the proxy
  get(target, prop) {
    switch (prop) {
      case "yearOfRelease":
        return 2000;

      // For adding computed property
      case "age":
        return new Date().getFullYear() - target.yearOfRelease;
      default:
        return target[prop];
    }
  },

  // `set` trap - called when setting a property on the proxy
  set(target, prop, value) {
    switch (prop) {
      case "name":
        break;

      // For adding validation logic
      case "publisher":
        if (!["EA", "Epic Games"].includes(value))
          throw new Error("Publisher not supported.");
        target[prop] = value;
      default:
        target[prop] = value;
    }
  },

  // `has` trap - called when testing a property is in the proxy (prop in objects)
  has(target, prop) {
    switch (prop) {
      case "difficulty":
        return false;
      default:
        return prop in target;
    }
  },
});

// Using `get` trqp
console.log(videoGame.yearOfRelease); // 1996
console.log(videoGameProxy.yearOfRelease); // 2000

// Using `get` for computed value
console.log(videoGameProxy.age); // 24

// Using `set` trap
videoGameProxy.name = "CS:GO";
console.log(videoGameProxy.name); // undefined
videoGame.name = "CS:GO";
console.log(videoGameProxy.name); // "CS:GO"

// Using `set` trap for validation logic
// videoGameProxy.publisher = "Valve"; // Error: Publisher not supported
videoGameProxy.publisher = "EA";
console.log(videoGameProxy.publisher); // "EA"

// Using `has` trap
console.log("isMultiplayer" in videoGameProxy); // true
console.log("difficulty" in videoGameProxy); // false
console.log("difficulty" in videoGame); // true

// apply trap
const getDifficulty = function (videoGame) {
  return videoGame.difficulty;
};

// handler.apply is a trap method for function call
const getDifficultyProxy = new Proxy(getDifficulty, {
  apply(target, thisArg, args) {
    console.log("target--->", target); // getDifficulty fn
    console.log("thisArg--->", thisArg); // undefined
    console.log("args--->", args);

    /*
args:
[
  {
    yearOfRelease: 1996,
    difficulty: 'extreme',
    isMultiplayer: false,
    name: 'CS:GO',
    publisher: 'EA'
  }
]
*/

    return target(...args).toUpperCase();
  },
});

console.log(getDifficultyProxy(videoGame)); // EXTREME
