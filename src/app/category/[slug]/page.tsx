import { use } from 'react';

import wpService from '@/lib/wordpress/wp-service';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PaginationLinks } from '@/app/page';

interface PostPageParams {
    params: {
        page: string;
        slug: number;
    };
}

function CategoriesPage({ params }: PostPageParams) {
    const page = params.page ? parseInt(params.page) : 1;
    const { posts, totalPages } = use(wpService.getPosts({ page }));
    const categories = use(wpService.getCategories());
    const tags = use(wpService.getTags());

    const filteredPosts = posts.filter((post) => post.categories?.includes(Number(params.slug)));

    const getTitleFirstWord = (title: string) => {
        return title.split(' ')[0];
    };

    const getTitleWithoutFirstWord = (title: string) => {
        return title.split(' ').slice(1).join(' ');
    };

    return (
        <div className='w-full'>
            <div className={'flex'}>
                {/** Sidebar */}
                <div className={'flex flex-col left-0 p-4 pt-8 w-[350px] border-r'}>
                    <h1 className={'text-2xl xl:text-4xl font-bold leading-[52.5px] font-jekoblack'}>
                        <span className='text-[#FF4140] font-jekoblack'>Bienvenue</span> <br /> sur le blog <br /> Hiway
                    </h1>
                    <p className={'text-sm mt-4 text-[#979797]'}>
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
                        <h1 className={'text-sm font-bold font-jekobold text-[#ff4140] pb-2'}>Tout les sujets</h1>
                        {categories.map((category) => (
                            <Link key={category.id} href={`/categories/${category.slug}`} className='text-sm pb-1'>
                                {category.name}
                            </Link>
                        ))}
                    </div>

                    <div className={'flex flex-col mt-12'}>
                        <h1 className={'text-sm font-jekobold text-[#ff4140] pb-2'}>Toutes les situations</h1>
                        {tags.map((tag) => (
                            <Link key={tag.id} href={`/categories/${tag.slug}`} className='text-sm pb-1'>
                                {tag.name}
                            </Link>
                        ))}
                    </div>

                    <div className='bg-[#FFE6AC] rounded-xl p-4 mt-12'>
                        <h1 className='font-jekobold text-lg mb-4'>Decouvre Hiway</h1>

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
                        <Button className='rounded-full bg-[#FDB813] mt-8 text-black font-jekobold'>Prends rdv avec un coach</Button>
                    </div>
                </div>
                <div className={'flex flex-col space-y-8 p-4 w-full pt-8'}>
                    <div className={'flex space-y-5 justify-start items-center w-full px-8 pb-10'} key={posts[0].id}>
                        <Image src={'/work.png'} alt='post image' width={550} height={350} className='rounded-xl w-92' />
                        <Link href={`/posts/${posts[0].slug}`} className='max-w-xl ml-8 space-y-4'>
                            <h1 className='text-sm text-[#ff4140] text-start'>Se lancer - Micro-entrepreneur</h1>
                            <h1 className='text-6xl font-jekoblack leading-[60px] text-start'>
                                <span className='text-[#ff4140] font-jekoblack'>{getTitleFirstWord(posts[0].title.rendered)}</span>{' '}
                                {getTitleWithoutFirstWord(posts[0].title.rendered)}
                            </h1>
                            <span>{posts[0].excerpt.protected}</span>
                        </Link>
                    </div>

                    <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8'}>
                        {filteredPosts.map((post) => (
                            <div className={'flex flex-col space-y-5 justify-center items-center'} key={post.id}>
                                <Image src={post.mediaUrl ? post.mediaUrl : '/default-image.png'} alt='post image' width={400} height={400} />
                                <Link href={`/posts/${post.slug}`} className='w-full text-start'>
                                    <div className='flex flex-col w-full items-start justify-start px-8'>

                                    <h1 className='text-sm text-[#ff4140] text-start'>Se lancer - Micro-entrepreneur</h1>
                                    <h1 className='font-black text-lg font-jekoblack text-start'>{post.title.rendered}</h1>
                                    <span>{post.excerpt.protected}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <PaginationLinks currentPage={page} totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}

export default CategoriesPage;
