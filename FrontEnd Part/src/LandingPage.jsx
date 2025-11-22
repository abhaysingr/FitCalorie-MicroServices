import React, { useState, useContext } from 'react'; 
import { AuthContext } from 'react-oauth2-code-pkce'; 
import { Star, ChevronDown, Menu, X, Activity, Sparkles, TrendingUp, Timer, Flame } from 'lucide-react';
import './index.css';
import HeroImage from './assets/Image1.jpg'
import img1 from './assets/photo--1.avif'; 
import img2 from './assets/photo-2.avif';
import img3 from './assets/photo-3.avif';
import img4 from './assets/photo-4.avif';
import img10 from './assets/photo-10f.avif';
import img11 from './assets/photo11.jpg';
import img100 from './assets/cycling.png';
import img101 from './assets/running.png';
import img102 from './assets/watch.png';
export default function LandingPage() {
    // 1. IMPORT LOGIN LOGIC
    const { logIn } = useContext(AuthContext); // Get the logIn function from Code 1 context

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    // const [activityTime, setActivityTime] = useState('');
    // const [calories, setCalories] = useState('');
    // const [activityType, setActivityType] = useState('cycling');
    // const [aiRecommendation, setAiRecommendation] = useState('');
    // const [loading, setLoading] = useState(false);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const Photos = [
  { id: 1, name: "John", image: img1 },
  { id: 2, name: "Sarah", image: img2 },
  { id: 3, name: "John", image: img3 },
  { id: 4, name: "Sarah", image: img4 },
];

const articles = [
        {
            image: img100,
            title: "Maximize calories burned while cycling",
            excerpt: "Discover interval training techniques and optimal cycling zones to burn more calories per ride.",
            author: "Dr. A. Smith",
            role: "Sports Physician",
            // Using a placeholder service for author image - replace with your own imports if you have them
            authorImg: "https://i.pravatar.cc/150?u=a", 
            icon: <span className="ml-2 text-gray-400">🕒</span> // Clock icon from your image
        },
        {
            image: img101,
            title: "5 running workouts that torch calories",
            excerpt: "Learn about HIIT, tempo runs, and hill sprints that maximize your calorie burn and improve endurance.",
            author: "Coach B. Jones",
            role: "Running Coach",
            authorImg: "https://i.pravatar.cc/150?u=b",
            icon: <span className="ml-2">🔥</span> // Fire icon from your image
        },
        {
            image: img102,
            title: "Track and achieve your weight goals",
            excerpt: "How to use calorie tracking data from your workouts to create an effective weight loss strategy.",
            author: "Nutritionist C. Lee",
            role: "Dietitian",
            authorImg: "https://i.pravatar.cc/150?u=c",
            icon: null
        }
    ];

//     const getAIRecommendation = async () => {
//         if (!activityTime || !calories) {
//             alert('Please enter both time duration and calories');
//             return;
//         }

//         setLoading(true);
//         setAiRecommendation('');

//         try {
//             const response = await fetch("https://api.anthropic.com/v1/messages", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     model: "claude-sonnet-4-20250514",
//                     max_tokens: 1000,
//                     messages: [
//                         {
//                             role: "user",
//                             content: `As a fitness expert, provide personalized recommendations to improve ${activityType} performance. 
// Current Stats:
// - Activity: ${activityType}
// - Duration: ${activityTime} minutes
// - Calories Burned: ${calories} calories

// Please provide:
// 1. Performance analysis (is this good for the time invested?)
// 2. 3-4 specific actionable tips to burn more calories and improve efficiency
// 3. Recommended training adjustments

// Keep the response concise, motivating, and under 200 words.`
//                         }
//                     ],
//                 })
//             });

//             const data = await response.json();
//             const recommendation = data.content
//                 .filter(item => item.type === "text")
//                 .map(item => item.text)
//                 .join("\n");

