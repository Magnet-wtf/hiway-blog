import { Button } from '@/components/ui/button';
import { Check, User } from 'lucide-react';
import Image from 'next/image';

export default function Temoignage() {
    return (
        <div className='w-full'>
            <div className='w-full min-h-[1000px] relative'>
                <Image src={'/background-hiway.png'} alt='banner' layout='fill' objectFit='cover' />
                <div className='w-full min-h-[1000px] flex flex-col justify-center items-start backdrop-brightness-50 pl-24'>
                    <h1 className='text-9xl font-jekoblack text-left text-[#FF4140]'>
                        Freelance <br /> Walk
                    </h1>
                    <div className='flex font-bold text-white items-center justify-center mt-4'>
                        par <Image className='ml-4' src={'/logo-hiway.svg'} alt='logo' width={60} height={60} />
                    </div>
                    <p className='text-white font-light text-lg mt-12 max-w-xl'>
                        Ils sont freelances depuis 1 an, 5 ans, 10 ans ou plus. Ils ont tous un parcours exceptionnel et des tonnes de
                        choses à partager avec toi. <br />
                        <br />
                        Dans cette websérie, ils te révèlent ce que l’expérience leur a enseigné, les problématiques rencontrées et les bons
                        conseils qu’ils auraient aimé avoir plus tôt.
                    </p>
                </div>
            </div>

            <div className='w-full flex items-center justify-center text-black text-3xl font-jekoblack text-center py-24'>
                On t’embarque en walking-meeting <br />
                avec ce qui se fait de mieux dans le freelancing
            </div>

            <div className='w-full grid grid-cols-2 px-12 justify-items-center gap-y-8'>
                <div className='flex flex-col relative min-h-[620px]'>
                    <div className='relative'>
                        <Image src={'/grid-image.png'} alt='freelance' width={600} height={340} />
                        <div className='bg-black px-4 py-2 absolute bottom-4 right-4 text-white font-bold text-xl'>27 min</div>
                    </div>

                    <div className='max-w-[600px] mt-8'>
                        <h1 className='text-xl font-jekoblack text-black mb-4'>Amélie Marot - Product Owner et freelance depuis 2018</h1>

                        <div className='text-[#868686] font-normal w-full'>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Se former et évoluer quand on est freelance : elle est passée de Dev à PO en 5 ans
                                </p>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Se constituer un patrimoine : elle a rapidement investi dans l’immobilier avec un appartement en locatif
                                    et un autre en résidence principale
                                </p>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Allier travail et passion : elle s’est qualifiée pour les championnats du monde d’Ironman en parallèle
                                    de son job
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col relative min-h-[620px]'>
                    <div className='relative'>
                        <Image src={'/grid-image.png'} alt='freelance' width={600} height={340} />
                        <div className='bg-black px-4 py-2 absolute bottom-4 right-4 text-white font-bold text-xl'>27 min</div>
                    </div>

                    <div className='max-w-[600px] mt-8'>
                        <h1 className='text-xl font-jekoblack text-black mb-4'>Amélie Marot - Product Owner et freelance depuis 2018</h1>

                        <div className='text-[#868686] font-normal w-full'>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Se former et évoluer quand on est freelance : elle est passée de Dev à PO en 5 ans
                                </p>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Se constituer un patrimoine : elle a rapidement investi dans l’immobilier avec un appartement en locatif
                                    et un autre en résidence principale
                                </p>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Allier travail et passion : elle s’est qualifiée pour les championnats du monde d’Ironman en parallèle
                                    de son job
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col relative min-h-[620px]'>
                    <div className='relative'>
                        <Image src={'/grid-image.png'} alt='freelance' width={600} height={340} />
                        <div className='bg-black px-4 py-2 absolute bottom-4 right-4 text-white font-bold text-xl'>27 min</div>
                    </div>

                    <div className='max-w-[600px] mt-8'>
                        <h1 className='text-xl font-jekoblack text-black mb-4'>Amélie Marot - Product Owner et freelance depuis 2018</h1>

                        <div className='text-[#868686] font-normal w-full'>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Se former et évoluer quand on est freelance : elle est passée de Dev à PO en 5 ans
                                </p>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Se constituer un patrimoine : elle a rapidement investi dans l’immobilier avec un appartement en locatif
                                    et un autre en résidence principale
                                </p>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Allier travail et passion : elle s’est qualifiée pour les championnats du monde d’Ironman en parallèle
                                    de son job
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col relative min-h-[620px]'>
                    <div className='relative'>
                        <Image src={'/grid-image.png'} alt='freelance' width={600} height={340} />
                        <div className='bg-black px-4 py-2 absolute bottom-4 right-4 text-white font-bold text-xl'>27 min</div>
                    </div>

                    <div className='max-w-[600px] mt-8'>
                        <h1 className='text-xl font-jekoblack text-black mb-4'>Amélie Marot - Product Owner et freelance depuis 2018</h1>

                        <div className='text-[#868686] font-normal w-full'>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Se former et évoluer quand on est freelance : elle est passée de Dev à PO en 5 ans
                                </p>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Se constituer un patrimoine : elle a rapidement investi dans l’immobilier avec un appartement en locatif
                                    et un autre en résidence principale
                                </p>
                            </div>
                            <div className='flex space-x-2'>
                                <div className='rounded-full bg-[#FF4140] w-6 h-6 flex items-center justify-center mr-2 p-1'>
                                    <Check className='text-white h-4 w-4' />
                                </div>
                                <p className='line-break'>
                                    Allier travail et passion : elle s’est qualifiée pour les championnats du monde d’Ironman en parallèle
                                    de son job
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
