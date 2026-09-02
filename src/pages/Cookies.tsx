import { Link } from "react-router-dom";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";

/*
 * Based on the Cookie Policy drafted by Edwin Luther (28 August 2026), adopted
 * on Siba's instruction 2026-09-02 in place of the 20 July in-house version.
 *
 * DEVIATIONS FROM EDWIN'S DRAFT, and why. Each one describes a control this
 * site does not currently operate; publishing the draft verbatim would have
 * stated a compliance measure that does not exist, which is a worse position
 * than not describing it at all. Verified by grep over the whole codebase on
 * 2026-09-02: no analytics tag, no consent tool, no cookie banner.
 *   1. Removed every reference to a cookie banner and to accept/reject consent
 *      choices. There is no banner on this site.
 *   2. Analytics section rewritten from "we use a website analytics tool" to
 *      "we do not currently use analytics cookies".
 *   3. Deal-flow login cookies described as conditional, since the login has
 *      been removed from the site.
 *   4. "www.epiphanyflow.com" replaced with "this website" — the site does not
 *      currently serve on that domain, and the wording then survives a move.
 *   5. Brand set to "Epiphiny Flow" throughout, per Siba 2026-09-02: the
 *      spelling is deliberate.
 * All five need Edwin's sign-off. Restore his wording once the banner and
 * analytics actually exist.
 */
const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who we are",
    body: (
      <>
        References to &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo; mean{" "}
        <strong>Epiphiny Flow Ltd</strong>, a company registered in England and
        Wales under company number 16241884, with its registered office at 153
        Barkway Road, Stretford, Manchester, England, M32 9DX.
      </>
    ),
  },
  {
    heading: "What cookies are",
    body: (
      <>
        Cookies are small text files that a website places on your computer,
        phone or tablet when you visit it. They are widely used to make websites
        work, or work more efficiently, and to tell the site owner how the site
        is used. They can be <strong>session cookies</strong>, deleted
        automatically when you close your browser, or{" "}
        <strong>persistent cookies</strong>, which stay on your device for a set
        period or until you delete them. Cookies do not usually identify you by
        name, but information stored in a cookie may be linked to other personal
        information we hold about you.
      </>
    ),
  },
  {
    heading: "The cookies we use",
    body: (
      <>
        This website uses only a small number of <strong>strictly necessary and
        functional</strong> storage, and in fact this website currently sets{" "}
        <strong>no cookies at all</strong>. Checked on 2 September 2026: a fresh
        visit to this site leaves an empty cookie store.
        <br />
        <br />
        We store one item in your browser&rsquo;s local storage,{" "}
        <code>i18nextLng</code>, which remembers the language you chose so the
        site does not ask again. It stays on your device, is not sent to us, and
        you can clear it from your browser at any time.
        <br />
        <br />
        We do <strong>not</strong> use analytics or performance cookies, and we
        do not use advertising or marketing cookies. No third-party tracking runs
        on this site. If that changes we will update this policy and ask for your
        consent before any such cookie is set.
      </>
    ),
  },
  {
    heading: "Why there is no cookie banner",
    body: (
      <>
        UK law requires your consent before a website sets cookies that are not
        strictly necessary, and requires a way for you to refuse them. We set no
        such cookies, so there is nothing here for you to consent to and a banner
        would ask you to agree to something that is not happening. The day we add
        analytics, or anything else that is not strictly necessary, a banner
        appears with it.
        <br />
        <br />
        You can still control or delete cookies through your browser settings,
        which applies to every website you visit, not only this one. The help
        pages for Chrome, Microsoft Edge, Firefox and Safari each explain how.
      </>
    ),
  },
  {
    heading: "Third parties this site contacts",
    body: (
      <>
        Two services are called when a page loads, neither of which sets a
        cookie: <strong>Google Fonts</strong>, which serves the typefaces, and{" "}
        <strong>unpkg</strong>, which serves the map imagery on the home page.
        Requesting a file from either means your IP address reaches that
        provider, as it would with any website that loads a font or an image from
        elsewhere. We do not send them anything else about you.
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <>
        We may update this Cookie Policy from time to time, for example if we
        start using a new tool that sets cookies. We will revise the{" "}
        &ldquo;Last updated&rdquo; date above whenever we do, and where the
        change is significant we will ask for your consent before the new
        cookies are set.
      </>
    ),
  },
  {
    heading: "Contact us",
    body: (
      <>
        For how we handle personal data more broadly, see our{" "}
        <Link to="/privacy" className="text-[#2A9D8F] font-medium hover:underline">
          Privacy Policy
        </Link>
        . If you have any questions about this Cookie Policy, email{" "}
        <a href="mailto:info@epiphinyflow.com" className="text-[#2A9D8F] font-medium hover:underline">
          info@epiphinyflow.com
        </a>{" "}
        or write to Epiphiny Flow Ltd, 153 Barkway Road, Stretford, Manchester,
        England, M32 9DX.
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
          <p className="text-gray-400 text-[14px]">Last updated: 2 September 2026</p>
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
