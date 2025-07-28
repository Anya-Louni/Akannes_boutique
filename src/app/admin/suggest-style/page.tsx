'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Wand2 } from 'lucide-react';
import { performStyleSuggestion } from './actions';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  productDescription: z.string().min(20, 'Please provide a more detailed description.'),
});

type FormValues = z.infer<typeof FormSchema>;

export default function SuggestStylePage() {
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      productDescription: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setSuggestedTags([]);
    try {
      const result = await performStyleSuggestion(data);
      if (result && result.styleTags) {
        setSuggestedTags(result.styleTags);
        toast({
          title: 'Magic ✨',
          description: 'Style tags suggested successfully!',
        });
      } else {
        throw new Error('Invalid response from AI');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Oh no!',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fadeIn">
      <Card className="max-w-2xl mx-auto bg-white/30 backdrop-blur-sm border-primary/10 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <Wand2 className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl text-primary">AI Style Tag Wizard</CardTitle>
          <CardDescription>
            Let our magical AI suggest style tags for your new product. Just describe it below!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-headline text-lg">Product Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A beautiful black velvet dress with white lace trim, a peter pan collar, and a large bow on the back..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full rounded-full" size="lg">
                {isLoading ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Conjuring tags...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Suggest Styles
                  </>
                )}
              </Button>
            </form>
          </Form>

          {suggestedTags.length > 0 && (
            <div className="mt-8">
              <h3 className="font-headline text-xl text-center mb-4">Suggested Tags</h3>
              <div className="flex flex-wrap gap-2 justify-center p-4 rounded-lg bg-secondary/50">
                {suggestedTags.map((tag) => (
                  <Badge key={tag} variant="default" className="text-base px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
