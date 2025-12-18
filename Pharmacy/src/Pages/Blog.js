import React from "react";
import { useEffect } from "react";

function BlogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = [
    {
      title: "The Future of Pharma Logistics",
      summary:
        "Explore how AI, cold chain tech, and smart tracking are transforming pharmaceutical delivery worldwide.",
      link: "#",
    },
    {
      title: "Top 5 Compliance Tips for Pharmacies",
      summary:
        "Avoid costly mistakes with these essential compliance strategies every pharmacy should follow.",
      link: "#",
    },
    {
      title: "Eco-Friendly Packaging in Healthcare",
      summary:
        "Discover how sustainable packaging is reshaping the medical supply chain and reducing waste.",
      link: "#",
    },
    {
      title: "How to Choose the Right Medical Equipment",
      summary:
        "A practical guide for clinics and hospitals to select reliable, cost-effective medical tools.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50 px-4 py-10 flex flex-col items-center">
      {/* Hero Section */}
      <div className="max-w-5xl w-full text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">
          CarePharma Blog
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl">
          Insights, updates, and expert advice from the heart of the healthcare
          supply world.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-700 mb-4">{post.summary}</p>
            <a
              href={post.link}
              className="inline-block text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
