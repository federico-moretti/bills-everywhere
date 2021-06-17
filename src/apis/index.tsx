import { Merchant } from '../types';

const baseUrl = 'http://localhost:5000';

export async function merchantsGet(): Promise<Merchant[] | undefined> {
  const res = await fetch(`${baseUrl}/merchants`);
  const payload: Merchant[] = await res.json();
  return payload;
}