//             setAiRecommendation(recommendation);
//         } catch (error) {
//             setAiRecommendation('Unable to generate recommendation. Please try again.');
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

    // Helper function for all Login CTAs
    const handleLoginClick = () => {
        logIn(); // Calls the login function from AuthContext (Code 1 logic)
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-xl font-bold text-blue-600 flex items-center gap-2 ">
                            <Activity className="w-7 h-7" />
                            FitCalorie
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
                            <a href="#ai-coach" className="text-gray-700 hover:text-blue-600">AI Coach</a>
                            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600">How it Works</a>
                            <a href="#activities" className="text-gray-700 hover:text-blue-600">Activities</a>
                            <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Success Stories</a>
                            <a href="#faq" className="text-gray-700 hover:text-blue-600">FAQ</a>
                        </div>
                        
                        {/* Desktop Login Button */}
                        <button 
                            className="hidden md:block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
                            onClick={handleLoginClick} 
                        >
                            LOGIN
                        </button>

                        {/* Mobile Menu Button */}
                        <button 
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="#features" className="block px-3 py-2 text-gray-700">Features</a>
                            <a href="#ai-coach" className="block px-3 py-2 text-gray-700">AI Coach</a>
                            <a href="#how-it-works" className="block px-3 py-2 text-gray-700">How it Works</a>
                            <a href="#activities" className="block px-3 py-2 text-gray-700">Activities</a>
                            <a href="#testimonials" className="block px-3 py-2 text-gray-700">Success Stories</a>
                            <a href="#faq" className="block px-3 py-2 text-gray-700">FAQ</a>
                            <button 
                                className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold mt-2"
                                onClick={handleLoginClick} // <--- CTA 6: Mobile Menu Login
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-6 h-6 text-yellow-300" />
                            <span className="text-yellow-300 font-semibold">Powered by AI</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Calorie tracking<br />for <span className="underline decoration-4">real workouts</span>
                        </h1>
                        <p className="text-xl mb-8 text-blue-100">
                            Track calories burned during cycling, running, and get AI-powered recommendations to improve performance
                        </p>
                        <button 
                            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                            onClick={handleLoginClick} 
                        >
                            Start Tracking Free
                        </button>
                    </div>
                    <div className="flex justify-center">
                       {/* <div className="w-64 h-96 bg-gray-200 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden relative">
                       <img src={HeroImage} alt="Gradient placeholder" className="w-full h-full object-cover"/>
                       </div> */}
                    </div>
                </div>
            </section>

            {/* Ratings Section (Unchanged) */}
            <section className="py-12 bg-gray-900 text-white text-center transform hover:scale-101 transition cursor-pointer">
                <div className="flex justify-center mb-3 ">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <h2 className="text-3xl font-bold mb-2">3.5 Million 5-Star Ratings</h2>
                <p className="text-gray-400">Trusted by athletes and fitness enthusiasts worldwide</p>
            </section>

            {/* AI Coach Section */}
            <section id="ai-coach" className="py-20 px-4 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Sparkles className="w-8 h-8 text-yellow-300" />
                            <h2 className="text-4xl md:text-5xl font-bold">AI-Powered Fitness Coach</h2>
                        </div>
                        <p className="text-xl text-blue-100">
                            Get personalized recommendations to maximize your workout efficiency
                        </p>
                    </div>
                    <button 
                        className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition text-center mx-auto block transform hover:scale-105"
                        onClick={handleLoginClick} 
                    >
                        Login to AI Coach
                    </button>
                </div>
            </section>

    <section id="how-it-works" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-20">Hit your fitness goals in 1-2-3</h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-center justify-between relative">
          <div className="relative w-full md:w-1/3 p-4 group">
            <div className="bg-white border-2 border-gray-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col items-center text-center relative z-10 transition-transform hover:-translate-y-1">
              <div className="absolute -top-6 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 border-gray-800">
                1
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-3">Track Your<br />Workout</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Log your cycling, running, and workout sessions with accurate calorie calculations
                </p>
              </div>
            </div>
            <div className="absolute hidden md:flex right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-0 text-gray-800">
               <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="12" x2="58" y2="12" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 4L58 12L50 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
            <div className="absolute md:hidden bottom-0 left-1/2 -translate-x-1/2 translate-y-full py-2 text-gray-800">
               <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="12" y1="0" x2="12" y2="38" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 30L12 38L20 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>
          <div className="relative w-full md:w-1/3 p-4 group">
            <div className="bg-white border-2 border-gray-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 flex flex-col items-center text-center relative z-10 transition-transform hover:-translate-y-1">
              <div className="absolute -top-6 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 border-gray-800">
                2
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-3">Get AI insights<br />& recommendations</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Receive personalized tips to improve workout efficiency and burn more calories
                </p>
              </div>
            </div>
            <div className="absolute hidden md:flex right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-0 text-gray-800">
               <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="12" x2="58" y2="12" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 4L58 12L50 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
            <div className="absolute md:hidden bottom-0 left-1/2 -translate-x-1/2 translate-y-full py-2 text-gray-800">
               <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="12" y1="0" x2="12" y2="38" stroke="currentColor" strokeWidth="2" />
                  <path d="M4 30L12 38L20 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
          </div>
          <div className="relative w-full md:w-1/3 p-4 group">
            <div className="bg-blue-50 border-2 border-blue-600 rounded-lg shadow-[4px_4px_0px_0px_#2563eb] p-8 flex flex-col items-center text-center relative z-10 transition-transform hover:-translate-y-1">
              <div className="absolute -top-6 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2 border-blue-600 ring-4 ring-white">
                3
              </div>

              <div className="mt-4">
                <h3 className="text-2xl font-bold mb-3">Achieve better<br />results faster</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Reach your weight loss and fitness goals with data-driven insights
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

            {/* Activities Section - Card Based (Unchanged) */}
            <section id="activities" className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">
                        Track every activity,<br />burn & achieve more
                    </h2>
                    <p className="text-gray-600 text-center mb-12">From cycling to swimming, track all your workouts with precision</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Cycling', icon: '🚴', color: 'from-blue-500 to-blue-600' },
                            { name: 'Running', icon: '🏃', color: 'from-green-500 to-green-600' },
                            { name: 'Walking', icon: '🚶', color: 'from-purple-500 to-purple-600' },
                            { name: 'Swimming', icon: '🏊', color: 'from-cyan-500 to-cyan-600' },
                            { name: 'Gym', icon: '🏋️', color: 'from-red-500 to-red-600' },
                            { name: 'Yoga', icon: '🧘', color: 'from-pink-500 to-pink-600' },
                            { name: 'Hiking', icon: '⛰️', color: 'from-orange-500 to-orange-600' },
                            { name: 'Dancing', icon: '💃', color: 'from-indigo-500 to-indigo-600' }
                        ].map((activity, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className={`bg-gradient-to-br ${activity.color} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                                    <div className="relative">
                                        <div className="w-32 h-32 mx-auto bg-white/20 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
                                            <div className="text-5xl transform transition-transform duration-300 group-hover:scale-125">
                                                {activity.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-white font-bold text-xl text-center">{activity.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section (Unchanged) */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center transform hover:scale-101 transition cursor-pointer">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Flame className="w-12 h-12 text-orange-300" />
                        <h2 className="text-5xl font-bold">
                            If you're moving, we're tracking
                        </h2>
                    </div>
                    <p className="text-2xl text-blue-100">Monitor every calorie burned across 100+ activities</p>
                </div>
            </section>

            {/* Testimonials - Card Based (Unchanged) */}
            <section id="testimonials" className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">Calorie tracking works,<br />here's the proof</h2>
                    <p className="text-gray-600 text-center mb-12">Real athletes, real transformations</p>
                    
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
  {Photos.map((photo) => (
    <div key={photo.id} className="group cursor-pointer">
      <div className="aspect-square bg-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <img
          src={photo.image}
          alt={photo.name}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  ))}
</div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                quote: "Lost 35 pounds tracking my cycling workouts! The AI recommendations helped me optimize my training intensity.",
                                author: "Mike T.",
                                role: "Cyclist"
                            },
                            {
                                quote: "The calorie tracking is incredibly accurate. I've improved my running pace by 2 minutes per mile!",
                                author: "Sarah L.",
                                role: "Marathon Runner"
                            },
                            {
                                quote: "AI insights showed me I wasn't pushing hard enough. Now I burn 40% more calories per session!",
                                author: "James K.",
                                role: "Gym Enthusiast"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 h-full border-2 border-blue-100 overflow-hidden">
                                    <div className="transform transition-transform duration-300 group-hover:scale-105">
                                        <div className="flex justify-center mb-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                                        <div className="border-t-2 border-blue-200 pt-4">
                                            <p className="font-bold text-gray-900">{testimonial.author}</p>
                                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Getting Started */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">
                            Starting is the hard part.<br />We make it easy →
                        </h2>
                        <button 
                            className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-110"
                            onClick={handleLoginClick} // <--- CTA 3: Get Started
                        >
                            Get Started
                        </button>
                    </div>
                    <div className="bg-white rounded-3xl p-8 text-gray-800 overflow-hidden group">
                        <div className="w-full h-66 bg-gray-200 rounded-2xl mb-2 flex items-center justify-center overflow-hidden">
                            <img src={img10} alt="" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Detail (Unchanged) */}
            <section id="features" className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4">Knowledge is power</h2>
                    <p className="text-gray-600 text-center mb-12">Understand your performance with detailed analytics</p>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
                        <div className="w-full h-80 bg-gray-200 rounded-3xl flex items-center justify-center overflow-hidden group">
                            <img src={img11} alt="Analytics Dashboard Image" /> 
                        </div>
                        <div>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Track distance, speed, duration, elevation, heart rate, and calories burned for every 
                                workout. Our AI algorithms provide accurate calorie calculations and personalized recommendations.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Whether you're cycling through the city, running marathons, or hitting the gym, 
                                get AI-powered insights that help you optimize training and reach goals faster.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integration Partners (Unchanged) */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <h3 className="text-center text-gray-600 mb-8">Integrates with your favorite devices</h3>
                    <div className="flex flex-wrap justify-center items-center gap-12">
                        {['Garmin', 'Fitbit', 'Apple Watch', 'Strava'].map((brand) => (
                            <div key={brand} className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition cursor-pointer">{brand}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section (Unchanged) */}
            <section id="faq" className="py-20 px-4 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Q&A</h2>
                    
                    <div className="space-y-4">
                        {[
                            {
                                q: "How does the AI recommendation feature work?",
                                a: "Our AI analyzes your workout data (duration, calories, activity type) and provides personalized recommendations to improve efficiency, burn more calories, and optimize your training based on exercise science."
                            },
                            {
                                q: "How accurate is the calorie tracking?",
                                a: "Our calorie calculations use scientifically-backed formulas that factor in your weight, age, gender, activity type, intensity, and duration for maximum accuracy."
                            },
                            {
                                q: "Can I track multiple activities in one day?",
                                a: "Absolutely! Track unlimited workouts per day including cycling, running, walking, swimming, and over 100 other activities."
                            },
                            {
                                q: "Does it work with my fitness watch?",
                                a: "Yes! We integrate with Garmin, Fitbit, Apple Watch, Strava, and most major fitness trackers to automatically sync your workout data."
                            }
                        ].map((faq, index) => (
                            <div key={index} className="border-b border-gray-200">
                                <button
                                    className="w-full py-4 flex justify-between items-center text-left hover:text-blue-600 transition"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="font-semibold text-lg">{faq.q}</span>
                                    <ChevronDown 
                                        className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                {openFaq === index && (
                                    <div className="pb-4 text-gray-600">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expert Tips (Unchanged) */}
            <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-12">From our experts</h2>

                <div className="space-y-8">
                    {articles.map((article, index) => (
                        <div key={index} className="group cursor-pointer">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="md:flex h-full">
                                    
                                    {/* Image Section */}
                                    <div className="md:w-1/3 h-64 md:h-auto relative overflow-hidden">
                                        <img 
                                            src={article.image} 
                                            alt={article.title} 
                                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8 md:w-2/3 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {article.title} {article.icon}
                                            </h3>
                                            <p className="text-gray-600 mb-6 leading-relaxed">
                                                {article.excerpt}
                                            </p>
                                        </div>

                                        {/* Footer: Read More + Author */}
                                        <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
                                            <a href="#" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
                                                Read More 
                                                <span className="transform transition-transform group-hover:translate-x-1">→</span>
                                            </a>

                                            {/* Author Profile */}
                                            <div className="flex items-center gap-3">
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-sm font-bold text-gray-900">{article.author}</p>
                                                    <p className="text-xs text-gray-500">{article.role}</p>
                                                </div>
                                                <img 
                                                    src={article.authorImg} 
                                                    alt={article.author} 
                                                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

            {/* Final CTA */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="w-10 h-10 text-yellow-300" />
                        <h2 className="text-5xl font-bold">Ready to start your fitness journey?</h2>
                    </div>
                    <p className="text-xl mb-8 text-blue-100">Join millions tracking their workouts with AI-powered insights</p>
                    <button 
                        className="bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                        onClick={handleLoginClick}
                    >
                        Login - It's Free
                    </button>
                </div>
            </section>

            {/* Footer (Unchanged) */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                            <Activity className="w-6 h-6" />
                            FitCalorie
                        </h3>
                        <p className="text-gray-400">AI-powered calorie tracking for smarter workouts</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition">Features</a></li>
                            <li><a href="#" className="hover:text-white transition">AI Coach</a></li>
                            <li><a href="#" className="hover:text-white transition">Activities</a></li>
                            <li><a href="#" className="hover:text-white transition">Premium</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition">About</a></li>
                            <li><a href="#" className="hover:text-white transition">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition">Press</a></li>
                            <li><a href="#" className="hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                            <li><a href="#" className="hover:text-white transition">Terms</a></li>
                            <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 mb-4 md:mb-0">© 2025 FitCalorie. All rights reserved.</p>
                    <div className="flex space-x-6">
                        {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                            <a key={social} href="#" className="text-gray-400 hover:text-white transition">
                                {social.charAt(0)}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}