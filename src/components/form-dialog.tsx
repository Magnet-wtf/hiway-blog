'use client';

import { ReactNode, useState } from 'react';
import HubSpotForm from './hubspot-form';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useAtom } from 'jotai';
import { openDialog } from '@/store';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function DialogForm() {
    const [open, setOpen] = useAtom(openDialog);

    const onSubmit = () => {
        console.log('Form submitted');
        const rootElementId = 'toPDF';
        const input = document.getElementById(rootElementId);

        if (!input) {
            return;
        }

        const padding = 10; // Padding in mm

        html2canvas(input).then((canvas) => {
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295;  // A4 height in mm, adjust padding here
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
    
            const doc = new jsPDF('p', 'mm');
            let position = 0;
    
            // Add first page
            doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight - padding; // Subtract padding from the first page
    
            // Add new pages if the content overflows
            while (heightLeft >= 0) {
                position = (heightLeft - imgHeight) - padding; // Adjust position by padding for subsequent pages
                doc.addPage();
                doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= (pageHeight - padding); // Adjust for padding on each new page
            }
    
            doc.save('download.pdf');
        });
    };
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent>
                <HubSpotForm onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    );
}
