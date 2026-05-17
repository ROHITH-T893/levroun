import { Linkedin, Github, Twitter, Mail, Send, Dribbble, ExternalLink } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import { Team } from '@/lib/models';
import staticTeamData from '@/data/team.json';

export const metadata = {
  title: 'Our Team - Levroun Enterprises | Meet Our Experts',
  description: 'Meet our talented team of developers, designers, and project managers dedicated to building innovative solutions.',
  keywords: 'team, developers, designers, engineers, Levroun Enterprises',
  openGraph: {
    title: 'Our Team - Levroun Enterprises',
    description: 'Meet our talented team of developers, designers, and project managers.',
    type: 'website',
    images: ['/images/og-banner.png'],
    url: 'https://levroun.tech/team',
  },
  alternates: {
    canonical: 'https://levroun.tech/team',
  },
};

export default async function TeamPage() {
  let team = [];
  try {
    await connectDB();
    team = await Team.find({}).sort({ createdAt: -1 });
    if (team.length === 0) team = staticTeamData;
  } catch (error) {
    console.error('Database fetch failed, falling back to static data:', error);
    team = staticTeamData;
  }

  return (
    <div className="min-h-screen bg-transparent text-[#e2e8f0] subpage-main">
      <div className="page-x pt-6 pb-16">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-['Righteous']">
            The Elite Squad
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-['Inter']">
            Talented developers, designers, and innovators working together to build
            extraordinary digital solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member) => (
            <div
              key={member._id || member.name}
              className="bg-[#0e0e1a] rounded-3xl border border-white/10 overflow-hidden hover:border-[#1AC2FF]/50 transition-all duration-300 group shadow-2xl"
            >
              <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img
                  src={member.image || '/images/team/default.png'} 
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-2 font-['Righteous']">
                  {member.name}
                </h2>
                <p className="text-[#1AC2FF] font-black uppercase tracking-widest text-[10px] mb-4">{member.role}</p>
                <p className="text-gray-400 mb-8 leading-relaxed text-sm h-20 overflow-hidden">{member.bio}</p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex gap-4">
                    {member.socialLinks?.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                        <Linkedin size={14} />
                      </a>
                    )}
                    {member.socialLinks?.github && (
                       <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                        <Github size={14} />
                      </a>
                    )}
                    {member.socialLinks?.twitter && (
                       <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                        <Twitter size={14} />
                      </a>
                    )}
                    {member.socialLinks?.dribbble && (
                       <a href={member.socialLinks.dribbble} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                        <Dribbble size={14} />
                      </a>
                    )}
                    {member.socialLinks?.behance && (
                       <a href={member.socialLinks.behance} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                        <ExternalLink size={14} title="Behance" />
                      </a>
                    )}
                  </div>
                  <a href={`mailto:${member.email}`} className="text-white hover:text-[#1AC2FF] font-black text-[10px] uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
                    CONTACT <Send size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
