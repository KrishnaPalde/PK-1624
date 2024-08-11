import * as React from "react";

function Heading({ title }) {
  return (
    <h1 className="gap-2 w-full text-2xl font-semibold max-md:max-w-full">
      {title}
    </h1>
  );
}

function Section({ title, children }) {
  return (
    <section className="flex flex-col mt-9 w-full max-md:max-w-full">
      <h2 className="gap-2 w-full text-xl font-medium max-md:max-w-full">
        {title}
      </h2>
      <div className="text-sm leading-5 mt-4 max-md:max-w-full">{children}</div>
    </section>
  );
}

function Contact() {
  return (
    <section className="flex flex-col mt-9 w-full max-md:max-w-full">
      <h2 className="gap-2 w-full text-xl font-medium max-md:max-w-full">
        Contact Us
      </h2>
      <address className="mt-4 text-sm leading-5 underline max-md:max-w-full not-italic">
        <span>
          If you have any questions about our Website or our Terms of Use,
          please contact:
        </span>
        <br />
        <span>Golobe Group Q.C.S.C</span>
        <br />
        <span>Golobe Tower</span>
        <br />
        <span>P.O. Box: 22550</span>
        <br />
        <span>Doha, State of Qatar</span>
        <br />
        <span>Further contact details can be found at </span>
        <a href="https://golobe.com/help" className="underline">
          golobe.com/help
        </a>
      </address>
    </section>
  );
}

function TermsAndConditions() {
  return (
    <main className="flex flex-col mt-16 w-full text-neutral-900 max-md:mt-10 max-md:max-w-full">
      <Heading title="Terms and Conditions" />
      <Section title="Payments">
        <p>
          If you are purchasing your ticket using a debit or credit card via the
          Website, we will process these payments via the automated secure
          common payment gateway which will be subject to fraud screening
          purposes.
        </p>
        <p className="mt-4">
          If you do not supply the correct card billing address and/or
          cardholder information, your booking will not be confirmed and the
          overall cost may increase. We reserve the right to cancel your booking
          if payment is declined for any reason or if you have supplied
          incorrect card information. If we become aware of, or is notified of,
          any fraud or illegal activity associated with the payment for the
          booking, the booking will be cancelled and you will be liable for all
          costs and expenses arising from such cancellation, without prejudice
          to any action that may be taken against us.
        </p>
        <p className="mt-4">
          Golobe may require the card holder to provide additional payment
          verification upon request by either submitting an online form or
          visiting the nearest Golobe office, or at the airport at the time of
          check-in. Golobe reserves the right to deny boarding or to collect a
          guarantee payment (in cash or from another credit card) if the card
          originally used for the purchase cannot be presented by the cardholder
          at check-in or when collecting the tickets, or in the case the
          original payment has been withheld or disputed by the card issuing
          bank. Credit card details are held in a secured environment and
          transferred through an internationally accepted system.
        </p>
      </Section>
      <Contact />
    </main>
  );
}

export default TermsAndConditions;
