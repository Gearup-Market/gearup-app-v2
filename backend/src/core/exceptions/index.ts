export class ValidationError extends Error {
  public status: number;
  public message: string;
  public name: string;

  constructor( message: string = 'Validation Error: one or more validations failed') {
    super(message);
    this.status = 400;
    this.message = message;
    this.name = ValidationError.name || 'ValidationError'
  }
}

export class MissingResourceError extends Error {
  public status: number;
  public message: string;
  public name: string;

  constructor( message: string = 'Missing Resource Error: the resource you have requested for was not found') {
    super(message);
    this.status = 400;
    this.message = message;
    this.name = ValidationError.name || 'ValidationError'
  }
}
