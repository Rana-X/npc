# 📊 Simple Google Sheets Setup Guide

Set up your landing page to save user signups directly to Google Sheets. Super simple and reliable!

## 🎯 Why Google Sheets?

- ✅ **Never Goes Down**: Unlike free databases that have limits
- ✅ **Instant Data**: Names and emails appear immediately in your sheet
- ✅ **Easy to Use**: View, filter, export directly in Google Sheets
- ✅ **Free Forever**: No API limits for basic usage
- ✅ **Your Data**: Stays in your Google account

---

## 📋 Setup Steps (5 minutes)

### Step 1: Create Your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "Blank" to create a new sheet
3. **Rename** it to: `Path to MC Signups`
4. **Add headers** in Row 1:
   - **A1**: `Name`
   - **B1**: `Email` 
   - **C1**: `Signup Date`

### Step 2: Get Your Sheet ID

1. Look at your Google Sheet URL:
   ```
   https://docs.google.com/spreadsheets/d/1ABC123xyz/edit
                                        ↑
                                This is your Sheet ID
   ```
2. **Copy the Sheet ID** (the long code between `/d/` and `/edit`)

### Step 3: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. **Delete** the default code and **paste this**:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add new row with user data
    sheet.appendRow([
      data.name,
      data.email,
      new Date().toLocaleDateString()
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function doGet(e) {
  return ContentService
    .createTextOutput("Path to MC Signup Collector is working!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. **Save** the script (Ctrl/Cmd + S)
4. **Name** it: `Path to MC Collector`

### Step 4: Deploy the Script

1. Click **Deploy** → **New Deployment**
2. **Settings**:
   - **Type**: Web app
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
3. Click **Deploy**
4. **Copy the Web App URL** (it looks like):
   ```
   https://script.google.com/macros/s/AKfycby...xyz/exec
   ```

### Step 5: Update Your Code

1. Open `src/utils/googleSheets.js` in your project
2. **Replace** the placeholder values:

```javascript
const GOOGLE_SHEETS_CONFIG = {
  WEB_APP_URL: 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec',
  SHEET_ID: 'YOUR_ACTUAL_SHEET_ID'
};
```

### Step 6: Test It!

1. **Start your dev server**: `npm run dev`
2. **Go to**: `http://localhost:3000`
3. **Fill out the form** with test data
4. **Check your Google Sheet** - the data should appear instantly! ✨

---

## 🎉 You're Done!

Your landing page now saves all signups directly to your Google Sheet:

- **Name** → Column A
- **Email** → Column B  
- **Date** → Column C

### Admin Features:
- Click **"Admin"** in your site navigation
- **"Open Google Sheet"** → View live data
- **"Export Demo CSV"** → Download sample data

---

## 📈 Managing Your Data

**In Google Sheets you can:**
- Sort and filter signups
- Export to Excel/CSV
- Create charts and analytics
- Share with your team
- Set up email notifications

**Example Google Sheet:**
```
Name           | Email              | Signup Date
---------------|--------------------|-----------
John Doe       | john@example.com   | 1/20/2025
Jane Smith     | jane@example.com   | 1/20/2025
Mike Johnson   | mike@example.com   | 1/21/2025
```

---

## 🔒 Security Notes

- ✅ Google handles all security
- ✅ Only you can access your sheet
- ✅ HTTPS encrypted data transfer
- ✅ No database passwords to manage

---

## 🆘 Troubleshooting

**Form not working?**
1. Check your Web App URL in `googleSheets.js`
2. Make sure script is deployed as "Anyone" can access
3. Try redeploying the Google Apps Script

**Data not appearing?**
1. Check your Google Sheet has the right headers
2. Refresh your Google Sheet
3. Look for errors in browser console (F12)

**Still having issues?**
- The data gets saved locally as backup
- Check browser localStorage for pending signups

---

## 💰 Cost: $0

- Google Sheets is free
- Google Apps Script is free
- GitHub Pages hosting is free
- **Total cost: $0/month** 🎉

**Your landing page + Google Sheets = bulletproof signup system! 🛡️** 