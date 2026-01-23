'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'skills' | 'resumes' | 'documents'>('profile');
  
  // File upload states
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentCategory, setDocumentCategory] = useState('general');
  const [uploadMessage, setUploadMessage] = useState('');
  
  // Data states
  const [resumes, setResumes] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, activeTab]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAuthenticated(true);
        setUsername('');
        setPassword('');
      } else {
        setLoginError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAuthenticated(false);
    router.push('/');
  };

  const loadData = async () => {
    try {
      if (activeTab === 'resumes') {
        const response = await fetch('/api/resumes');
        const data = await response.json();
        if (data.success) setResumes(data.resumes);
      } else if (activeTab === 'documents') {
        const response = await fetch('/api/documents');
        const data = await response.json();
        if (data.success) setDocuments(data.documents);
      } else {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        if (data.success) setPortfolioData(data.data);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const saveProfile = async (profileData: any) => {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: 'profile', data: profileData }),
      });
      if (response.ok) {
        setUploadMessage('Profile updated successfully!');
        loadData();
        setTimeout(() => setUploadMessage(''), 3000);
      }
    } catch (error) {
      setUploadMessage('Failed to update profile');
    }
  };

  const saveSection = async (section: string, data: any) => {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data }),
      });
      if (response.ok) {
        setUploadMessage(`${section} updated successfully!`);
        loadData();
        setShowForm(false);
        setEditingItem(null);
        setTimeout(() => setUploadMessage(''), 3000);
      }
    } catch (error) {
      setUploadMessage(`Failed to update ${section}`);
    }
  };

  const deleteItem = async (section: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const response = await fetch(`/api/portfolio?section=${section}&id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleResumeUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) return;

    const formData = new FormData();
    formData.append('file', resumeFile);

    try {
      const response = await fetch('/api/upload/resume', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setUploadMessage('Resume uploaded successfully!');
        setResumeFile(null);
        loadData();
        setTimeout(() => setUploadMessage(''), 3000);
      } else {
        setUploadMessage(data.message || 'Upload failed');
      }
    } catch (error) {
      setUploadMessage('Upload failed. Please try again.');
    }
  };

  const handleDocumentUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentFile) return;

    const formData = new FormData();
    formData.append('file', documentFile);
    formData.append('title', documentTitle);
    formData.append('category', documentCategory);

    try {
      const response = await fetch('/api/upload/document', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setUploadMessage('Document uploaded successfully!');
        setDocumentFile(null);
        setDocumentTitle('');
        setDocumentCategory('general');
        loadData();
        setTimeout(() => setUploadMessage(''), 3000);
      } else {
        setUploadMessage(data.message || 'Upload failed');
      }
    } catch (error) {
      setUploadMessage('Upload failed. Please try again.');
    }
  };

  const handleDeleteResume = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;
    try {
      const response = await fetch(`/api/resumes?id=${id}`, { method: 'DELETE' });
      if (response.ok) loadData();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      const response = await fetch(`/api/documents?id=${id}`, { method: 'DELETE' });
      if (response.ok) loadData();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleSetActiveResume = async (id: string) => {
    try {
      const response = await fetch('/api/resumes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) loadData();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Username"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
            </div>
            {loginError && (
              <div className="text-red-500 text-sm text-center">{loginError}</div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <nav className="-mb-px flex space-x-4">
            {['profile', 'projects', 'experience', 'skills', 'resumes', 'documents'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {uploadMessage && (
          <div className={`mb-4 p-4 rounded-md ${
            uploadMessage.includes('success')
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}>
            {uploadMessage}
          </div>
        )}

        {/* Content */}
        {activeTab === 'profile' && portfolioData && (
          <ProfileEditor profile={portfolioData.profile} onSave={saveProfile} />
        )}

        {activeTab === 'projects' && portfolioData && (
          <ProjectsManager
            projects={portfolioData.projects || []}
            onSave={(data: any) => saveSection('projects', data)}
            onDelete={(id: string) => deleteItem('projects', id)}
          />
        )}

        {activeTab === 'experience' && portfolioData && (
          <ExperienceManager
            experiences={portfolioData.experiences || []}
            onSave={(data: any) => saveSection('experiences', data)}
            onDelete={(id: string) => deleteItem('experiences', id)}
          />
        )}

        {activeTab === 'skills' && portfolioData && (
          <SkillsManager
            skills={portfolioData.skills || []}
            onSave={(data: any) => saveSection('skills', data)}
            onDelete={(id: string) => deleteItem('skills', id)}
          />
        )}

        {activeTab === 'resumes' && (
          <ResumesTab
            resumes={resumes}
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            handleResumeUpload={handleResumeUpload}
            handleSetActiveResume={handleSetActiveResume}
            handleDeleteResume={handleDeleteResume}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentsTab
            documents={documents}
            documentFile={documentFile}
            setDocumentFile={setDocumentFile}
            documentTitle={documentTitle}
            setDocumentTitle={setDocumentTitle}
            documentCategory={documentCategory}
            setDocumentCategory={setDocumentCategory}
            handleDocumentUpload={handleDocumentUpload}
            handleDeleteDocument={handleDeleteDocument}
          />
        )}
      </div>
    </div>
  );
}

