import { useEffect, useRef, useState } from "react";
import { ChevronRight, Zap, Users, Briefcase, Target, Sparkles, Award, CheckCircle, ArrowRight } from "lucide-react";

interface ScrollElement {
  element: Element;
  id: string;
}

export default function Index() {
  const [scrollElements, setScrollElements] = useState<ScrollElement[]>([]);

  useEffect(() => {
    // Collect all scroll-fade-in elements
    const elements = Array.from(document.querySelectorAll(".scroll-fade-in")).map((el) => ({
      element: el,
      id: el.id || Math.random().toString(),
    }));
    setScrollElements(elements);

    // Initial check
    checkScroll();
  }, []);

  const checkScroll = () => {
    scrollElements.forEach(({ element }) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("in-view");
      } else {
        element.classList.remove("in-view");
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [scrollElements]);

  return (
    <div className="dark bg-background text-foreground min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F096448223b0e406a8a0785e611ecead3%2F5f40d12f388f4d9db63be26e6876548a?format=webp&width=200"
              alt="SDC Logo"
              className="h-10 w-auto"
            />
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              SDC
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-sm font-medium hover:text-accent transition">Home</a>
            <a href="#about" className="text-sm font-medium hover:text-accent transition">About</a>
            <a href="#programs" className="text-sm font-medium hover:text-accent transition">Programs</a>
            <a href="#achievements" className="text-sm font-medium hover:text-accent transition">Achievements</a>
            <a href="#contact" className="text-sm font-medium hover:text-accent transition">Contact</a>
          </div>
          <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-semibold transition-all transform hover:scale-105">
            Join Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative w-full pt-32 pb-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center animate-fade-in">
            <div className="w-32 h-32 glass rounded-2xl flex items-center justify-center glow-cyan">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F096448223b0e406a8a0785e611ecead3%2F5f40d12f388f4d9db63be26e6876548a?format=webp&width=400"
                alt="SDC Logo"
                className="w-24 h-24"
              />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Your Gateway to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Future-Ready Skills
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Helping students become industry-ready through skills, mentorship & real-world exposure
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-semibold transition-all transform hover:scale-105 shadow-lg glow-cyan flex items-center justify-center gap-2">
              Join SDC <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 rounded-lg glass font-semibold transition-all transform hover:scale-105 border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-white/10 flex items-center justify-center gap-2">
              Explore Programs <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="glass rounded-lg p-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="text-3xl font-bold text-cyan-400">117+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="glass rounded-lg p-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="text-3xl font-bold text-cyan-400">50+</div>
              <div className="text-sm text-muted-foreground">Events Hosted</div>
            </div>
            <div className="glass rounded-lg p-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="text-3xl font-bold text-cyan-400">National</div>
              <div className="text-sm text-muted-foreground">Reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 scroll-fade-in">The Challenge & Our Solution</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto scroll-fade-in" style={{ animationDelay: "0.1s" }}>
              We identified critical gaps in student preparation and created a comprehensive solution
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Problems */}
            <div className="scroll-fade-in">
              <h3 className="text-2xl font-bold mb-8 text-red-400">The Problem</h3>
              <div className="space-y-4">
                {[
                  { icon: "90%", label: "Students lack job-ready skills, mentors, and real project exposure" },
                  { icon: "85%", label: "Have no professional network, while 75% jobs come via referrals" },
                  { icon: "70%", label: "Realize too late weak resumes, low confidence, missed roles" },
                ].map((item, i) => (
                  <div key={i} className="glass rounded-lg p-4 border-l-2 border-red-500 hover:border-red-400 transition">
                    <div className="text-2xl font-bold text-red-400 mb-2">{item.icon}</div>
                    <p className="text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div className="scroll-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-2xl font-bold mb-8 text-cyan-400">Our Solution</h3>
              <div className="space-y-4">
                {[
                  { icon: Zap, label: "Skills & Mentorship", desc: "Students gain practical skills with clear career guidance" },
                  { icon: Users, label: "Network & Exposure", desc: "Access to alumni, industry insights, and real opportunities" },
                  { icon: CheckCircle, label: "Confidence & Outcomes", desc: "Stronger communication, interviews, and placement readiness" },
                ].map((item, i) => (
                  <div key={i} className="glass rounded-lg p-4 border-l-2 border-cyan-500 hover:border-cyan-400 transition">
                    <div className="flex items-start gap-4">
                      <item.icon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-lg mb-1">{item.label}</h4>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About SDC */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">What is SDC?</h2>
              <div className="space-y-6 text-muted-foreground">
                <div className="glass rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Student-Powered Initiative</h3>
                  <p>The Skill Development Cell (SDC) is a student-driven platform that bridges the gap between academic learning and real-world professional skills, helping students gain practical exposure during college.</p>
                </div>
                <div className="glass rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Learning by Doing Model</h3>
                  <p>Students work on live projects, real challenges, and team tasks, allowing them to develop practical knowledge and leadership experience instead of only attending theoretical sessions.</p>
                </div>
                <div className="glass rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Capability Over Certification</h3>
                  <p>We focus on building execution ability, problem-solving skills, and decision-making, because professional success depends on capability, not just degrees.</p>
                </div>
              </div>
            </div>
            <div className="scroll-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="glass rounded-2xl p-8 glow-cyan-lg">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Industry Exposure</h4>
                      <p className="text-muted-foreground">Students gain early exposure to professional environments and industry-relevant skills</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Career Clarity</h4>
                      <p className="text-muted-foreground">Clear pathways to identify and pursue your ideal career direction</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Real Projects</h4>
                      <p className="text-muted-foreground">Hands-on experience with actual business challenges and live projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/3">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 scroll-fade-in">Mission & Vision</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Mission */}
            <div className="scroll-fade-in">
              <div className="glass rounded-2xl p-8 h-full">
                <h3 className="text-3xl font-bold mb-6 text-cyan-400">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To bridge the skill gap and transform every willing student into an industry-ready professional
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    "Provide comprehensive skill development",
                    "Bridge the execution gap with real-world scenarios",
                    "Create equal opportunities for all students",
                    "Build a supportive industry-ready ecosystem",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="scroll-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="glass rounded-2xl p-8 h-full glow-cyan">
                <h3 className="text-3xl font-bold mb-6 text-cyan-400">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  SDC envisions becoming the premier skill development ecosystem in our college and beyond
                </p>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4 border-l-2 border-cyan-500">
                    <h4 className="font-semibold mb-2">Comprehensive Platform</h4>
                    <p className="text-sm text-muted-foreground">Access to essential technical skills, industry knowledge, internships, and live projects</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border-l-2 border-blue-500">
                    <h4 className="font-semibold mb-2">Strategic Expansion</h4>
                    <p className="text-sm text-muted-foreground">Collaborations with other colleges building a network that amplifies learning opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 scroll-fade-in">Our Structure</h2>
            <p className="text-muted-foreground text-lg scroll-fade-in" style={{ animationDelay: "0.1s" }}>
              Organized teams working together for maximum impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Admin Department",
                role: "Operations & Execution",
                items: ["Event logistics and scheduling", "Official coordination", "On-ground management", "Internal coordination"],
                icon: "⚙️",
              },
              {
                title: "Content & Knowledge",
                role: "Academic Core",
                items: ["Topic ideation and research", "Workshop design", "Speaker curation", "Mentor programs"],
                icon: "📚",
              },
              {
                title: "Marketing Department",
                role: "Outreach & Visibility",
                items: ["Event promotions", "Branding & creatives", "Social media", "Video editing"],
                icon: "📢",
              },
            ].map((dept, i) => (
              <div key={i} className="scroll-fade-in glass-hover rounded-2xl p-8" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                <div className="text-4xl mb-4">{dept.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{dept.title}</h3>
                <p className="text-cyan-400 text-sm font-semibold mb-6">{dept.role}</p>
                <ul className="space-y-3">
                  {dept.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 scroll-fade-in">Flagship Programs</h2>
            <p className="text-muted-foreground text-lg scroll-fade-in" style={{ animationDelay: "0.1s" }}>
              Industry-relevant skill development sessions and competitions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Master Deck Making",
                subtitle: "Presentation & Strategy",
                desc: "Learn to create impactful presentations through structured storytelling and consulting frameworks",
                stats: "117+ Registrations • 84+ Live Attendees",
              },
              {
                title: "Skill Series (KSS)",
                subtitle: "Knowledge Sharing Sessions",
                desc: "10+ expert-led sessions covering Financial Modeling, Data Analytics, Case Solving, and more",
                stats: "30+ Topics Covered • 100+ Participants",
              },
              {
                title: "Case Competitions",
                subtitle: "Problem Solving Workshop",
                desc: "Win case competitions with Parv Goyel's proven framework and real-world case analysis",
                stats: "National Level • 30+ Participants",
              },
              {
                title: "Communication Workshop",
                subtitle: "Professional Skills",
                desc: "Enhance articulation, active listening, and public speaking confidence for professional engagement",
                stats: "Interactive Simulations • Proven Results",
              },
            ].map((prog, i) => (
              <div key={i} className="scroll-fade-in glass-hover rounded-2xl p-8" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">{prog.title}</h3>
                  <p className="text-cyan-400 text-sm font-semibold">{prog.subtitle}</p>
                </div>
                <p className="text-muted-foreground mb-6">{prog.desc}</p>
                <p className="text-xs text-muted-foreground border-t border-white/10 pt-4">{prog.stats}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 scroll-fade-in">Member Achievements</h2>
            <p className="text-muted-foreground text-lg scroll-fade-in" style={{ animationDelay: "0.1s" }}>
              National recognition across prestigious institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { institution: "IIM Calcutta", event: "The Pivot Point Challenge", rank: "National Rank 3", prize: "INR 15K" },
              { institution: "Sri Venkateswara College", event: "Startup Block Relay", rank: "National Rank 2", prize: "INR 2.5K" },
              { institution: "DTU", event: "Marketing Maverick", rank: "National Finalist (600+)", prize: "INR 75K" },
              { institution: "BIMTECH", event: "Stratvyuh Challenge", rank: "National Finalist (260+)", prize: "INR 30K" },
              { institution: "OP Jindal Global", event: "Catalyst Competition", rank: "National Finalist (130+)", prize: "INR 30K" },
              { institution: "Lady Shri Ram College", event: "Eco Prayog", rank: "National Finalist (1100+)", prize: "INR 50K" },
            ].map((ach, i) => (
              <div key={i} className="scroll-fade-in glass rounded-lg p-6 border-l-4 border-cyan-500 hover:border-cyan-300 transition" style={{ animationDelay: `${0.05 * (i + 1)}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{ach.institution}</h3>
                    <p className="text-sm text-muted-foreground">{ach.event}</p>
                  </div>
                  <Award className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rank:</span>
                    <span className="font-semibold text-cyan-400">{ach.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prize Pool:</span>
                    <span className="font-semibold text-green-400">{ach.prize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Guidance */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 scroll-fade-in">Explore Career Paths</h2>
            <p className="text-muted-foreground text-lg scroll-fade-in" style={{ animationDelay: "0.1s" }}>
              Get guidance on your ideal career domain
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Consulting", icon: "🎯", desc: "Business problem solving & strategy" },
              { name: "Finance", icon: "💰", desc: "Financial analysis & investments" },
              { name: "Marketing", icon: "📊", desc: "Brand strategy & consumer insights" },
              { name: "HR Analytics", icon: "👥", desc: "Talent management & people insights" },
            ].map((career, i) => (
              <div key={i} className="scroll-fade-in glass-hover rounded-xl p-6" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                <div className="text-4xl mb-4">{career.icon}</div>
                <h3 className="text-xl font-bold mb-2">{career.name}</h3>
                <p className="text-muted-foreground text-sm">{career.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Plan */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 scroll-fade-in">2025-26 Roadmap</h2>
            <p className="text-muted-foreground text-lg scroll-fade-in" style={{ animationDelay: "0.1s" }}>
              Our ambitious plans for the year ahead
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "10+ Knowledge Sharing Sessions", desc: "Financial Modeling, Data Analytics, Generative AI, Case Solving, Professional Deck Making", emoji: "📚" },
              { title: "2 Flagship Events", desc: "Bilingual Case Competition & Industry Speaker Sessions with top professionals", emoji: "🎪" },
              { title: "Career Guidance Series", desc: "Sessions with alumni and industry experts in Consulting, Finance, Marketing, AI & Data", emoji: "🗣️" },
              { title: "1 Live Industry Project", desc: "Real-world business challenges with hands-on experience and professional work exposure", emoji: "🚀" },
            ].map((item, i) => (
              <div key={i} className="scroll-fade-in glass-hover rounded-2xl p-8" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 scroll-fade-in">
            Join us. Build skills.{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Grow with SDC.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 scroll-fade-in" style={{ animationDelay: "0.1s" }}>
            Don't let another semester pass without building real industry-ready skills. Start your transformation today.
          </p>
          <button className="px-10 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold text-lg transition-all transform hover:scale-105 shadow-lg glow-cyan-lg scroll-fade-in" style={{ animationDelay: "0.2s" }}>
            Join SDC Today <ArrowRight className="inline ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F096448223b0e406a8a0785e611ecead3%2F5f40d12f388f4d9db63be26e6876548a?format=webp&width=200"
                  alt="SDC Logo"
                  className="h-8 w-auto"
                />
                <span className="font-bold text-lg">SDC</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Bridging the gap between academic learning and industry readiness.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#hero" className="hover:text-cyan-400 transition">Home</a></li>
                <li><a href="#about" className="hover:text-cyan-400 transition">About</a></li>
                <li><a href="#programs" className="hover:text-cyan-400 transition">Programs</a></li>
                <li><a href="#achievements" className="hover:text-cyan-400 transition">Achievements</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-cyan-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Events</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4 text-muted-foreground">
                <a href="#" className="hover:text-cyan-400 transition text-sm">Twitter</a>
                <a href="#" className="hover:text-cyan-400 transition text-sm">LinkedIn</a>
                <a href="#" className="hover:text-cyan-400 transition text-sm">Instagram</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
            <p>&copy; 2025 Skill Development Cell. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-400 transition">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
