"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import type { Post } from "@/lib/types";

interface FeedListProps {
  posts: Post[];
}

export default function FeedList({ posts }: FeedListProps) {
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("myData");
    if (!stored) return;
    try {
      setSavedPosts(JSON.parse(stored) as Post[]);
    } catch (error) {
      console.error("Could not read saved posts:", error);
    }
  }, []);

  const allPosts = [...savedPosts, ...posts];

  const filteredPosts = searchQuery.trim()
    ? allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allPosts;

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="feed-search" className="sr-only">
        Search posts by title
      </label>
      <input
        id="feed-search"
        type="search"
        placeholder="Search posts…"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground"
      />

      <p className="text-sm text-muted" aria-live="polite">
        Showing {filteredPosts.length} of {allPosts.length} posts
      </p>

      {filteredPosts.length === 0 ? (
        <p className="text-muted">No posts match your search.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <PostCard
                post={post}
                isExpanded={expandedId === post.id}
                onToggle={() =>
                  setExpandedId(expandedId === post.id ? null : post.id)
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
