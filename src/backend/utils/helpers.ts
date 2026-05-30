import { Product, BlogPost } from '../types';

/**
 * Formats a numeric price into a standard currency string (e.g. 4.8 -> "$4.80").
 */
export const formatPrice = (price: number | string): string => {
  if (typeof price === 'string') {
    return price.startsWith('$') ? price : `$${parseFloat(price).toFixed(2)}`;
  }
  return `$${price.toFixed(2)}`;
};

/**
 * Formats a Date/ISO string to a human-readable journal format (e.g., "Oct 12, 2026").
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (err) {
    return dateString;
  }
};

/**
 * Helper to standardise and map product items retrieved from Supabase to match frontend mock keys.
 */
export const mapProductFromDB = (item: any): Product => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    category: item.category,
    image_url: item.image_url,
    badge: item.badge || undefined,
    available: item.available,
    stock_quantity: item.stock_quantity || 0,
    created_at: item.created_at
  };
};

/**
 * Helper to standardise and map blog posts retrieved from Supabase.
 */
export const mapBlogPostFromDB = (post: any): BlogPost => {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    image_url: post.image_url,
    author: post.author,
    tags: post.tags || [],
    published: post.published,
    created_at: post.created_at
  };
};
