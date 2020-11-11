// Target Object
const videoGame = {
  yearOfRelease: 1996,
  difficulty: "extreme",
  isMultiplayer: false,
};

// A Proxy object can intercept and re-define fundamental
//  operations for a target object. (Using handlers - traps)
const videoGameProxy = new Proxy(videoGame, {
  // `get` trap
  get(target, prop) {
    switch (prop) {
      case "yearOfRelease":
        return 2000;
      default:
        return target[prop];
    }
  },

  // `set` trap
  set(target, prop, value) {
    switch (prop) {
      case "name":
        break;
      default:
        target[prop] = value;
    }
  },

  // `has` trap (prop in object)
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

// Using `set` trap
videoGameProxy.name = "CS:GO";
console.log(videoGameProxy.name); // undefined
videoGame.name = "CS:GO";
console.log(videoGameProxy.name); // "CS:GO"

// Using `has` trap
console.log("isMultiplayer" in videoGameProxy); // true
console.log("difficulty" in videoGameProxy); // false
console.log("difficulty" in videoGame); // true
