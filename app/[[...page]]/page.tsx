import React from "react";
import { builder } from "@builder.io/sdk";
import Head from "next/head";
import { RenderBuilderContent } from "@/components/layout/base";

// Builder Public API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

export async function generateMetadata(props: PageProps) {
  const content = await getContent(props);
  return {
    title: content?.data.title,
  };
}

async function getContent(props: PageProps) {
  const content = await builder
    // Get the page content from Builder with the specified options
    .get("page", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
      // Set prerender to false to return JSON instead of HTML
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise();

  return content;
}

export default async function Page(props: PageProps) {
  const content = await getContent(props);
  return (
    <>
      <RenderBuilderContent content={content} />
    </>
  );
}
