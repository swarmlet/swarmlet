module.exports = {
  title: "Swarmlet",
  tagline: "A self-hosted, open-source Platform as a Service",
  url: "https://swarmlet.dev",
  baseUrl: "/",
  favicon: "favicon.ico",
  projectName: "swarmlet",
  themeConfig: {
    navbar: {
      title: "Swarmlet",
      logo: {
        alt: "Swarmlet Logo",
        src: "img/logo.png"
      },
      links: [
        {
          to: "docs/getting-started/introduction",
          activeBasePath: "docs",
          label: "Docs",
          position: "left"
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: "https://github.com/woudsma/swarmlet",
          label: "GitHub",
          position: "left"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "docs/getting-started/introduction"
            }
          ]
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus"
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus"
            }
          ]
        },
        {
          title: "Social",
          items: [
            {
              label: "Blog",
              to: "blog"
            },
            {
              label: "GitHub",
              href: "https://github.com/woudsma/swarmlet"
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus"
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Swarmlet.`
    }
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/woudsma/swarmlet/edit/master/website/"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};

