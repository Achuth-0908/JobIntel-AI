import React from 'react';
import { Code, Users, Lightbulb, Wrench } from 'lucide-react';
import type { SkillAnalysis } from '../types/index';

interface SkillCloudProps {
  skills: SkillAnalysis;
}

const SkillCloud: React.FC<SkillCloudProps> = ({ skills }) => {
  const getSkillIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical':
      case 'programming':
      case 'development':
        return <Code size={16} />;
      case 'soft':
      case 'communication':
      case 'leadership':
        return <Users size={16} />;
      case 'creative':
      case 'design':
        return <Lightbulb size={16} />;
      default:
        return <Wrench size={16} />;
    }
  };

  return (
    <div className="skills-container">
      {skills.skill_categories && Object.keys(skills.skill_categories).length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          {Object.entries(skills.skill_categories).map(([category, categorySkills]) => (
            <div key={category} className="skills-category">
              <div className="skills-category-header">
                {getSkillIcon(category)}
                <h4 className="skills-category-title">{category} Skills</h4>
                <span className="skills-count">({categorySkills.length})</span>
              </div>
              <div className="skills-grid">
                {categorySkills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.all_skills && (
        <div className="skills-category">
          <div className="skills-category-header">
            <Wrench size={16} />
            <h4 className="skills-category-title">All Identified Skills</h4>
            <span className="skills-count">({skills.all_skills.length})</span>
          </div>
          <div className="skills-grid">
            {skills.all_skills.map((skill, index) => (
              <span
                key={skill}
                className="skill-tag fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {(skills.technical_skills?.length > 0 || skills.soft_skills?.length > 0) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
          }}
        >
          {skills.technical_skills?.length > 0 && (
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                <Code size={16} style={{ color: 'var(--primary-color)' }} />
                <h5 style={{ margin: 0, color: 'var(--primary-color)' }}>
                  Technical Skills ({skills.technical_skills.length})
                </h5>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.technical_skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '0.25rem 0.5rem',
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: 'var(--primary-color)',
                      fontSize: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: '500',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {skills.soft_skills?.length > 0 && (
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: 'var(--radius-xl)',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                }}
              >
                <Users size={16} style={{ color: 'var(--accent-color)' }} />
                <h5 style={{ margin: 0, color: 'var(--accent-color)' }}>
                  Soft Skills ({skills.soft_skills.length})
                </h5>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.soft_skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '0.25rem 0.5rem',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: 'var(--accent-color)',
                      fontSize: '0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: '500',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillCloud;