import { defineCollection, reference, z } from 'astro:content';

import { file, glob } from 'astro/loaders';

const authorSchema = defineCollection({
    loader: file('src/content/authors.json'),
    schema: z.object({
        name: z.string(),
        bio: z.string().optional(),
        avatar: z.string().optional(),
    }).strict(),
});

const tags = z.enum([
    'cloud native',
    'git',
    'grafana',
    'homelab',
    'kubernetes',
    'security',
    'tailscale',
]);

const talkTags = z.enum([
    'Alloy',
    'Ansible',
    'ArgoCD',
    'CI/CD',
    'Cilium',
    'Config Management',
    'Containers',
    'Docker',
    'eBPF',
    'Falco',
    'GitOps',
    'Grafana',
    'Helm',
    'Icinga2',
    'Kubernetes',
    'Monitoring',
    'OTel',
    'Personal Learnings',
    'Platform Engineering',
    'Security',
    'Site Reliability Engineering'
]);

export const conferences = z.enum([
    '90DaysOfDevOps - 2024 Community Edition',
    'Civo Navigate Tampa 2023',
    'Code Europe 2025',
    'DevOpsDays Amsterdam 2023',
    'DevOpsDays Amsterdam 2024',
    'DevOpsDays Amsterdam 2025',
    'DevOpsDays Zurich 2024',
    'IcingaCamp Berlin 2023',
    'KCD Czech & Slovak 2025',
    'KCD Munich 2024',
    'OpenInfra Day Berlin 2024',
    'Open Source Monitoring Conference 2022',
    'Open Source Monitoring Conference 2023',
    'Open Source Monitoring Conference 2024',
    'Open Source Monitoring Conference 2025',
    'OpenTechDay Grafana Edition 2025',
    'S2N 2025',
    'stackconf 2024',
]);

const talkSchema = defineCollection({
    loader: file('src/content/talks.json'),
    schema: z.object({
        title: z.string(),
        year: z.number(),
        tags: z.array(talkTags).default([]),
        type: z.enum(['Lightning Talk', 'Workshop', 'Talk']),
        conferences: z.array(conferences).default([]),
        excerpt: z.string().optional(),
        slides: z.string().url().optional(),
        recording: z.string().url().optional(),
    })
})

const blogSchema = defineCollection({
    loader: glob({
        pattern: '**/*.md',
        base: 'src/content/blog/',
    }),
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        excerpt: z.string().optional(),
        tags: z.array(tags).default([]),
        // UI fields
        cover: z.string().optional(), // URL to cover image, relative to /public
        coverImageAlt: z.string().optional(),
        author: reference('authorScheme'),
        readTime: z
            .number()
            .int()
            .positive()
            .optional()
            .describe('Estimated reading time in minutes'),
    }).strict(),
});


export const collections = { blogSchema, authorSchema, talkSchema };
