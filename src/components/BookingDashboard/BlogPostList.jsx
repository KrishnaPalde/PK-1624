import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import BlogCard from "./BlogCard";

const BlogPostList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); 
  const postsPerPage = 3; 

  const blogPosts = [
    {
              image:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/6df7d0cd4d9e99bc73e7714e523371c7ca028d6f7247ccdae45e863dd14edae9?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
              author: "Alec Whitten",
              date: "1 Jan 2023",
              title: "Bill Walsh leadership lessons",
              content:
                "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
              tags: [
                { name: "Hotel", color: "violet" },
                { name: "Destination", color: "indigo" },
              ],
            },
            {
              image:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/a739e6bb016f0d5692ac73292d9f2c73ed225f481d54bc50ed1f01850c319adb?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
              author: "Demi Wilkinson",
              date: "1 Jan 2023",
              title: "Experience the Magic of Dehradhun",
              content:
                "Mental models are simple expressions of complex processes or relationships.",
              tags: [
                { name: "Tourists", color: "sky" },
                { name: "Hotel", color: "indigo" },
                { name: "Destination", color: "orange" },
              ],
            },
            {
              image:
                "https://cdn.builder.io/api/v1/image/assets/TEMP/ae98f8d98cd0db24295a7e15d028335bc65096fbd3a5a5e856e4ecfa3eb22b0e?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
              author: "Alec Whitten",
              date: "1 Jan 2023",
              title: "Stay that are experience is unique for you",
              content:
                "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
              tags: [
                { name: "Hotel", color: "violet" },
                { name: "Destination", color: "indigo" },
              ],
            },
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="flex flex-col rounded-none">
      <div className="flex flex-col w-full px-5 pt-5 bg-white pb-14 rounded-3xl md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row gap-10 self-start w-full max-w-[1053px]">
          <div className="grow shrink self-start text-2xl font-semibold text-slate-700 w-[117px] md:w-auto">
            All blog posts
          </div>
          <div className="flex gap-4 my-auto text-base whitespace-nowrap text-slate-400">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="flex items-start gap-3 text-sm font-medium text-white">
            <div
              onClick={() => navigate('/admin/createblog')}
              className="cursor-pointer gap-2 self-stretch px-6 py-2.5 bg-sky-400 rounded-lg hover:bg-sky-500 transition-colors"
            >
              Write new blog
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex flex-wrap justify-between gap-5">
            {paginatedPosts.map((post, index) => (
              <div
                key={index}
                className="flex flex-col w-full md:w-[calc(50%-1.25rem)] lg:w-[calc(33.33%-1.25rem)]"
              >
                <BlogCard {...post} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-10 justify-between items-center self-center pt-5 mt-11 w-full text-sm font-medium leading-none text-gray-500 whitespace-nowrap border-t border-gray-200 max-w-[1037px]">
          <div className="flex items-start self-stretch my-auto cursor-pointer" onClick={() => handlePageChange(currentPage - 1)}>
            <div className="flex items-center justify-center gap-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb26818bab90918f6077f17c625769ebc6b05d1b416f312dae78c46fffcd0f2d?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                className="self-stretch object-contain w-5 my-auto shrink-0 aspect-square"
                alt="Previous arrow"
              />
              <div className="self-stretch my-auto">Previous</div>
            </div>
          </div>
          <div className="flex gap-0.5 items-start self-stretch my-auto text-center min-w-auto">
            {[...Array(totalPages).keys()].map((_, index) => {
              const page = index + 1;
              return (
                <div
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`flex overflow-hidden flex-col w-10 rounded-lg cursor-pointer ${
                    page === currentPage
                      ? "items-center h-10 text-violet-500 bg-purple-50"
                      : ""
                  } hover:bg-gray-200 transition-colors`}
                >
                  <div className="self-stretch px-3 py-2.5 rounded-lg min-h-[40px]">
                    {page}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-start self-stretch my-auto cursor-pointer" onClick={() => handlePageChange(currentPage + 1)}>
            <div className="flex items-center justify-center gap-2">
              <div className="self-stretch my-auto">Next</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/48daf40254c38c3eb61e35dfbc3a34403833eed9f7d5bfa57bf4786bb651451c?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                className="self-stretch object-contain w-5 my-auto shrink-0 aspect-square"
                alt="Next arrow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostList;