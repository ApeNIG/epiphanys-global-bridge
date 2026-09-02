import { Link } from "react-router-dom";
import HeaderV3 from "@/components/v3/HeaderV3";
import FooterV3 from "@/components/v3/FooterV3";

/*
 * Based on the Privacy Policy drafted by Edwin Luther (28 August 2026), adopted
 * on Siba's instruction 2026-09-02 in place of the 20 July in-house version.
 *
 * DEVIATIONS FROM EDWIN'S DRAFT, and why. Each describes a control this site
 * does not currently operate; publishing the draft verbatim would have claimed
 * a compliance measure that does not exist. Verified by grep over the whole
 * codebase on 2026-09-02: no analytics tag, no consent tool, no cookie banner.
 *   1. Removed analytics as a purpose, a legal basis, a shared category and a
 *      retention class. No analytics tool runs on this site.
 *   2. Removed references to consent "given through our cookie banner". There
 *      is no banner.
 *   3. Deal-flow platform accounts described as conditional, since the login
 *      has been removed from the site.
 *   4. "www.epiphanyflow.com" replaced with "this website" — the site does not
 *      currently serve on that domain, and the wording survives a move.
 *   5. Brand set to "Epiphiny Flow" throughout, per Siba 2026-09-02: the
 *      spelling is deliberate.
 * All five need Edwin's sign-off. Restore his wording once analytics and a
 * consent banner actually exist.
 */
