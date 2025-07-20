import React, { useState } from 'react';
import { KnightDoodle, DragonDoodle, CatDoodle, ProgressBar } from './components/DoodleIllustrations.jsx';
import { submitUserData, exportDemoData } from './src/utils/googleSheets.js';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

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
      // Submit to Google Sheets
      const result = await submitUserData(formData);
      
      if (result.success) {
        console.log('Form Data Submitted to Google Sheets:', formData);
        setFormSubmitted(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({ name: '', email: '' });
        }, 2000);
      } else {
        // Handle offline/error case
        if (result.fallbackData) {
          setFormSubmitted(true);
          console.log('Data saved locally:', result.fallbackData);
        } else {
          throw new Error(result.error);
        }
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportDemo = () => {
    try {
      const fileName = exportDemoData();
      alert(`Demo data exported as CSV: ${fileName}`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Error exporting data');
    }
  };

  const openGoogleSheet = () => {
    const sheetId = 'your-google-sheet-id-here'; // User will replace this
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-6 relative z-10">
        <div className="logo-text">PATH TO MC</div>
        <nav className="flex space-x-6 text-black font-medium">
          <button onClick={() => setShowForm(false)} className="hover:underline">Home</button>
          <button onClick={() => setShowAdmin(!showAdmin)} className="hover:underline">
            {showAdmin ? 'Hide Admin' : 'Admin'}
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
                <p className="text-lg">We'll give you a shout once we finish loading!</p>
                <p className="text-sm text-gray-600 mt-4">Your data has been saved securely.</p>
              </div>
            )}
          </div>
        )}

        {/* Admin Panel */}
        {showAdmin && (
          <div className="admin-panel mt-8 p-6 border-2 border-black rounded-lg bg-green-50 max-w-lg mx-auto">
            <h3 className="text-xl font-bold mb-4">📊 Google Sheets Admin</h3>
            <p className="text-sm text-gray-600 mb-4">Manage your signup data with Google Sheets</p>
            
            <div className="space-y-3">
              <button 
                onClick={openGoogleSheet}
                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition"
              >
                📊 Open Google Sheet (Live Data)
              </button>
              
              <button 
                onClick={handleExportDemo}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                📥 Export Demo CSV
              </button>
              
              <button 
                onClick={() => alert('Quick Setup:\n\n1. Create Google Sheet with headers: Name, Email, Signup Date\n2. Extensions → Apps Script\n3. Paste the code from GOOGLE_SETUP.md\n4. Deploy as Web App\n5. Update googleSheets.js with your URL\n\n✅ Takes 5 minutes!\n✅ Data appears instantly!\n✅ Never goes down!')}
                className="w-full bg-yellow-600 text-white font-bold py-2 px-4 rounded hover:bg-yellow-700 transition"
              >
                ⚙️ Quick Setup Guide
              </button>
              
              <div className="text-xs text-gray-600 mt-4 p-3 bg-white rounded border">
                <p><strong>✅ Why Google Sheets:</strong></p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Never goes down (unlike free databases)</li>
                  <li>Data appears instantly in spreadsheet</li>
                  <li>Easy to export, filter, analyze</li>
                  <li>Works with your Google subscription</li>
                  <li>No monthly limits or downtime</li>
                </ul>
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


