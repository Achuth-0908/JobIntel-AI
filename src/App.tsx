import { useState, useEffect } from 'react';
import { Moon, Sun, Upload, FileText, Brain, Briefcase, Star, TrendingUp } from 'lucide-react';
import FileUpload from './components/FileUpload';
import SkillCloud from './components/SkillCloud';
import JobRecommendations from './components/JobRecommendations';
import LoadingSpinner from './components/LoadingSpinner';
import type { AnalysisResult } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setAnalysisResult(null);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">
                <Brain size={24} />
              </div>
              <div className="logo-text">
                <h1>JobIntel AI</h1>
                <p>Resume Analyzer & Job Matcher</p>
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {!analysisResult && !isLoading && (
            <div className="hero">
              <div className="hero-badge">
                <Star size={16} />
                <span>AI-Powered Career Intelligence</span>
              </div>
              <h2>Unlock Your Career Potential</h2>
              <p className="hero-subtitle">
                Upload your resume and let our advanced AI analyze your skills, experience, and match you with perfect job opportunities.
              </p>
              
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">
                    <Upload size={24} />
                  </div>
                  <h3>Upload Resume</h3>
                  <p>Support for PDF and TXT formats</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <Brain size={24} />
                  </div>
                  <h3>AI Analysis</h3>
                  <p>Advanced NLP skill extraction</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">
                    <Briefcase size={24} />
                  </div>
                  <h3>Job Matching</h3>
                  <p>Personalized recommendations</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="error-card">
              <div className="error-content">
                <div className="error-icon">
                  <FileText size={20} />
                </div>
                <div className="error-text">
                  <h3>Analysis Error</h3>
                  <p>{error}</p>
                </div>
              </div>
              <button onClick={resetAnalysis} className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                Try Again
              </button>
            </div>
          )}

          {isLoading && (
            <div className="loading-container">
              <LoadingSpinner />
              <h3>Analyzing Your Resume</h3>
              <p>Our AI is extracting skills, analyzing experience, and finding the best job matches for you...</p>
            </div>
          )}

          {!analysisResult && !isLoading && !error && (
            <FileUpload
              onAnalysisComplete={handleAnalysisComplete}
              onError={handleError}
              onLoadingChange={setIsLoading}
            />
          )}

          {analysisResult && !isLoading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div className="hero-badge">
                  <TrendingUp size={16} />
                  <span>Analysis Complete</span>
                </div>
                <h2>Your Career Profile</h2>
                <p>Here's what our AI discovered about your skills and experience</p>
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-icon">
                    <Brain size={20} />
                  </div>
                  <div>
                    <h3 className="card-title">Extracted Skills</h3>
                    <p className="card-subtitle">
                      {analysisResult.skills.all_skills.length} skills identified
                    </p>
                  </div>
                </div>
                <SkillCloud skills={analysisResult.skills} />
              </div>

              <div className="card">
                <div className="card-header">
                  <div className="card-icon">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h3 className="card-title">Job Recommendations</h3>
                    <p className="card-subtitle">
                      {analysisResult.job_recommendations.length} matches found
                    </p>
                  </div>
                  <button onClick={resetAnalysis} className="btn btn-secondary">
                    Analyze New Resume
                  </button>
                </div>
                <JobRecommendations jobs={analysisResult.job_recommendations} />
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <Brain size={20} />
              <span>JobIntel AI</span>
            </div>
            <p className="footer-text">
              Powered by advanced machine learning and natural language processing
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
