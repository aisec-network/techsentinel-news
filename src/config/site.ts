export interface SisterSite {
  domain: string;
  url: string;
  title: string;
  tagline: string;
}

export interface SiteConfig {
  domain: string;
  url: string;
  title: string;
  tagline: string;
  description: string;
  byline: string;
  language: string;
  locale: string;
  themeColor: string;
  brand: {
    accentHue: number;
  };
  social: {
    twitter?: string;
    rss: string;
  };
  email: {
    contact: string;
    abuse: string;
    editor: string;
  };
  newsletter: {
    enabled: boolean;
    provider?: "beehiiv" | "mailerlite" | "convertkit" | "buttondown" | "none";
    embedUrl?: string;
  };
  affiliate: {
    disclosure: string;
  };
  sister: SisterSite[];
  analytics: {
    plausibleDomain?: string;
    ga4Id?: string;
  };
}

export const portfolio: SisterSite[] = [
  { domain: "aisec.blog", url: "https://aisec.blog", title: "AI Sec", tagline: "Offensive AI security writeups" },
  { domain: "sentryml.com", url: "https://sentryml.com", title: "SentryML", tagline: "ML observability & MLOps" },
  { domain: "guardml.io", url: "https://guardml.io", title: "GuardML", tagline: "Defensive AI & guardrails" },
  { domain: "ai-alert.org", url: "https://ai-alert.org", title: "AI Alert", tagline: "AI incident & vulnerability tracker" },
  { domain: "neuralwatch.org", url: "https://neuralwatch.org", title: "NeuralWatch", tagline: "AI policy & ethics watchdog" },
  { domain: "techsentinel.news", url: "https://techsentinel.news", title: "Tech Sentinel", tagline: "Cybersecurity news, daily" },
];

export const siteConfig: SiteConfig = {
  domain: "techsentinel.news",
  url: "https://techsentinel.news",
  title: "Tech Sentinel",
  tagline: "Cybersecurity news, daily — breaches, CVEs, ransomware, threat actors, and the patches that matter.",
  description:
    "Daily cybersecurity news with a working-engineer's filter. Breach disclosures, CVEs that will actually get exploited, ransomware activity, threat actor profiles, and the operational patches that move the needle — sourced and dated.",
  byline: "Tech Sentinel Newsroom",
  language: "en",
  locale: "en_US",
  themeColor: "#0a0a0a",
  brand: { accentHue: 12 },
  social: { rss: "/rss.xml" },
  email: {
    contact: "hello@techsentinel.news",
    abuse: "abuse@techsentinel.news",
    editor: "editor@techsentinel.news",
  },
  newsletter: { enabled: false, provider: "none" },
  affiliate: {
    disclosure:
      "Some links in this post are affiliate links. We may earn a small commission at no extra cost to you. Editorial coverage is not influenced by affiliate relationships.",
  },
  sister: portfolio.filter((s) => s.domain !== "techsentinel.news"),
  analytics: {},
};
