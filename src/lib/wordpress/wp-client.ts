import { WP_REST_API_Post as Post, WP_REST_API_Categories, WP_REST_API_Category, WP_REST_API_Tag, WP_REST_API_Tags } from "wp-types";
 
const API_BASE_URL =
  process.env.WORDPRESS_API_BASE_URL ?? "https://hiway.blog/wp-json";
 
const API_VERSION = process.env.WORDPRESS_API_VERSION ?? "v2";
const BASE_URL = `${API_BASE_URL}/wp/${API_VERSION}/`;
 
const DEFAULT_POSTS_PARAMS = {
  per_page: 9,
  page: 1,
  search: "",
  slug: <string[]>[],
  // categories: <number[]>[],
  // tags: <number[]>[],
};
 
type GetPostsParams = Partial<typeof DEFAULT_POSTS_PARAMS>;

export interface PostWithMedia extends Post {
    mediaUrl: string;
}
 
export default class WpClient {
  constructor(
    private readonly username: string,
    private readonly password: string,
  ) {}
 
  async getPosts(params: Partial<typeof DEFAULT_POSTS_PARAMS> = {}): Promise<{
    posts: PostWithMedia[];
    totalPages: number;
  }> {
    if (!params.page) {
      params.per_page = 99;
    }
    
    const queryParams = this.queryString({
      ...DEFAULT_POSTS_PARAMS,
      ...params,
    });
 
    const url = `${BASE_URL}posts${queryParams}`;
    const response = await fetch(url);
    const totalPagesHeader = response.headers.get('X-WP-TotalPages');
    const totalPages = totalPagesHeader ? Number(totalPagesHeader) : 0;
    const posts = await response.json();

    const postsWithMedia = await Promise.all(
        posts.map(async (post: Post) => {
            const mediaUrl = await this.getMediaUrl(post.featured_media || 0);
            return {
                ...post,
                mediaUrl,
            };
        })
    );
 
    return {
      posts: postsWithMedia,
      totalPages,
    };
  }
 
  async getPost(id: number): Promise<Post> {
    const response = await fetch(`${BASE_URL}posts/${id}`);
 
    return response.json();
  }

  async getCategory(id: number): Promise<WP_REST_API_Category> {
    const response = await fetch(`${BASE_URL}categories/${id}`);
    return response.json();
  }

  async getTag(id: number): Promise<WP_REST_API_Tag> {
    const response = await fetch(`${BASE_URL}tags/${id}`);
    return response.json();
  }
 
  private getHeaders() {
    const auth = this.createWordpressBasicAuthHeader(
      this.username,
      this.password,
    );
 
    return {
      Authorization: auth,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async getMediaUrl(id: number): Promise<string> {
    const response = await fetch(`${BASE_URL}media/${id}`);
    const media = await response.json();
    return media.source_url;
  }

  async getCategories(): Promise<WP_REST_API_Category[]> {
    const response = await fetch(`${BASE_URL}categories`);
    return response.json();
  }

  async getTags(): Promise<WP_REST_API_Tag[]> {
    const response = await fetch(`${BASE_URL}tags`);
    return response.json();
  }
 
  private createWordpressBasicAuthHeader(username: string, password: string) {
    const buffer = Buffer.from(`${username}:${password}`, "binary");
    const encoded = buffer.toString("base64");
 
    return `Basic ${encoded}`;
  }
 
  private queryString(params: Record<string, string | string[] | number | number[]>) {
    const queryParams = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key].toString())}`)
      .join("&");
 
    return queryParams ? `?${queryParams}` : "";
  }
}