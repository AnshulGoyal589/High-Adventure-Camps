import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Users, Award, Zap, Heart, Mountain, Shield, Leaf, Target, Building2, School, Check } from 'lucide-react';
import type { Metadata } from 'next';

// --- Data Structures based on Content Brief ---

// Data for the "Why Choose Us" section
const whyChooseUs = [
  {
    icon: Mountain,
    title: 'Pioneers of Camping in Manali',
    description: 'We were the first company to start adventure camping in Manali 25 years ago (Since 2000).',
  },
  {
    icon: Shield,
    title: '10+ Safe & Certified Adventure Setups',
    description: 'All high-rope activities are supervised by certified and highly trained professionals.',
  },
  {
    icon: School,
    title: 'Trusted by Top Schools & Govt.',
    description: 'Official partners for 500+ schools and managed Haryana Tourism camps since 2012.',
  },
  {
    icon: Heart,
    title: 'Luxury Camps + Rooms Available',
    description: 'Accommodation includes high-end Himachal-style tents and comfortable cottages for all groups.',
  },
  {
    icon: Users,
    title: 'Perfect for All Types of Groups',
    description: 'Expertise in handling school trips, college tours, family holidays, and corporate teams.',
  },
  {
    icon: Leaf,
    title: 'Bonfire, Music, & Himalayan Vibe',
    description: 'Providing the perfect blend of adventure, nature, and comfort with great dining options.',
  },
];

const adventureActivities = [
    'Zipline', 'Burma Bridge', 'Commando Net', 'Rock Climbing', 'Rappelling', 
    'Parallel Rope', 'Trekking', 'Tent Pitching', 'Team Building Games', 
    'Mountaineering Sessions', 'Nature Walks', 'Log Walk', 'Net walk', 
    'Balancing Beam', 'Bamboo bridge'
];

const servicesOffered = [
    'Luxury camping stays',
    'School/college educational camps',
    'Corporate team-building retreats',
    'Mountaineering training',
    'Group adventures',
    'Trekking & expeditions',
];


// --- Metadata Update ---
export const metadata: Metadata = {
  title: 'High Adventure Camps Manali – Best Camping & Adventure Camp in Manali (Since 2000)',
  description: 'Experience the Himalayas with the pioneers of camping in Manali. 25+ Years | 5 Lakh+ Guests | 500+ Schools.',
  openGraph: {
    title: 'High Adventure Camps Manali – Pioneers of Camping & Adventure (Since 2000)',
    description: '25+ Years of Trust | 5 Lakh+ Guests | Specializing in school and college adventure camps.',
  },
};

export default function About() {

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section - Updated with Key Stats & CTA */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-primary leading-tight">
            High Adventure Camps Manali
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-4xl leading-relaxed mb-6">
            Experience the Himalayas with the pioneers of camping in Manali. 
          </p>

          {/* Highlights Bar */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-lg font-semibold text-gray-700 mb-8">
            <span className="flex items-center gap-1 text-primary">
                <Award className="w-5 h-5"/> 25+ Years
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1">
                <Users className="w-5 h-5 text-green-600"/> 5 Lakh+ Guests
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1">
                <School className="w-5 h-5 text-indigo-600"/> 500+ Schools
            </span>
          </div>
          
          {/* Call to Action */}
          <a id="booking" href="#" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-12 px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
            Book Your Adventure Camp Now →
          </a>
        </div>
      </section>

      {/* About High Adventure Camps Manali (Detailed Text - Updated) */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            About High Adventure Camps Manali
          </h2>
          <div className="max-w-5xl mx-auto text-lg space-y-6 text-muted-foreground">
            <p>
              High Adventure Camps Manali is a name synonymous with trust, adventure, and Himalayan outdoor learning. We are proud to be among the first organizations to introduce adventure camping in Manali, serving travelers and student groups for over <span className="font-bold text-primary">25 years.</span>
            </p>
            <p>
              Since 2000, we have hosted more than <span className="font-bold text-primary">5 lakh guests</span> and organized <span className="font-bold text-primary">500+ school and educational adventure programs</span> across India, including camps for Haryana Tourism, Scouts & Guides of India, DPS Ghaziabad, YPS, St. George Mussoorie, Rajmata Pilani, Bishop Cotton Shimla, and many more.
            </p>
            <p>
              Our mission is to provide safe, professional, and enriching adventure experiences through well-designed learning modules, certified staff, and high-quality equipment.
            </p>

            <h3 className="text-2xl font-semibold pt-4 text-gray-800">We Offer:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {servicesOffered.map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-gray-700">{service}</span>
                    </div>
                ))}
            </div>

            <p className="pt-4">
              With unmatched hospitality, decades of experience, and a legacy of excellence, High Adventure Camps Manali remains the best camping choice in Kullu Manali.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Track Record (Updated Stats) */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Track Record & Credibility</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">25+</div>
              <p className="text-muted-foreground font-semibold">Years of Experience</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">5 Lakh+</div>
              <p className="text-muted-foreground font-semibold">Guests Hosted</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">500+</div>
              <p className="text-muted-foreground font-semibold">School & College Groups</p>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold text-primary">10+</div>
              <p className="text-muted-foreground font-semibold">Adventure Activities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (Combining highlights and values) */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose High Adventure Camps Manali?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                    key={idx} 
                    className="p-6 adventure-card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
                >
                  <Icon className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Adventure Activities We Offer */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6 text-center">Adventure Activities We Offer</h2>
          <p className="text-center text-lg text-muted-foreground mb-10">
            Experience fun, thrill & safety with our certified adventure instructors.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {adventureActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <Zap className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section (Kept as a final reassurance) */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Our Unwavering Commitment</h2>
          <ul className="space-y-4 text-lg text-muted-foreground">
            <li className="flex items-center justify-center gap-3">
              <Shield className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Uncompromising safety standards and professional gear</span>
            </li>
            <li className="flex items-center justify-center gap-3">
              <Building2 className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Fully managed operations for large school and corporate groups</span>
            </li>
            <li className="flex items-center justify-center gap-3">
              <Target className="w-6 h-6 text-primary flex-shrink-0" />
              <span>Authentic Himalayan outdoor learning programs</span>
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}