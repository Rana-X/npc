// Simple Google Sheets integration using Google Apps Script
// Just collect names and emails directly in your Google Sheet

// Configuration - You'll get this from Google Apps Script
const GOOGLE_SHEETS_CONFIG = {
  // Your Google Apps Script Web App URL (from deployment)
  WEB_APP_URL: 'https://script.google.com/macros/s/your-script-id/exec',
  
  // Your Google Sheet ID (optional, for opening sheet)
  SHEET_ID: 'your-google-sheet-id-here'
};

// Submit user data to Google Sheets via Google Apps Script
export const submitUserData = async (userData) => {
  try {
    const response = await fetch(GOOGLE_SHEETS_CONFIG.WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script handles CORS
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        timestamp: new Date().toISOString()
      })
    });

    // Note: no-cors mode means we can't read the response, but that's OK
    // Google Apps Script will handle the data insertion
    console.log('Data submitted to Google Sheets');
    return { success: true, message: 'Data submitted successfully' };

  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    
    // Fallback: Store locally 
    const fallbackData = {
      name: userData.name,
      email: userData.email,
      timestamp: new Date().toLocaleDateString()
    };
    
    localStorage.setItem('pendingSignup', JSON.stringify(fallbackData));
    
    return { 
      success: false, 
      error: 'Offline - data saved locally',
      fallbackData 
    };
  }
};

// Export demo data as CSV (for testing)
export const exportDemoData = () => {
  const demoData = [
    'Name,Email,Signup Date',
    'John Doe,john@example.com,2025-01-20',
    'Jane Smith,jane@example.com,2025-01-20',
    'Mike Johnson,mike@example.com,2025-01-20'
  ].join('\n');

  const blob = new Blob([demoData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `path-to-mc-demo-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);

  return a.download;
}; 