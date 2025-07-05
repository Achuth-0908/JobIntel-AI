import React from 'react';
import { MapPin, DollarSign, Clock, ExternalLink, Briefcase } from 'lucide-react';
import type { JobRecommendation } from '../types';

interface JobRecommendationsProps {
    jobs: JobRecommendation[];
}

const JobRecommendations: React.FC<JobRecommendationsProps> = ({ jobs }) => {
  const getMatchScoreClass = (score: number) => {
    if (score >= 0.8) return 'match-excellent';
    if (score >= 0.6) return 'match-good';
    return 'match-partial';
  };

  const getMatchScoreLabel = (score: number) => {
    if (score >= 0.8) return 'Excellent Match';
    if (score >= 0.6) return 'Good Match';
    return 'Partial Match';
  };
  
  if (jobs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'var(--bg-tertiary)', 
          borderRadius: 'var(--radius-2xl)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1rem',
          color: 'var(--text-muted)'
        }}>
          <Briefcase size={32} />
        </div>
        <h3>No Job Matches Found</h3>
        <p>Try uploading a different resume or check back later for new opportunities.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="jobs-stats">
        <div className="stat-card">
          <div className="stat-number">{jobs.length}</div>
          <div className="stat-label">Total Matches</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{jobs.filter(job => job.match_score >= 0.8).length}</div>
          <div className="stat-label">Excellent Matches</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {(jobs.length > 0 ? (jobs.reduce((sum, job) => sum + job.match_score, 0) / jobs.length).toFixed(2) : '0.00')}%
          </div>
          <div className="stat-label">Avg Match Score</div>
        </div>
      </div>

      <div className="jobs-grid">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <div className="job-header">
              <div className="job-info">
                <h3>{job.title}</h3>
                <p className="job-company">{job.company}</p>
              </div>
              <div className={`match-score ${getMatchScoreClass(job.match_score)}`}>
                {Math.round(job.match_score)}% Match
              </div>
            </div>

            <div className="job-details">
              {job.location && (
                <div className="job-detail">
                  <MapPin size={16} />
                  <span>{job.location}</span>
                </div>
              )}
              {job.salary_range && (
                <div className="job-detail">
                  <DollarSign size={16} />
                  <span>{job.salary_range}</span>
                </div>
              )}
              {job.job_type && (
                <div className="job-detail">
                  <Briefcase size={16} />
                  <span>{job.job_type}</span>
                </div>
              )}
              {job.posted_date && (
                <div className="job-detail">
                  <Clock size={16} />
                  <span>{job.posted_date}</span>
                </div>
              )}
            </div>

            <p className="job-description">{job.description}</p>

            {job.required_skills && job.required_skills.length > 0 && (
              <div className="job-skills">
                <h4>Required Skills:</h4>
                <div className="skills-grid">
                  {job.required_skills.slice(0, 8).map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                  {job.required_skills.length > 8 && (
                    <span className="skill-tag" style={{ opacity: 0.7 }}>
                      +{job.required_skills.length - 8} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="job-actions">
                <div style={{ textAlign: 'center' }}>
                    <div className={`match-circle ${getMatchScoreClass(job.match_score)}`}>
                        {(job.match_score).toFixed(2)}%
                    </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                    {getMatchScoreLabel(job.match_score)}
                </p>
            </div>

              
              {job.url && (
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>View Job</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobRecommendations;