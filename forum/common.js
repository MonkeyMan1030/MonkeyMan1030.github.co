export const db = supabase.createClient('https://qdtnlhznfikgunmpwdkg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkdG5saHpuZmlrZ3VubXB3ZGtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMyMzU1MTQsImV4cCI6MTk5ODgxMTUxNH0.XZgle7ntlzrbQSXztvPZvwLquaz4syGOcm6tMV2dct0')

export function formatDate(date) {
    return date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" })
}