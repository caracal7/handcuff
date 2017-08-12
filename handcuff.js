/**
 * Prevents direct access to private propertys and functions
 * outside the class implementation. propertys must then be
 * accessed using getters and setters.
 */
class Handcuff {
  /**
   * Class constructor accepts the object that we want to 
   * secure and an optional identifier character.
   */
  constructor(obj = {}, identifier = '_') {
    /*
     * Object that intercepts the data.
     */
    this._proxy = new Proxy(obj, this._handler());
    
    /*
     * Character used to identify private propertys.
     */
    this._identifier = identifier;

    /*
     * Holds the property data type.
     */
    this._propertyType = undefined;
  }
  
  /**
   * This handler defines what to do when executing the
   * `get` and `set` operations.
   */
  _handler() {
    return {
      get: (target, property) => {
        this._type(target[property]);
        
        if (this._accessible(property) && (property in target)) {
          return target[property];
        }
      },
      set: (target, property, value) => {
        this._type(target[property]);
        
        if (this._accessible(property) && (property in target)) {
          target[property] = value;
          
          return true;
        }
      }
    };
  }
  
  /**
   * Verify if the current property is defined as 
   * private.
   *
   * @throws error when trying to access private fields
   */
  _accessible(property) {
    if (property[0] !== this._identifier) {
      return true;
    }
    
    throw new Error(`Unable to access private ${this._propertyType} \`${property}\``);
  }
  
  /**
   * Sets the property type used to didplay errors when
   * accessing private properties.
   */
  _type(property) {
    this._propertyType = typeof property;
  }
  
  /**
   * Return the `proxy` object that contains the given 
   * object.
   */
  get lock() {
    return this._proxy;
  }
}