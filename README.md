# Mixins
JavaScript library for mixins

## Installation

```bash
npm install @teplovs/mixins
# or, if you prefer yarn:
yarn add @teplovs/mixins
```

## Usage Example

```javascript
import { createMixin } from "@teplovs/mixins"

class Animal {}

const canFly = createMixin(ParentClass =>
  class CanFly extends ParentClass {
    canFly = true
  }
)

const canRun = createMixin(ParentClass =>
  class CanRun extends ParentClass {
    canRun = true
  }
)

const canGreet = createMixin((ParentClass, sound) =>
  class CanGreet extends ParentClass {
    greet(name) {
      return `${sound} ${name}!`
    }
  }
)

class Dog extends canRun(canGreet(Animal, "Woof woof")) {
  // ...
}

class Cat extends canRun(canGreet(Animal, "Meow")) {
  // ...
}

class Parrot extends canFly(canGreet(Animal, "Chirp chirp. Hi")) {
  // ...
}

new Dog().greet("y'all") // "Woof woof y'all!"
new Cat().greet("y'all") // "Meow y'all!"
new Parrot().greet("y'all") // "Chirp chirp. Hi y'all!"

new Dog().canRun // true
new Cat().canRun // true
new Parrot().canFly // true
```

## API

### `createMixin(createClass: (ParentClass, ...props) => Class): (...props) => Class`

Function to create a new mixin.

#### Mixin without properties

```javascript
class Animal {}

const canRun = createMixin(ParentClass =>
  class CanRun extends ParentClass {
    canRun = true
  }
)

const AnimalThatCanRun = canRun(Animal)
new AnimalThatCanRun().canRun // true
```

#### Mixin with properties

```javascript
class Person {}

const hasHobby = createMixin((ParentClass, personsHobby) =>
  class HasHobby extends ParentClass {
    hobby = personsHobby
  }
)

const Artist = hasHobby(Person, "drawing")
new Artist().hobby // "drawing"
```

## Development

### Requirements

- Node.js and npm

### Setup

1. Clone the repository

```bash
git clone https://github.com/teplovs/mixins
```

2. Navigate to the project folder

```bash
cd mixins
```

3. Install dependencies

```bash
npm install
# or, if you prefer yarn:
yarn install
```

4. To run tests:

```bash
npm test
# or:
yarn test
```

5. To build:

```bash
npm run build
# or:
yarn build
```

6. Happy hacking! 🎉
