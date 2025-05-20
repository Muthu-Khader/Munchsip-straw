import React, { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const About = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState({
    timeline: false,
    mission: false,
    why: false,
    team: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            // Once it's visible, no need to observe it anymore
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const timelineEvents = [
    {
      year: "2021",
      title: "The Idea",
      description:
        "Our founder, Kasim, was inspired after seeing plastic waste on a beach vacation.",
      imageUrl: "/img/idea.jpg",
    },
    {
      year: "2022",
      title: "Research & Development",
      description:
        "A year of experimentation to create durable yet edible straw prototypes.",
      imageUrl: "/img/research.jpg",
    },
    {
      year: "2023",
      title: "First Product Launch",
      description:
        "MunchSip Vanilla Sip hit the market and sold out in two weeks.",
      imageUrl: "img/Product-launch.jpg",
    },
    {
      year: "2024",
      title: "Expansion",
      description:
        "Added a new Strawberry flavor and began partnering with eco-conscious cafés.",
      imageUrl: "img/expansion.jpg",
    },
    {
      year: "Present",
      title: "Impact",
      description:
        "Now selling in several parts of the state and preventing over half a million plastic straws from being used yearly.",
      imageUrl: "/img/impact.jpg",
    },
  ];

  const teamMembers = [
    {
      name: "Mohamed Kasim",
      role: "CEO",
      bio: "Passionate environmentalist with 3 years in sustainable product development. Kasim founded MunchSip after witnessing plastic pollution firsthand.",
      image: "img/kasim.jpg",
    },
    {
      name: "Muthu Khader Saheb",
      role: "COO",
      bio: "Food scientist with expertise in biodegradable materials. Muthu leads our innovative product development team.",
      image: "img/me.jpg",
    },

    {
      name: "Mohamed Nafees",
      role: "CMO",
      bio: "Creative strategist spreading the word about sustainable alternatives through engaging campaigns.",
      image: "img/nafees.jpg",
    },
  ];

  const whyChooseUs = [
    {
      title: "100% Biodegradable",
      description:
        "Our straws decompose naturally within 90 days, leaving no environmental impact.",
      icon: "🌎",
    },
    {
      title: "Food-Grade Materials",
      description:
        "Made from natural ingredients that are safe to consume after use.",
      icon: "✅",
    },
    {
      title: "Taste-Enhancing",
      description:
        "Flavors designed to complement, not overpower, your drinks.",
      icon: "🍹",
    },
    {
      title: "Plastic-Free Packaging",
      description:
        "Even our packaging is compostable, creating a true zero-waste product.",
      icon: "📦",
    },
  ];

  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary to-primary/70 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
              <p className="text-xl mb-8">
                From a simple idea to a movement changing how the world sips.
                Learn about our mission to eliminate single-use plastics with
                delicious, eco-friendly alternatives.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline section */}
        <section id="timeline" ref={timelineRef} className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Our Journey
            </h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-muted"></div>

              {timelineEvents.map((event, index) => (
                <div
                  key={event.year}
                  className={`flex flex-col md:flex-row items-center mb-16 md:mb-24 relative ${
                    visibleSections.timeline ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-1000`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* For odd items, image on left */}
                  {index % 2 === 0 && (
                    <div className="hidden md:block w-1/2 pr-12 text-right">
                      <div className="rounded-lg overflow-hidden shadow-md mb-4 md:ml-auto md:w-4/5">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Year marker */}
                  <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mb-4 md:mb-0 z-10">
                    <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-lg font-bold shadow-lg">
                      {event.year}
                    </div>
                  </div>

                  {/* Content - right side for odd, left for even */}
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0
                        ? "md:pl-12"
                        : "md:pr-12 md:text-right order-first md:order-last"
                    }`}
                  >
                    <div className="md:hidden rounded-lg overflow-hidden shadow-md mb-4 w-full">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>

                  {/* For even items, image on right */}
                  {index % 2 === 1 && (
                    <div className="hidden md:block w-1/2 pl-12">
                      <div className="rounded-lg overflow-hidden shadow-md mb-4 w-4/5">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission section */}
        <section id="mission" className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div
                className={`${
                  visibleSections.mission
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                } transition-all duration-1000`}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our Mission
                </h2>
                <p className="text-lg mb-6">
                  At MunchSip, we're on a mission to revolutionize single-use
                  items by creating products that don't just minimize
                  environmental impact, but eliminate it entirely through edible
                  alternatives.
                </p>
                <p className="text-lg mb-6">
                  We believe that sustainability shouldn't come at the cost of
                  enjoyment. That's why we've developed straws that are not only
                  eco-friendly but also enhance your drinking experience with
                  delicious flavors.
                </p>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="bg-primary/20 text-primary rounded-full p-1 mr-3">
                        ✓
                      </span>
                      <span>
                        Environmental responsibility in every decision
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/20 text-primary rounded-full p-1 mr-3">
                        ✓
                      </span>
                      <span>
                        Innovation that doesn't compromise planet or health
                      </span>
                    </li>
                    <li className="flex items-center">
                      <span className="bg-primary/20 text-primary rounded-full p-1 mr-3">
                        ✓
                      </span>
                      <span>Transparency in our ingredients and processes</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className={`${
                  visibleSections.mission
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                } transition-all duration-1000 delay-300`}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src="/img/vision.jpg"
                    alt="Our Mission"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                    <p className="mb-4">
                      We envision a world where single-use plastics are replaced
                      with earth-friendly alternatives that don't just reduce
                      waste, but eliminate it completely.
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-3xl font-bold text-primary">
                          0.5M
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Plastic straws prevented yearly
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary">5</div>
                        <div className="text-sm text-muted-foreground">
                          places and growing
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Edible Straws section */}
        <section id="why" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose Edible Straws?
            </h2>

            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${
                visibleSections.why ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000`}
            >
              {whyChooseUs.map((item, index) => (
                <div
                  key={item.title}
                  className="bg-muted rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" asChild>
                <a href="/products">Shop Our Straws</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section
          id="team"
          className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Meet Our Team
            </h2>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ${
                visibleSections.team ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000`}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeTeamMember === index ? "scale-[1.03]" : ""
                  }`}
                  onClick={() =>
                    setActiveTeamMember(
                      activeTeamMember === index ? null : index
                    )
                  }
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="relative h-64">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
                          activeTeamMember === index
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        <div className="text-white p-4">
                          <p>{member.bio}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-muted-foreground">{member.role}</p>
                      <p className="text-sm mt-2 text-primary">
                        {activeTeamMember === index
                          ? "Click to close"
                          : "Click for bio"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
