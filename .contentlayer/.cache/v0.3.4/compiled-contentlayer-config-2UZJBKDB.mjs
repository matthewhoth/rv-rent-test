// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// src/configuration.ts
var production = process.env.NODE_ENV === "production";
var configuration = {
  site: {
    name: "RVRENTPRO",
    description: "Rent Pro - Our Software",
    themeColor: "#ffffff",
    themeColorDark: "#0a0a0a",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "RVRENTPRO",
    twitterHandle: "",
    githubHandle: "",
    language: "en",
    convertKitFormId: "",
    locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE
  },
  auth: {
    // ensure this is the same as your Supabase project. By default - it's true
    requireEmailConfirmation: process.env.NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION === "true",
    // NB: Enable the providers below in the Supabase Console
    // in your production project
    providers: {
      emailPassword: true,
      phoneNumber: false,
      emailLink: false,
      oAuth: ["google"]
    }
  },
  production,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  enableThemeSwitcher: true,
  paths: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    signInMfa: "/auth/verify",
    onboarding: `/onboarding`,
    appPrefix: "/dashboard",
    appHome: "/dashboard",
    authCallback: "/auth/callback",
    settings: {
      profile: "settings/profile",
      authentication: "settings/profile/authentication",
      email: "settings/profile/email",
      password: "settings/profile/password"
    }
  },
  email: {
    host: "",
    port: 587,
    user: "",
    password: "",
    senderAddress: "RVRentPro Team <info@rentpro.dev>"
  },
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN
  },
  stripe: {
    products: [
      {
        name: "Basic",
        description: "Description of your Basic plan",
        badge: `Up to 20 users`,
        features: [
          "Basic Reporting",
          "Up to 20 users",
          "1GB for each user",
          "Chat Support"
        ],
        plans: [
          {
            name: "Monthly",
            price: "$9",
            stripePriceId: "price_1LfXGaI1i3VnbZTq7l3VgZNa"
          },
          {
            name: "Yearly",
            price: "$90",
            stripePriceId: "basic-plan-yr"
          }
        ]
      },
      {
        name: "Pro",
        badge: `Most Popular`,
        recommended: true,
        description: "Description of your Pro plan",
        features: [
          "Advanced Reporting",
          "Up to 50 users",
          "5GB for each user",
          "Chat and Phone Support"
        ],
        plans: [
          {
            name: "Monthly",
            price: "$29",
            stripePriceId: "pro-plan-mth"
          },
          {
            name: "Yearly",
            price: "$200",
            stripePriceId: "pro-plan-yr"
          }
        ]
      },
      {
        name: "Premium",
        description: "Description of your Premium plan",
        badge: ``,
        features: [
          "Advanced Reporting",
          "Unlimited users",
          "50GB for each user",
          "Account Manager"
        ],
        plans: [
          {
            name: "",
            price: "Contact us",
            stripePriceId: "",
            label: `Contact us`,
            href: `/contact`
          }
        ]
      }
    ]
  }
};
var configuration_default = configuration;

// contentlayer.config.js
var siteUrl = configuration_default.site.siteUrl;
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    live: {
      type: "boolean",
      description: "Whether the post is live or not",
      required: true,
      default: false
    },
    image: {
      type: "string",
      description: "The path to the cover image"
    },
    description: {
      type: "string",
      description: "The description of the post"
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${getSlug(post._raw.sourceFileName)}`
    },
    readingTime: {
      type: "number",
      resolve: (post) => calculateReadingTime(post.body.raw)
    },
    slug: {
      type: "string",
      resolve: (post) => getSlug(post._raw.sourceFileName)
    },
    structuredData: {
      type: "object",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.date,
        description: doc.description,
        image: [siteUrl, doc.image].join(""),
        url: [siteUrl, "blog", doc._raw.flattenedPath].join("/"),
        author: {
          "@type": "Organization",
          name: configuration_default.site.name
        }
      })
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "src/content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"]
          }
        }
      ]
    ]
  }
});
function calculateReadingTime(content) {
  const wordsPerMinute = 235;
  const numberOfWords = content.split(/\s/g).length;
  const minutes = numberOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}
function getSlug(fileName) {
  return fileName.replace(".mdx", "");
}
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-2UZJBKDB.mjs.map
