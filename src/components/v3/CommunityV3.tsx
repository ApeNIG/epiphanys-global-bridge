import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import communityIndian from "@/assets/v3/community-indian-woman.png";
import communityEastAsian from "@/assets/v3/community-east-asian-man.png";
import communityCoworking from "@/assets/v3/community-coworking-woman.png";

const CommunityV3 = () => {
  const sectionRef = useScrollReveal<HTMLDivElement>();
  const photoRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden">
      {/* Curved top edge — smooth transition from white */}
      <svg
        className="block w-full h-12 md:h-20 -mb-[1px]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 0L0 0C0 0 240 80 720 80C1200 80 1440 0 1440 0L1440 80L0 80Z"
          fill="#15171A"
        />
      </svg>

      <div className="bg-[#15171A] pt-10 md:pt-20 pb-0">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative z-10">
          {/* Editorial overline */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-[2px] bg-[#00E7C3]" />
            <span className="text-[11px] font-semibold tracking-[3px] uppercase text-gray-500">
              Our Community
            </span>
          </div>

          {/* Two-column editorial layout */}
          <div
            ref={sectionRef}
            className="reveal-up grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
          >
            {/* Left column — editorial text, 7 cols */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] text-white leading-[1.3]">
                Built by the community,{" "}
                <em className="not-italic text-[#00E7C3]">for</em> the
                community — with authentic cultural understanding and a
                commitment to{" "}
                <em className="not-italic text-[#00E7C3]">inclusive growth</em>.
              </h2>

              {/* Editorial pull-quote — brand voice, not a fabricated testimonial */}
              <blockquote className="mt-4">
                <div className="text-[48px] leading-none text-[#00E7C3]/20 font-serif select-none">
                  "
                </div>
                <p className="text-gray-400 text-[17px] leading-[1.8] -mt-6 ml-1">
                  Built with and for diaspora communities, so voices are heard,
                  needs are met, and growth is shared. More than a platform: a
                  bridge to the UK&rsquo;s economic future.
                </p>
                <div className="flex items-center gap-4 mt-6 ml-1">
                  <div>
                    <div className="text-white text-sm font-semibold">
                      Epiphiny Flow
                    </div>
                    <div className="text-gray-600 text-xs tracking-wide">
                      Advisory &middot; Fund &middot; Community
                    </div>
                  </div>
                </div>
              </blockquote>

              {/* Community CTA removed entirely, Siba 2026-09-02. It pointed at
                  /community, a legacy page, so it was a one-click path from the
                  home page into the old site; briefly repointed at the
                  consultation form, now gone. The Community card is marked "in
                  development", so there is nothing here to invite anyone into,
                  and the page already carries a Contact us button. */}
            </div>

            {/* Right column — editorial photo stack, 5 cols */}
            <div ref={photoRef} className="reveal-right lg:col-span-5 relative">
              <div className="grid grid-cols-2 gap-3 h-[500px] lg:h-[560px]">
                {/* Tall left image */}
                <div className="col-span-1 rounded-2xl overflow-hidden">
                  <img
                    src={communityIndian}
                    alt="Indian professional at London networking event"
                    className="w-full h-full object-cover object-[50%_center]"
                  />
                </div>
                {/* Two stacked right images */}
                <div className="col-span-1 flex flex-col gap-3">
                  <div className="flex-1 rounded-2xl overflow-hidden">
                    <img
                      src={communityEastAsian}
                      alt="East Asian professional at Millennium Bridge"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 rounded-2xl overflow-hidden relative">
                    <img
                      src={communityCoworking}
                      alt="Professional in London coworking space"
                      className="w-full h-full object-cover"
                      style={{ transform: 'scale(1.1) translateY(-15%)', transformOrigin: 'top center' }}
                    />
                    {/* Editorial overlay stat */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                      <div>
                        <span className="text-[28px] font-bold text-white font-sans tracking-tight">
                          1 in 6
                        </span>
                        <span className="text-[10px] text-white/60 uppercase tracking-wider ml-2">
                          UK businesses minority-led
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient bleed into CTA — seamless transition */}
        <div className="h-20 md:h-28 bg-gradient-to-b from-[#15171A] to-[#1a0f2e]" />
      </div>
    </section>
  );
};

export default CommunityV3;
