'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting style tags for new products.
 *
 * - suggestStyleTags - A function that takes a product description and suggests relevant style tags.
 * - SuggestStyleTagsInput - The input type for the suggestStyleTags function.
 * - SuggestStyleTagsOutput - The return type for the suggestStyleTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestStyleTagsInputSchema = z.object({
  productDescription: z
    .string()
    .describe('The description of the product for which to suggest style tags.'),
});
export type SuggestStyleTagsInput = z.infer<typeof SuggestStyleTagsInputSchema>;

const SuggestStyleTagsOutputSchema = z.object({
  styleTags: z
    .array(z.string())
    .describe('An array of suggested style tags for the product.'),
});
export type SuggestStyleTagsOutput = z.infer<typeof SuggestStyleTagsOutputSchema>;

export async function suggestStyleTags(input: SuggestStyleTagsInput): Promise<SuggestStyleTagsOutput> {
  return suggestStyleTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestStyleTagsPrompt',
  input: {schema: SuggestStyleTagsInputSchema},
  output: {schema: SuggestStyleTagsOutputSchema},
  prompt: `You are a fashion expert specializing in Japanese-style clothing. Your task is to suggest relevant style tags for a given product description.

  The available styles are: Gothic Lolita, Sweet Lolita, Gyaru, and Shoujo girl fashion. You should prefer these tags where appropriate.

  Product Description: {{{productDescription}}}

  Suggest style tags relevant to the product, focusing on the styles previously mentioned and other descriptive keywords related to clothing styles and aesthetics.
  Return the answer as a JSON array of strings.
  `, // Keep as a single line.
});

const suggestStyleTagsFlow = ai.defineFlow(
  {
    name: 'suggestStyleTagsFlow',
    inputSchema: SuggestStyleTagsInputSchema,
    outputSchema: SuggestStyleTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
