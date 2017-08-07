/**
 * Prevents direct access to private attributes and functions
 * outside the class implementation. Attributes must then be
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
     * Character used to identify private attributes.
     */
    this._identifier = identifier;

    /*
     * Holds the attribute data type.
     */
    this._attributeType = undefined;
  }
  
  /**
   * This handler defines what to do when executing the
   * `get` and `set` operations.
   */
  _handler() {
    return {
      get: (target, attribute) => {
        this._type(target[attribute]);
        
        if (this._accessible(attribute) && (attribute in target)) {
          return target[attribute];
        }
      },
      set: (target, attribute, value) => {
        this._type(target[attribute]);
        
        if (this._accessible(attribute) && (attribute in target)) {
          target[attribute] = value;
          
          return true;
        }
      }
    };
  }
  
  /**
   * Verify if the current attribute is defined as 
   * private.
   *
   * @throws error when trying to access private fields
   */
  _accessible(attribute) {
    if (attribute[0] !== this._identifier) {
      return true;
    }
    
    throw new Error(`Unable to access private ${this._attributeType} \`${attribute}\``);
  }
  
  /**
   * Sets the attribute type used to didplay errors when
   * accessing private attributes.
   */
  _type(attribute) {
    this._attributeType = typeof attribute;
  }
  
  /**
   * Return the `proxy` object that contains the given 
   * object.
   */
  get proxy() {
    return this._proxy;
  }
}