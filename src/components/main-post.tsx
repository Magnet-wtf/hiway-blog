'use client';

import { PostWithMedia } from '@/lib/wordpress/wp-client';
import Image from 'next/image';
import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import he from 'he';
import { useAtomValue } from 'jotai';
import { searchAtom } from '@/store';

export default function MainPost({ post }: { post: PostWithMedia }) {
    const search = useAtomValue(searchAtom);

    if (isMobile || search !== '') {
        return null;
    }

    const getTitleFirstWord = (title: string) => {
        return title.split(' ')[0] + ' ' + title.split(' ')[1];
    };

    const getTitleWithoutFirstWord = (title: string) => {
        return title.split(' ').slice(2).join(' ');
    };

    return (
        <Link href={`/article/${post.slug}`} className={'flex space-y-5 justify-start items-center w-full px-8 pt-12 pb-8'} key={post.id}>
            <div className='relative rounded-xl min-w-[50%] h-full'>
                <Image src={post.mediaUrl ? post.mediaUrl : '/work.png'} alt='post image' width={850} height={650} className='relative rounded-xl h-full' />
            </div>
            <div className='ml-8 space-y-4'>
                <div className='text-sm text-[#ff4140] text-start'>Se lancer - Micro-entrepreneur</div>
                <div className='text-4xl xl:text-5xl 2xl:text-7xl font-jekoblack leading-[60px] text-start'>
                    <span className='text-[#ff4140] font-jekoblack'>{getTitleFirstWord(he.decode(post.title.rendered))}</span>{' '}
                    {getTitleWithoutFirstWord(he.decode(post.title.rendered))}
                </div>
                <span>{post.excerpt.protected}</span>
            </div>
        </Link>
    );
}