// Profile Editor Component
function ProfileEditor({ profile, onSave }: any) {
  const [formData, setFormData] = useState(profile || {
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    twitter: '',
    website: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Profile Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <textarea
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="url"
            placeholder="GitHub URL"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Profile
        </button>
      </form>
    </div>
  );
}

// Projects Manager Component
function ProjectsManager({ projects, onSave, onDelete }: any) {
  const [items, setItems] = useState(projects);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const addNew = () => {
    setEditing({
      id: Date.now().toString(),
      title: '',
      category: '',
      description: '',
      technologies: [],
      achievements: [],
      period: '',
      github: '',
      demo: ''
    });
    setShowForm(true);
  };

  const handleSave = () => {
    const updated = editing.id && items.find((p: any) => p.id === editing.id)
      ? items.map((p: any) => p.id === editing.id ? editing : p)
      : [...items, editing];
    setItems(updated);
    onSave(updated);
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((p: any) => p.id !== id);
    setItems(updated);
    onDelete(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Projects</h2>
        <button
          onClick={addNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {showForm && editing && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {items.find((p: any) => p.id === editing.id) ? 'Edit' : 'New'} Project
            </h3>
            <button onClick={() => setShowForm(false)}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Title"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Category"
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <textarea
              placeholder="Description"
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Technologies (comma-separated)"
              value={editing.technologies?.join(', ')}
              onChange={(e) => setEditing({ ...editing, technologies: e.target.value.split(',').map((t: string) => t.trim()) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <textarea
              placeholder="Achievements (one per line)"
              value={editing.achievements?.join('\n')}
              onChange={(e) => setEditing({ ...editing, achievements: e.target.value.split('\n') })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Period (e.g., Jan 2024 - Mar 2024)"
                value={editing.period}
                onChange={(e) => setEditing({ ...editing, period: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="url"
                placeholder="GitHub URL"
                value={editing.github}
                onChange={(e) => setEditing({ ...editing, github: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Project
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((project: any) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{project.period}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setEditing(project); setShowForm(true); }}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Experience Manager Component
function ExperienceManager({ experiences, onSave, onDelete }: any) {
  const [items, setItems] = useState(experiences);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const addNew = () => {
    setEditing({
      id: Date.now().toString(),
      company: '',
      position: '',
      period: '',
      location: '',
      description: '',
      responsibilities: []
    });
    setShowForm(true);
  };

  const handleSave = () => {
    const updated = editing.id && items.find((e: any) => e.id === editing.id)
      ? items.map((e: any) => e.id === editing.id ? editing : e)
      : [...items, editing];
    setItems(updated);
    onSave(updated);
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((e: any) => e.id !== id);
    setItems(updated);
    onDelete(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Experience</h2>
        <button
          onClick={addNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      {showForm && editing && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {items.find((e: any) => e.id === editing.id) ? 'Edit' : 'New'} Experience
            </h3>
            <button onClick={() => setShowForm(false)}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company Name"
                value={editing.company}
                onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Position"
                value={editing.position}
                onChange={(e) => setEditing({ ...editing, position: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Period (e.g., Jan 2020 - Dec 2021)"
                value={editing.period}
                onChange={(e) => setEditing({ ...editing, period: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Location"
                value={editing.location}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <textarea
              placeholder="Description"
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <textarea
              placeholder="Responsibilities (one per line)"
              value={editing.responsibilities?.join('\n')}
              onChange={(e) => setEditing({ ...editing, responsibilities: e.target.value.split('\n') })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Experience
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((exp: any) => (
          <div key={exp.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{exp.position}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{exp.period} • {exp.location}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setEditing(exp); setShowForm(true); }}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skills Manager Component
function SkillsManager({ skills, onSave, onDelete }: any) {
  const [items, setItems] = useState(skills);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);

  const addNew = () => {
    setEditing({
      id: Date.now().toString(),
      name: '',
      skills: []
    });
    setShowForm(true);
  };

  const handleSave = () => {
    const updated = editing.id && items.find((s: any) => s.id === editing.id)
      ? items.map((s: any) => s.id === editing.id ? editing : s)
      : [...items, editing];
    setItems(updated);
    onSave(updated);
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id: string) => {
    const updated = items.filter((s: any) => s.id !== id);
    setItems(updated);
    onDelete(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Skills</h2>
        <button
          onClick={addNew}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Skill Category
        </button>
      </div>

      {showForm && editing && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {items.find((s: any) => s.id === editing.id) ? 'Edit' : 'New'} Skill Category
            </h3>
            <button onClick={() => setShowForm(false)}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Category Name (e.g., Programming Languages)"
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Skills (comma-separated)"
              value={editing.skills?.join(', ')}
              onChange={(e) => setEditing({ ...editing, skills: e.target.value.split(',').map((s: string) => s.trim()) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Category
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((category: any) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {category.skills?.map((skill: string, idx: number) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setEditing(category); setShowForm(true); }}
                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Resumes Tab Component
function ResumesTab({ resumes, resumeFile, setResumeFile, handleResumeUpload, handleSetActiveResume, handleDeleteResume }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Upload Resume</h2>
        <form onSubmit={handleResumeUpload} className="space-y-4">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-900 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-blue-400"
          />
          <button
            type="submit"
            disabled={!resumeFile}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Upload Resume
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Uploaded Resumes</h2>
        <div className="space-y-3">
          {resumes.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No resumes uploaded yet</p>
          ) : (
            resumes.map((resume: any) => (
              <div key={resume.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {resume.filename}
                    {resume.active && (
                      <span className="ml-2 px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                        Active
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(resume.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={resume.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    View
                  </a>
                  {!resume.active && (
                    <button
                      onClick={() => handleSetActiveResume(resume.id)}
                      className="px-3 py-1 text-sm bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800"
                    >
                      Set Active
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteResume(resume.id)}
                    className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Documents Tab Component
function DocumentsTab({ documents, documentFile, setDocumentFile, documentTitle, setDocumentTitle, documentCategory, setDocumentCategory, handleDocumentUpload, handleDeleteDocument }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Upload Document</h2>
        <form onSubmit={handleDocumentUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Document Title"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="Category"
            value={documentCategory}
            onChange={(e) => setDocumentCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="file"
            onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-900 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-blue-400"
          />
          <button
            type="submit"
            disabled={!documentFile}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Upload Document
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Uploaded Documents</h2>
        <div className="space-y-3">
          {documents.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No documents uploaded yet</p>
          ) : (
            documents.map((doc: any) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {doc.title}
                    <span className="ml-2 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
                      {doc.category}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {doc.filename} • {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={doc.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
