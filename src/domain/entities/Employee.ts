import { Branch } from './Branch';

export type Employee = {
  id: string;
  name: string;
  branch: Omit<Branch, 'employees'>;
};
