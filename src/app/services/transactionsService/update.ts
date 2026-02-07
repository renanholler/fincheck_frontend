import { httpClient } from '../httpClient';

export interface UpdateTransactionParams {
  id: string;
  name: string;
  value: number;
  categoryId: string;
  bankAccountId: string;
  date: string;
  type: 'INCOME' | 'EXPENSE';
}

export async function update({ id, ...params }: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}
