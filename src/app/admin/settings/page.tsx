
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Store, Languages, Moon, DollarSign, Save, Settings } from 'lucide-react';

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
                            <Input id="store-name" defaultValue="Akanne's Magical Boutique" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="contact-email">Contact Email</Label>
                            <Input id="contact-email" type="email" defaultValue="hello@akannesboutique.dz" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                            <Languages className="h-6 w-6" />
                            <span>Language & Appearance</span>
                        </CardTitle>
                        <CardDescription>Configure localization and theme settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="language">Store Language</Label>
                            <Select defaultValue="en" disabled>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="fr" disabled>Français (coming soon)</SelectItem>
                                    <SelectItem value="ar" disabled>العربية (coming soon)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <Label className="flex items-center gap-2">
                                    <Moon className="h-4 w-4" />
                                    <span>Dark Mode</span>
                                </Label>
                                <FormDescription>This feature is currently under construction.</FormDescription>
                            </div>
                            <Switch disabled />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-6 w-6" />
                            <span>Payments & Currency</span>
                        </CardTitle>
                        <CardDescription>Set the default currency and payment options for your store.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-2 max-w-xs">
                            <Label htmlFor="currency">Store Currency</Label>
                            <Input id="currency" defaultValue="DZD" />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <Label>Enable Currency Converter</Label>
                                <FormDescription>Allow customers to see prices in other currencies.</FormDescription>
                            </div>
                            <Switch />
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

function FormDescription({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-muted-foreground">{children}</p>;
}
