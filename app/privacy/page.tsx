import Header from "@/components/header";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "MountPole's privacy policy covering how personal and business information is collected, stored, and used.",
  path: "/privacy",
  noIndex: true,
});

export default function Privacy() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-foreground/60 font-light text-xs">
            Last updated: January 2026
          </p>
        </div>

        <div className="space-y-6 text-sm font-light text-foreground/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              Introduction
            </h2>
            <p>
              MountPole ("Company," "we," "our," or "us") is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you complete inquiry forms, place orders, or contact our sales
              team. This information may include your name, email address, phone
              number, company name, and details about your wholesale
              requirements.
            </p>
            <p className="mt-2">
              We also automatically collect certain information when you use our
              website, including your IP address, browser type, pages visited,
              and referring URLs. This information helps us improve our services
              and user experience.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              Use of Information
            </h2>
            <p>
              We use the information we collect to process your orders, respond
              to inquiries, provide customer support, and improve our services.
              We may also use your information to send you marketing
              communications, with your consent.
            </p>
            <p className="mt-2">
              Your information helps us understand your needs and preferences,
              allowing us to tailor our product offerings and communications
              accordingly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              Information Sharing
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share information with service providers who
              assist us in operating our website and conducting our business,
              subject to strict confidentiality agreements.
            </p>
            <p className="mt-2">
              We may disclose information when required by law or when necessary
              to protect our rights, privacy, safety, or property.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the Internet is 100% secure. We cannot guarantee
              absolute security of your information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              Your Rights
            </h2>
            <p>
              You have the right to access, correct, or request deletion of your
              personal information. You may opt out of receiving marketing
              communications from us at any time. To exercise these rights,
              please contact us at the information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              Cookies and Tracking
            </h2>
            <p>
              Our website may use cookies and similar tracking technologies to
              enhance your experience. These technologies allow us to remember
              your preferences and understand how you use our site. You can
              control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to review their privacy policies before providing
              personal information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or our privacy
              practices, please contact us at:
            </p>
            <div className="mt-3 text-xs space-y-1">
              <p>MountPole</p>
              <p>Email: privacy@mountpole.com</p>
              <p>Phone: 1-800-MOUNT-POLE</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              Policy Updates
            </h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time.
              Changes will be effective immediately upon posting to the website.
              Your continued use of our website constitutes your acceptance of
              the updated Privacy Policy.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
