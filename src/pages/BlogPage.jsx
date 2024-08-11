import React from "react";
import Header from "../components/Header";
import BlogPost from "../components/BlogPost";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";

const BlogPage = () => {
  const featuredPost = {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0329f25c80f0bcd6092e1cf9dc062460b6e727029bd8f0db391c198af0ab2b47?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
    author: "Olivia Rhye",
    date: "1 Jan 2023",
    title: "Discover How Mindfulness Can Reduce Travel Anxiety",
    excerpt:
      "Structured gripped tape invisible moulded cups for sauppor firm hold strong powermesh front liner sport detail. Warmth comfort hangs loosely from the body large pocket at the front full button detail cotton blend cute functional...",
    content: `Structured gripped tape invisible moulded cups for sauppor firm hold strong powermesh front liner sport detail. Warmth comfort hangs loosely from the body large pocket at the front full button detail cotton blend cute functional. Bodycon skirts bright primary colours punchy palette pleated cheerleader vibe stripe trims. Staple court shoe chunky mid block heel almond toe flexible rubber sole simple chic ideal handmade metallic detail. Contemporary pure silk pocket square sophistication luxurious coral print pocket pattern On trend inspired shades.

    Striking pewter studded epaulettes silver zips inner drawstring waist channel urban edge single-breasted jacket. Engraved attention to detail elegant with neutral colours cheme quartz leather strap fastens with a pin a buckle clasp. Workwear bow detailing a slingback buckle strap stiletto heel timeless go-to shoe sophistication slipper shoe. Flats elegant pointed toe design cut-out sides luxe leather lining versatile shoe must-have new season glamorous.

    Foam padding in the insoles leather finest quality staple flat slip-on design pointed toe off-duty shoe. Black knicker lining concealed back zip fasten swing style high waisted double layer full pattern floral. Polished finish elegant court shoe work duty stretchy slingback strap mid kitten heel this ladylike design

    Eget aenean tellus venenatis. Donec odio tempus. Felis arcu pretium metus nullam quam aenean sociis quis sem neque vici libero. Venenatis nullam fringilla pretium magnis aliquam nunc vulputate integer augue ultricies cras. Eget viverra feugiat cras ut. Sit natoque montes tempus ligula eget vitae pede rhoncus maecenas consectetuer commodo condimentum aenean.`,
  };

  const blogPosts = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e6cb147f8a1e24b2ff045df34c571474decd6c787b4799d8fe3b059925bbcdaf?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
      author: "Alec Whitten",
      date: "1 Jan 2023",
      title: "Bill Walsh leadership lessons",
      excerpt:
        "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
      tags: [
        { name: "Hotel", className: "text-violet-700 bg-purple-50" },
        { name: "Destination", className: "text-indigo-900 bg-slate-50" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aecd9c3c3cab7b8acee2d56f3e57afe91e7872a3baf023370d3e264363821424?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
      author: "Demi WIlkinson",
      date: "1 Jan 2023",
      title: "PM mental models",
      excerpt:
        "Mental models are simple expressions of complex processes or relationships.",
      tags: [
        { name: "Tourists", className: "text-sky-700 bg-sky-50" },
        { name: "Hotel", className: "text-indigo-700 bg-indigo-50" },
        { name: "Destination", className: "text-orange-700 bg-orange-50" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4e935e5a5d2e3637bf534241b5b8007358a43e38facbcdd8684480a3cdbf90ea?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc",
      author: "Candice Wu",
      date: "1 Jan 2023",
      title: "What is Wireframing?",
      excerpt:
        "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
      tags: [
        { name: "Travel", className: "text-violet-700 bg-purple-50" },
        { name: "Luxary", className: "text-indigo-700 bg-indigo-50" },
      ],
    },
  ];

  return (
    <div className="flex flex-col pt-12 bg-white">
      <div className="flex flex-col self-center px-10 w-full max-w-[1323px] max-md:max-w-full">
        <Header />
        <main>
          <h1 className="mt-12 text-4xl font-semibold text-zinc-900 max-md:mt-10 max-md:max-w-full">
            Recent blog posts
          </h1>
          <div className="mt-4 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-[61%] max-md:ml-0 max-md:w-full">
                <img
                  loading="lazy"
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="grow w-full aspect-[1.85] rounded-[40px] max-md:mt-10 max-md:max-w-full"
                />
              </div>
              <div className="flex flex-col ml-5 w-[39%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col justify-center p-4 mt-20 grow max-md:mt-10 max-md:max-w-full">
                  <div className="flex flex-col w-full p-4 bg-white border border-gray-200 border-solid shadow-lg rounded-2xl">
                    <div className="flex justify-between gap-5 text-base leading-6 text-zinc-500">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c49bd8541ae2e89ade10a1e674ba714e13aac0cb12abce8eba1d2ca760edb55?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                        alt=""
                        className="shrink-0 aspect-square w-[68px]"
                      />
                      <div className="my-auto">What's on your mind?</div>
                    </div>
                    <div className="flex flex-col justify-center mt-8 border-0 border-gray-200 border-solid">
                      <div className="h-px bg-gray-200 shrink-0" />
                    </div>
                    <div className="flex justify-between gap-5 mt-8 text-sm font-medium leading-6 whitespace-nowrap text-zinc-600">
                      <button className="flex gap-2">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c677e871b3c1b3ffba3bc846b06008d9547a19c69e7dd5fd5d7628995030b74?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                          alt=""
                          className="shrink-0 w-7 aspect-square"
                        />
                        <span className="my-auto">Photo</span>
                      </button>
                      <button className="flex gap-2">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/32fcb5a0af946eabcbad5f57387ea3b34dda7989a673cf12d59e6563359c405c?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                          alt=""
                          className="shrink-0 w-7 aspect-square"
                        />
                        <span className="my-auto">Video</span>
                      </button>
                    </div>
                    <div className="flex justify-between gap-5 mt-5 text-sm font-medium leading-6 text-zinc-600">
                      <button className="flex gap-2 whitespace-nowrap">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/006ef72485a987f8edd6e030ec8605c9021fbd772d2c12f6465e87331460c5d0?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                          alt=""
                          className="shrink-0 w-7 aspect-square"
                        />
                        <span className="my-auto">Event</span>
                      </button>
                      <button className="flex gap-2">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8416823b7fa3093a3d389e235381453e36c1fe3a836bfe825f4a88450060de54?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                          alt=""
                          className="shrink-0 w-7 aspect-square"
                        />
                        <span className="my-auto">Write an Article</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 mt-4 max-w-full text-base font-semibold text-violet-700 w-[678px] max-md:flex-wrap">
            <div className="flex-auto my-auto">
              {featuredPost.author} • {featuredPost.date}
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccff45308bd08b7cb5003f69960dde526d5c3c052cc03aea1756d2126d20219e?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
              alt=""
              className="shrink-0 w-7 aspect-square"
            />
          </div>
          <h2 className="mt-5 text-2xl font-semibold text-zinc-900 max-md:max-w-full">
            {featuredPost.title}
          </h2>
          <div className="mt-5 text-lg leading-8 text-neutral-900 max-md:max-w-full">
            {featuredPost.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          <section className="self-center mt-16 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
                <div className="flex relative flex-col grow justify-center rounded-xl aspect-[1.14] max-md:mt-2.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d70c3733c946dec8b2bcf71e2a892c0ed30b54015ac0ee1adb7a770d962e4b5?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                    alt=""
                    className="absolute inset-0 object-cover size-full rounded-[30px]"
                  />
                </div>
              </div>
              <div className="flex flex-col w-3/12 ml-5 max-md:ml-0 max-md:w-full">
                <div className="flex relative flex-col grow justify-center rounded-xl aspect-[0.97] max-md:mt-2.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/44e0c76267bd31af2d88b1e8d467b63f395bd10599bc11450cad6d7f3f183e3e?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                    alt=""
                    className="absolute inset-0 object-cover size-full rounded-[30px]"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[18%] max-md:ml-0 max-md:w-full">
                <div className="flex relative flex-col grow justify-center items-center rounded-xl aspect-[0.72] w-[203px] max-md:mt-2.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/94d898fddc2edbd7fd62bbfc43477418a0713d5ea29269935ccc01696f07729d?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                    alt=""
                    className="absolute inset-0 object-cover size-full"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow max-md:mt-2.5">
                  <div className="flex relative flex-col justify-center w-full rounded-xl aspect-[2.48]">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7d7f7495950309fb996b555fde22afcbebdcc79f55e4bc1ddbcffce6049962a?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                      alt=""
                      className="absolute inset-0 object-cover size-full"
                    />
                  </div>
                  <div className="flex gap-3.5 mt-3">
                    <div className="flex relative flex-col justify-center items-center rounded-xl aspect-[0.98] w-[146px]">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5d7511e232cab4823f5d1f71783dbe519d1133bc3c93010a787549cde92eea1?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                        alt=""
                        className="absolute inset-0 object-cover size-full"
                      />
                    </div>
                    <div className="flex relative flex-col justify-center items-center rounded-[30px] aspect-[0.98] w-[146px] ">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a979d7c55adea61478057b7998c3a6e41301f6878823b3fb5e31794aa30a2044?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                        alt=""
                        className="absolute inset-0 object-cover size-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <section className="flex items-center justify-center w-full px-16 py-8 mt-20 bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col px-8 w-full max-w-[1284px] max-md:px-5 max-md:max-w-full">
            <h2 className="text-2xl font-semibold leading-8 text-zinc-900 max-md:max-w-full">
              All blog posts
            </h2>
            <div className="px-0.5 mt-8 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col">
                {blogPosts.map((post, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
                  >
                    <BlogPost {...post} />
                  </div>
                ))}
              </div>
            </div>
            <nav className="flex gap-5 justify-between items-start px-0.5 pt-5 mt-8 w-full text-sm font-medium leading-5 text-gray-500 whitespace-nowrap border-t border-gray-200 max-md:flex-wrap max-md:max-w-full">
              <button className="flex gap-2 justify-center mt-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3baca444433f9d694feb1be412289fe8395b0da6b064b3c7d21d2cccc438921a?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                  alt="Previous"
                  className="w-5 shrink-0 aspect-square rounded-[30px]"
                />
                <span>Previous</span>
              </button>
              <div className="flex gap-0.5 self-stretch text-center">
                {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
                  <button
                    key={index}
                    className={`flex flex-col justify-center items-center w-10 h-10 rounded-lg ${
                      page === 1 ? "text-violet-500 bg-purple-50" : ""
                    }`}
                  >
                    <div className="px-3 py-2.5 rounded-lg">{page}</div>
                  </button>
                ))}
              </div>
              <button className="flex gap-2 justify-center mt-2.5">
                <span>Next</span>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f97645b9dc8ea4dcb1ee1c6de811cf56461b6cb80cebac0ab05c5d462e31399?apiKey=2bc25307ed444d758c5818aa40360cbc&&apiKey=2bc25307ed444d758c5818aa40360cbc"
                  alt="Next"
                  className="w-5 shrink-0 aspect-square"
                />
              </button>
            </nav>
          </div>
        </section>
        <Newsletter />
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
