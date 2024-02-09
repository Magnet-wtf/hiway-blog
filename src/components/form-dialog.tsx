'use client';

import { ReactNode, useState } from 'react';
import HubSpotForm from './hubspot-form';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

interface FormDialogProps {
    trigger: ReactNode;
}

export default function DialogForm({ trigger }: FormDialogProps) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <HubSpotForm />
            </DialogContent>
        </Dialog>
    );
}
