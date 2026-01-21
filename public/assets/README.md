# Assets Folder

This folder contains all uploaded files from the admin panel.

## Structure

```
assets/
├── resumes/        # Resume PDF files
│   └── .gitkeep
└── documents/      # Other documents (certificates, projects, etc.)
    └── .gitkeep
```

## Important Notes

- **Resumes**: Only PDF files are accepted
- **Documents**: Any file type can be uploaded
- **Naming**: Files are automatically renamed with timestamps to prevent conflicts
- **Git**: These folders are tracked by Git, but the actual files inside are ignored
- **Management**: Use the admin panel at `/admin` to upload/delete files

## File Naming Convention

### Resumes
Format: `resume_[timestamp].pdf`
Example: `resume_1737462000000.pdf`

### Documents
Format: `doc_[timestamp].[ext]`
Example: `doc_1737462000000.pdf`

## Accessing Files

All files in this folder are publicly accessible at:
- Resumes: `https://yourdomain.com/assets/resumes/filename.pdf`
- Documents: `https://yourdomain.com/assets/documents/filename.pdf`

## Security

- Do not place sensitive information in these folders
- All files are publicly accessible
- Use the admin panel to manage files securely
