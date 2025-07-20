import { createClient } from '@supabase/supabase-js'
import * as XLSX from 'xlsx'

// Supabase configuration
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Submit user data to database
export const submitUserData = async (userData) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name: userData.name,
          email: userData.email,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Error submitting data:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Network error:', err)
    return { success: false, error: 'Network error occurred' }
  }
}

// Get all users from database
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching data:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Network error:', err)
    return { success: false, error: 'Network error occurred' }
  }
}

// Export data to Excel
export const exportToExcel = async () => {
  try {
    const result = await getAllUsers()
    
    if (!result.success) {
      throw new Error(result.error)
    }

    const users = result.data
    
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(users.map(user => ({
      Name: user.name,
      Email: user.email,
      'Signup Date': new Date(user.created_at).toLocaleDateString()
    })))

    // Create workbook
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'User Signups')

    // Save file
    const fileName = `path-to-mc-signups-${new Date().toISOString().split('T')[0]}.xlsx`
    XLSX.writeFile(workbook, fileName)

    return { success: true, fileName }
  } catch (err) {
    console.error('Export error:', err)
    return { success: false, error: err.message }
  }
}

// For development/demo purposes - you can use this to create a local Excel file
export const exportDemoData = () => {
  const demoData = [
    { Name: 'John Doe', Email: 'john@example.com', 'Signup Date': '2025-01-20' },
    { Name: 'Jane Smith', Email: 'jane@example.com', 'Signup Date': '2025-01-20' },
  ]

  const worksheet = XLSX.utils.json_to_sheet(demoData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Demo Signups')
  
  const fileName = `path-to-mc-demo-${new Date().toISOString().split('T')[0]}.xlsx`
  XLSX.writeFile(workbook, fileName)
  
  return fileName
} 