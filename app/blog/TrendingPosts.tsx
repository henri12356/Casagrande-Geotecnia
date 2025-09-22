'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/app/types/blog";
import { FaFire } from "react-icons/fa"; // Using React Icons for a cleaner icon

interface TrendingPostsProps {
  posts: Blog[];
}

const TrendingPosts: React.FC<TrendingPostsProps> = ({ posts }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-xl animate-pulse">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <FaFire className="w-5 h-5 text-red-500 mr-2" />
        Trending Now
      </h3>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} passHref className="block">
            <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer group">
              <div className="flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden">
                <Image
                  src={post.imagen}
                  alt={post.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 text-base leading-tight">
                  {post.titulo}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(post.fecha).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingPosts;