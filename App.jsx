import React, { useState } from 'react';
import { KnightDoodle, DragonDoodle, CatDoodle, ProgressBar } from './components/DoodleIllustrations.jsx';
import { submitUserData, exportSignupsCSV, getAllSignups, clearAllSignups } from './src/utils/emailSignups.js';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [signupCount, setSignupCount] = useState(0);

  const handleStartClick = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit via email
      const result = await submitUserData(formData);
      
      if (result.success) {
        console.log('Form Data Submitted via Email:', formData);
        setFormSubmitted(true);
        
        // Update signup count
        const { data } = getAllSignups();
        setSignupCount(data.length);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({ name: '', email: '' });
        }, 3000);
      } else {
        throw new Error(result.error);
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportSignups = () => {
    try {
      const fileName = exportSignupsCSV();
      if (fileName) {
        alert(`Signups exported to: ${fileName}`);
      } else {
        alert('No signups to export yet!');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting data');
    }
  };

  const handleViewSignups = () => {
    const { data: signups } = getAllSignups();
    if (signups.length === 0) {
      alert('No signups yet! Submit the form to test it.');
      return;
    }
    
    const signupList = signups.map(s => 
      `${s.name} (${s.email}) - ${s.timestamp}`
    ).join('\n');
    
    alert(`Current Signups (${signups.length}):\n\n${signupList}`);
  };

  const handleClearSignups = () => {
    if (window.confirm('Clear all stored signups? This cannot be undone.')) {
      clearAllSignups();
      setSignupCount(0);
      alert('All signups cleared!');
    }
  };

  // Get current signup count on component mount
  React.useEffect(() => {
    const { data } = getAllSignups();
    setSignupCount(data.length);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-10">
        <div className="logo-text">PATH TO MC</div>
        <nav className="flex space-x-6 text-black font-medium">
          <button onClick={() => setShowForm(false)} className="hover:underline">Home</button>
          <button onClick={() => setShowAdmin(!showAdmin)} className="hover:underline">
            {showAdmin ? 'Hide Admin' : 'Admin'}
            {signupCount > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{signupCount}</span>}
          </button>
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
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">🎉 Thanks for joining!</h2>
                <p className="text-lg mb-2">We'll give you a shout once we finish loading!</p>
                <p className="text-sm text-gray-600 mt-4">
                  ✅ Your signup was saved locally<br/>
                  📧 Email notification sent to admin
                </p>
              </div>
            )}
          </div>
        )}

        {/* Admin Panel */}
        {showAdmin && (
          <div className="admin-panel mt-8 p-6 border-2 border-black rounded-lg bg-blue-50 max-w-lg mx-auto">
            <h3 className="text-xl font-bold mb-4">📧 Email Admin Panel</h3>
            <p className="text-sm text-gray-600 mb-4">
              Simple email-based signup collection - no setup required!
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={handleViewSignups}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                📋 View Signups ({signupCount})
              </button>
              
              <button 
                onClick={handleExportSignups}
                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition"
              >
                📥 Export to CSV
              </button>
              
              <button 
                onClick={handleClearSignups}
                className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition"
              >
                🗑️ Clear All Data
              </button>
              
              <div className="text-xs text-gray-600 mt-4 p-3 bg-white rounded border">
                <p><strong>📧 How it works:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Form submission opens email with signup details</li>
                  <li>Data stored locally as backup</li>
                  <li>Export to CSV anytime</li>
                  <li>Zero setup required!</li>
                  <li>Works immediately</li>
                </ul>
                <p className="mt-2 text-orange-600">
                  <strong>⚙️ To receive emails:</strong> Update your email in emailSignups.js
                </p>
              </div>
            </div>
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


