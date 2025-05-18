import { Card } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 30; // revalidate at most every 30 seconds

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
    SmallDescription,
    "currentSlug": slug.current,
    titleImage
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="grid gap-6 mt-6">
      {data.map((post, idx) => (
        <Link key={idx} href={`/blog/${post.currentSlug}`} className="block">
          <Card
            key={idx}
            className="flex flex-col md:flex-row w-full items-start md:items-center gap-2 md:gap-4 rounded-xl bg-card p-2 md:p-4 text-card-foreground shadow-md border-none outline-none focus-visible:ring-transparent focus-visible:outline-none"
          >
            <Image
              src={urlFor(post.titleImage).width(1200).url()}
              alt={post.title}
              width={1200}
              height={800}
              quality={90}
              className="w-full h-[140px] md:w-[120px] md:h-full rounded-md object-cover"
            />

            <div className="flex flex-col justify-between w-full font-[Georgia]">
              <div>
                <h2 className="text-lg md:text-2xl font-semibold mb-1 truncate">
                  {post.title}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  {post.SmallDescription}
                </p>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mt-2">
                Escrito por:{" "}
                <span className="font-semibold">Manuel Rodríguez</span>
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
