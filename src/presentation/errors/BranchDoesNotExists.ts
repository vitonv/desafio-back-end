class BranchDoesNotExists extends Error {
  constructor() {
    super(`Branch does not exists!`);
    this.name = 'BranchDoesNotExists';
  }
}

export { BranchDoesNotExists };
