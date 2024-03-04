import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HubSpotFormProps {
    onSubmit: () => void;
    loading: boolean;
}

const HubSpotForm: React.FC<HubSpotFormProps> = ({ onSubmit, loading }) => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://js.hsforms.net/forms/v2.js';
        document.body.appendChild(script);

        script.onload = () => {
            // @ts-ignore
            if (window.hbspt) {
                // @ts-ignore
                window.hbspt.forms.create({
                    region: 'eu1',
                    portalId: '139647359',
                    formId: '195dabae-a9b3-48b8-8247-687f0df8bf6c',
                    target: '#hubspotForm',
                    onFormSubmit: () => {
                        setFormSubmitted(true);
                        onSubmit();
                    },
                });
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [onSubmit]);

    useEffect(() => {
        if (formSubmitted && loading) {
            // Perform actions when the form is submitted and loading state is true
            // Note: Directly modifying the iframe content might not be feasible due to cross-origin restrictions
            // You might consider showing a spinner or overlay in the parent document instead
        }
    }, [formSubmitted, loading]);

    return (
        <div>
            <div id='hubspotForm'></div>
            {loading && (
                <div className='w-full flex justify-center items-baseline'>
                    {/* Implement your loading spinner or overlay here */}
                    <Loader2 className='h-8 w-8 text-[#ff4140] animate-spin' />
                </div>
            )}
        </div>
    );
};

export default HubSpotForm;
