import React, { FC } from "react";

// import { PricingCardTop } from "./PricingCardTop";
// import { PricingCardMain } from "./PricingCardMain";
// import { PricingCardBudget } from "./PricingCardBudget";
import { PricingCard } from "./PricingCard";

/**
 * Pricing component with pricing three tiers
 */
export const PricingSection: FC = () => {
  return (
    <>
      <div className="bg-gray-800">
        <div className="px-4 pt-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold leading-6 tracking-wider uppercase text-teal-50">Pricing</h2>
            <h3 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-white sm:text-4xl sm:leading-10">
            Subscription plans
          </h3>
          </div>
        </div>

        <div className="pb-12 mt-16 bg-white lg:mt-20 lg:pb-20">
          <div className="relative z-0">
            <div className="absolute inset-0 bg-gray-800 h-5/6 lg:h-2/3"></div>
            <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
              <div className="relative grid grid-cols-1 gap-4 mx-auto lg:grid-cols-3 max-w-max-content">  {/* When using section with top/main/budget cards set grid cols to 7 */}
                <PricingCard
                  title="Free"
                  price={0}
                  benefits={["Monthly data as .csv", "Complete time series", "Free, forever"]}
                  buttonText="Download"
                  buttonUrl="#download"
                />
                <PricingCard
                  title="Individual"
                  price={15}
                  benefits={["All features from Free tier", "Access to REST API", "For personal and commercial use"]}
                  buttonText="Sign up"
                  buttonUrl="#subscription"
                />
                <PricingCard
                  title="Enterprise"
                  price={"Custom"}
                  benefits={["All features from Individual tier", "Distribution within company", "Custom calculations (discounting, interest rate sensitivity, ...)", "On-demand support"]}
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
