import { createBranchPath } from './create-branch';
import { deleteBranchPath } from './delete-branch';
import { listBranchPath } from './list-branch';
import { updateBranchPath } from './update-branch';

export default {
  '/branches': {...listBranchPath,...createBranchPath},
  '/branches/{id}': {...updateBranchPath,...deleteBranchPath}
};
