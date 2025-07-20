import React, { useState } from 'react';
import { KnightDoodle, DragonDoodle, CatDoodle, ProgressBar } from './components/DoodleIllustrations.jsx';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleStartClick = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-10">
        <div className="logo-text">NPC</div>
        <nav className="flex space-x-6 text-black font-medium">
          <a href="/" className="hover:underline">Home</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Floating doodles */}
      <div className="absolute top-20 left-10 z-0">
        <KnightDoodle size={60} />
      </div>
      <div className="absolute top-32 right-16 z-0">
        <DragonDoodle size={80} />
      </div>
      <div className="absolute bottom-32 left-20 z-0">
        <CatDoodle size={50} />
      </div>
      <div className="absolute top-60 left-1/3 z-0">
        <KnightDoodle size={40} />
      </div>
      <div className="absolute bottom-20 right-32 z-0">
        <DragonDoodle size={60} />
      </div>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 relative z-10">
        {!showForm ? (
          <>
            {/* Hero section */}
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="main-title">PATH TO MC</h1>
              
              <p className="text-xl md:text-2xl text-black mb-8 font-medium max-w-2xl mx-auto">
                Level up your money game with the ultimate financial RPG for Gen Z
              </p>
              
              <p className="text-lg text-gray-700 mb-12 max-w-xl mx-auto">
                Turn budgeting into boss battles, savings into skill points, and financial goals into epic quests. 
                Your journey to financial mastery starts here.
              </p>

              {/* Progress indicator */}
              <div className="mb-12">
                <p className="text-black font-bold mb-4 text-lg">Your Journey Progress</p>
                <div className="flex justify-center">
                  <ProgressBar progress={50} />
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={handleStartClick}
                className="start-button"
              >
                START
              </button>
            </div>

            {/* Features section */}
            <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
              <div className="p-6">
                <div className="text-2xl font-bold mb-3">🎮 Gamified Learning</div>
                <p className="text-gray-700">
                  Complete quests, earn XP, and unlock achievements as you master personal finance
                </p>
              </div>
              <div className="p-6">
                <div className="text-2xl font-bold mb-3">💰 Real Money Skills</div>
                <p className="text-gray-700">
                  Learn budgeting, investing, and saving through interactive challenges and simulations
                </p>
              </div>
              <div className="p-6">
                <div className="text-2xl font-bold mb-3">🏆 Level Up System</div>
                <p className="text-gray-700">
                  Track your progress and compete with friends as you build your financial empire
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="form-container p-8 border border-black rounded-lg shadow-lg bg-white">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center mb-4">Join the Quest!</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="input-field"
                  required
                />
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Thanks for joining!</h2>
                <p className="text-lg">We'll give you a shout once we finish loading!</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 relative z-10">
        <p>&copy; 2025 Path to MC. Ready to become the main character of your financial story?</p>
      </footer>
    </div>
  );
}

export default App;


