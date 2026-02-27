"use client";

import CountUp from "react-countup";

const STATS_DEFAULT = [
  { value: 120, label: "Recompte nens" },
  { value: 25, label: "Recompte caps" },
  { value: 50, label: "Recompte anys" },
];

type Stat = { value: number; label: string };

export default function CounterSection({ stats }: { stats?: Array<Stat> | null }) {
  const items = stats && stats.length > 0 ? stats : STATS_DEFAULT;
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-scout-green to-scout-green-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {items.map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-scout-gold">
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <p className="text-lg sm:text-xl text-white/90 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
