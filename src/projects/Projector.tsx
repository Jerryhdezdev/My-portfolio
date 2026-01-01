type ProjectorProps = {
  imageSrc: string;
};

export function Projector({ imageSrc }: ProjectorProps) {
  return (
    <div
      className="
        w-90 md:w-125
        aspect-3/2
        border-6 border-black
        bg-black/80
        shadow-[6px_6px_0_var(--color-shadow-card-primary)]
        rounded
        scale-interactive
      "
    >
      <img
        src={imageSrc}
        alt=""
        className="w-full h-full object-contain"
      />
    </div>
  );
}