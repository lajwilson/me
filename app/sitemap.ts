import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://lloydwilson.me",
      lastModified: new Date(),
    },
    {
      url: "https://lloydwilson.me/about",
      lastModified: new Date(),
    },
    {
      url: "https://lloydwilson.me/blog",
      lastModified: new Date(),
    },
  ];
}
