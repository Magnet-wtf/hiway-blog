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
                return <div style={{ fontSize: 42 }}>{domToReact(children, options)}</div>;
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
                <div className={'flex flex-col left-0 pl-12 pr-4 pt-8 w-[350px] border-r'}>
                    <div className={'text-xl font-jekobold leading-[52.5px]'}>Sommaire</div>

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
                        <div className='font-bold'>Partager cet article</div>
                        <div className='flex space-x-4 pt-4'>
                            <Link href='https://www.linkedin.com/company/hiwayfreelance/?originalSubdomain=fr'>
                                <svg width='20' height='21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M18.551.238H1.508C.692.238 0 .882 0 1.677v17.12c0 .796.454 1.44 1.27 1.44h17.043c.817 0 1.687-.644 1.687-1.44V1.678c0-.795-.632-1.44-1.449-1.44zM7.62 7.857h2.692v1.372h.03c.41-.74 1.623-1.491 3.122-1.491 2.877 0 3.68 1.527 3.68 4.357v5.286h-2.857v-4.765c0-1.267-.506-2.378-1.689-2.378-1.436 0-2.12.972-2.12 2.568v4.575H7.618V7.857zM2.857 17.38h2.857V7.857H2.857v9.524zM6.071 4.523a1.785 1.785 0 11-3.57.002 1.785 1.785 0 013.57-.002z'
                                        fill='#000'
                                    ></path>
                                </svg>
                            </Link>
                            <Link href='https://twitter.com/hiwayfreelance'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none'>
                                    <g clip-path='url(#twitter_new_svg__clip0_795_47558)'>
                                        <path
                                            d='M11.903 8.464L19.348 0h-1.764l-6.465 7.35L5.955 0H0l7.808 11.114L0 19.99h1.764l6.828-7.761 5.452 7.76H20L11.902 8.465zm-2.417 2.747l-.791-1.106L2.4 1.299h2.71l5.08 7.107.791 1.106 6.604 9.238h-2.71l-5.389-7.538z'
                                            fill='#000'
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id='twitter_new_svg__clip0_795_47558'>
                                            <path fill='#fff' d='M0 0h20v20H0z'></path>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Link>
                            <Link href='https://www.facebook.com/HIWAY-115119890613934'>
                                <svg width='21' height='21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M0 10.288c0 4.975 3.618 9.095 8.392 9.95l.06-.049c-.004 0-.007 0-.01-.002v-7.085H5.93v-2.814h2.512V8.077c0-2.513 1.608-3.92 3.92-3.92.703 0 1.507.1 2.21.201v2.563h-1.306c-1.206 0-1.507.603-1.507 1.407v1.96h2.663l-.452 2.814h-2.211v7.085a9.81 9.81 0 01-.092.017l.042.034c4.773-.855 8.392-4.975 8.392-9.95C20.1 4.76 15.578.238 10.05.238 4.522.238 0 4.76 0 10.288z'
                                        fill='#000'
                                    ></path>
                                </svg>
                            </Link>
                            <Link href='https://www.instagram.com/hiwayfreelance'>
                                <svg width='21' height='21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        d='M10.108.238c-2.718 0-3.06.012-4.127.06C4.916.347 4.19.515 3.553.763A4.9 4.9 0 001.78 1.916 4.909 4.909 0 00.625 3.687C.377 4.323.208 5.05.16 6.114.112 7.181.1 7.522.1 10.238c0 2.716.012 3.055.06 4.122.05 1.065.218 1.791.465 2.427a4.9 4.9 0 001.154 1.771 4.9 4.9 0 001.772 1.155c.637.247 1.364.415 2.43.464 1.067.049 1.408.06 4.126.06 2.718 0 3.058-.011 4.125-.06 1.066-.049 1.794-.217 2.43-.464a4.898 4.898 0 001.772-1.155 4.91 4.91 0 001.155-1.77c.246-.637.415-1.364.465-2.428.048-1.066.06-1.406.06-4.122s-.012-3.057-.06-4.124c-.05-1.064-.22-1.79-.465-2.427a4.91 4.91 0 00-1.155-1.771A4.892 4.892 0 0016.662.763C16.024.515 15.296.347 14.23.298c-1.068-.048-1.408-.06-4.126-.06h.003zM9.21 2.04h.898c2.672 0 2.989.01 4.044.057.975.045 1.505.208 1.858.345.467.18.8.398 1.15.748.35.35.567.683.749 1.15.137.352.3.88.344 1.856.048 1.054.059 1.37.059 4.04 0 2.668-.01 2.985-.059 4.039-.044.975-.207 1.504-.344 1.856a3.091 3.091 0 01-.75 1.149c-.35.35-.682.567-1.15.748-.352.137-.882.3-1.857.344-1.055.048-1.372.059-4.044.059-2.672 0-2.99-.01-4.044-.059-.976-.045-1.505-.207-1.858-.344a3.099 3.099 0 01-1.151-.748 3.1 3.1 0 01-.749-1.15c-.137-.352-.3-.88-.345-1.856-.048-1.054-.057-1.37-.057-4.041 0-2.67.01-2.986.057-4.04.045-.975.208-1.504.345-1.856.181-.467.399-.8.749-1.15.35-.35.684-.567 1.15-.749.354-.137.883-.3 1.859-.344.923-.042 1.28-.055 3.146-.057v.003zm6.24 1.66a1.2 1.2 0 10-.002 2.402A1.2 1.2 0 0015.45 3.7zm-5.342 1.402c-2.838 0-5.14 2.3-5.14 5.136a5.137 5.137 0 005.14 5.134 5.136 5.136 0 100-10.27zm0 1.802a3.335 3.335 0 013.336 3.334 3.335 3.335 0 01-3.336 3.333 3.334 3.334 0 110-6.667z'
                                        fill='#000'
                                    ></path>
                                </svg>
                            </Link>
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
                        <h1 className={'text-6xl font-bold max-w-[800px] font-jekoblack'}>
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
                    <div className='max-w-[800px]'>
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

                        <div className='w-full flex flex-col items-center justify-center mt-12'>
                            <div className='w-full rounded-xl bg-[#F6F6F6] p-12 flex flex-col justify-center items-center text-center'>
                                <div className='font-jekobold text-black text-2xl'>
                                    Une question ? Une remarques ? <br />{' '}
                                    <span className='text-[#ff4140] font-jekobold'>Laisse un commentaire</span>
                                </div>
                                <div className='flex flex-col items-center justify-center mt-8 w-full'>
                                    <div className='flex items-center space-x-8 w-full'>
                                        <Input placeholder='Ton nom' className='rounded-full bg-[#F6F6F6] border-[#979797] border p-8' />
                                        <Input placeholder='Ton email' className='rounded-full bg-[#F6F6F6] border-[#979797] border p-8' />
                                    </div>

                                    <Textarea
                                        placeholder='Ton commentaire'
                                        rows={8}
                                        className='bg-[#F6F6F6] border-[#979797] border px-8 mt-8 rounded-2xl'
                                    />
                                    <div className='w-full flex items-center justify-end mt-8'>
                                        <Button className='text-white bg-[#ff4140] font-jekobold rounded-full'>Valider</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex flex-col items-center justify-center mt-24'>
                            <div className='font-jekobold text-black text-4xl'>
                                Autres articles sur le sujet <span className='text-[#ff4140] font-jekobold'>{category.name}</span>
                            </div>

                            <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8 mt-8'}>
                                <div className={'flex flex-col space-y-5 justify-center items-center'} key={post.id}>
                                    <Image
                                        src={post.mediaUrl ? post.mediaUrl : '/default-image.png'}
                                        alt='post image'
                                        width={400}
                                        height={400}
                                    />
                                    <Link href={`/posts/${post.slug}`} className='max-w-sm'>
                                        <div className='text-sm text-[#ff4140]'>Se lancer - Micro-entrepreneur</div>
                                        <div className='font-black text-lg font-jekoblack'>{post.title.rendered}</div>
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
                                        <div className='text-sm text-[#ff4140]'>Se lancer - Micro-entrepreneur</div>
                                        <div className='font-black text-lg font-jekoblack'>{post.title.rendered}</div>
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
                                        <div className='text-sm text-[#ff4140]'>Se lancer - Micro-entrepreneur</div>
                                        <div className='font-black text-lg font-jekoblack'>{post.title.rendered}</div>
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
