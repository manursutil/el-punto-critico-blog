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
            className="flex h-[160px] w-full flex-row items-center gap-4 rounded-xl bg-card p-4 text-card-foreground shadow-md border-none outline-none focus-visible:ring-transparent focus-visible:outline-none"
          >
            <Image
              src={urlFor(post.titleImage).url()}
              alt={post.title}
              width={120}
              height={120}
              quality={90}
              className="h-full w-[120px] rounded-md object-cover"
            />

            <div className="flex flex-col justify-between h-full overflow-hidden font-[Georgia]">
              <div>
                <h2 className="text-2xl font-semibold mb-1 truncate">
                  {post.title}
                </h2>
                <p className="text-lg text-muted-foreground line-clamp-2">
                  {post.SmallDescription}
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Escrito por:{" "}
                <span className="font-semibold">Manuel Rodríguez</span>
                <br />
              </p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
