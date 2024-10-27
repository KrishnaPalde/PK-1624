import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HouseRules = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 bg-gray-100 sm:p-6 md:p-8 lg:p-16">
        <div className="p-4 mx-auto mt-8 bg-white rounded-lg shadow-lg sm:p-6 md:p-8 lg:p-12 max-w-7xl sm:mt-12 md:mt-16">
          <h1 className="mb-4 text-2xl font-bold text-center text-gray-800 sm:text-3xl lg:mb-6">House Rules</h1>
          <p className="mb-6 text-sm text-center text-gray-600 sm:text-base lg:mb-10">
            Please adhere to the following rules and guidelines to ensure a pleasant stay for everyone.
          </p>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-12 lg:gap-x-18 lg:gap-y-8">
            {/* Left Column: First 10 rules */}
            <div className="space-y-4 sm:space-y-6">
              <RuleSection
                number="1"
                title="Check-In/Check-Out Timings"
                description="Standard check-in time is 2:00 PM and check-out time is 11:00 AM."
              />
              <RuleSection
                number="2"
                title="Payment Policy"
                description="Stay charges must be paid at check-in if not paid in advance. All dues for additional services must be cleared before check-out at reception. Payments can be made in cash or via UPI only. Credit card payments are not accepted."
              />
              <RuleSection
                number="3"
                title="Identification Requirement"
                description="All guests are required to provide valid identification at check-in (passport, Aadhaar card, driver's license, etc.)."
              />
              <RuleSection
                number="4"
                title="Guest Policy"
                description="Only registered guests are allowed to stay in the room. Prior permission is required for additional or unregistered persons."
              />
              <RuleSection
                number="5"
                title="Waste Disposal"
                description="Please do not throw anything out of the windows or balconies. Use the dustbin provided for proper waste disposal."
              />
              <RuleSection
                number="6"
                title="Quiet Hours"
                description="Maintain a peaceful environment. No loud music or noise, especially during quiet hours between 10:00 PM and 7:00 AM."
              />
              <RuleSection
                number="7"
                title="Use of Common Areas"
                description="Guests are welcome to use common areas such as the living room, kitchen, and terrace. Please keep these spaces tidy and respect others using them."
              />
              <RuleSection
                number="8"
                title="Housekeeping Service"
                description="Cleaning/housekeeping service is provided once daily."
              />
              <RuleSection
                number="9"
                title="Additional Charges"
                description="There are extra charges for the use of the kitchen, washing machine, and dishwashing machine."
              />
              <RuleSection
                number="10"
                title="Security of Valuables"
                description="Keep your jewelry, cash, mobile, and valuables in your safe custody. The management is not responsible for any theft or loss."
              />
            </div>

            {/* Right Column: Remaining 10 rules */}
            <div className="space-y-4 sm:space-y-6">
              <RuleSection
                number="11"
                title="Property Damage"
                description="Any damage or loss to homestay property will be charged to the guest."
              />
              <RuleSection
                number="12"
                title="Smoking Policy"
                description="Smoking is only allowed on the terrace in the designated smoking area."
              />
              <RuleSection
                number="13"
                title="Illegal Activities"
                description="No illegal activities are allowed on the premises. Guests will be held responsible for any such activities."
              />
              <RuleSection
                number="14"
                title="Prohibited Items"
                description="Items such as drugs, banned substances, arms, and weapons are strictly prohibited."
              />
              <RuleSection
                number="15"
                title="Pets Policy"
                description="Pets are not allowed in common areas. Pet charges apply separately, and the guest is responsible for any nuisance, damage, or mess caused by pets."
              />
              <RuleSection
                number="16"
                title="Conservation"
                description="Before leaving the room, ensure that all electrical points are switched off and water taps are properly turned off."
              />
              <RuleSection
                number="17"
                title="Key Management"
                description="Lock the room and leave the key at the reception counter before going out."
              />
              <RuleSection
                number="18"
                title="Complaints and Suggestions"
                description="Any complaints or suggestions can be noted in the register at the reception or brought directly to the management's attention."
              />
              <RuleSection
                number="19"
                title="Force Majeure"
                description="The management is not responsible for any event beyond its control."
              />
              <RuleSection
                number="20"
                title="Rule Violations"
                description="Management reserves the right to ask guests to vacate the house in case of violation of any house rules. Guests will not receive any refund in this scenario."
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const RuleSection = ({ number, title, description }) => (
  <div className="pl-3 border-l-4 border-blue-500 sm:pl-4">
    <h3 className="text-base font-semibold text-gray-800 sm:text-lg">
      {number}. {title}
    </h3>
    <p className="mt-1 text-sm text-justify text-gray-600 sm:text-base">{description}</p>
  </div>
);

export default HouseRules;