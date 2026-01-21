# 🎯 Admin Panel Quick Reference

## Access
- **URL**: `http://localhost:3000/admin` (or your domain/admin)
- **Credentials**: Set in `.env.local`

## Default Credentials (CHANGE THESE!)
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
```

## Quick Commands

### Setup
```bash
./setup-admin.sh
```

### Start Development Server
```bash
npm run dev
```

### Generate New Auth Secret
```bash
openssl rand -base64 32
```

## File Structure
```
portfolio-gc/
├── .env.local              # Your credentials (DO NOT COMMIT)
├── data/
│   └── portfolio.json      # All portfolio data
├── public/
│   └── assets/
│       ├── resumes/        # Resume files (PDF)
│       └── documents/      # Other documents
├── app/
│   ├── admin/
│   │   └── page.tsx        # Admin panel UI
│   ├── api/
│   │   ├── auth/           # Authentication endpoints
│   │   ├── resumes/        # Resume management
│   │   ├── documents/      # Document management
│   │   └── upload/         # File upload endpoints
│   └── components/
│       └── ResumeDownloadButton.tsx  # Dynamic resume button
└── lib/
    └── data.ts             # Data management utilities
```

## Common Tasks

### Upload a Resume
1. Go to `/admin`
2. Click "Resumes" tab
3. Choose PDF file
4. Click "Upload Resume"
5. It will automatically become the active resume

### Upload a Document
1. Go to `/admin`
2. Click "Documents" tab
3. Enter title and category
4. Choose file
5. Click "Upload Document"

### Change Active Resume
1. Go to `/admin`
2. Click "Resumes" tab
3. Click "Set Active" on the desired resume

### Delete Files
1. Go to `/admin`
2. Navigate to the appropriate tab
3. Click "Delete" on any item

## API Endpoints

### Public
- `GET /api/resume/active` - Get current active resume

### Protected (requires authentication)
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Check auth status
- `GET /api/resumes` - List all resumes
- `POST /api/upload/resume` - Upload resume
- `DELETE /api/resumes?id={id}` - Delete resume
- `PATCH /api/resumes` - Set active resume
- `GET /api/documents` - List all documents
- `POST /api/upload/document` - Upload document
- `DELETE /api/documents?id={id}` - Delete document

## JSON Data Structure

```json
{
  "resumes": [
    {
      "id": "timestamp",
      "filename": "original_name.pdf",
      "uploadDate": "ISO date string",
      "path": "/assets/resumes/resume_timestamp.pdf",
      "active": true
    }
  ],
  "documents": [
    {
      "id": "timestamp",
      "title": "Document Title",
      "filename": "original_name.pdf",
      "uploadDate": "ISO date string",
      "path": "/assets/documents/doc_timestamp.pdf",
      "category": "certificates"
    }
  ],
  "projects": [],
  "experiences": [],
  "skills": []
}
```

## Security Checklist

- [ ] Changed default admin credentials
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Added `.env.local` to `.gitignore`
- [ ] Never commit sensitive files
- [ ] Use HTTPS in production
- [ ] Consider rate limiting for login

## Troubleshooting

### Can't Login
- Check `.env.local` exists
- Verify credentials are correct
- Clear browser cookies
- Check for typos/extra spaces

### Upload Fails
- Check file permissions on `public/assets/`
- Verify file size (default: 4MB max)
- Ensure correct file format

### Resume Not Showing
- Check if resume is set to "active"
- Verify `/api/resume/active` returns data
- Clear browser cache

## Production Notes

Before deploying:
1. Set environment variables in hosting platform
2. Ensure data directory is persistent
3. Consider using a database for scalability
4. Implement proper JWT authentication
5. Add CSRF protection
6. Enable secure cookies (HTTPS only)

---

Need help? Check `ADMIN_GUIDE.md` for detailed documentation.
