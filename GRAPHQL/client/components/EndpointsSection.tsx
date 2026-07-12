"use client";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`;

export default function EndpointsSection() {
  const { loading, error, data } = useQuery(GET_POSTS);

  return (
    <section className="px-8 py-16 border-t border-slate-200">
      <h2 className="text-2xl font-bold mb-6">Fetched Endpoint Data</h2>

      {loading && <p className="text-slate-500">Loading data…</p>}

      {error && (
        <p className="text-red-500">
          Error fetching data: {error.message}
        </p>
      )}

      {data && (
        <div className="grid md:grid-cols-3 gap-4">
          {data.posts.data.map((post: { id: string; title: string; body: string }) => (
            <div
              key={post.id}
              className="bg-white rounded-lg p-5 border border-slate-200 shadow-sm"
            >
              <p className="text-xs text-slate-500 mb-2">ID: {post.id}</p>
              <h3 className="font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-3">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}