import { SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

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
                    <Link href={'https://hiway.fr/simulateur?s=salarieClientFinal'} className='rounded-full bg-white text-black font-jekobold px-4 py-4 flex items-center justify-center'>
                        <SlidersHorizontal className='h-6 w-6 mr-4 text-black' />
                        Simuler mon revenue
                    </Link>
                </div>
            </div>
        </div>
    );
}
