'use server';

import { suggestStyleTags, type SuggestStyleTagsInput, type SuggestStyleTagsOutput } from '@/ai/flows/suggest-style-tags';

export async function performStyleSuggestion(
  input: SuggestStyleTagsInput
): Promise<SuggestStyleTagsOutput> {
  // Here you might add authentication/authorization checks
  // to ensure only admins can use this feature.
  console.log('Performing style suggestion for:', input.productDescription);
  
  const result = await suggestStyleTags(input);
  
  return result;
}
