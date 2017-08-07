# Handcuff
Since Javascript does not provide encapsulation, this library allows the developer to keep attributes and functions private. Works when following the convention of prefixing the attribute/function names with an `_` or a pre-defined and valid character. 

This functionality is implemented using ES6 proxies.

### Usage
Simply create a new instance, pass your object as the first parameter and retrieve the `proxy` attribute. Optionally, you can define an `identifier` character as the second parameter.
```javascript
let user = new Handcuff(new User('John', 'email@example.com')).proxy;
```

### Example
```javascript
class User {
  constructor(name, email) {
    this._name = name;
    this._email = email;
  }
  
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
  
  _link() {
    // some logic ...
  }
}

let user = new Handcuff(new User('John', 'email@example.com')).proxy;

console.log(user); // { _name: 'John', _email: 'email@example.com' }
console.log(user._name); // Error: Unable to access private string `_name`
user._name = 'Fred'; // Error: Unable to access private string `_name`
user._link(); // Error: Unable to access private function `_link`
```