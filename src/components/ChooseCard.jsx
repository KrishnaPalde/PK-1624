function ChooseCard({ image, title, description }) {
    return (
      <div className="relative overflow-hidden rounded-3xl aspect-[5/3] shadow-lg">
        <img
          loading="lazy"
          src={image}
          alt=""
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/50 to-transparent">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-white/80">
            {description}
          </p>
        </div>
      </div>
    );
  }

export default ChooseCard;