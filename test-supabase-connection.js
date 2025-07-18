const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with credentials from .env file
const supabaseUrl = 'https://xkhiqbxcfiusvgklgojj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhraGlxYnhjZml1c3Zna2xnb2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDgwNTEsImV4cCI6MjA1OTY4NDA1MX0.K23iAfWaLZ8FNb98YyFQfO3U3sAkc-Qb17Y5LRADW_g';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  console.log(`URL: ${supabaseUrl}`);
  
  try {
    // Try to fetch a single row from the conversations table
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      return;
    }
    
    console.log('✅ Connection successful!');
    console.log('Data:', data);
  } catch (err) {
    console.error('Exception occurred:', err.message);
  }
}

testConnection();