# Dynamic Admin Panel Guide

## Overview
Your portfolio is now fully dynamic! You can manage all content (Profile, Projects, Experience, Skills, Resumes, and Documents) directly from the admin panel without touching any code.

## Accessing the Admin Panel
1. Navigate to `/admin` on your website
2. Login with your credentials (set in Vercel environment variables)

## Managing Content

### Profile Tab
Update your personal information:
- Name, Job Title, Bio
- Contact information (Email, Phone, Location)
- Social links (LinkedIn, GitHub, Twitter, Website)

### Projects Tab
Add, edit, or delete projects:
- **Title**: Project name
- **Category**: Technology category (e.g., "RAG / LangChain / Redis")
- **Description**: Brief project description
- **Technologies**: Comma-separated list of technologies used
- **Achievements**: One achievement per line
- **Period**: Project timeline (e.g., "Jan 2024 - Mar 2024")
- **GitHub/Demo**: Optional links to code or live demo

### Experience Tab
Manage your work history:
- **Company**: Company name
- **Position**: Your job title
- **Period**: Employment dates
- **Location**: Work location
- **Description**: Brief role description
- **Responsibilities**: One responsibility per line

### Skills Tab
Organize your skills by category:
- **Category Name**: e.g., "Machine Learning", "Programming Languages"
- **Skills**: Comma-separated list of skills
- Categories are displayed with icons and color gradients on the frontend

### Resumes Tab
Upload and manage your resume PDFs:
- Upload new resume versions
- Set one resume as "Active" (downloadable from website)
- Delete old versions

### Documents Tab
Upload supporting documents (certificates, projects, etc.):
- Add title and category for each document
- Documents are stored and can be shared via direct links

## Data Storage
All content is stored in `/data/portfolio.json` and automatically syncs with your live website.

## Environment Variables (Vercel)
Make sure these are set in your Vercel project:
- `ADMIN_USERNAME` - Your admin login username
- `ADMIN_PASSWORD` - Your admin login password
- `NEXTAUTH_SECRET` - Secret key for authentication
- `NEXTAUTH_URL` - Your production URL (e.g., https://yoursite.vercel.app)

## Tips
- Changes are reflected immediately on the website
- Use the debug logs in Vercel to troubleshoot login issues
- Keep your portfolio.json backed up (it's in git)
- All file uploads go to `/public/assets/` directory

## Next Steps
1. Login to your admin panel
2. Update your profile information
3. Add/edit your projects, experience, and skills
4. Upload your resume
5. Your changes will be live immediately!

## Support
If you encounter any issues:
1. Check Vercel runtime logs for errors
2. Verify environment variables are set correctly
3. Ensure you're using the correct credentials
