import Hero3D from "@/components/3d/Hero3D";
import { ProfileImage } from "@/components/profile/ProfileImage";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedText } from "@/components/animations/AnimatedText";
import { ContactForm } from "@/components/contact/ContactForm";
import { BackgroundBlobs } from "@/components/animations/BackgroundBlobs";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { MagneticCard } from "@/components/animations/MagneticCard";
import { MagneticButton } from "@/components/animations/MagneticButton";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  Terminal,
  Server,
  Database,
  Layout,
  BriefcaseBusiness,
  GraduationCap
} from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Link from "next/link";

const skills = [
  { name: "JavaScript", icon: <Terminal className="w-5 h-5" /> },
  { name: "TypeScript", icon: <Terminal className="w-5 h-5" /> },
  { name: "React.js", icon: <Layout className="w-5 h-5" /> },
  { name: "Next.js", icon: <Layout className="w-5 h-5" /> },
  { name: "Node.js", icon: <Server className="w-5 h-5" /> },
  { name: "Express.js", icon: <Server className="w-5 h-5" /> },
  { name: "MongoDB", icon: <Database className="w-5 h-5" /> },
  { name: "ArrangoDB", icon: <Database className="w-5 h-5" /> },
  { name: "AWS EC2", icon: <Server className="w-5 h-5" /> },
  { name: "AWS S3", icon: <Database className="w-5 h-5" /> },
  { name: "Redux & Toolkit", icon: <Layout className="w-5 h-5" /> },
  { name: "RESTful APIs", icon: <Server className="w-5 h-5" /> },
];

const experiences = [
  {
    role: "IT Manager",
    company: "ANOZZI TRADING LLP, Malappuram",
    period: "Apr 2024 - Present",
    desc: [
      "Managing IT infrastructure including servers, network systems, hardware, and software.",
      "Performing server maintenance, updates, and ensuring network security and uptime.",
      "Managing website hosting, domain configuration, and deployment pipelines.",
      "Handling LAN/WAN setup, routers, switches, and firewalls.",
    ],
  },
  {
    role: "Software Development Engineer - 1",
    company: "Duple IT Solutions Pvt. Ltd, Mohali",
    period: "Oct 2022 - Apr 2024",
    desc: [
      "Worked on backend and frontend of E-commerce and Salon Booking projects.",
      "Attended client calls to gather requirements and deliver demos.",
      "Involved in application deployment from development to production environments.",
      "Utilized MongoDB and ArangoDB for structured and graph-based data.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Brototype, Calicut",
    period: "Apr 2022 - Sept 2022",
    desc: [
      "Developed Hotel Booking and E-commerce applications.",
      "Worked on backend using Node.js, Express, and MongoDB.",
      "Built responsive frontend interfaces with React.",
    ],
  },
  {
    role: "Hardware & Software Technician",
    company: "IT TECH, Mannarkkad",
    period: "March 2021 - Apr 2022",
    desc: [
      "Diagnosed/repaired hardware issues.",
      "Installed OS, CCTV systems, networking solutions, and biometric systems.",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Computer Application (BCA)",
    intuition: "IGNOU",
    period: "July 2026 - Present",
  },
  {
    degree: "Bachelor of Commerce (B.com)",
    intuition: "University of Calicut",
    period: "June 2018 - March 2021",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <BackgroundBlobs />
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <Hero3D />
        
        <div className="container relative z-10 mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0.2}>
         <h1 className="text-5xl md:text-7xl font-bold font-outfit mb-6 tracking-tight">
  Hi, I'm <br className="hidden md:block" />
<div className="flex flex-wrap gap-x-4 mt-2">
  <AnimatedText 
    text="Muhammed" 
    delay={0.2} 
   className="bg-gradient-to-r from-slate-100 to-slate-500 bg-clip-text bg-[length:200%_auto] animate-text-gradient" 
  />
  <AnimatedText 
    text="Mubashir" 
    delay={0.4} 
     className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text bg-[length:200%_auto] animate-text-gradient" 
    
  />
</div>
</h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-8">
              Full Stack Developer
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
              Detail-oriented developer with a strong focus on frontend and backend using React.js, Next.js, and Node.js. Adept at designing, implementing, and optimizing scalable web applications.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Link href="#contact" className="px-8 py-3.5 rounded-full bg-primary text-white font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                Get in Touch
              </Link>
              <Link href="#experience" className="px-8 py-3.5 rounded-full border-2 border-gray-200 dark:border-gray-800 font-medium hover:border-primary dark:hover:border-primary transition-all duration-300">
                View Work
              </Link>
              <MagneticButton href="https://drive.google.com/file/d/1eJsTHUYqt3GHARXWKE79L8Ui6BmQ27Bc/view?usp=drive_link">
                Resume
              </MagneticButton>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.4} className="flex justify-center md:justify-end">
            <ProfileImage />
          </AnimatedSection>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center text-gray-400 dark:text-gray-500">
          <span className="text-sm mb-2 font-medium">Scroll</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-current rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-black/20 backdrop-blur-md relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-16 md:gap-32">
            <AnimatedSection delay={0.1}>
              <div className="flex flex-col items-center group cursor-default">
                <AnimatedCounter value={20} suffix="+" className="text-5xl md:text-7xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-br from-primary to-indigo-500 mb-2 group-hover:scale-105 transition-transform duration-500" />
                <span className="text-gray-600 dark:text-gray-400 font-medium uppercase tracking-widest text-sm">Projects Completed</span>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="flex flex-col items-center group cursor-default">
                <AnimatedCounter value={10} suffix="+" className="text-5xl md:text-7xl font-black font-outfit text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-500 mb-2 group-hover:scale-105 transition-transform duration-500" />
                <span className="text-gray-600 dark:text-gray-400 font-medium uppercase tracking-widest text-sm">Happy Clients</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-4xl font-bold font-outfit mb-16 text-center">
              Technical <span className="text-primary">Skills</span>
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <AnimatedSection delay={index * 0.1} key={skill.name}>
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-white dark:bg-[#111111] border border-gray-100 dark:border-gray-800/50 hover:border-primary/50 dark:hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-xl group">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-black group-hover:bg-primary/10 transition-colors">
                    <div className="text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors">
                      {skill.icon}
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Experience */}
            <div>
              <AnimatedSection>
                <div className="flex items-center gap-4 mb-12">
                  <BriefcaseBusiness className="w-8 h-8 text-primary" />
                  <h2 className="text-4xl font-bold font-outfit">Experience</h2>
                </div>
              </AnimatedSection>
              
              <div className="space-y-12 border-l-2 border-gray-100 dark:border-gray-800 ml-4 pl-8 relative">
                {experiences.map((exp, index) => (
                  <AnimatedSection delay={index * 0.2} key={index} className="relative">
                    <div className="absolute w-4 h-4 rounded-full bg-primary -left-[39px] top-1.5 ring-4 ring-white dark:ring-[#0a0a0a] z-20" />
                    <MagneticCard className="bg-white dark:bg-[#111111] p-8 rounded-2xl hover:shadow-xl transition-shadow group border border-gray-100 dark:border-gray-800">
                      <span className="text-sm font-medium text-primary mb-2 block">{exp.period}</span>
                      <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">{exp.company}</p>
                      <ul className="space-y-2">
                        {exp.desc.map((item, i) => (
                          <li key={i} className="text-gray-600 dark:text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </MagneticCard>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <AnimatedSection>
                <div className="flex items-center gap-4 mb-12">
                  <GraduationCap className="w-8 h-8 text-primary" />
                  <h2 className="text-4xl font-bold font-outfit">Education</h2>
                </div>
              </AnimatedSection>
              
              <div className="space-y-12 border-l-2 border-gray-100 dark:border-gray-800 ml-4 pl-8 relative">
                {education.map((edu, index) => (
                  <AnimatedSection delay={index * 0.2} key={index} className="relative">
                    <div className="absolute w-4 h-4 rounded-full bg-indigo-500 -left-[39px] top-1.5 ring-4 ring-white dark:ring-[#0a0a0a] z-20" />
                    <MagneticCard className="bg-white dark:bg-[#111111] p-8 rounded-2xl hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-800">
                      <span className="text-sm font-medium text-indigo-500 mb-2 block">{edu.period}</span>
                      <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{edu.intuition}</p>
                    </MagneticCard>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold font-outfit mb-4">
                Let's <span className="text-primary">Connect</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Feel free to reach out for collaborations or just a friendly hello.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact Info (Left Column) */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection delay={0.1}>
                <a href="mailto:mubashir.dev369@gmail.com" className="flex items-center gap-6 p-6 bg-white dark:bg-[#111111] rounded-2xl shadow-sm hover:shadow-xl transition-all group border border-transparent hover:border-gray-200 dark:hover:border-gray-800">
                  <div className="w-14 h-14 shrink-0 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all">
                    <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">Email</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 break-all">mubashir.dev369@gmail.com</p>
                  </div>
                </a>
              </AnimatedSection>
              
              <AnimatedSection delay={0.2}>
                <a href="https://wa.me/918156901246" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 bg-white dark:bg-[#111111] rounded-2xl shadow-sm hover:shadow-xl transition-all group border border-transparent hover:border-gray-200 dark:hover:border-gray-800">
                  <div className="w-14 h-14 shrink-0 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-green-500 transition-all">
                    <Phone className="w-6 h-6 text-green-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">Phone</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+91 8156901246</p>
                  </div>
                </a>
              </AnimatedSection>
              
              <AnimatedSection delay={0.3}>
                <a href="https://mubashir.co.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 bg-white dark:bg-[#111111] rounded-2xl shadow-sm hover:shadow-xl transition-all group border border-transparent hover:border-gray-200 dark:hover:border-gray-800">
                  <div className="w-14 h-14 shrink-0 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500 transition-all">
                    <Globe className="w-6 h-6 text-purple-500 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">Website</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">mubashir.co.in</p>
                  </div>
                </a>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="flex gap-4 pt-4 px-2">
                  <a href="https://www.linkedin.com/in/mubashir369" target="_blank" rel="noopener noreferrer" className="p-4 bg-white dark:bg-[#111111] border border-gray-100 dark:border-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 hover:shadow-md hover:-translate-y-1 transition-all group">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/_mubashir369" target="_blank" rel="noopener noreferrer" className="p-4 bg-white dark:bg-[#111111] border border-gray-100 dark:border-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 hover:border-pink-600 dark:hover:border-pink-400 hover:shadow-md hover:-translate-y-1 transition-all group">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/mubashir369" target="_blank" rel="noopener noreferrer" className="p-4 bg-white dark:bg-[#111111] border border-gray-100 dark:border-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-900 dark:hover:border-gray-500 hover:shadow-md hover:-translate-y-1 transition-all group">
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form (Right Column) */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Muhammed Mubashir. All rights reserved.</p>
      </footer>
    </div>
  );
}
