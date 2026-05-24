import Image from "next/image";
import { Person } from "@/types";

interface PersonProfileProps {
  person: Person;
}

export default function PersonProfile({ person }: PersonProfileProps) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-6">
        <p className="text-xs tracking-[0.35em] text-gray-400 uppercase mb-8">
          Profile
        </p>
        <div className="flex gap-6 md:gap-8 items-start">
          <div className="relative w-20 h-28 md:w-24 md:h-32 rounded flex-shrink-0 overflow-hidden bg-gray-200">
            <Image
              src={person.imageUrl}
              alt={person.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 tracking-widest mb-1 uppercase">
              {person.nameRoman}
            </p>
            <h3 className="text-xl font-medium text-gray-900 mb-1 tracking-wide">
              {person.name}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{person.title}</p>
            <p className="text-sm text-gray-600 leading-7 tracking-wide">
              {person.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
