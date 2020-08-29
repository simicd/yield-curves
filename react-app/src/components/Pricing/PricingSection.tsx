import React, { FC } from "react";

import { PricingCardTop } from "./PricingCardTop";
import { PricingCardMain } from "./PricingCardMain";
import { PricingCardBudget } from "./PricingCardBudget";
import { PricingCard } from "./PricingCard";

/**
 * Pricing component with pricing three tiers
 */
export const PricingSection: FC = () => {
  return (
    <>
      <div className="bg-gray-900">
        <div className="px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
          <div className="text-center">
            <h2 className="text-3xl font-semibold leading-6 tracking-wider text-gray-300 uppercase">Pricing</h2>
          </div>
        </div>

        <div className="pb-12 mt-16 bg-white lg:mt-20 lg:pb-20">
          <div className="relative z-0">
            <div className="absolute inset-0 bg-gray-900 h-5/6 lg:h-2/3"></div>
            <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
              <div className="relative lg:grid lg:grid-cols-3 lg:gap-4">  {/* When using section with top/main/budget cards set grid cols to 7 */}
                <PricingCard
                  title="Free"
                  price={0}
                  benefits={["Yield curve dashboard", "Monthly data as .csv", "Free, forever"]}
                  buttonText="Download"
                  buttonUrl="#download"
                />
                <PricingCard
                  title="Individual"
                  price={15}
                  benefits={["All features from Free tier", "Access to REST API", "For personal use", "...", "..."]}
                  buttonText="Sign up"
                  buttonUrl="#subscription"
                />
                <PricingCard
                  title="Enterprise"
                  price={"Custom"}
                  benefits={["All features from Individual tier", "Distribution within company", "On-demand support"]}
                  buttonText="Contact us"
                  buttonUrl="#subscription"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
