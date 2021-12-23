import { createBranchPath } from './create-branch';
import { deleteBranchPath } from './delete-branch';
import { listBranchPath } from './list-branch';
import { updateBranchPath } from './update-branch';

export default {
  '/branches/add': createBranchPath,
  '/branches/list': listBranchPath,
  '/branches/update/{id}': updateBranchPath,
  '/branches/delete/{id}': deleteBranchPath,
};
