'use client';

import { PostWithMedia } from '@/lib/wordpress/wp-client';
import wpService from '@/lib/wordpress/wp-service';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { WP_REST_API_Term } from 'wp-types';
import { Button } from './ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';
import { LoadingSkeleton, MainLoadingSkeleton } from './ui/skeleton';

export default function Blog({ page = 1 }: { page?: number }) {
    const [posts, setPosts] = useState<PostWithMedia[]>([]);
    const [categories, setCategories] = useState<WP_REST_API_Term[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { posts, totalPages } = await wpService.getPosts({ page });
            setPosts(posts);
            setTotalPages(totalPages);

            const categories = await wpService.getCategories();
            setCategories(categories);

            setLoading(false);
        };

        fetchData();
    }, [page]);

    const getTitleFirstWord = (title: string) => {
        return title.split(' ')[0];
    };

    const getTitleWithoutFirstWord = (title: string) => {
        return title.split(' ').slice(1).join(' ');
    };

    return (
        <div className='w-full'>
            <div className='w-full h-[56px] p-4 flex items-center justify-between shadow-xl'>
                <Image src='/logo.png' alt='logo' width={45} height={45} />

                <div className='flex space-x-4'>
                    <Button className='rounded-full bg-[#FF4140]'>Nous contacter</Button>
                    <Button variant='outline' className='rounded-full border-[#FF4140] border-2'>
                        Simuler mon revenu
                    </Button>
                    <Button className='rounded-full px-2 bg-[#FF4140]'>
                        <User className='h-6 w-6' />
                    </Button>
                </div>
            </div>
            <div className={'flex'}>
                {/** Sidebar */}
                <div className={'flex flex-col left-0 p-4 pt-8 w-[350px] border-r'}>
                    <h1 className={'text-2xl xl:text-4xl font-bold leading-[52.5px]'}>
                        <span className='text-[#FF4140]'>Bienvenue</span> <br /> sur le blog <br /> Hiway
                    </h1>
                    <p className={'text-sm text- mt-4 text-[#979797]'}>
                        Tout ce qu’il faut savoir pour vivre sa meilleure vie de freelance
                    </p>

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
                        <h1 className={'text-sm font-bold text-[#ff4140] pb-2'}>Tout les sujets</h1>
                        {categories.map((category) => (
                            <Link key={category.id} href={`/categories/${category.slug}`} className='text-sm pb-1'>
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    <div className='bg-[#FFE6AC] rounded-xl p-4 mt-12'>
                        <h1 className='font-bold text-lg mb-4'>Decouvre Hiway</h1>

                        <div className='flex flex-col space-y-2'>
                            <div className='flex text-sm items-center'>
                                <Image src={'/rocket.png'} alt='icon' width={24} height={24} className='mr-2' /> On t’aide à te lancer
                            </div>
                            <div className='flex text-sm items-center'>
                                <Image src={'/glass.png'} alt='icon' width={24} height={24} className='mr-2' /> On gère ta société pour toi
                            </div>
                            <div className='flex text-sm items-center'>
                                <Image src={'/plant.png'} alt='icon' width={24} height={24} className='mr-2' /> On t’aide à préparer
                                l’avenir
                            </div>
                        </div>
                        <Button className='rounded-full bg-[#FDB813] mt-8 text-black'>Prends rdv avec un coach</Button>
                    </div>
                </div>

                <div className={'flex flex-col space-y-8 p-4 w-full pt-8'}>
                    {loading ? (
                        <>
                            <MainLoadingSkeleton />
                            <LoadingSkeleton />
                        </>
                    ) : (
                        <>
                            {posts && posts.length > 0 && (
                                <>
                                    <div className={'flex space-y-5 justify-start items-center w-full px-12 pb-12'} key={posts[0].id}>
                                        <Image src={'/work.png'} alt='post image' width={550} height={350} className='rounded-xl w-92' />
                                        <Link href={`/posts/${posts[0].slug}`} className='max-w-xl ml-8'>
                                            <h2 className='text-sm text-[#ff4140]'>Se lancer - Micro-entrepreneur</h2>
                                            <h1 className='text-6xl font-bold leading-[72px]'>
                                                <span className='text-[#ff4140]'>{getTitleFirstWord(posts[0].title.rendered)}</span>{' '}
                                                {getTitleWithoutFirstWord(posts[0].title.rendered)}
                                            </h1>
                                            <span>{posts[0].excerpt.protected}</span>
                                        </Link>
                                    </div>

                                    <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8'}>
                                        {posts &&
                                            posts.map((post) => (
                                                <div className={'flex flex-col space-y-5 justify-center items-center'} key={post.id}>
                                                    <Image src={post.mediaUrl} alt='post image' width={400} height={400} />
                                                    <Link href={`/posts/${post.slug}`} className='max-w-sm'>
                                                        <h2 className='text-sm text-[#ff4140]'>Se lancer - Micro-entrepreneur</h2>
                                                        <h2 className='font-bold text-lg'>{post.title.rendered}</h2>
                                                        <span>{post.excerpt.protected}</span>
                                                    </Link>
                                                </div>
                                            ))}
                                    </div>
                                </>
                            )}

                            <PaginationLinks currentPage={page} totalPages={totalPages} />
                        </>
                    )}

                    <div className='w-full p-12'>
                        <div className='w-full rounded-xl bg-[#F6F6F6] grid grid-cols-2 min-h-[628px]'>
                            <div className='flex flex-col items-start justify-start text-left pt-24 pl-24 h-full w-full'>
                                <h1 className='text-6xl font-semibold leading-24'>
                                    Plus de 700 freelances <br /> ont changé de vie <br /> avec Hiway
                                </h1>
                                <h2 className='text-lg font-bold text-left mt-8'>
                                    Devenir freelance n&apos;a jamais été aussi simple qu&apos;avec Hiway.
                                </h2>
                                <p className='text-sm font-medium text-left mt-8'>
                                    On t&apos;accompagne à chaque étape, on gère tout pour que tu profites au maximum de ton statut et que
                                    tu t&apos;ouvres encore plus de perspectives.
                                </p>

                                <div className='flex space-x-4 mt-8'>
                                    <Button className='rounded-full bg-[#FF4140]'>Se lancer avec Hiway</Button>
                                    <Button variant='outline' className='rounded-full border-[#FF4140] border-2'>
                                        Simuler mon revenu
                                    </Button>
                                </div>
                            </div>
                            <div className='flex items-center justify-center'>
                                <Image src={'/illustration.png'} alt='freelance' width={400} height={400} />
                            </div>
                        </div>
                    </div>

                    <div className='w-full px-12 pb-12'>
                        <div className='w-full rounded-xl bg-[#F6F6F6]'>
                            <div className='grid grid-cols-3 h-full p-24 min-h-[507px] w-full justify-items-center'>
                                <div className='flex flex-col items-start justify-start text-left h-full w-full'>
                                    <Image src={'/logo-big.png'} alt='icon' width={100} height={100} />
                                    <h1 className='text-2xl font-semibold leading-24 mt-8'>
                                        La meilleure expérience <br />
                                        pour devenir freelance
                                    </h1>
                                    <Button variant='outline' size='lg' className='rounded-full border-[#FF4140] border-2 mt-8'>
                                        Simuler mon revenu
                                    </Button>
                                </div>
                                <div className='flex flex-col items-start px-12 justify-start h-full w-full space-y-4'>
                                    <h1 className='font-bold'>Accompagnement</h1>
                                    <p>On t&apos;aide à lancer ton activité</p>
                                    <p>On gère ta société au quotidien</p>
                                    <p>On t&apos;aide à bien préparer ton avenir</p>
                                </div>
                                <div className='flex flex-col items-start justify-start space-y-20 px-12'>
                                    <div className='flex flex-col w-full items-start justify-start space-y-4'>
                                        <h1 className='font-bold'>Ressources</h1>
                                        <p className=''>Témoignages</p>
                                        <p>Simuler mon revenu</p>
                                        <p>Blog</p>
                                    </div>
                                    <Button size='lg' className='rounded-full bg-[#FF4140]'>
                                        Prendre rendez-vous
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PaginationLinks({
    currentPage,
    totalPages,
}: React.PropsWithChildren<{
    currentPage: number;
    totalPages: number;
}>) {
    const pagesArray = Array(totalPages)
        .fill(null)
        .map((_, page) => page + 1);

    return (
        <div className={'flex space-x-4 w-full items-center justify-center'}>
            {pagesArray.map((page) => {
                const isSelected = page === currentPage;
                const className = isSelected
                    ? 'font-bold bg-[#FF4140] border-[#FF4140] text-white p-4 px-6 rounded-lg'
                    : 'hover:font-medium border rounded-lg p-4 px-6';

                return (
                    <Link key={page} className={className} href={`/?page=${page}`}>
                        {page}
                    </Link>
                );
            })}
        </div>
    );
}
