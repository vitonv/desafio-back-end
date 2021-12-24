class BranchAlreadyExists extends Error {
  constructor() {
    super(`Branch already exists!`);
    this.name = 'BranchAlreadyExists';
  }
}

export { BranchAlreadyExists };
