
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Palette, Store, DollarSign, Save } from 'lucide-react';

export default function SettingsPage() {
    const { toast } = useToast();

    const handleSave = () => {
        toast({
            title: "Settings Saved!",
            description: "Your changes have been saved successfully.",
        });
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
             <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>

            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Store className="h-6 w-6" />
                            <span>Store Details</span>
                        </CardTitle>
                        <CardDescription>Update your boutique's information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="store-name">Store Name</Label>
                            <Input id="store-name" defaultValue="Akkane's Magical Boutique" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="contact-email">Contact Email</Label>
                            <Input id="contact-email" type="email" defaultValue="hello@akkanesboutique.dz" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                            <Palette className="h-6 w-6" />
                            <span>Theme & Appearance</span>
                        </CardTitle>
                        <CardDescription>Customize the look and feel of your website.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="primary-color">Primary Color</Label>
                                <div className="flex items-center gap-2">
                                    <Input id="primary-color" defaultValue="#854d27" className="w-24"/>
                                    <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: '#854d27' }}></div>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="accent-color">Accent Color</Label>
                                 <div className="flex items-center gap-2">
                                    <Input id="accent-color" defaultValue="#f7c5d7" className="w-24"/>
                                     <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: '#f7c5d7' }}></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-6 w-6" />
                            <span>Currency</span>
                        </CardTitle>
                        <CardDescription>Set the default currency for your store.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-2 max-w-xs">
                            <Label htmlFor="currency">Currency Code</Label>
                            <Input id="currency" defaultValue="DZD" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4"/>
                        Save All Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}
