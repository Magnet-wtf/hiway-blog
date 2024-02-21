import wpService from '@/lib/wordpress/wp-service';
import { use } from 'react';
import { PaginationLinks } from '@/components/pagination-links';
import Sidebar from '@/components/sidebar';
import MainPost from '@/components/main-post';
import PostList from '@/components/post-list';
import MobileHeader from '@/components/mobile-header';

interface HomePageParams {
    searchParams: {
        page?: string;
    };
}

export default function Home({ searchParams }: HomePageParams) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const { posts, totalPages } = use(wpService.getPosts({ page }));
    const categories = use(wpService.getCategories());
    const tags = use(wpService.getTags());

    return (
        <div className='w-full'>
            <div className={'flex'}>
                {/** Sidebar */}
                <Sidebar categories={categories} tags={tags} selectedCategory={null} selectedTag={null} />

                <div className={'flex flex-col p-8 w-full'}>
                    <MobileHeader />
                    {posts && posts.length > 0 && (
                        <>
                            <MainPost post={posts[0]} />

                            <PostList posts={posts} categories={categories} />
                        </>
                    )}

                    <PaginationLinks currentPage={page} totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}
