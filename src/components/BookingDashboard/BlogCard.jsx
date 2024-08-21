import React from "react";

const BlogCard = ({ image, author, date, title, content, tags }) => {
  return (
    <div className="flex flex-col w-full bg-white rounded-3xl">
      <img
        loading="lazy"
        src={image}
        className="object-contain w-full rounded-3xl aspect-[1.46]"
        alt={title}
      />
      <div className="flex flex-col mt-8 w-full">
        <div className="flex flex-col w-full">
          <div className="text-sm font-semibold leading-none text-violet-700">
            {author} • {date}
          </div>
          <div className="flex gap-4 items-start mt-3 w-full">
            <div className="flex-1 shrink text-2xl font-semibold leading-8 basis-0 text-zinc-900">
              {title}
            </div>
            <div className="flex flex-col pt-1 w-6">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd6a10a9684ba64ac2587abd49cc16f9dbb7b4b67ae7f4ca4c8a94ccc5fed255?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                className="object-contain w-6 aspect-square"
                alt="Icon"
              />
            </div>
          </div>
          <div className="mt-3 text-base leading-6 text-gray-500">
            {content}
          </div>
        </div>
        <div className="flex gap-2 items-start mt-6 w-full text-sm font-medium leading-none text-center whitespace-nowrap">
          {tags.map((tag, index) => (
            <div
              key={index}
              className={`flex items-start text-${tag.color}-700 bg-blend-multiply`}
            >
              <div
                className={`self-stretch px-2.5 py-0.5 bg-${tag.color}-50 rounded-2xl`}
              >
                {tag.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
