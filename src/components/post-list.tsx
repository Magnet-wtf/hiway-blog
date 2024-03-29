'use client';

import { PostWithMedia } from '@/lib/wordpress/wp-client';
import Image from 'next/image';
import Link from 'next/link';
import { WP_REST_API_Term } from 'wp-types';
import he from 'he';
import { isMobile } from 'react-device-detect';
import { useAtomValue } from 'jotai';
import { searchAtom } from '@/store';

export default function PostList({
    posts,
    categories,
    allPosts,
}: {
    posts: PostWithMedia[];
    categories: WP_REST_API_Term[];
    allPosts: PostWithMedia[];
}) {
    const search = useAtomValue(searchAtom);
    const getCategoryName = (categoryIds: number[]) => {
        const category = categories.find((category) => category.id === categoryIds[0]);
        return category ? category.name : '';
    };

    const buildPostsArray = (posts: PostWithMedia[]) => {
        if (isMobile) {
            return [
                ...posts.slice(0, 5), // Take the first 5 posts
                {} as any, // Add a placeholder for the CTA
                ...posts.slice(5), // Take the rest of the posts after the 5th one
            ];
        }

        if (posts.length < 6) {
            return [...posts, {} as any];
        }

        return [
            ...posts.slice(1, 6), // Take the first 5 posts
            {} as any, // Add a placeholder for the CTA
            ...posts.slice(6), // Take the rest of the posts after the 5th one
        ];
    };

    return (
        <div className={`grid grid-cols-1 gap-8 ${!isMobile && ' md:grid-cols-2 xl:grid-cols-3 md:gap-8 xl:gap-12 p-8 xl:p-8'} w-full`}>
            {search !== '' ? (
                <>
                    {allPosts &&
                        allPosts.length > 0 &&
                        [
                            ...buildPostsArray(allPosts.filter((post) => post.title.rendered.toLowerCase().includes(search.toLowerCase()))),
                        ].map((post, index) => {
                            if (index === 5) {
                                return (
                                    <div key='flex flex-col w-full h-full items-center justify-center rounded-xl border border-2 border-[#f6f6f6]'>
                                        <Link
                                            href={'https://hiway.fr'}
                                            className='flex flex-col w-full h-full items-center justify-center rounded-xl border-4 border-[#f6f6f6] py-4 cursor-pointer'
                                        >
                                            <Image
                                                src={'/logo-hiway.svg'}
                                                alt='post image'
                                                width={70}
                                                height={70}
                                                className='rounded-xl pb-8'
                                            />
                                            <div className='text-2xl font-bold font-jekobold pb-4 text-center px-8'>
                                                La meilleure expérience pour <br />
                                                <span className='text-[#ff4140] font-jekobold'>devenir freelance</span>
                                            </div>
                                            <Image src={'/laptop.png'} alt='post image' width={150} height={150} className='rounded-xl' />
                                        </Link>
                                    </div>
                                );
                            }
                            return (
                                <Link
                                    href={`/article/${post.slug}`}
                                    className={'flex flex-col space-y-5 justify-start items-center h-full'}
                                    key={post.id}
                                >
                                    <div className='w-full relative'>
                                        <div className='absolute inset-0 bg-[#ff4140] opacity-0 hover:opacity-50 transition-opacity'></div>
                                        <Image
                                            src={post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url || '/default-image.png'}
                                            alt='post image'
                                            className='w-full'
                                            width={400}
                                            height={400}
                                        />
                                    </div>
                                    <div className='w-full text-start'>
                                        <div className='flex flex-col w-full items-start justify-start'>
                                            {post.categories && (
                                                <div className='text-sm text-[#ff4140] text-start'>{getCategoryName(post.categories)}</div>
                                            )}
                                            <h2 className='font-black text-lg font-jekoblack text-start my-0'>
                                                {post && post.title ? he.decode(post.title.rendered) : ''}
                                            </h2>
                                            <span>{post && post.excerpt && post.excerpt.protected}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </>
            ) : (
                <>
                    {posts &&
                        posts.length > 0 &&
                        [...buildPostsArray(posts)].map((post, index) => {
                            if (index === 5) {
                                return (
                                    <div key='flex flex-col w-full h-full items-center justify-center rounded-xl border border-2 border-[#f6f6f6]'>
                                        <Link
                                            href={'https://hiway.fr'}
                                            className='flex flex-col w-full h-full items-center justify-center rounded-xl border-4 border-[#f6f6f6] py-4 cursor-pointer'
                                        >
                                            <Image
                                                src={'/logo-hiway.svg'}
                                                alt='post image'
                                                width={70}
                                                height={70}
                                                className='rounded-xl pb-8'
                                            />
                                            <div className='text-2xl font-bold font-jekobold pb-4 text-center px-8'>
                                                La meilleure expérience pour <br />
                                                <span className='text-[#ff4140] font-jekobold'>devenir freelance</span>
                                            </div>
                                            <Image src={'/laptop.png'} alt='post image' width={150} height={150} className='rounded-xl' />
                                        </Link>
                                    </div>
                                );
                            }
                            return (
                                <Link
                                    href={`/article/${post.slug}`}
                                    className={'flex flex-col space-y-5 justify-start items-center h-full'}
                                    key={post.id}
                                >
                                    <div className='w-full relative'>
                                        <div className='absolute inset-0 bg-[#ff4140] opacity-0 hover:opacity-50 transition-opacity'></div>
                                        <Image
                                            src={post.mediaUrl ? post.mediaUrl : '/default-image.png'}
                                            alt='post image'
                                            className='w-full'
                                            width={400}
                                            height={400}
                                        />
                                    </div>
                                    <div className='w-full text-start'>
                                        <div className='flex flex-col w-full items-start justify-start'>
                                            {post.categories && (
                                                <div className='text-sm text-[#ff4140] text-start'>{getCategoryName(post.categories)}</div>
                                            )}
                                            <h2 className='font-black text-lg font-jekoblack text-start my-0'>
                                                {post && post.title ? he.decode(post.title.rendered) : ''}
                                            </h2>
                                            <span>{post && post.excerpt && post.excerpt.protected}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </>
            )}
        </div>
    );
}
