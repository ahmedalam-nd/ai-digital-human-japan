export class Parameter {
  constructor({
    name,
    type,
    description,
    enumElements = [],
    required = false,
  }) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.enumElements = enumElements;
    this.required = required;
  }
  name = "";
  // boolean, integer, number, string, or object for the dictionary like JSON object.
  // array type is not supported here. Use ArrayParameter instead.
  type = "";
  description = "";
  enumElements = [];
  required = false;

  toJson() {
    var retValue = {
      type: this.type,
      description: this.description,
    };
    if (this.enumElements.length > 0) {
      retValue.enum = this.enumElements;
    }
    return retValue;
  }
}
