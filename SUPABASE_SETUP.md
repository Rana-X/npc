# 🚀 Supabase Setup Guide

Follow these steps to connect your landing page to a free Supabase database for collecting emails and names.

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Create a new organization (free tier)

## Step 2: Create New Project

1. Click "New Project"
2. Choose your organization
3. Enter project details:
   - **Name**: `path-to-mc-signups`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

## Step 3: Get API Keys

1. In your Supabase dashboard, go to **Settings** > **API**
2. Copy these values:
   - **Project URL** (looks like: `https://abcd1234.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## Step 4: Create Database Table

1. Go to **Table Editor** in sidebar
2. Click "Create a new table"
3. Configure table:
   - **Name**: `users`
   - **Description**: User signups from landing page
4. Add columns (click + to add each):
   
   | Name | Type | Default | Primary | Required |
   |------|------|---------|---------|----------|
   | id | uuid | gen_random_uuid() | ✅ | ✅ |
   | name | text | - | - | ✅ |
   | email | text | - | - | ✅ |
   | created_at | timestamptz | now() | - | ✅ |

5. Click "Save"

## Step 5: Configure Row Level Security (Optional but Recommended)

1. Go to **Authentication** > **Policies**
2. Find your `users` table
3. Click "New Policy"
4. Choose "Insert" policy
5. Name: `Allow anonymous inserts`
6. Policy: `true` (allows anyone to insert)
7. Click "Review" then "Save Policy"

## Step 6: Update Your Code

1. Open `src/utils/database.js`
2. Replace the placeholder values:

```javascript
// Replace these with your actual Supabase values
const supabaseUrl = 'https://your-actual-project-id.supabase.co'
const supabaseAnonKey = 'your-actual-anon-key-here'
```

3. Save the file

## Step 7: Test the Integration

1. Install new dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Test form submission on your landing page
4. Check Supabase dashboard > **Table Editor** > **users** to see submissions

## Step 8: Deploy to GitHub Pages

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add Supabase database integration"
   git push
   ```

2. Enable GitHub Pages:
   - Go to your GitHub repo
   - Settings > Pages
   - Source: GitHub Actions
   - Your workflow will automatically deploy

## Excel Export Feature

Once connected, you can:
- View all submissions in Supabase dashboard
- Use the "Admin" button on your site to export to Excel
- Download data as CSV from Supabase directly

## 🔒 Security Notes

- The anon key is safe to expose in frontend code
- It only allows the permissions you set in Row Level Security
- Never expose your service role key in frontend code
- Consider adding rate limiting for production use

## 💰 Pricing

- **Free Tier**: 500MB database, 2GB bandwidth/month
- **Pro Tier**: $25/month for more resources
- Perfect for collecting landing page signups!

## 🆘 Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Discord Community](https://discord.supabase.com/)
- [GitHub Issues](https://github.com/your-repo/issues) 