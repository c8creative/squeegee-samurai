import { Helmet } from "react-helmet-async";
import {
  Lightbulb,
  Sparkles,
  PackageOpen,
  Building2,
  Wrench,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { useMemo } from "react";

const PHONE_DISPLAY = "540-335-1059";
const PHONE_TEL = "5403351059";
const EMAIL = "james@squeegee-samurai.com";
const HERO_IMG = "/images/holiday/hero.jpg"; // put an image here; see notes below

export default function HolidayLighting() {
  const title = "Holiday Decorations & Lighting Services | Loudoun County, VA";
  const description =
    "Holiday decorations & lighting in Loudoun County, VA—design, install, maintenance, removal & storage for homes and businesses. Get a free quote.";
  const canonical = "https://squeegee-samurai.com/holiday-lighting/";

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Holiday Lighting & Decorations",
      serviceType:
        "Holiday lighting installation, decoration, maintenance, removal & storage",
      areaServed: "Loudoun County, VA",
      provider: {
        "@type": "LocalBusiness",
        name: "Squeegee Samurai",
        url: canonical,
        email: EMAIL,
        telephone: PHONE_DISPLAY,
        areaServed: "Loudoun County, VA",
      },
    }),
    []
  );

  const services = [
    {
      icon: <Lightbulb className="h-6 w-6 text-amber-600" aria-hidden />,
      title: "Custom Lighting Installation",
      desc:
        "Classic white or colorful displays—designed to fit your property and style.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-sky-600" aria-hidden />,
      title: "Professional Decorations",
      desc:
        "Garlands, wreaths, and ornaments for interior and exterior festive designs.",
    },
    {
      icon: <PackageOpen className="h-6 w-6 text-emerald-600" aria-hidden />,
      title: "Removal & Storage",
      desc:
        "Safe takedown, packing, and storage so next year is hassle‑free.",
    },
    {
      icon: <Building2 className="h-6 w-6 text-indigo-600" aria-hidden />,
      title: "Commercial Displays",
      desc:
        "Eye‑catching storefront and campus designs that attract customers.",
    },
    {
      icon: <Wrench className="h-6 w-6 text-rose-600" aria-hidden />,
      title: "Maintenance & Repairs",
      desc:
        "Keep your display bright all season with prompt support.",
    },
  ];

  const reasons = [
    { title: "Local Expertise", desc: "Proudly serving Loudoun County." },
    { title: "Safety First", desc: "Trained, insured, and ladder‑smart." },
    { title: "Custom Designs", desc: "Tailored to your vision and property." },
    { title: "Stress‑Free", desc: "We handle everything—start to finish." },
  ];

  const steps = [
    { title: "Free Consultation", desc: "Share ideas and get an on‑site assessment." },
    { title: "Custom Proposal", desc: "A design plan that fits your style and budget." },
    { title: "Installation", desc: "Safe, professional setup for a flawless display." },
    { title: "Enjoy the Holidays", desc: "Sit back and celebrate—no ladders, no tangles." },
    { title: "Removal & Storage", desc: "We return to take down and store your decor." },
  ];

  const serviceArea = ["Leesburg", "Ashburn", "Sterling", "Purcellville", "Nearby communities"];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* SEO & JSON-LD */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        {/* Open Graph */}
        <meta property="og:title" content="Holiday Lighting & Decorations in Loudoun County" />
        <meta property="og:description" content="Design, installation, maintenance, removal & storage." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={HERO_IMG} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-6">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Light Up Your Holidays with Squeegee Samurai
              </h1>
              <p className="mt-3 text-lg text-slate-600">
                Bring the magic of the season to your home or business with professional
                holiday lighting and decoration services across Loudoun County, VA.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#quote"
                  className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-white shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate- px-4 py-2 text-slate-900 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  <Phone className="h-4 w-4" aria-hidden /> Call {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="order-1 overflow-hidden rounded-xl border border-slate-200 lg:order-2">
              {/* Use your own photo: 1600x900 recommended */}
              <img
                src={HERO_IMG}
                alt="Warm holiday lights installed on a Loudoun County home"
                className="block h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">Our Holiday Services</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li
                key={s.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-md bg-slate-50 p-2">{s.icon}</div>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY US */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">Why Choose Squeegee Samurai?</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <li
                key={r.title}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" aria-hidden />
                  <div>
                    <h3 className="font-semibold">{r.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{r.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">How It Works</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="text-sm font-semibold text-slate-500">Step {i + 1}</div>
                <div className="mt-1 font-semibold">{step.title}</div>
                <p className="mt-1 text-sm text-slate-600">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">Service Area</h2>
          <p className="mt-3 text-slate-600">
            We proudly serve {serviceArea.join(", ")}.
          </p>
        </div>
      </section>

      {/* QUOTE / CONTACT */}
      <section id="quote" className="border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center lg:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">Ready to Shine?</h2>
          <p className="mt-2 text-slate-600">
            Contact Squeegee Samurai today for a free quote.
          </p>
          <div className="mt-5 space-y-1">
            <p>
              <strong>Email:</strong>{" "}
              <a
                className="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                className="text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
                href={`tel:${PHONE_TEL}`}
              >
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>

          {/* Optional: inline QuoteForm here */}
          {/* <QuoteForm /> */}
        </div>
      </section>
    </main>
  );
}
