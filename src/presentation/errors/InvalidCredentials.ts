class InvalidCredentials extends Error {
  constructor() {
    super(`Invalid Credentials!`);
    this.name = 'InvalidCredentials';
  }
}

export { InvalidCredentials };
