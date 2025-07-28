
'use server';
/**
 * @fileOverview A style quiz AI agent to recommend a Japanese fashion style.
 *
 * - recommendStyle - A function that handles the style recommendation process.
 * - StyleQuizInput - The input type for the recommendStyle function.
 * - StyleQuizOutput - The return type for the recommendStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StyleQuizInputSchema = z.object({
  color: z.string().describe('The user\'s preferred color palette (e.g., Pastels, Darks, Brights).'),
  vibe: z.string().describe('The general vibe the user is going for (e.g., Cute, Elegant, Bold).'),
  activity: z.string().describe('The user\'s preferred activity (e.g., Tea party, Concert, Shopping).'),
});
export type StyleQuizInput = z.infer<typeof StyleQuizInputSchema>;

const StyleQuizOutputSchema = z.object({
  style: z.string().describe('The recommended Japanese fashion style (e.g., Sweet Lolita, Gothic Lolita, Gyaru, Classic Lolita).'),
  description: z.string().describe('A brief, encouraging, and magical description of why this style fits the user.'),
  icon: z.string().describe('A single emoji that represents the recommended style.'),
});
export type StyleQuizOutput = z.infer<typeof StyleQuizOutputSchema>;


const prompt = ai.definePrompt({
  name: 'styleQuizPrompt',
  input: {schema: StyleQuizInputSchema},
  output: {schema: StyleQuizOutputSchema},
  prompt: `You are a magical fashion stylist for a boutique specializing in Japanese street fashion. Your task is to recommend a style to a customer based on their answers to a short quiz.

The styles we offer are:
- **Sweet Lolita**: Characterized by pastel colors, ruffles, bows, and cute themes like desserts or bunnies. It's very whimsical and doll-like.
- **Gothic Lolita**: Uses dark colors like black, burgundy, and deep blue, with elegant lace, crosses, and Victorian-inspired designs. It's darker and more mysterious.
- **Gyaru**: A bold, glamorous, and confident style. It often features tanned skin, dramatic makeup, flashy clothes, and big hair. It's about being unapologetically fabulous.
- **Classic Lolita**: A more mature and elegant take on Lolita fashion, using muted colors, A-line skirts, and historical or floral prints. It's refined and timeless.

Based on the user's answers, recommend the single best style for them. Provide a short, magical, and encouraging description of why it's a good fit.

User's Answers:
- Favorite Color Palette: {{{color}}}
- Desired Vibe: {{{vibe}}}
- Preferred Activity: {{{activity}}}
`,
});

const recommendStyleFlow = ai.defineFlow(
  {
    name: 'recommendStyleFlow',
    inputSchema: StyleQuizInputSchema,
    outputSchema: StyleQuizOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);


export async function recommendStyle(input: StyleQuizInput): Promise<StyleQuizOutput> {
  return recommendStyleFlow(input);
}
