import React, { useState } from "react";

const PostCreate = () => {
  const [postContent, setPostContent] = useState("");
  const [visibility, setVisibility] = useState("Public");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleVisibilityChange = () => {
    setVisibility(visibility === "Public" ? "Private" : "Public");
  };

  const handlePost = () => {
    console.log("Posting:", postContent);
    console.log("Images:", images);
    console.log("Videos:", videos);
    console.log("Attachments:", attachments);
    setPostContent("");
    setImages([]);
    setVideos([]);
    setAttachments([]);
  };

  const handleAddImage = () => {
    const newImage = "https://example.com/image.jpg";
    setImages([...images, newImage]);
  };

  const handleAddVideo = () => {
    const newVideo = "https://example.com/video.mp4";
    setVideos([...videos, newVideo]);
  };

  const handleAddAttachment = () => {
    const newAttachment = "https://example.com/document.pdf";
    setAttachments([...attachments, newAttachment]);
  };

  return (
    <div className="flex flex-col p-8 bg-white shadow-lg rounded-[30px] max-md:px-5">
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="flex items-start w-full max-md:max-w-full">
          <div className="flex flex-wrap flex-1 shrink gap-4 w-full basis-0 min-w-[240px] max-md:max-w-full">
            <div className="flex flex-wrap flex-1 shrink gap-4 items-center h-full basis-0 min-w-[240px] max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c49bd8541ae2e89ade10a1e674ba714e13aac0cb12abce8eba1d2ca760edb55?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                className="object-contain shrink-0 self-stretch my-auto aspect-square w-[68px]"
                alt="User avatar"
              />
              <div className="flex flex-col self-stretch justify-center w-32 my-auto">
                <div className="flex items-start w-full text-base font-semibold leading-loose text-neutral-900">
                  <div>Sushana Rios</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9597d64a68f76e60168163eb1df41b9de87f613fc1bce70a6a9c046463d312cc?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                    className="object-contain w-6 shrink-0 aspect-square"
                    alt="Verification badge"
                  />
                </div>
                <div className="text-sm leading-loose text-zinc-500">
                  Post to Anyone
                </div>
              </div>
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/06b905a42be2de12dc8259dc8ea4589d9c9b780ae866136df00bef627025e8c8?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              className="self-start object-contain w-10 shrink-0 aspect-square"
              alt="Options icon"
            />
          </div>
        </div>
        <div className="mt-6 text-base leading-loose text-neutral-900 max-md:max-w-full">
          What do you want to talk about?
        </div>
      </div>
      <textarea
        className="flex mt-8 w-full bg-white min-h-[266px] max-md:max-w-full p-4 border border-gray-300 rounded-md"
        value={postContent}
        onChange={handlePostContentChange}
        placeholder="Write your post here..."
        aria-label="Post content"
      />
      <div className="flex flex-wrap items-start w-full gap-8 mt-8 max-md:max-w-full">
        <button className="flex items-center gap-2 w-7" onClick={handleAddImage} aria-label="Add image">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/df7468877dc71eacb0a78792ace13cd0c7a167655bb0c90af35166e915e3e50a?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
            className="self-stretch object-contain my-auto w-7 aspect-square"
            alt="Add image"
          />
        </button>
        <button className="flex items-center gap-2 w-7" onClick={handleAddVideo} aria-label="Add video">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7ce749db47e2ae84386830fff8e56716e801a12300de04db9328b002c9efc9e?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
            className="self-stretch object-contain my-auto w-7 aspect-square"
            alt="Add video"
          />
        </button>
        <button className="flex items-center gap-2" onClick={handleAddAttachment} aria-label="Add attachment">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/de02208101669ae635d2a123eac8536c1ac01128a08a88232c325a6cdeb9e751?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
            className="self-stretch object-contain my-auto w-7 aspect-square"
            alt="Add attachment"
          />
        </button>
      </div>
      <div className="flex flex-col justify-center w-full mt-8 border-0 border-gray-200 border-solid max-md:max-w-full">
        <div className="flex h-px bg-gray-200 shrink-0 max-md:max-w-full" />
      </div>
      <div className="flex flex-wrap items-center justify-between w-full gap-10 mt-8 max-md:max-w-full">
        <div className="flex gap-2 items-start self-stretch py-2.5 my-auto">
          <div className="flex flex-col justify-center">
            <div className="flex items-start justify-center gap-1">
              <div className="text-lg font-medium leading-8 tracking-tight text-neutral-900">
                <span className="text-neutral-900">Visible To: </span>
                <span className="font-bold leading-8 text-neutral-900">
                  {visibility}
                </span>
              </div>
              <button
                className="flex gap-2.5 items-start pt-2 w-5"
                onClick={handleVisibilityChange}
                aria-label="Change visibility"
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b7160bf34059351db882bfde1db46846d9f021d91bd143691e45e8f61437f8f?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                  className="object-contain w-5 aspect-square"
                  alt="Change visibility"
                />
              </button>
            </div>
            <div className="text-sm leading-loose text-zinc-500">
              {visibility === "Public"
                ? "Show to everyone in web"
                : "Only visible to you"}
            </div>
          </div>
        </div>
        <div className="flex gap-8 justify-center self-stretch my-auto w-[193px]">
          <div className="flex items-center gap-2 my-auto w-7">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffa576fca89d87e46c8c5d3735718304a84d35cc31cd8d0ee45fa9f3aed3bd07?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              className="self-stretch object-contain my-auto w-7 aspect-square"
              alt="Post icon"
            />
          </div>
          <button
            className="self-stretch flex-1 h-full gap-2 py-5 text-2xl font-medium leading-loose text-center text-white shrink pr-11 pl-11 whitespace-nowrap bg-sky-400 rounded-xl max-md:px-5"
            onClick={handlePost}
            // disabled={!postContent.trim()}
            aria-label="Post"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreate;