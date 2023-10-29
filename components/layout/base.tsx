"use client";

// Base layout is built using builder.io
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";

interface BuilderPageProps {
  content: any;
}

export function RenderBuilderContent({ content }: BuilderPageProps) {
  // Preview
  const preview = useIsPreviewing();
  // Render content if it exists
  if (content || preview) {
    return <BuilderComponent content={content} model="page" apiKey={process.env.NEXT_PUBLIC_BUILDER_API_KEY!} />;
  }
  return <DefaultErrorPage statusCode={404} /> || null;
}
