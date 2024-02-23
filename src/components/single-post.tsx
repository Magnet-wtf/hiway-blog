'use client';

import { PostWithMedia } from '@/lib/wordpress/wp-client';
import { WP_REST_API_Term } from 'wp-types';
import PostContent from './post-content';
import PostSidebar from './post-sidebar';
import { useRef } from 'react';

export default function SinglePost({
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
    
    return (
        <div className={'flex'}>
            {/** Sidebar */}
            <PostSidebar post={post} />

            <PostContent post={post} tag={tag} category={category} filteredPosts={filteredPosts} />
        </div>
    );
}
