'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/top-bar"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname()

  React.useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/brands", label: "Brands" },
    { href: "/categories", label: "Categories" },
    { href: "/products", label: "Products" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <div className="flex flex-col">
      <TopBar />
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-18 items-center justify-between px-4 md:h-20 md:px-6">
          {/* Logo */}
          <Link href="/" className="mr-4 flex shrink-0 items-center lg:mr-6">
            <Image
              src="/mountpole-logo.svg"
              alt="MountPole logo"
              width={800}
              height={600}
              sizes="(min-width: 1024px) 75px, (min-width: 768px) 69px, 59px"
              className="block h-11 w-auto sm:h-12 md:h-13 lg:h-14"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                  pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Search */}
            <div
              className={cn(
                "hidden lg:flex items-center bg-muted/50 border border-input rounded-full px-3 py-1.5 transition-all duration-300 ease-in-out",
                isSearchFocused
                  ? "w-64 border-primary/50 bg-background shadow-sm"
                  : "w-48 hover:bg-muted",
              )}
            >
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/70"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex relative"
              aria-label="Account"
            >
              <User className="w-5 h-5 text-foreground/80" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5 text-foreground/80" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>

            <Button
              className="hidden md:inline-flex rounded-full px-6"
              size="sm"
              asChild
            >
              <Link href="/contact">Get Quote</Link>
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="site-mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div className="lg:hidden fixed inset-0 z-50">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div
              id="site-mobile-menu"
              className="absolute inset-y-0 right-0 flex w-3/4 max-w-sm flex-col gap-4 border-l bg-background p-6 shadow-lg"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <p className="text-xl font-bold">Menu</p>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-md px-4 py-3 text-lg font-medium transition-colors hover:bg-muted",
                      pathname === link.href
                        ? "bg-primary/5 text-primary"
                        : "text-foreground",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 flex flex-col gap-4 border-t pt-4">
                <Button className="w-full rounded-full" asChild>
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Quote
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  asChild
                >
                  <Link
                    href="/admin/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}
