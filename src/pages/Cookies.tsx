import { Link } from "react-router-dom";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";

const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "What cookies are",
    body: (
      <>
        Cookies are small text files that a website stores on your device. They
        help the site work properly and remember your preferences. Some are
        essential; others are optional.
      </>
    ),
  },
  {
    heading: "The cookies we use",
    body: (
      <>
        This website uses only a small number of <strong>essential and
        functional</strong> cookies, needed to make the site work and to remember
        preferences such as your display settings. We do not currently use
        advertising or third-party tracking cookies. If we add analytics in
        future to understand how the site is used, we will update this policy and,
        where required, ask for your consent first.
      </>
    ),
  },
  {
    heading: "Managing cookies",
    body: (
      <>
        You can control and delete cookies through your browser settings, and set
        your browser to block them. Please note that blocking essential cookies
        may affect how parts of this website function.
      </>
    ),
  },
  {
    heading: "More information",
    body: (
      <>
        For how we handle personal data more broadly, see our{" "}
        <Link to="/privacy" className="text-[#2A9D8F] font-medium hover:underline">
          Privacy Policy
        </Link>
        . Any questions? Email{" "}
        <a href="mailto:Robert@epiphinyflow.com" className="text-[#2A9D8F] font-medium hover:underline">
          Robert@epiphinyflow.com
        </a>
        .
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <>
        We may update this policy from time to time. When we do, we will revise
        the date below.
      </>
    ),
  },
];

const Cookies = () => (
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
            Cookie Policy
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

export default Cookies;
