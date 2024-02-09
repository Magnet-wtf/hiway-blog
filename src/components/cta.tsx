import { SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';

export default function CTA() {
    return (
        <div className='w-full bg-[#3C68FF] rounded-xl min-h-[150px] px-12 flex items-center justify-center mt-12'>
            <div className='w-full flex items-center justify-between h-full'>
                <div className='flex flex-col items-start justify-center text-start h-full pt-8'>
                    <h1 className='text-white text-2xl font-bold'>Simule ton revenu de freelance</h1>
                    <p className='text-white font-thin'>
                        En moyenne, les freelances Hiway gagnent 7100 € <br /> nets / mois avant IR
                    </p>
                </div>

                <div className='flex items-center justify-center h-full'>
                    <Button size='lg' className='rounded-full bg-white text-black font-jekobold'>
                        <SlidersHorizontal className='h-6 w-6 mr-4 text-black' />
                        Simuler mon revenue
                    </Button>
                </div>
            </div>
        </div>
    );
}
