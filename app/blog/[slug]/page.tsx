import { fullBlog } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
      "currentSlug": slug.current,
      title,
      content,
      titleImage,
      _createdAt
    }[0]`;
  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <main className="bg-background text-foreground font-serif">
      {/* Hero Image */}
      <div className="relative w-full h-[60vh]">
        <Image
          src={urlFor(data.titleImage).width(1600).url()}
          alt={data.title}
          fill
          priority
          className="object-cover"
        />
        {/* Overlay Title */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 px-4">
          <h1 className="text-white text-3xl md:text-5xl text-center font-bold">
            {data.title}
          </h1>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-3 py-12">
        {/* Back button */}
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-muted-foreground hover:underline"
        >
          ← Volver
        </Link>

        {/* Article content */}
        <article className="prose prose-invert prose-lg max-w-none space-y-6">
          <PortableText value={data.content} />
        </article>
      </div>
    </main>
  );
}
