import Image from 'next/image';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className='flex flex-col w-full'>
            <div className='w-full p-12 mt-24'>
                <div className='w-full rounded-xl bg-[#F6F6F6] grid grid-cols-2 min-h-[628px]'>
                    <div className='flex flex-col items-start justify-start text-left pt-24 pl-24 h-full w-full'>
                        <h1 className='text-6xl font-jekobold leading-24'>
                            Plus de 700 freelances <br /> ont changé de vie <br /> avec Hiway
                        </h1>
                        <h1 className='text-lg font-jekobold text-left mt-8'>
                            Devenir freelance n&apos;a jamais été aussi simple qu&apos;avec Hiway.
                        </h1>
                        <p className='text-sm font-medium text-left mt-8'>
                            On t&apos;accompagne à chaque étape, on gère tout pour que tu profites au maximum de ton statut et que tu
                            t&apos;ouvres encore plus de perspectives.
                        </p>

                        <div className='flex space-x-4 mt-8'>
                            <Link href={'https://hiway.fr'} className='rounded-full bg-[#FF4140] border-[#FF4140] border-2 hover:bg-[#F6F6F6] hover:text-[#FF4140] px-4 py-2 flex justify-center items-center text-[#F6F6F6]'>Se lancer avec Hiway</Link>
                            <Link href={'https://hiway.fr/simulateur?s=salarieClientFinal'} className='rounded-full border-[#FF4140] border-2 px-4 py-2 flex justify-center items-center'>
                                Simuler mon revenue
                            </Link>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Image src={'/illustration.png'} alt='freelance' width={400} height={400} />
                    </div>
                </div>
            </div>

            <div className='w-full px-12 pb-12'>
                <div className='w-full rounded-xl bg-[#F6F6F6] pb-8'>
                    <div className='grid grid-cols-3 h-full p-24 min-h-[507px] w-full justify-items-center'>
                        <div className='flex flex-col items-start justify-start text-left h-full w-full'>
                            <Image src={'/logo-big.png'} alt='icon' width={100} height={100} />
                            <h1 className='text-2xl font-jekoblack leading-24 mt-8'>
                                La meilleure expérience <br />
                                pour devenir freelance
                            </h1>
                            <Link href={'https://hiway.fr/simulateur?s=salarieClientFinal'} className='rounded-full border-[#FF4140] border-2 px-4 py-2 flex justify-center items-center mt-8'>
                                Simuler mon revenue
                            </Link>
                        </div>
                        <div className='flex flex-col items-start px-12 justify-start h-full w-full space-y-4'>
                            <h1 className='font-jekoblack'>Accompagnement</h1>
                            <p>On t&apos;aide à lancer ton activité</p>
                            <p>On gère ta société au quotidien</p>
                            <p>On t&apos;aide à bien préparer ton avenir</p>
                        </div>
                        <div className='flex flex-col items-start justify-start space-y-20 px-12'>
                            <div className='flex flex-col w-full items-start justify-start space-y-4'>
                                <h1 className='font-jekoblack'>Ressources</h1>
                                <p className=''>Témoignages</p>
                                <p>Simuler mon revenu</p>
                                <p>Blog</p>
                            </div>
                            <Link href={'https://hiway.fr/contact'} className='rounded-full bg-[#FF4140] border-[#FF4140] border-2 hover:bg-[#F6F6F6] hover:text-[#FF4140] px-4 py-2 flex justify-center items-center text-[#F6F6F6]'>Prendre rendez vous</Link>
                        </div>
                    </div>
                    <div className='w-full flex flex-col items-center justify-center'>
                        <Separator className='max-w-[90%] bg-[#C7C7C7]' />
                        <div className='w-full px-12'>
                            <div className='flex w-full items-center justify-between pt-8 px-12'>
                                <div className='flex items-center space-x-8 text-black font-jekobold text-sm'>
                                    <h1>Mentions légales</h1>
                                    <h1>Conditions générales d’utilisation (CGU)</h1>
                                    <h1>Politique de confidentialité</h1>
                                    <h1>Contacte-nous</h1>
                                </div>

                                <div className='flex items-center space-x-4'>
                                    <Image src={'/linkedin-black.png'} alt='icon' width={20} height={20} />
                                    <Image src={'/facebook-black.png'} alt='icon' width={20} height={20} />
                                    <Image src={'/insta-black.png'} alt='icon' width={20} height={20} />
                                    <Image src={'/twitter-black.png'} alt='icon' width={20} height={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
