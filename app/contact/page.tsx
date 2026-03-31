import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactForm from "@/components/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact MountPole",
  description:
    "Talk to MountPole about wholesale electronics, partnership opportunities, bulk orders, and cross-border distribution support.",
  path: "/contact",
  keywords: [
    "contact wholesale electronics distributor",
    "bulk order inquiry",
    "MountPole sales",
    "electronics distribution contact",
  ],
});

export default function Contact() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <div className="mb-14">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">
            Connect with MountPole
          </h1>
          <p className="text-foreground/60 font-light text-sm leading-relaxed max-w-2xl">
            Ready to partner with a trusted global technology distributor?
            Contact our team for partnership opportunities, support, and
            business solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="border border-border/50 rounded-lg p-6 hover:border-border transition-colors">
            <Phone className="w-5 h-5 text-accent mb-3" />
            <h3 className="text-sm font-medium tracking-tight mb-2">Call Us</h3>
            <a
              href="tel:+14376613501"
              className="text-xs font-light text-foreground/70 hover:text-foreground transition-colors"
            >
              +1 437 661 3501
            </a>
            <p className="text-xs font-light text-foreground/50 mt-2">
              WhatsApp Available
            </p>
          </div>

          <div className="border border-border/50 rounded-lg p-6 hover:border-border transition-colors">
            <Mail className="w-5 h-5 text-accent mb-3" />
            <h3 className="text-sm font-medium tracking-tight mb-2">
              Email Us
            </h3>
            <a
              href="mailto:info@mountpole.com"
              className="text-xs font-light text-foreground/70 hover:text-foreground transition-colors block"
            >
              info@mountpole.com
            </a>
            <a
              href="mailto:support@mountpole.com"
              className="text-xs font-light text-foreground/70 hover:text-foreground transition-colors block mt-1"
            >
              support@mountpole.com
            </a>
            <p className="text-xs font-light text-foreground/50 mt-2">
              Response within 24 hours
            </p>
          </div>

          <div className="border border-border/50 rounded-lg p-6 hover:border-border transition-colors">
            <Clock className="w-5 h-5 text-accent mb-3" />
            <h3 className="text-sm font-medium tracking-tight mb-2">
              Business Hours
            </h3>
            <p className="text-xs font-light text-foreground/70">
              Mon - Fri: 9AM - 6PM EST
            </p>
            <p className="text-xs font-light text-foreground/50 mt-2">
              Saturday & Sunday: Closed
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-14">
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-light tracking-tight mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-0.5 text-accent shrink-0" />
                  <div>
                    <h3 className="text-xs font-medium tracking-wide mb-2">
                      Headquarters
                    </h3>
                    <p className="text-xs font-light text-foreground/70">
                      Doral, Florida
                    </p>
                    <p className="text-xs font-light text-foreground/50">
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-0.5 text-accent shrink-0" />
                  <div>
                    <h3 className="text-xs font-medium tracking-wide mb-2">
                      Canada Office
                    </h3>
                    <p className="text-xs font-light text-foreground/70">
                      4920 Tomken Rd, Unit 4
                    </p>
                    <p className="text-xs font-light text-foreground/50">
                      Mississauga, ON L4W 1J8, Canada
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 mt-0.5 text-accent shrink-0" />
                  <div>
                    <h3 className="text-xs font-medium tracking-wide mb-2">
                      Phone
                    </h3>
                    <a
                      href="tel:+14376613501"
                      className="text-xs font-light text-foreground/70 hover:text-foreground transition-colors"
                    >
                      +1 437 661 3501
                    </a>
                    <p className="text-xs font-light text-foreground/50 mt-1">
                      WhatsApp Available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border/30 pt-8">
              <h3 className="text-sm font-medium tracking-tight mb-6">
                Department Contacts
              </h3>
              <div className="space-y-5">
                <div className="group">
                  <p className="text-xs font-medium text-foreground mb-1.5">
                    Customer Support
                  </p>
                  <a
                    href="mailto:sales@mountpole.com"
                    className="text-xs font-light text-foreground/70 hover:text-accent transition-colors"
                  >
                    sales@mountpole.com
                  </a>
                  <p className="text-xs font-light text-foreground/50 mt-1">
                    Product information, technical support, and customer service
                    inquiries
                  </p>
                </div>

                <div className="group">
                  <p className="text-xs font-medium text-foreground mb-1.5">
                    Partnership & Retailers
                  </p>
                  <a
                    href="mailto:partners@mountpole.com"
                    className="text-xs font-light text-foreground/70 hover:text-accent transition-colors"
                  >
                    partners@mountpole.com
                  </a>
                  <p className="text-xs font-light text-foreground/50 mt-1">
                    Business partnerships, retail programs, and authorized
                    dealer opportunities
                  </p>
                </div>

                <div className="group">
                  <p className="text-xs font-medium text-foreground mb-1.5">
                    International Business
                  </p>
                  <a
                    href="mailto:international@mountpole.com"
                    className="text-xs font-light text-foreground/70 hover:text-accent transition-colors"
                  >
                    international@mountpole.com
                  </a>
                  <p className="text-xs font-light text-foreground/50 mt-1">
                    Global business development and international trade
                    partnerships
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
