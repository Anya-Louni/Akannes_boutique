'use client';

import { useState, useEffect, useTransition } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { createCategory, fetchCategories } from './actions';
import { Loader2, PlusCircle, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/lib/types';
import { Separator } from '@/components/ui/separator';


const FormSchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters.'),
});

type FormValues = z.infer<typeof FormSchema>;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  });
  
  const loadCategories = async () => {
    setIsFetching(true);
    try {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Oh no!',
        description: 'Failed to load categories.',
      });
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    startTransition(async () => {
      const result = await createCategory(data.name);

      if (result.success) {
        toast({
          title: 'Success!',
          description: `Category "${data.name}" has been created.`,
        });
        form.reset();
        await loadCategories(); // Refresh the list
      } else {
        toast({
          variant: 'destructive',
          title: 'Oh no!',
          description: result.error || 'Something went wrong. Please try again.',
        });
      }
    });
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Manage Categories</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Category</CardTitle>
            <CardDescription>Create a new category for your products.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Dresses" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <PlusCircle className="mr-2 h-4 w-4" />
                  )}
                  Add Category
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
           <CardHeader>
            <CardTitle>Existing Categories</CardTitle>
            <CardDescription>Here are all the product categories currently available.</CardDescription>
          </CardHeader>
          <CardContent>
            {isFetching ? (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : categories.length > 0 ? (
                 <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <Badge key={cat.id} variant="secondary" className="text-sm flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {cat.name}
                        </Badge>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">No categories found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
