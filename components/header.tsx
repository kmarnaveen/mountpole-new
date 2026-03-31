'use client'

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { TopBar } from "@/components/top-bar"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const pathname = usePathname()

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
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 md:px-6 mx-auto h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mr-6 shrink-0">
               <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center text-background font-bold text-sm tracking-tight shadow-sm">
                  MP
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg tracking-tight leading-none">MountPole</span>
                  <span className="font-light text-[10px] uppercase tracking-wider text-muted-foreground leading-none">Wholesale</span>
                </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 mx-auto">
               {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md",
                      pathname === link.href ? "text-primary bg-primary/5" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
               ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
               {/* Search */}
               <div className={cn(
                  "hidden lg:flex items-center bg-muted/50 border border-input rounded-full px-3 py-1.5 transition-all duration-300 ease-in-out",
                   isSearchFocused ? "w-64 border-primary/50 bg-background shadow-sm" : "w-48 hover:bg-muted"
               )}>
                  <Search className="w-4 h-4 text-muted-foreground mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/70"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
               </div>

                <Button variant="ghost" size="icon" className="hidden sm:flex relative" aria-label="Account">
                  <User className="w-5 h-5 text-foreground/80" />
                </Button>

                <Button variant="ghost" size="icon" className="hidden sm:flex relative" aria-label="Cart">
                    <ShoppingCart className="w-5 h-5 text-foreground/80" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </Button>

               <Button className="hidden md:inline-flex rounded-full px-6" size="sm" asChild>
                  <Link href="/contact">Get Quote</Link>
               </Button>
               
               {/* Mobile Menu */}
               <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="w-5 h-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader className="text-left border-b pb-4 mb-4">
                      <SheetTitle className="font-bold text-xl">Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-2">
                       {navLinks.map((link) => (
                         <SheetClose key={link.href} asChild>
                           <Link 
                              href={link.href} 
                              className={cn(
                                "px-4 py-3 text-lg font-medium hover:bg-muted rounded-md transition-colors",
                                pathname === link.href ? "text-primary bg-primary/5" : "text-foreground"
                              )}
                            >
                              {link.label}
                           </Link>
                         </SheetClose>
                       ))}
                       <div className="pt-4 mt-4 border-t flex flex-col gap-4">
                          <Button className="w-full rounded-full" asChild>
                            <Link href="/contact">Get Quote</Link>
                          </Button>
                           <Button variant="outline" className="w-full rounded-full" asChild>
                            <Link href="/login">Login</Link>
                          </Button>
                       </div>
                    </div>
                  </SheetContent>
               </Sheet>
            </div>
        </div>
      </header>
    </div>
  )
}
