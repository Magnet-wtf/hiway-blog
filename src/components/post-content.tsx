'use client';

import Link from 'next/link';
import { Badge } from './ui/badge';
import Image from 'next/image';
import CTA from './cta';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { PostWithMedia } from '@/lib/wordpress/wp-client';
import parse, { domToReact } from 'html-react-parser';
import he from 'he';
import { WP_REST_API_Term } from 'wp-types';
import { isMobile } from 'react-device-detect';
import { createRef, useCallback, useRef, useState } from 'react';
import DialogForm from './form-dialog';
import Axios from 'axios';
import wpService from '@/lib/wordpress/wp-service';

export default function PostContent({
    post,
    category,
    tag,
    filteredPosts,
}: {
    post: PostWithMedia;
    category: WP_REST_API_Term;
    tag: WP_REST_API_Term;
    filteredPosts: PostWithMedia[];
}) {
    const [isCommentSent, setIsCommentSent] = useState(false);
    const options = {
        replace({ attribs, children }: any) {
            if (!attribs) {
                return;
            }

            if (attribs.id === 'h2') {
                return <div style={{ fontSize: 42 }}>{domToReact(children, options)}</div>;
            }

            if (attribs.class === 'prettify') {
                return <span style={{ color: 'hotpink' }}>{domToReact(children, options)}</span>;
            }
        },
    };

    const parsedContent = post ? parse(he.decode(post.content.rendered)) : null;

    const parsedDate = post ? new Date(post.date) : null;

    const getTitleFirstWord = (title: string) => {
        return title.split(' ')[0] + ' ' + title.split(' ')[1];
    };

    const getTitleWithoutFirstWord = (title: string) => {
        return title.split(' ').slice(2).join(' ');
    };

    const readingTime = (content: string | null) => {
        if (!content) return 0;
        const wordsPerMinute = 200;
        const textLength = content.split(' ').length;
        return Math.ceil(textLength / wordsPerMinute);
    };

    const buildPostArray = (posts: PostWithMedia[]) => {
        if (posts.length > 3) {
            return posts.slice(0, 3);
        } else {
            return posts;
        }
    };

    let fields = {
        author_name: '',
        author_email: '',
        content: '',
        post: post.id, //getting this from the main component
    };

    const fieldChangeHandler = (e: any) => {
        switch (e.target.name) {
            case 'commenter-name':
                fields.author_name = e.target.value;
                break;
            case 'commenter-email':
                fields.author_email = e.target.value;
                break;
            case 'commenter-message':
                fields.content = e.target.value;
                break;
        }
    };

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault();
        setIsCommentSent(true);
        let response = await wpService.postComment(post.id, fields.author_name, fields.author_email, fields.content);
        console.log(response);
    }, []);

    return (
        <div className={`flex flex-col w-full justify-center space-y-4 ${!isMobile ? 'px-24' : 'px-8'} py-12`} id='toPDF'>
            <DialogForm />
            <div className={'flex flex-col space-y-2'}>
                <div className='flex space-x-4 mb-4 exclude-from-pdf'>
                    {category && (
                        <Link
                            href={`/category/${category.slug}`}
                            className='bg-[#FDB813] rounded-full text-black hover:bg-white border-2 border-[#fdb814] font-jeko py-2.5 px-6 flex items-center justify-center'
                        >
                            {category?.name}
                        </Link>
                    )}
                    {tag.name && (
                        <Link
                            href={`/tag/${tag.slug}`}
                            className='bg-[#FDB813] rounded-full text-black hover:bg-white border-2 border-[#fdb814] font-jeko py-2.5 px-6 flex items-center justify-center'
                        >
                            {tag?.name}
                        </Link>
                    )}
                </div>
                <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl'} font-bold max-w-[800px] font-jekoblack`}>
                    <span className='text-[#ff4140] font-jekoblack'>{getTitleFirstWord(he.decode(post.title.rendered))}</span>{' '}
                    {getTitleWithoutFirstWord(he.decode(post.title.rendered))}
                </h1>

                <div className='text-[#979797] font-light py-8'>
                    Mis à jour le{' '}
                    {parsedDate?.toLocaleString('fr-FR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}{' '}
                    | Temps de lecture : {readingTime(post.content.rendered)} minutes
                </div>
            </div>
            <div className='max-w-[800px] expand-for-pdf'>
                <Image
                    src={post.mediaUrl ? post.mediaUrl : '/default-image.png'}
                    alt='post image'
                    width={600}
                    height={400}
                    className='rounded-xl mb-12'
                />
                {/* <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> */}
                {parsedContent}

                <CTA />

                <div className='w-full flex flex-col items-center justify-center mt-12 exclude-from-pdf'>
                    {isCommentSent ? (
                        <div>Merci pour ton commentaire, il est en attente de modération</div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className={`w-full rounded-xl bg-[#F6F6F6] ${
                                isMobile ? 'p-4' : 'p-12'
                            } flex flex-col justify-center items-center text-center`}
                        >
                            <div className='font-jekobold text-black text-2xl'>
                                Une question ? Une remarques ? <br />{' '}
                                <span className='text-[#ff4140] font-jekobold'>Laisse un commentaire</span>
                            </div>
                            <div className='flex flex-col items-center justify-center mt-8 w-full'>
                                <div className='flex items-center space-x-8 w-full'>
                                    <Input
                                        onChange={fieldChangeHandler}
                                        placeholder='Ton nom'
                                        className='rounded-full bg-[#F6F6F6] border-[#979797] border p-8'
                                        name='commenter-name'
                                    />
                                    <Input
                                        placeholder='Ton email'
                                        name='commenter-email'
                                        onChange={fieldChangeHandler}
                                        className='rounded-full bg-[#F6F6F6] border-[#979797] border p-8'
                                    />
                                </div>

                                <Textarea
                                    placeholder='Ton commentaire'
                                    name='commenter-message'
                                    rows={8}
                                    className='bg-[#F6F6F6] border-[#979797] border px-8 mt-8 rounded-2xl'
                                    onChange={fieldChangeHandler}
                                />
                                <div className='w-full flex items-center justify-end mt-8'>
                                    <Button type='submit' className='text-white bg-[#ff4140] font-jekobold rounded-full'>
                                        Valider
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>

                <div className='w-full flex flex-col items-center justify-center mt-24 exclude-from-pdf'>
                    <div className='font-jekobold text-black text-4xl'>
                        Autres articles sur le sujet <span className='text-[#ff4140] font-jekobold'>{category.name}</span>
                    </div>

                    <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-8'}>
                        {filteredPosts &&
                            filteredPosts.length > 0 &&
                            buildPostArray(filteredPosts).map((post) => (
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
                                            {post.categories && <div className='text-sm text-[#ff4140] text-start'>{category.name}</div>}
                                            <h2 className='font-black text-lg font-jekoblack text-start my-0'>
                                                {he.decode(post.title.rendered)}
                                            </h2>
                                            <span>{post.excerpt.protected}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
