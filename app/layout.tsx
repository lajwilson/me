import "@/styles/globals.css";

export async function generateMetadata() {
  const { data } = await getSiteSettings();
  return {
    title: {
      template: `${data?.settings.name} | %s`,
      default: data?.settings.name,
    },
  };
}

async function getSiteSettings() {
  // Builder.io settings
  const response = await fetch("https://builder.io/api/v2/admin", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.BUILDER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          settings
          id
          models {
            id
            name
          }
        }
      `,
    }),
  });
  const data = await response.json();
  return data;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { data } = await getSiteSettings();
  console.log(data);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
