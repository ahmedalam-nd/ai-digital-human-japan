import { Parameter } from "./parameter.js";

export class ArrayParameter extends Parameter {
  constructor({
    name,
    type,
    description,
    enumElements = [],
    required = false,
  }) {
    super({
      name: name,
      type: "array",
      description: description,
      enumElements: enumElements,
      required: required,
    });
    this.type = type;
  }

  toJson() {
    var retValue = {
      type: "array",
      description: this.description,
      items: {
        type: this.type,
      },
    };
    if (this.enumElements.length > 0) {
      retValue.items.enum = this.enumElements;
    }
    return retValue;
  }
}
