import { supabase } from '../database/supabase';
import { ServiceResponse, BlogPost } from '../types';

/**
 * Fetches all published blog posts.
 */
export const getBlogPosts = async (): Promise<ServiceResponse<BlogPost[]>> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data as BlogPost[] };
  } catch (err: any) {
    console.error('Fetch Blog Posts Error:', err);
    return { success: false, message: err.message || 'Could not load blog posts.' };
  }
};

/**
 * Fetches a single blog post by its URL slug.
 */
export const getBlogPostBySlug = async (slug: string): Promise<ServiceResponse<BlogPost>> => {
  if (!slug) {
    return { success: false, message: 'Slug is required.' };
  }

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return { success: true, data: data as BlogPost };
  } catch (err: any) {
    console.error(`Fetch Blog Post By Slug (${slug}) Error:`, err);
    return { success: false, message: err.message || 'Could not locate the requested article.' };
  }
};
