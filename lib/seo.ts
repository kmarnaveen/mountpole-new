import type { Metadata } from "next";

export const siteConfig = {
  name: "MountPole",
  url: "https://mountpole.com",
  description:
    "MountPole is a B2B wholesale electronics distributor supplying smartphones, tablets, audio devices, displays, accessories, and liquidation inventory across Canada and the United States.",
  phoneDisplay: "+1 437 661 3501",
  phoneHref: "+14376613501",
  emails: {
    info: "info@mountpole.com",
    sales: "sales@mountpole.com",
    support: "support@mountpole.com",
    partners: "partners@mountpole.com",
  },
  canadaOffice: {
    streetAddress: "4920 Tomken Rd, Unit 4",
    addressLocality: "Mississauga",
    addressRegion: "ON",
    postalCode: "L4W 1J8",
    addressCountry: "CA",
  },
} as const;

type MetadataType = "website" | "article";

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: MetadataType;
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(
    path.startsWith("/") ? path : `/${path}`,
    siteConfig.url,
  ).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
  image,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const images = image ? [absoluteUrl(image)] : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      ...(images ? { images } : {}),
    },
  };
}
