'use strict';

/**
 * Content workflow middleware
 * Handles draft/publish workflow and content validation
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Only apply to content types with draft/publish
    const contentTypes = [
      'api::blog-post.blog-post',
      'api::news-item.news-item',
    ];
    const isContentType = contentTypes.some(type =>
      ctx.request.url.includes(type.split('::')[1].split('.')[0])
    );

    if (!isContentType) {
      return await next();
    }

    // Handle POST and PUT requests
    if (['POST', 'PUT'].includes(ctx.request.method)) {
      const { data } = ctx.request.body;

      // Validate content before saving
      if (data) {
        // Check for required SEO fields if publishing
        if (data.publishedAt && !data.seo) {
          return ctx.badRequest(
            'SEO information is required for published content'
          );
        }

        // Auto-generate excerpt if not provided
        if (!data.excerpt && data.content) {
          const plainText = data.content.replace(/<[^>]*>/g, '');
          data.excerpt =
            plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');
        }

        // Set default meta title if not provided
        if (data.seo && !data.seo.metaTitle && data.title) {
          data.seo.metaTitle = data.title;
        }

        // Set default meta description if not provided
        if (data.seo && !data.seo.metaDescription && data.excerpt) {
          data.seo.metaDescription = data.excerpt;
        }
      }
    }

    await next();
  };
};
