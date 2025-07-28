import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ruler } from 'lucide-react';

const sizeData = [
    { size: 'S', bust: '80-84cm', waist: '64-68cm', hip: '88-92cm' },
    { size: 'M', bust: '84-88cm', waist: '68-72cm', hip: '92-96cm' },
    { size: 'L', bust: '88-92cm', waist: '72-76cm', hip: '96-100cm' },
    { size: 'XL', bust: '92-96cm', waist: '76-80cm', hip: '100-104cm' },
];

export default function SizeChartModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primary p-0 h-auto">
          <Ruler className="mr-2 h-4 w-4" />
          Size Chart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">Size Chart</DialogTitle>
          <DialogDescription>
            All measurements are in centimeters. Please measure yourself carefully.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Size</TableHead>
                <TableHead>Bust</TableHead>
                <TableHead>Waist</TableHead>
                <TableHead>Hip</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizeData.map((row) => (
                <TableRow key={row.size}>
                  <TableCell className="font-medium">{row.size}</TableCell>
                  <TableCell>{row.bust}</TableCell>
                  <TableCell>{row.waist}</TableCell>
                  <TableCell>{row.hip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
