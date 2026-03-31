
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export function TopBar() {
  return (
    <div className="w-full bg-foreground text-background py-2 px-6 sm:px-8 lg:px-10 hidden sm:flex justify-between items-center text-xs font-light tracking-wide z-[60]">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Phone className="w-3 h-3 opacity-70" />
          <Link href="tel:+18006686876" className="hover:opacity-80 transition-opacity">
            1-800-MOUNT-POLE
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-3 h-3 opacity-70" />
          <Link href="mailto:sales@mountpole.com" className="hover:opacity-80 transition-opacity">
            sales@mountpole.com
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-6">
         <div className="flex items-center gap-2">
          <MapPin className="w-3 h-3 opacity-70" />
          <span>Toronto, Canada</span>
        </div>
        <div className="flex gap-3 text-background/60">
            <span>Global B2B Distributor</span>
        </div>
      </div>
    </div>
  )
}
