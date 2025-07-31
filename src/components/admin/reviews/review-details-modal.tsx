
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Review } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Star, User, Package, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ReviewDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  review: Review | null;
}

const StarRating = ({ rating, size = 'h-5 w-5' }: { rating: number, size?: string }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
);

export function ReviewDetailsModal({ isOpen, onOpenChange, review }: ReviewDetailsModalProps) {
  if (!review) return null;

  const getStatusVariant = (status: Review['status']) => {
    switch (status) {
      case 'Approved': return 'default';
      case 'Pending': return 'outline';
      case 'Rejected': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary flex items-center gap-4">
            <StarRating rating={review.rating} />
            <span>{review.title}</span>
          </DialogTitle>
          <DialogDescription>
            Review for "{review.productName}" submitted on {new Date(review.createdAt).toLocaleDateString()}.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="py-4 space-y-6">
            <div className="prose prose-sm max-w-none text-foreground/90">
                <p>{review.text}</p>
            </div>
            
            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{review.customerName}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                     <span className="font-medium">{review.productName}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                     <span className="font-medium">{new Date(review.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={getStatusVariant(review.status)}>{review.status}</Badge>
                </div>
            </div>
        </div>
         <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
