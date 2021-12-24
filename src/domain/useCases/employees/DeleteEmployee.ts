export interface DeleteEmployee {
  delete(id: string): Promise<void>;
}
