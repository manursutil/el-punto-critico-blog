import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { Metadata } from "next";

export const revalidate = 30; // revalidate at most every 30 seconds

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: decodeURIComponent(params.slug),
  };
}

export default async function Page({ params }: Props) {
  const query = `
    *[_type == "blog" && slug.current == '${params.slug}'] {
      "currentSlug": slug.current,
      title,
      content,
      titleImage,
      _createdAt
    }[0]`;

  const data = await client.fetch(query);

  return (
    <main className="bg-background text-foreground font-serif">
      <div className="relative w-full h-[60vh]">
        <Image
          src={urlFor(data.titleImage).width(1600).url()}
          alt={data.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 px-4">
          <h1 className="text-white text-3xl md:text-5xl text-center font-bold">
            {data.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 py-12">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-muted-foreground hover:underline"
        >
          ← Volver
        </Link>

        <article className="prose prose-invert prose-2xl max-w-none space-y-6">
          <PortableText value={data.content} />
        </article>
      </div>
    </main>
  );
}
