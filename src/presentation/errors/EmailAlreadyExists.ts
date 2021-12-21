class EmailAlreadyExists extends Error {
  constructor() {
    super(`Email Already Exists!`);
    this.name = 'EmailAlreadyExists';
  }
}

export { EmailAlreadyExists };
