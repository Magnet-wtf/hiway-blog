import { use } from 'react';
import { notFound } from 'next/navigation';

import wpService from '@/lib/wordpress/wp-service';
import PostSidebar from '@/components/post-sidebar';
import PostContent from '@/components/post-content';

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

    const { posts: allPosts } = use(wpService.getPosts());

    const post = posts ? posts[0] : null;

    const tag = use(wpService.getTag((post && post.tags && post?.tags[0]) || 0));
    const category = use(wpService.getCategory((post && post.categories && post?.categories[0]) || 0));

    const filteredPosts = allPosts.filter((post) => post.categories?.includes(category.id));

    if (!post) {
        notFound();
    }

    return (
        <div className={'w-full'}>
            <div className={'flex'}>
                {/** Sidebar */}
                <PostSidebar post={post} />

                <PostContent post={post} tag={tag} category={category} filteredPosts={filteredPosts} />
            </div>
        </div>
    );
}

export default PostPage;
