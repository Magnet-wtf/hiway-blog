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
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        console.log('Form submitted');
        const rootElementId = 'toPDF'; // ID of the element to convert to PDF
        const input = document.getElementById(rootElementId);
        if (!input) return; // Ensure the element exists

        // Hide elements that shouldn't be in the PDF
        const elementsToExclude = input.querySelectorAll('.exclude-from-pdf');
        elementsToExclude.forEach((el) => el.classList.add('hidden'));

        // Expand elements for the PDF
        const elementToUpdate = input.querySelectorAll('.expand-for-pdf');
        elementToUpdate.forEach((el) => el.classList.add('expanded'));

        // Generate the canvas with html2canvas
        const canvas = await html2canvas(input, {
            scale: 2, // Improves the resolution
            useCORS: true, // Allows loading of external resources
            scrollY: -window.scrollY, // Adjusts for current scroll position
            windowHeight: document.documentElement.offsetHeight, // Ensures the full height is captured
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Margin and document dimensions
        const margin = 20; // Margin for top, right, and bottom
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin; // Width after accounting for margins
        const pdfHeight = pdf.internal.pageSize.getHeight() - margin * 2; // Height after accounting for margins

        // Image dimensions
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        let heightLeft = (imgHeight * pdfWidth) / imgWidth; // Scaled height of the image

        let position = margin; // Initial Y position with top margin

        // Add content to PDF, page by page
        do {
            // Draw part of the image on the current page
            pdf.addImage(imgData, 'PNG', margin, position, pdfWidth, heightLeft - position + margin, undefined, 'FAST');

            // Calculate remaining height
            heightLeft -= pdfHeight;

            if (heightLeft > 0) {
                // Add a new page if there's content left
                pdf.addPage();
                position = -pdfHeight + 2 * margin; // Adjust position for the next slice, considering top margin
            }
        } while (heightLeft > 0);

        pdf.save('article.pdf');

        // Show hidden elements again
        elementsToExclude.forEach((el) => el.classList.remove('hidden'));
        elementToUpdate.forEach((el) => el.classList.remove('expanded'));

        setLoading(false);
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent>
                <HubSpotForm onSubmit={onSubmit} loading={loading} />
            </DialogContent>
        </Dialog>
    );
}
