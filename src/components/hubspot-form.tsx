'use client';

import { useEffect } from 'react';

export default function HubSpotForm({ onSubmit }: { onSubmit: () => void }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js-eu1.hsforms.net/forms/v2.js';
        document.body.appendChild(script);

        script.addEventListener('load', () => {
            // @ts-ignore
            if (window.hbspt) {
                // @ts-ignore
                window.hbspt.forms.create({
                    region: 'eu1',
                    portalId: '139647359',
                    formId: '195dabae-a9b3-48b8-8247-687f0df8bf6c',
                    target: '#hubspotForm',
                    onFormSubmit: function ($form: any) {
                        onSubmit();
                    },
                });
            }
        });
    }, []);

    return <div id='hubspotForm' className=''></div>;
}
