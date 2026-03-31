import Header from "@/components/header";
import Footer from "@/components/footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "MountPole's terms and conditions for using its website, wholesale services, and business communications.",
  path: "/terms",
  noIndex: true,
});

export default function Terms() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-light tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-foreground/60 font-light text-xs">
            Last updated: January 2026
          </p>
        </div>

        <div className="space-y-6 text-sm font-light text-foreground/70 leading-relaxed">
          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              1. Agreement
            </h2>
            <p>
              By accessing and using the MountPole website and services, you
              agree to be bound by these Terms of Service. If you do not agree
              to any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              2. Product Information
            </h2>
            <p>
              We strive to provide accurate descriptions and pricing for all
              products. However, we do not warrant that product descriptions,
              pricing, or other content is accurate, complete, or error-free. We
              reserve the right to correct any errors and to change or update
              information at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              3. Wholesale Orders
            </h2>
            <p>
              All orders are subject to acceptance by MountPole. We reserve the
              right to reject or cancel any order at our sole discretion. Prices
              are subject to change without notice. Volume discounts and special
              pricing are contingent on order quantities and are not guaranteed
              unless confirmed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              4. Payment Terms
            </h2>
            <p>
              Payment terms are negotiated individually and must be confirmed in
              writing before order fulfillment. Standard payment methods include
              wire transfer, credit card, and purchase orders for qualified
              customers. We reserve the right to require payment in advance for
              certain transactions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              5. Shipping and Delivery
            </h2>
            <p>
              We make reasonable efforts to meet estimated delivery dates but do
              not guarantee delivery timeframes. Shipping costs and methods are
              specified at checkout and may vary based on order size and
              destination. Risk of loss for products transfers to you upon
              delivery to the carrier.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              6. Product Warranty
            </h2>
            <p>
              Products are sold as described with manufacturer warranties where
              applicable. We do not provide additional warranties beyond those
              offered by manufacturers. Some products may be sold "as-is" for
              liquidation purposes, without warranty.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              7. Returns and Refunds
            </h2>
            <p>
              Returns are accepted within 14 days of delivery for defective or
              damaged items with proof of damage. Returns must be authorized in
              advance. Restocking fees may apply to non-defective returned
              items. Refunds are processed within 10-15 business days of receipt
              and verification of returned items.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              8. Limitation of Liability
            </h2>
            <p>
              In no event shall MountPole be liable for any indirect,
              incidental, special, consequential, or punitive damages arising
              from your use of our website or services, even if advised of the
              possibility of such damages. Our total liability is limited to the
              amount paid for the products in question.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              9. Intellectual Property
            </h2>
            <p>
              All content on our website, including text, graphics, logos, and
              images, is the property of MountPole or its content suppliers and
              is protected by international copyright laws. You may not
              reproduce, distribute, or transmit any content without our prior
              written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              10. User Conduct
            </h2>
            <p>
              You agree not to use our website for any unlawful purpose or in
              any way that infringes upon the rights of others or restricts
              their use and enjoyment. Prohibited behavior includes harassing,
              causing distress or inconvenience, and transmitting obscene or
              offensive content.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              11. Modifications
            </h2>
            <p>
              We reserve the right to modify these Terms of Service at any time.
              Your continued use of our website and services following any
              modifications constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              12. Governing Law
            </h2>
            <p>
              These Terms of Service are governed by and construed in accordance
              with the laws of the jurisdictions where MountPole operates, and
              you irrevocably submit to the exclusive jurisdiction of the courts
              located in such jurisdictions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-light tracking-tight mb-2 text-foreground">
              13. Contact Information
            </h2>
            <p>
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-3 text-xs space-y-1">
              <p>MountPole</p>
              <p>Email: legal@mountpole.com</p>
              <p>Phone: 1-800-MOUNT-POLE</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
