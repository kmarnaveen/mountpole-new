"use client";

const BRAND_ACCENTS: Record<string, string> = {
  Apple: "28,28,30",
  Samsung: "20,96,255",
  Google: "66,133,244",
  Xiaomi: "255,106,0",
  Realme: "255,204,0",
  Motorola: "48,63,159",
  JBL: "255,111,0",
  Huawei: "199,22,43",
  Honor: "34,34,34",
};

interface BrandHeaderProps {
  name: string;
  description: string;
  logo?: string;
  productCount: number;
  category: string;
}

export default function BrandHeader({
  name,
  description,
  logo,
  productCount,
  category,
}: BrandHeaderProps) {
  const accentColor = BRAND_ACCENTS[name] ?? "99,102,110";

  return (
    <section
      className="relative overflow-hidden rounded-2xl mb-8 transition-all duration-700"
      style={{
        background: `linear-gradient(135deg, rgba(${accentColor}, 0.08) 0%, rgba(${accentColor}, 0.03) 50%, #f9f9f9 100%)`,
        border: `1px solid rgba(${accentColor}, 0.15)`,
      }}
    >
      <div className="px-6 sm:px-10 py-10 sm:py-14 flex flex-col sm:flex-row sm:items-center justify-between gap-8">
        {/* Left — text */}
        <div className="space-y-4 max-w-xl">
          {/* category pill */}
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase border"
            style={{
              color: `rgba(${accentColor}, 0.85)`,
              borderColor: `rgba(${accentColor}, 0.25)`,
              background: `rgba(${accentColor}, 0.07)`,
            }}
          >
            {category}
          </span>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 leading-none">
            {name}
          </h1>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            {description}
          </p>

          {/* stats row */}
          <div className="flex items-center gap-6 pt-1">
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                {productCount}
              </p>
              <p className="text-[11px] text-gray-400 font-light tracking-wide uppercase mt-0.5">
                Products
              </p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">B2B</p>
              <p className="text-[11px] text-gray-400 font-light tracking-wide uppercase mt-0.5">
                Wholesale
              </p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div>
              <p className="text-2xl font-semibold text-gray-900">
                CA&nbsp;&amp;&nbsp;US
              </p>
              <p className="text-[11px] text-gray-400 font-light tracking-wide uppercase mt-0.5">
                Markets
              </p>
            </div>
          </div>
        </div>

        {/* Right — logo */}
        {logo && (
          <div className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-gray-100 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>

      {/* bottom accent bar */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg, rgba(${accentColor},0.6) 0%, rgba(${accentColor},0.1) 60%, transparent 100%)`,
        }}
      />
    </section>
  );
}
