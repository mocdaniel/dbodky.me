import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blogSchema');
  return rss({
    stylesheet: '/rss/styles.xsl',
    title: "Daniel's Blog",
    description: 'Thoughts on Containers, Clusters and the Cloud. Deep dives into cloud infrastructure, containerization, Kubernetes, and modern cloud native practices. Written from hands-on experience at work or in my homelab. ',
    site: context.site,
    items: blog.map(post => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.id}`
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
