import { Category, Merchant } from '../types';

export const baseUrl = 'http://localhost:5000';

export async function merchantsGet(): Promise<Merchant[] | undefined> {
  const res = await fetch(`${baseUrl}/merchants`);
  const payload: Merchant[] = await res.json();
  return payload;
}

export async function merchantsPatch(
  id: string,
  merchant: Partial<Merchant>
): Promise<Merchant | undefined> {
  const res = await fetch(`${baseUrl}/merchants/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify(merchant),
  });
  const payload: Merchant = await res.json();
  return payload;
}

export async function categoriesGet(): Promise<Category[] | undefined> {
  const res = await fetch(`${baseUrl}/categories`);
  const payload: Category[] = await res.json();
  return payload;
}
