'use client';
import Image from 'next/image';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import { WP_REST_API_Term } from 'wp-types';

export default function Sidebar({ categories, tags }: { categories: WP_REST_API_Term[]; tags: WP_REST_API_Term[] }) {
    if (isMobile) {
        return null;
    }

    return (
        <div className={'flex flex-col left-0 pr-8 pl-12 pt-20 w-[350px] border-r'}>
            <h1 className={'text-2xl xl:text-4xl font-bold leading-[52.5px] font-jekoblack'}>
                <span className='text-[#FF4140] font-jekoblack'>Bienvenue</span> <br /> sur le blog <br /> Hiway
            </h1>
            <p className={'text-sm mt-4 text-[#979797]'}>Tout ce qu’il faut savoir pour vivre sa meilleure vie de freelance</p>

            <div className='pt-2 relative mx-auto text-gray-600 mt-12 ml-0'>
                <input
                    className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none'
                    type='search'
                    name='search'
                    placeholder='Rechercher'
                />
                <button type='submit' className='absolute right-0 top-0 mt-5 mr-4'>
                    <svg
                        className='text-gray-600 h-4 w-4 fill-current'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 56.966 56.966'
                        width='512px'
                        height='512px'
                    >
                        <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
                    </svg>
                </button>
            </div>

            <div className={'flex flex-col mt-12'}>
                <Link href={'/'} className={'text-sm font-bold font-jekobold text-[#ff4140] pb-2'}>
                    Tout les sujets
                </Link>
                {categories.map((category) => (
                    <Link key={category.id} href={`/category/${category.id}`} className='text-sm pb-1 hover:text-[#ff4140]'>
                        {category.name}
                    </Link>
                ))}
            </div>

            <div className={'flex flex-col mt-12'}>
                <Link href={'/'} className={'text-sm font-jekobold text-[#ff4140] pb-2'}>
                    Toutes les situations
                </Link>
                {tags.map((tag) => (
                    <Link key={tag.id} href={`/tag/${tag.id}`} className='text-sm pb-1 hover:text-[#ff4140]'>
                        {tag.name}
                    </Link>
                ))}
            </div>

            <div className='bg-[#FFE6AC] rounded-xl p-4 mt-12'>
                <div className='font-jekobold text-lg mb-4'>Decouvre Hiway</div>

                <div className='flex flex-col space-y-2 mb-8'>
                    <div className='flex text-sm items-center'>
                        <Image src={'/rocket.png'} alt='icon' width={24} height={24} className='mr-2' /> On t’aide à te lancer
                    </div>
                    <div className='flex text-sm items-center'>
                        <Image src={'/glass.png'} alt='icon' width={24} height={24} className='mr-2' /> On gère ta société pour toi
                    </div>
                    <div className='flex text-sm items-center'>
                        <Image src={'/plant.png'} alt='icon' width={24} height={24} className='mr-2' /> On t’aide à préparer l’avenir
                    </div>
                </div>
                <Link
                    href={'https://hiway.fr/contact'}
                    className='rounded-full bg-[#FDB813] mt-8 px-4 py-2 text-black text-sm font-jekobold hover:bg-white'
                >
                    Prends rdv avec un coach
                </Link>
            </div>
        </div>
    );
}
