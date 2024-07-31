function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col p-6 bg-rose-50 rounded-3xl aspect-[5/3] shadow-lg ease-in-out">
      <div className="flex flex-col items-center mb-4">
        <img loading="lazy" src={icon} alt="" className=" md:h-[7rem] md:w-[8rem] h-20 w-20" />
      </div>
      <h3 className="mb-2 text-base font-bold text-black">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;