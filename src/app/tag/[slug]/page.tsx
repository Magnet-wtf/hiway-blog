import { use } from 'react';
import { notFound } from 'next/navigation';

import wpService from '@/lib/wordpress/wp-service';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PaginationLinks } from '@/components/pagination-links';
import he from 'he';
import Sidebar from '@/components/sidebar';
import MobileHeader from '@/components/mobile-header';
import MainPost from '@/components/main-post';
import PostList from '@/components/post-list';

interface PostPageParams {
    params: {
        page: string;
        slug: number;
    };
}

function TagsPage({ params }: PostPageParams) {
    const { posts, totalPages } = use(wpService.getPosts());
    const categories = use(wpService.getCategories());
    const tags = use(wpService.getTags());

    const filteredPosts = posts ? posts.filter((post) => post.tags?.includes(Number(params.slug))) : [];
    const selectedTag = tags ? tags.find((tag) => tag.id === Number(params.slug)) : null;

    return (
        <div className='w-full'>
            <div className={'flex'}>
                {/** Sidebar */}
                <Sidebar categories={categories} tags={tags} selectedTag={selectedTag || null} selectedCategory={null} />

                <div className={'flex flex-col p-8 w-full'}>
                    <MobileHeader />

                    {filteredPosts && filteredPosts.length > 0 && <MainPost post={filteredPosts[0]} />}
                    {filteredPosts && filteredPosts.length > 1 && <PostList posts={filteredPosts} categories={categories} />}
                </div>
            </div>
        </div>
    );
}

export default TagsPage;
