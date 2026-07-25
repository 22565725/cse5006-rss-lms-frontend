"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PostDetail from "@/Components/feeds/PostDetail";
import { posts } from "@/data/posts";
import type { Post } from "@/lib/types";

export default function PostPage() {
  const params = useParams();
  const id = Number(params?.id);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("myData");
    let saved: Post[] = [];
    if (stored) {
      try {
        saved = JSON.parse(stored) as Post[];
      } catch (error) {
        console.error("Could not read saved posts:", error);
      }
    }
    setPost([...saved, ...posts].find((item) => item.id === id) ?? null);
    setIsLoaded(true);
  }, [id]);

  if (!isLoaded) {
    return (
      <main className="mx-auto w-full max-w-5xl flex-1 p-4">
        <p className="text-muted">Loading…</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="mx-auto w-full max-w-5xl flex-1 p-4">
        <h1 className="mb-2 text-2xl font-semibold text-foreground">
          Post not found
        </h1>
        <Link href="/feeds" className="text-accent underline">
          Back to all feeds
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 p-4">
      <PostDetail post={post} />
    </main>
  );
}