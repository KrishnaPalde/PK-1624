import React from "react";

const BlogPost = ({ image, author, date, title, excerpt, tags }) => {
  return (
    <article className="flex flex-col grow max-md:mt-8">
      <img
        loading="lazy"
        src={image}
        alt={title}
        className="w-full aspect-[1.59]"
      />
      <div className="mt-8 text-sm font-semibold leading-5 text-violet-700">
        {author} • {date}
      </div>
      <div className="flex gap-4 mt-3">
        <h2 className="flex-1 text-2xl font-semibold leading-8 text-zinc-900">
          {title}
        </h2>
        <div className="flex justify-center items-center self-start pt-1 pb-0.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd6a10a9684ba64ac2587abd49cc16f9dbb7b4b67ae7f4ca4c8a94ccc5fed255?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
            alt=""
            className="w-6 aspect-square"
          />
        </div>
      </div>
      <p className="mt-3 text-base leading-6 text-gray-500">{excerpt}</p>
      <div className="flex gap-2 pr-20 mt-6 text-sm font-medium leading-5 text-center whitespace-nowrap max-md:pr-5">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-2.5 py-0.5 rounded-2xl ${tag.className}`}
          >
            {tag.name}
          </span>
        ))}
      </div>
    </article>
  );
};

export default BlogPost;
