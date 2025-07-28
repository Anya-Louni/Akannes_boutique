'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema, type ProductFormValues } from '@/lib/types';
import { addProduct } from '@/lib/products';
import type { Category } from '@/lib/types';
import { useState, useEffect, useTransition } from 'react';
import { getCategories } from '@/lib/categories';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';

const SIZES = ['S', 'M', 'L', 'XL', 'One Size'];

export default function NewProductPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, startTransition] = useTransition();
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            price: 0,
            category: '',
            sizes: [],
            colors: [],
            styleTags: [],
            images: [],
            inStock: true,
            isFeatured: false,
        },
    });

    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control: form.control,
        name: "images",
    });

    useEffect(() => {
        async function loadCategories() {
            const fetchedCategories = await getCategories();
            setCategories(fetchedCategories);
        }
        loadCategories();
    }, []);

    const onSubmit = async (data: ProductFormValues) => {
        startTransition(async () => {
            const result = await addProduct(data);
            if (result.success) {
                toast({
                    title: 'Success!',
                    description: 'Product has been created successfully.',
                });
                router.push('/admin/products');
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Error creating product',
                    description: result.error || 'An unknown error occurred.',
                });
            }
        });
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Basic Info Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Details</CardTitle>
                                    <CardDescription>Provide the basic information for your product.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl><Input placeholder="e.g., Lolita Lace Dress" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                     <FormField control={form.control} name="slug" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl><Input placeholder="e.g., lolita-lace-dress" {...field} /></FormControl>
                                            <FormDescription>A unique, URL-friendly identifier for the product.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="description" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl><Textarea placeholder="Describe the product..." {...field} rows={6} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </CardContent>
                            </Card>

                            {/* Images Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Product Images</CardTitle>
                                    <CardDescription>Add image URLs for your product gallery.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     {imageFields.map((field, index) => (
                                        <FormField
                                            key={field.id}
                                            control={form.control}
                                            name={`images.${index}`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={index !== 0 ? "sr-only" : ""}>Image URL {index + 1}</FormLabel>
                                                    <div className="flex items-center gap-2">
                                                        <FormControl>
                                                            <Input {...field} placeholder="https://placehold.co/600x400.png" />
                                                        </FormControl>
                                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(index)}><Trash2 className="h-4 w-4" /></Button>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={() => appendImage('')}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Image URL
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-1 space-y-8">
                            {/* Pricing & Category Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Organization</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <FormField control={form.control} name="price" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price (DZD)</FormLabel>
                                            <FormControl><Input type="number" placeholder="9999" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                     <FormField control={form.control} name="category" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map(cat => <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </CardContent>
                            </Card>
                             {/* Properties Card */}
                            <Card>
                                <CardHeader><CardTitle>Properties</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                     <FormField control={form.control} name="sizes" render={() => (
                                        <FormItem>
                                            <div className="mb-4">
                                                <FormLabel className="text-base">Sizes</FormLabel>
                                                <FormDescription>Select available sizes for this product.</FormDescription>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {SIZES.map((item) => (
                                                    <FormField key={item} control={form.control} name="sizes" render={({ field }) => (
                                                        <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(item)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, item])
                                                                            : field.onChange(field.value?.filter((value) => value !== item))
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">{item}</FormLabel>
                                                        </FormItem>
                                                    )}
                                                />
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                     )} />

                                     {/* Simple comma-separated text input for colors and tags for now */}
                                    <FormField control={form.control} name="colors" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Colors</FormLabel>
                                            <FormControl><Input placeholder="e.g., Black,White,Pink" onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))} /></FormControl>
                                            <FormDescription>Comma-separated list of colors.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                      <FormField control={form.control} name="styleTags" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Style Tags</FormLabel>
                                            <FormControl><Input placeholder="e.g., Gothic,Lace,Cute" onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))} /></FormControl>
                                            <FormDescription>Comma-separated list of style tags.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="inStock" render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5"><FormLabel>In Stock</FormLabel></div>
                                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="isFeatured" render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5"><FormLabel>Featured Product</FormLabel></div>
                                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                        </FormItem>
                                    )} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                         <Button type="button" variant="outline" onClick={() => router.push('/admin/products')}>Cancel</Button>
                         <Button type="submit" disabled={isLoading}>
                           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                           Create Product
                         </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
