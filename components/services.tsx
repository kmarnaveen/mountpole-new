import Image from "next/image";

const BRANDS = [
  {
    name: "Apple",
    logo: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-1536x864.png",
  },
  {
    name: "Samsung",
    logo: "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/300_186_4.png?$568_N_PNG$",
  },
  {
    name: "Google",
    logo: "https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/resized/800x480/1520cb97ebc97cda5694fabad478e857789d84d0.png",
  },
  {
    name: "Xiaomi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/960px-Xiaomi_logo_%282021-%29.svg.png",
  },
  {
    name: "Motorola",
    logo: "https://1000logos.net/wp-content/uploads/2017/04/Motorola-Logo-1536x864.png",
  },
  {
    name: "JBL",
    logo: "https://logos-world.net/wp-content/uploads/2020/12/JBL-Logo-700x394.png",
  },
  {
    name: "Huawei",
    logo: "https://1000logos.net/wp-content/uploads/2018/08/Huawei-Logo.png",
  },
  {
    name: "Honor",
    logo: "https://static.vecteezy.com/system/resources/previews/020/927/024/non_2x/honor-brand-logo-phone-symbol-name-black-design-china-mobile-illustration-free-vector.jpg",
  },
];

export default function Services() {
  return (
    <section className="py-10 sm:py-12 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {BRANDS.map(({ name, logo }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              <div className="relative w-16 h-10 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                <Image src={logo} alt={name} fill className="object-contain" />
              </div>
              <span className="text-xs font-medium text-gray-300 group-hover:text-gray-500 transition-colors tracking-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
