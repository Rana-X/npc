// Simple email-based signup collection
// No setup required - works immediately!

// Submit user data via email
export const submitUserData = async (userData) => {
  try {
    const timestamp = new Date().toLocaleString();
    
    // Create email content
    const subject = `🎮 New Path to MC Signup: ${userData.name}`;
    const body = `New signup for Path to MC!

📋 DETAILS:
Name: ${userData.name}
Email: ${userData.email}
Date: ${timestamp}

🎯 ACTION NEEDED:
Add this to your Google Sheet:
- Name: ${userData.name}
- Email: ${userData.email}  
- Date: ${timestamp}

---
Sent from Path to MC Landing Page
https://rana-x.github.io/npc/`;

    // Create mailto link
    const mailtoLink = `mailto:ranadaytoday@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Also save locally as backup
    const signups = JSON.parse(localStorage.getItem('pathToMcSignups') || '[]');
    const newSignup = {
      name: userData.name,
      email: userData.email,
      timestamp: timestamp,
      id: Date.now()
    };
    signups.push(newSignup);
    localStorage.setItem('pathToMcSignups', JSON.stringify(signups));
    
    // Open email client
    window.open(mailtoLink);
    
    console.log('Signup saved locally and email opened:', newSignup);
    return { 
      success: true, 
      message: 'Signup saved! Email notification opened.',
      data: newSignup
    };

  } catch (error) {
    console.error('Error processing signup:', error);
    return { 
      success: false, 
      error: 'Error processing signup',
      fallbackData: userData
    };
  }
};

// Get all stored signups
export const getAllSignups = () => {
  try {
    const signups = JSON.parse(localStorage.getItem('pathToMcSignups') || '[]');
    return { success: true, data: signups };
  } catch (error) {
    console.error('Error getting signups:', error);
    return { success: false, data: [] };
  }
};

// Export signups as CSV
export const exportSignupsCSV = () => {
  try {
    const { data: signups } = getAllSignups();
    
    if (signups.length === 0) {
      // Export demo data if no real signups
      return exportDemoData();
    }
    
    // Create CSV content
    const csvContent = [
      'Name,Email,Signup Date',
      ...signups.map(signup => `"${signup.name}","${signup.email}","${signup.timestamp}"`)
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `path-to-mc-signups-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    return a.download;
  } catch (error) {
    console.error('Export error:', error);
    return null;
  }
};

// Export demo data as CSV (for testing)
export const exportDemoData = () => {
  const demoData = [
    'Name,Email,Signup Date',
    'John Doe,john@example.com,2025-01-20',
    'Jane Smith,jane@example.com,2025-01-20',
    'Mike Johnson,mike@example.com,2025-01-21'
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

// Clear all stored signups (admin function)
export const clearAllSignups = () => {
  localStorage.removeItem('pathToMcSignups');
  return { success: true, message: 'All signups cleared' };
}; 