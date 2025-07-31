import { getReviews } from '@/lib/reviews';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { ReviewTable } from '@/components/admin/reviews/review-table';

export const dynamic = 'force-dynamic'

export default async function ReviewsPage() {
    const reviews = await getReviews();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Reviews</h2>
            </div>
             <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Star className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle>Customer Reviews</CardTitle>
                        <CardDescription>
                            Manage and respond to customer feedback on your products.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                   <ReviewTable reviews={reviews} />
                </CardContent>
            </Card>
        </div>
    );
}
