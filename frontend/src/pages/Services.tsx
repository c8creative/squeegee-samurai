import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Building,
  Utensils,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import "./Home.css";

const CORE_SERVICES = [
  {
    icon: Users,
    title: "Residential Services",
    description:
      "Professional window cleaning for homes, townhouses, and condominiums throughout Loudoun County.",
    features: [
      "Interior & exterior window cleaning",
      "Screen cleaning & maintenance",
      "Window sill & frame cleaning",
      "Post-construction cleanup",
      "Flexible scheduling options",
    ],
    to: "/services/residential",
  },
  {
    icon: Building,
    title: "Commercial Services",
    description:
      "Regular maintenance and one-time cleaning for offices, retail stores, and commercial buildings.",
    features: [
      "Scheduled maintenance programs",
      "Up to 3rd story window cleaning",
      "Storefront & display windows",
      "After-hours service available",
      "Competitive contract pricing",
    ],
    to: "/services/commercial",
  },
  {
    icon: Utensils,
    title: "Restaurant Services",
    description:
      "Specialized cleaning for restaurants and food service establishments with health code compliance.",
    features: [
      "Health code compliant cleaning",
      "Grease & grime removal",
      "Kitchen window deep cleaning",
      "Off-hours & weekend service",
      "Food-safe cleaning products",
    ],
    to: "/services",
  },
];

const ADDITIONAL = [
  { title: "Screen Cleaning", text: "Professional cleaning and maintenance of window screens to improve airflow and appearance." },
  { title: "Pressure Washing", text: "Exterior building cleaning, sidewalk cleaning, and deck restoration services." },
  { title: "Gutter Cleaning", text: "Complete gutter cleaning and maintenance to protect your property from water damage." },
  { title: "Solar Panel Cleaning", text: "Specialized cleaning to maintain solar panel efficiency and maximize energy production." },
  { title: "Post-Construction", text: "Thorough cleanup of construction debris, paint, and adhesive residue from windows." },
  { title: "Emergency Service", text: "Emergency window cleaning for urgent situations and special events." },
];

const STEPS = [
  { num: "01", title: "Assessment", text: "We evaluate your property and discuss your specific needs and preferences." },
  { num: "02", title: "Preparation", text: "We protect your property and set up our equipment for safe, efficient cleaning." },
  { num: "03", title: "Cleaning", text: "Using professional techniques and eco-friendly products for streak-free results." },
  { num: "04", title: "Inspection", text: "Final quality check to ensure every window meets our high standards." },
];

const Services = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-sumi-900 py-20 lg:py-24">
        <div className="section-container text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
            What We Offer
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-washi-50 sm:text-5xl">
            Our Services
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-sumi-300">
            Professional window cleaning solutions for every need in Loudoun County, Virginia.
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section className="jp-cloud-parallax bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              Core Solutions
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900">
              Complete Window Care
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sumi-500">
              From residential homes to commercial buildings, we provide comprehensive
              window cleaning services.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.title}
                className="group flex flex-col rounded border border-sumi-100 bg-washi-50 p-7 transition-shadow hover:shadow-md"
              >
                <service.icon className="h-6 w-6 text-indigo-600" />
                <h3 className="mt-5 font-display text-xl font-semibold text-sumi-900">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-sumi-500">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-sumi-600">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.to}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-sumi-800 transition-colors group-hover:text-indigo-600"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="border-t border-sumi-100 bg-washi-100 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              Beyond Windows
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900">
              Additional Services
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              Complete exterior cleaning solutions to keep your property looking its best.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ADDITIONAL.map((item) => (
              <div
                key={item.title}
                className="rounded border border-sumi-100 bg-washi-50 p-6"
              >
                <h3 className="font-display text-base font-semibold text-sumi-800">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-washi-50 py-20 lg:py-24">
        <div className="section-container">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sumi-400">
              How It Works
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-sumi-900">
              Our Process
            </h2>
            <p className="mt-4 text-base text-sumi-500">
              A systematic approach that ensures consistent, high-quality results every time.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.num} className="text-center">
                <span className="font-display text-3xl font-bold text-sumi-200">
                  {step.num}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-sumi-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sumi-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sumi-900 py-16">
        <div className="section-container text-center">
          <h2 className="font-display text-2xl font-bold text-washi-50 sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-sumi-300">
            Contact us today for a free estimate on any of our professional services.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link to="/free-estimate" className="inline-flex items-center justify-center gap-2 rounded-sm bg-washi-50 px-7 py-3 text-sm font-medium tracking-wide text-sumi-900 transition-colors hover:bg-washi-200">
              Get Free Estimate
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
            <a
              href="tel:5403351059"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-sumi-600 px-7 py-3 text-sm font-medium tracking-wide text-washi-200 transition-colors hover:border-sumi-400 hover:text-washi-50"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              (540) 335-1059
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
