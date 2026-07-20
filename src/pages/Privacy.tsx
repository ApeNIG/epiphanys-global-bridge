import { Link } from "react-router-dom";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who we are",
    body: (
      <>
        Epiphiny Flow ("we", "us", "our") is based in Manchester, United Kingdom.
        We are responsible for how your personal data is handled when you contact
        us, register your interest, or use this website. If you have any
        questions, email us at{" "}
        <a href="mailto:Robert@epiphinyflow.com" className="text-[#2A9D8F] font-medium hover:underline">
          Robert@epiphinyflow.com
        </a>
        .
      </>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        We only collect what you choose to give us. Typically that is your name,
        email address, and any details you include when you register your
        interest, book a call, or send us an enquiry. We do not ask for special
        category data, and we do not knowingly collect information from children.
      </>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <>
        We use your information to respond to your enquiry, arrange calls, and,
        where you have asked us to, keep you updated about our advisory, our
        prospective fund, and events such as Grow Scale Boost. We do not sell
        your data, and we do not use it for automated decision-making.
      </>
    ),
  },
  {
    heading: "Our lawful basis",
    body: (
      <>
        Under UK GDPR we rely on your <strong>consent</strong> when you opt in to
        hear from us, and on our <strong>legitimate interests</strong> to respond
        to enquiries you send us and to run our organisation. You can withdraw
        consent at any time.
      </>
    ),
  },
  {
    heading: "Who we share it with",
    body: (
      <>
        We share personal data only with trusted service providers who help us
        operate, such as our website hosting and email providers, and only to the
        extent they need it to provide their service. We may also disclose
        information if required by law. Any providers are bound to keep your data
        secure and use it only on our instructions.
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <>
        We keep your information only for as long as we need it for the purpose
        you gave it to us, or as long as the law requires, after which it is
        securely deleted.
      </>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        Under UK data protection law you have the right to access your data, to
        have it corrected or erased, to restrict or object to its use, and to
        data portability, as well as the right to withdraw consent. To exercise
        any of these, email{" "}
        <a href="mailto:Robert@epiphinyflow.com" className="text-[#2A9D8F] font-medium hover:underline">
          Robert@epiphinyflow.com
        </a>
        . You also have the right to complain to the Information Commissioner's
        Office (ICO) at ico.org.uk.
      </>
    ),
  },
  {
    heading: "Security",
    body: (
      <>
        We take reasonable technical and organisational measures to protect your
        information against loss, misuse and unauthorised access. No method of
        transmission over the internet is completely secure, but we work to
        safeguard your data once we receive it.
      </>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <>
        This website uses a small number of cookies. You can read more in our{" "}
        <Link to="/cookies" className="text-[#2A9D8F] font-medium hover:underline">
          Cookie Policy
        </Link>
        .
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <>
        We may update this policy from time to time. When we do, we will revise
        the date below. Please check back to stay informed.
      </>
    ),
  },
];

const Privacy = () => (
  <div
    className="min-h-screen bg-white light [&_a]:no-underline"
    data-theme="light"
    style={{ colorScheme: "light" }}
  >
    <HeaderV3 />

    <main>
      <section className="bg-white pt-32 md:pt-44 pb-8">
        <div className="max-w-[820px] mx-auto px-6 md:px-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-400">
              Legal
            </span>
          </div>
          <h1 className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] text-[#15171A] leading-[1.1] tracking-[-0.02em] mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-[14px]">Last updated: 20 July 2026</p>
        </div>
      </section>

      <section className="bg-white pb-20 md:pb-28">
        <div className="max-w-[820px] mx-auto px-6 md:px-20">
          {sections.map((s) => (
            <div key={s.heading} className="mb-9">
              <h2 className="font-serif text-[22px] text-[#15171A] mb-3">
                {s.heading}
              </h2>
              <p className="text-gray-500 text-[16px] leading-[1.8]">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>

    <FooterV3 />
  </div>
);

export default Privacy;
