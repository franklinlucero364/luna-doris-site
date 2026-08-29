import Image from "next/image";
import { serviceExperience } from "@/lib/site-config";

export default function ServiceExperience() {
  return (
    <section className="bg-background">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:grid-cols-2 sm:py-28">
        <Image
          src="/images/room-showcase.jpg"
          alt="A collage of real spaces Doris has cleaned: a living room, kitchen, bathroom glass, and built-in shelving"
          width={1000}
          height={1000}
          className="aspect-square w-full rounded-3xl object-contain"
        />
        <div>
          <p className="text-sm font-medium tracking-wide text-sky-dark">
            {serviceExperience.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
            {serviceExperience.heading}
          </h2>
          <p className="mt-4 max-w-lg text-muted">{serviceExperience.body}</p>
        </div>
      </div>
    </section>
  );
}
