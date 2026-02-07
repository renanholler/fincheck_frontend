import { httpClient } from '../httpClient';

export interface CreateTransactionParams {
  name: string;
  value: number;
  categoryId: string;
  bankAccountId: string;
  date: string;
  type: 'INCOME' | 'EXPENSE';
}

export async function create(params: CreateTransactionParams) {
  const { data } = await httpClient.post('/transactions', params);

  return data;
}
