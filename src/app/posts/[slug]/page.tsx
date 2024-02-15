import { use } from 'react';
import { notFound } from 'next/navigation';

import wpService from '@/lib/wordpress/wp-service';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download, Facebook, Linkedin, User } from 'lucide-react';
import parse, { domToReact } from 'html-react-parser';
import DialogForm from '@/components/form-dialog';
import PostSummary from '@/components/post-summary';
import { Badge } from '@/components/ui/badge';
import CTA from '@/components/cta';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import he from 'he';

interface PostPageParams {
    params: {
        slug: string;
    };
}

function PostPage({ params }: PostPageParams) {
    const { posts } = use(
        wpService.getPosts({
            slug: [params.slug],
        }),
    );

    const post = posts ? posts[0] : null;

    const tag = use(wpService.getTag((post && post.tags && post?.tags[0]) || 0));
    const category = use(wpService.getCategory((post && post.categories && post?.categories[0]) || 0));

    const options = {
        replace({ attribs, children }: any) {
            if (!attribs) {
                return;
            }

            if (attribs.id === 'h2') {
                return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
            }

            if (attribs.class === 'prettify') {
                return <span style={{ color: 'hotpink' }}>{domToReact(children, options)}</span>;
            }
        },
    };

    const parsedContent = post ? parse(he.decode(post.content.rendered)) : null;

    const parsedDate = post ? new Date(post.date) : null;

    if (!post) {
        notFound();
    }

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

    return (
        <div className={'w-full'}>
            <div className={'flex'}>
                {/** Sidebar */}
                <div className={'flex flex-col left-0 p-4 pt-8 w-[350px] border-r'}>
                    <h1 className={'text-xl font-jekobold leading-[52.5px]'}>Sommaire</h1>

                    <PostSummary post={post} />

                    <DialogForm
                        trigger={
                            <>
                                <Button
                                    variant='outline'
                                    className='rounded-full border-[#FF4140] border-2 mt-8 text-[#FF4140] font-jekobold'
                                >
                                    <Download className='h-4 w-4 mr-2 text-[#FF4140]' />
                                    Télécharger cet article en PDF
                                </Button>
                            </>
                        }
                    />

                    <div className='mt-12 flex flex-col'>
                        <h1 className='font-bold'>Partager cet article</h1>
                        <div className='flex space-x-2 pt-4'>
                            <Image src='/facebook.png' alt='facebook' width={30} height={30} />
                            <Image src='/linkedin.png' alt='linkedin' width={30} height={30} />
                            <Image src='/twitter.png' alt='twitter' width={30} height={30} />
                            <Image src='/share.png' alt='whatsapp' width={30} height={30} />
                        </div>
                    </div>
                </div>
                <div className={'flex flex-col w-full justify-center space-y-4 px-24 py-12'}>
                    <div className={'flex flex-col space-y-2'}>
                        <div className='flex space-x-4 mb-4'>
                            {category && (
                                <Link
                                    href={`/category/${category.id}`}
                                    className='bg-[#FDB813] rounded-full text-black hover:bg-white border-2 border-[#fdb814] font-jekobold py-2 px-2'
                                >
                                    {category?.name}
                                </Link>
                            )}
                            {tag.name && <Badge className='bg-[#FDB813] text-black font-jekobold py-2 px-2'>{tag.name}</Badge>}
                        </div>
                        <h1 className={'text-6xl font-bold max-w-5xl font-jekoblack'}>
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
                    <div className='max-w-5xl'>
                        {/* <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> */}
                        {parsedContent}

                        <CTA />

                        <div className='w-full flex flex-col items-center justify-center mt-12'>
                            <div className='w-full rounded-xl bg-[#F6F6F6] p-12 flex flex-col justify-center items-center text-center'>
                                <h1 className='font-jekobold text-black text-2xl'>
                                    Une question ? Une remarques ? <br />{' '}
                                    <span className='text-[#ff4140] font-jekobold'>Laisse un commentaire</span>
                                </h1>
                                <div className='flex flex-col items-center justify-center mt-8'>
                                    <div className='flex items-center space-x-8'>
                                        <Input placeholder='Ton nom' className='rounded-full bg-[#F6F6F6] border-[#FF4140] border-2' />
                                        <Input placeholder='Ton email' className='rounded-full bg-[#F6F6F6] border-[#FF4140] border-2' />
                                    </div>

                                    <Textarea
                                        placeholder='Ton commentaire'
                                        className='rounded-xl bg-[#F6F6F6] border-[#FF4140] border-2 mt-8'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex flex-col items-center justify-center mt-24'>
                            <h1 className='font-jekobold text-black text-4xl'>
                                Autres articles sur le sujet <span className='text-[#ff4140] font-jekobold'>{category.name}</span>
                            </h1>

                            <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-8'}>
                                <div className={'flex flex-col space-y-5 justify-center items-center'} key={post.id}>
                                    <Image
                                        src={post.mediaUrl ? post.mediaUrl : '/default-image.png'}
                                        alt='post image'
                                        width={400}
                                        height={400}
                                    />
                                    <Link href={`/posts/${post.slug}`} className='max-w-sm'>
                                        <h1 className='text-sm text-[#ff4140]'>Se lancer - Micro-entrepreneur</h1>
                                        <h1 className='font-black text-lg font-jekoblack'>{post.title.rendered}</h1>
                                        <span>{post.excerpt.protected}</span>
                                    </Link>
                                </div>

                                <div className={'flex flex-col space-y-5 justify-center items-center'} key={post.id}>
                                    <Image
                                        src={post.mediaUrl ? post.mediaUrl : '/default-image.png'}
                                        alt='post image'
                                        width={400}
                                        height={400}
                                    />
                                    <Link href={`/posts/${post.slug}`} className='max-w-sm'>
                                        <h1 className='text-sm text-[#ff4140]'>Se lancer - Micro-entrepreneur</h1>
                                        <h1 className='font-black text-lg font-jekoblack'>{post.title.rendered}</h1>
                                        <span>{post.excerpt.protected}</span>
                                    </Link>
                                </div>

                                <div className={'flex flex-col space-y-5 justify-center items-center'} key={post.id}>
                                    <Image
                                        src={post.mediaUrl ? post.mediaUrl : '/default-image.png'}
                                        alt='post image'
                                        width={400}
                                        height={400}
                                    />
                                    <Link href={`/posts/${post.slug}`} className='max-w-sm'>
                                        <h1 className='text-sm text-[#ff4140]'>Se lancer - Micro-entrepreneur</h1>
                                        <h1 className='font-black text-lg font-jekoblack'>{post.title.rendered}</h1>
                                        <span>{post.excerpt.protected}</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostPage;