const sections: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who we are",
    body: (
      <>
        <strong>Epiphiny Flow Ltd</strong> is a company registered in England and
        Wales under company number 16241884, with its registered office at 153
        Barkway Road, Stretford, Manchester, England, M32 9DX. For the purposes
        of data protection law we are the <strong>data controller</strong> of the
        personal information described in this policy, which means we decide how
        and why your information is used.
        <br />
        <br />
        This policy is written to meet the UK General Data Protection Regulation
        (UK GDPR) and the Data Protection Act 2018. If you have any questions,
        email{" "}
        <a href="mailto:info@epiphinyflow.com" className="text-[#2A9D8F] font-medium hover:underline">
          info@epiphinyflow.com
        </a>{" "}
        or write to us at the address above.
      </>
    ),
  },
  {
    heading: "What this policy covers",
    body: (
      <>
        This policy applies to personal information we collect through this
        website, including the contact and enquiry forms, any registration of
        interest, and signing up to our newsletter or other communications. It
        does not cover third-party sites we link to. If you follow a link away
        from this website, check the privacy policy of the site you land on.
      </>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <>
        We only collect information relevant to the reason you are using the
        site. Depending on how you use it, that may include your{" "}
        <strong>name and email address</strong> when you fill in a contact form
        or sign up to our newsletter; your <strong>company or organisation name
        and role</strong> when you ask for an intro meeting; and{" "}
        <strong>any other details you choose to give us</strong> when you write
        to us or fill in a free-text field.
        <br />
        <br />
        We do not knowingly collect special category data (such as health,
        religion or ethnicity) or financial account details through this website.
        Please do not include that kind of information in any form or message
        unless we have specifically asked for it.
      </>
    ),
  },
  {
    heading: "Why we collect it, and our legal basis",
    body: (
      <>
        Under UK GDPR we must have a valid legal reason for every use of your
        personal information.
        <br />
        <br />
        <strong>Responding to enquiries and intro meeting requests</strong> — our
        legitimate interest in running our business and communicating with people
        who contact us.
        <br />
        <strong>Sending you our newsletter or updates</strong> — your consent,
        given when you sign up. You can withdraw it at any time.
        <br />
        <strong>Keeping the website secure and preventing misuse</strong> — our
        legitimate interest in protecting our systems and users.
        <br />
        <strong>Meeting our legal obligations</strong>, for example responding to
        a lawful request from a regulator — compliance with a legal obligation.
        <br />
        <br />
        Where we rely on legitimate interests, we have considered whether our use
        of your information is proportionate and does not unfairly affect your
        rights. You can ask us for more detail about that balancing test at any
        time.
      </>
    ),
  },
  {
    heading: "Who we share your information with",
    body: (
      <>
        We do not sell your personal information. We share it only where
        necessary, with <strong>service providers</strong> who help us run this
        website (currently Supabase for data storage and Vercel for hosting), who
        process your information only on our instructions and under a written
        contract; <strong>professional advisers</strong>, such as our accountant
        or legal adviser, where reasonably necessary;{" "}
        <strong>regulators or authorities</strong> where we are legally required
        to share information; and <strong>a buyer or successor</strong> if we sell
        or reorganise our business, subject to the same protections described
        here.
      </>
    ),
  },
  {
    heading: "Sending your information outside the UK",
    body: (
      <>
        Some providers we use, for example Supabase and Vercel, may store or
        process information on servers outside the UK, including in the United
        States. Where that happens we make sure appropriate safeguards are in
        place first, such as the UK International Data Transfer Agreement (IDTA),
        the UK Addendum to the EU Standard Contractual Clauses, or a finding by
        the UK government that the receiving country offers an adequate level of
        protection. You can ask us for more information about these safeguards.
      </>
    ),
  },
  {
    heading: "How long we keep your information",
    body: (
      <>
        We keep personal information only for as long as we need it, and to meet
        any legal, accounting or reporting requirements. As a general guide,{" "}
        <strong>enquiry and contact form messages</strong> are kept for up to 12
        months after our last contact with you, unless we need them longer for an
        ongoing matter, and{" "}
        <strong>newsletter and marketing sign-ups</strong> until you unsubscribe
        or ask us to delete your details. After these periods we securely delete
        or anonymise your information.
      </>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        Under UK GDPR you have the right to be <strong>informed</strong> about
        how we use your information, to <strong>access</strong> it, to{" "}
        <strong>rectification</strong> if it is inaccurate or incomplete, to{" "}
        <strong>erasure</strong> in certain circumstances, to{" "}
        <strong>restrict processing</strong>, to{" "}
        <strong>data portability</strong>, to <strong>object</strong> to direct
        marketing or to our reliance on legitimate interests, and to{" "}
        <strong>withdraw consent</strong> at any time without affecting anything
        we did beforehand. You also have the right not to be subject to automated
        decision-making that has a legal or similarly significant effect. We do
        not use any such automated decision-making on this website.
        <br />
        <br />
        To use any of these rights, email{" "}
        <a href="mailto:info@epiphinyflow.com" className="text-[#2A9D8F] font-medium hover:underline">
          info@epiphinyflow.com
        </a>
        . We will normally respond within one month.
      </>
    ),
  },
  {
    heading: "Complaints",
    body: (
      <>
        If you are unhappy with how we have handled your information, you have
        the right to complain to the UK&rsquo;s data protection regulator, the{" "}
        <strong>Information Commissioner&rsquo;s Office</strong>, Wycliffe House,
        Water Lane, Wilmslow, Cheshire, SK9 5AF, telephone 0303 123 1113,
        ico.org.uk. We would appreciate the chance to address your concerns
        first, so please contact us if you can.
      </>
    ),
  },
  {
    heading: "How we keep your information secure",
    body: (
      <>
        We use appropriate technical and organisational measures to protect your
        personal information, including secure hosting, access controls and
        encrypted connections (HTTPS) across the site. No method of transmission
        or storage is completely secure, but we work to protect your information
        and review our security regularly. If we become aware of a breach likely
        to put your rights and freedoms at risk, we will notify the ICO and,
        where required, the people affected.
      </>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <>
        We use a small number of strictly necessary and functional cookies, and
        no analytics or advertising cookies. Full details are in our{" "}
        <Link to="/cookies" className="text-[#2A9D8F] font-medium hover:underline">
          Cookie Policy
        </Link>
        .
      </>
    ),
  },
  {
    heading: "Children's privacy",
    body: (
      <>
        This website is intended for a business and professional audience. It is
        not directed at children, and we do not knowingly collect personal
        information from anyone under the age of 16. If you believe a child has
        given us personal information, please contact us so we can remove it.
      </>
    ),
  },
  {
    heading: "Changes to this policy",
    body: (
      <>
        We may update this policy from time to time, for example if we change how
        the website works or if the law changes. We will revise the &ldquo;Last
        updated&rdquo; date above when we do.
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

export default Privacy;
