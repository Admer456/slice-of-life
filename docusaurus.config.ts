import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: "Admer's personal website",
  tagline: 'Foxes are cool',
  favicon: 'img/fox_head.png',

  // Set the production url of your site here
  url: 'https://microfox.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'Admer456',
  projectName: 'slice-of-life',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  trailingSlash: false,

  //i18n: {
  //  defaultLocale: 'en',
  //  locales: ['en'],
  //},

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts'
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 'ALL'
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social_card.png',
    navbar: {
      title: 'microfox.dev',
      logo: {
        alt: "It's me!",
        src: 'img/fox_head.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Guides',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left'
        },
        {
          href: 'https://github.com/Admer456/slice-of-life',
          label: 'Website source on GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Social media',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/tneyeuhgxH'
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@Admer456'
            },
            {
              label: 'Mastodon',
              href: 'https://tech.lgbt/@admer'
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/admer-%C5%A1uko-7aa047205/'
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/theAdmer456'
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Guides',
              to: '/docs'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Admer456',
            },
          ],
        },
      ],
      copyright: `Copyright © 2023-${new Date().getFullYear()} Admer Šuko. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['csharp']
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
