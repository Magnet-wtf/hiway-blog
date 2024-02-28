'use client';

import Link from 'next/link';
import { isMobile } from 'react-device-detect';
import PostSummary from './post-summary';
import DialogForm from './form-dialog';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { PostWithMedia } from '@/lib/wordpress/wp-client';
import { useSetAtom } from 'jotai';
import { openDialog } from '@/store';

export default function PostSidebar({ post }: { post: PostWithMedia }) {
    const setOpen = useSetAtom(openDialog);
    if (isMobile) {
        return null;
    }

    return (
        <div className={'flex flex-col left-0 pl-12 pr-4 pt-8 w-[350px] border-r'}>
            <div className={'text-xl font-jekobold leading-[52.5px]'}>Sommaire</div>

            <PostSummary post={post} />

            <Button
                onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                }}
                variant='outline'
                className='rounded-full border-[#FF4140] border-2 mt-8 text-[#FF4140] font-jekobold'
            >
                <Download className='h-4 w-4 mr-2 text-[#FF4140]' />
                Télécharger cet article en PDF
            </Button>

            <div className='mt-12 flex flex-col'>
                <div className='font-bold'>Partager cet article</div>
                <div className='flex space-x-4 pt-4'>
                    <Link href={`https://www.linkedin.com/shareArticle?url=${window.location}&title=${post.title.rendered}`}>
                        <svg width='20' height='21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M18.551.238H1.508C.692.238 0 .882 0 1.677v17.12c0 .796.454 1.44 1.27 1.44h17.043c.817 0 1.687-.644 1.687-1.44V1.678c0-.795-.632-1.44-1.449-1.44zM7.62 7.857h2.692v1.372h.03c.41-.74 1.623-1.491 3.122-1.491 2.877 0 3.68 1.527 3.68 4.357v5.286h-2.857v-4.765c0-1.267-.506-2.378-1.689-2.378-1.436 0-2.12.972-2.12 2.568v4.575H7.618V7.857zM2.857 17.38h2.857V7.857H2.857v9.524zM6.071 4.523a1.785 1.785 0 11-3.57.002 1.785 1.785 0 013.57-.002z'
                                fill='#000'
                            ></path>
                        </svg>
                    </Link>
                    <Link href={`https://twitter.com/intent/tweet?url=${window.location}&text=${post.title.rendered}&via=${'hiwayfreelance'}`}>
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
                    <Link href={`https://www.facebook.com/sharer.php?u=${window.location}`}>
                        <svg width='21' height='21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                fill-rule='evenodd'
                                clip-rule='evenodd'
                                d='M0 10.288c0 4.975 3.618 9.095 8.392 9.95l.06-.049c-.004 0-.007 0-.01-.002v-7.085H5.93v-2.814h2.512V8.077c0-2.513 1.608-3.92 3.92-3.92.703 0 1.507.1 2.21.201v2.563h-1.306c-1.206 0-1.507.603-1.507 1.407v1.96h2.663l-.452 2.814h-2.211v7.085a9.81 9.81 0 01-.092.017l.042.034c4.773-.855 8.392-4.975 8.392-9.95C20.1 4.76 15.578.238 10.05.238 4.522.238 0 4.76 0 10.288z'
                                fill='#000'
                            ></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
