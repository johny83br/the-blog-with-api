'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateExampleAction(formdata: FormData) {
  const path = formdata.get('path') || '';

  // Here you would typically call a revalidation function provided by your framework
  // For example, in Next.js you might use:
  console.log('Revalidating example:', path);

  revalidatePath(`${path}`);
}
