# Admin Panel Setup Guide

## Overview
Your portfolio now has a fully functional admin panel that allows you to:
- Upload and manage resumes
- Upload and manage documents
- Authenticate securely with username/password from environment variables

## Getting Started

### 1. Configure Environment Variables

Edit `.env.local` and set your credentials:

```env
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_secure_password
NEXTAUTH_SECRET=generate_a_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

**Important**: Generate a strong random string for `NEXTAUTH_SECRET`. You can use:
```bash
openssl rand -base64 32
```

### 2. Access the Admin Panel

Navigate to: `http://localhost:3000/admin`

Login with the credentials you set in `.env.local`

## Features

### Resume Management
- **Upload Resume**: Upload PDF resumes
- **Set Active**: Mark one resume as active (this will be the one displayed on your portfolio)
- **Delete**: Remove old resumes
- **View**: Preview uploaded resumes

### Document Management
- **Upload Documents**: Upload any type of document
- **Categorize**: Organize documents by category
- **Delete**: Remove unwanted documents
- **View**: Preview uploaded documents

## Data Storage

### JSON Storage
All metadata is stored in `data/portfolio.json` with the following structure:

```json
{
  "resumes": [
    {
      "id": "1234567890",
      "filename": "resume.pdf",
      "uploadDate": "2026-01-21T...",
      "path": "/assets/resumes/resume_1234567890.pdf",
      "active": true
    }
  ],
  "documents": [
    {
      "id": "1234567891",
      "title": "My Certificate",
      "filename": "certificate.pdf",
      "uploadDate": "2026-01-21T...",
      "path": "/assets/documents/doc_1234567891.pdf",
      "category": "certificates"
    }
  ],
  "projects": [],
  "experiences": [],
  "skills": []
}
```

### File Storage
- **Resumes**: Stored in `public/assets/resumes/`
- **Documents**: Stored in `public/assets/documents/`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check authentication status

### Resume Management
- `GET /api/resumes` - Get all resumes
- `POST /api/upload/resume` - Upload a new resume
- `DELETE /api/resumes?id={id}` - Delete a resume
- `PATCH /api/resumes` - Set active resume
- `GET /api/resume/active` - Get the currently active resume

### Document Management
- `GET /api/documents` - Get all documents
- `POST /api/upload/document` - Upload a new document
- `DELETE /api/documents?id={id}` - Delete a document

## Using the Active Resume in Your Portfolio

To display the active resume download button in your portfolio, add this to your component:

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function ResumeButton() {
  const [resumePath, setResumePath] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/resume/active')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setResumePath(data.resume.path);
        }
      })
      .catch(console.error);
  }, []);

  if (!resumePath) return null;

  return (
    <a
      href={resumePath}
      download
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      Download Resume
    </a>
  );
}
```

## Security Considerations

1. **Never commit `.env.local`** to version control
2. **Use strong passwords** for admin access
3. **Change default credentials** immediately
4. **Enable HTTPS** in production
5. **Consider adding rate limiting** for login attempts
6. **Use JWT tokens** for production (current implementation uses simple cookies)

## Extending the System

The data structure supports additional fields:
- `projects`: Store project information
- `experiences`: Store work experience
- `skills`: Store skills and technologies

You can extend the admin panel to manage these as well.

## Troubleshooting

### Can't login
- Check `.env.local` exists and has correct credentials
- Verify credentials don't have extra spaces
- Clear browser cookies and try again

### Files not uploading
- Check file permissions on `public/assets/` directories
- Verify file size limits (default Next.js limit is 4MB for API routes)
- Check browser console for errors

### Data not persisting
- Ensure `data/` directory has write permissions
- Check `data/portfolio.json` exists and is valid JSON

## Production Deployment

Before deploying to production:

1. Set environment variables in your hosting platform
2. Ensure `data/` directory is writable
3. Consider using a database instead of JSON for better scalability
4. Implement proper session management with JWT
5. Add CSRF protection
6. Enable HTTPS only cookies

Enjoy your dynamic portfolio admin panel! 🚀
