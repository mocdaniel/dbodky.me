import { launch } from 'puppeteer';
import fs from 'fs';


const posts = [
	// static pages
    {title: 'Home', desc: 'My website about containers, clusters, and the cloud.', id: 'home'},
	{title: 'My Work', desc: 'Browse my talks and workshops, including slides and recordings.', id: 'speaking'},
	{title: 'My Blog', desc: 'Thoughts about containers, clusters, and the cloud.', id: 'blog'},
	{title: 'About Me', desc: 'Who I am and what I am doing.', id: 'about'},

	// blog posts
	{title: 'Blog', desc: 'How to Reverse-Proxy Applications on Subpaths with Traefik', id: 'host-on-subpath-with-traefik'},
	{title: 'Blog', desc: 'Configuring SAML Authentication for Omni with Authentik', id: 'saml-authentication-for-omni-with-authentik'},
	{title: 'Blog', desc: 'Three Cloud Native Projects to Follow in 2024', id: 'three-cloud-native-projects-to-follow-2024'},
	{title: 'Blog', desc: 'The Good, the Better, and the Ugly - Signing Git Commits', id: 'why-to-sign-git-commits'},
];
const hiddenPath = [process.cwd(), 'src/pages/_og.astro'].join('/');
const visiblePath = [process.cwd(), 'src/pages/og.astro'].join('/');

(async () => {
	fs.renameSync(hiddenPath, visiblePath);

	const templatePath = "http://localhost:4321/og";

	const browser = await launch();
	const page = await browser.newPage();

	for (const post of posts) {
		const url = `${templatePath}?title=${encodeURIComponent(post.title)}&desc=${encodeURIComponent(post.desc)}`;
		await page.goto(url);
		await page.setViewport({ width: 1200, height: 630 });
		await page.screenshot({ path: `./public/og-images/${post.id}.png`, type: "png" });
	}

	await browser.close();

	fs.renameSync(visiblePath, hiddenPath);
})();