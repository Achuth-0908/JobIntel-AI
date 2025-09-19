# JobIntel-AI

<p align="center">
  <img src="public/brain.png" alt="JobIntel-AI Logo" width="120"/>
</p>

<h1 align="center">JobIntel-AI</h1>

<p align="center">
  <b>AI-Powered Job Recommendation Platform</b><br>
  <i>Unlock your career potential with intelligent, personalized job matches.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Powered%20By-React%20%26%20TypeScript-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/AI-Enabled-6f42c1?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Build-Vite-yellow?style=for-the-badge" />
</p>

---

## 🚀 Overview

JobIntel-AI is a next-generation job recommendation platform leveraging advanced AI to match users with the best career opportunities. Upload your resume, visualize your skills, and receive tailored job suggestions—all in a beautiful, fast, and secure web app.

---

## 🎨 Unique Design

```
      _______        _        _        _ _ _ 
     |__   __|      | |      | |      | (_) |
        | | ___  ___| |_ __ _| | ___  | |_| |
        | |/ _ \/ __| __/ _` | |/ _ \ | | | |
        | |  __/\__ \ || (_| | |  __/ | | | |
        |_|\___||___/\__\__,_|_|\___| |_|_|_|
```

<p align="center">
  <img src="public/vite.svg" alt="Vite Logo" width="60"/>
</p>

Modern UI, interactive skill clouds, and smooth animations for a delightful user experience.

---

## 🧠 Features

- **AI Resume Parsing**: Upload your resume and let AI extract your skills.
- **Skill Cloud Visualization**: See your strengths in a dynamic cloud.
- **Personalized Job Recommendations**: Get jobs tailored to your profile.
- **Fast & Secure**: Built with Vite, React, and TypeScript for speed and reliability.
- **Intuitive File Upload**: Drag-and-drop or browse to upload your resume.

---

## 📦 Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI/UX**: CSS Modules, Custom SVGs
- **AI/ML**: (Integrate with backend for recommendations)
- **Testing**: Jest, React Testing Library

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/JobIntel-AI.git
cd JobIntel-AI

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## 📁 Project Structure

```
JobIntel-AI/
├── public/           # Static assets (logos, SVGs)
├── src/
│   ├── components/   # React components
│   ├── types/        # TypeScript types
│   ├── App.tsx       # Main app
│   └── main.tsx      # Entry point
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🖼️ Screenshots

<p align="center">
  <img src="public/brain.png" alt="Skill Cloud Screenshot" width="300"/>
</p>

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with%20❤️%20by-Meta%20AI-blueviolet?style=for-the-badge" />
</p>

---

## 🔍 Features

### 🔗 Resume-Job Matching
- TF-IDF and semantic vector-based scoring
- Ranks jobs based on content similarity to resume

### 🧠 Skill Extraction
- Extracts technical and soft skills using:
  - Regex-based keyword matching
  - NLP-based noun phrase extraction (spaCy)
  - Semantic embedding similarity (Sentence Transformers)

### 📊 Smart Insights
- Categorizes skills by domain (e.g., Programming, DevOps, Web Dev)
- Provides suggestions for missing skills
- Shows frequency and importance of skills in resume

### 💻 Fullstack Architecture
- **Backend:** Flask + Python ML ecosystem
- **Frontend:** Modern React UI with real-time insights
- **Database:** MongoDB (for job data, resumes, match logs, etc.)
- **Modeling:** `scikit-learn`, `spaCy`, `Sentence-Transformers`

---

## 🏗️ Architecture

```
JobIntel-AI
├── backend/                 # Flask backend (resume analysis, skill extraction, job match)
│   ├── main.py
│   ├── job_matcher.py
│   ├── skill_extractor.py
│   └── requirements.txt
├── frontend/                # React (or other) frontend app
│   ├── src/
│   ├── public/
│   └── package.json
├── data/                    # JSON job descriptions or training data
│   └── jobs_descriptions.json
├── .env                     # Environment config
├── README.md                # This file
└── vercel.json              # (Optional) Vercel deployment config
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/jobintel-ai.git
cd jobintel-ai
```

---

## 🔧 Backend Setup (`/backend`)

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 2. Install Requirements

```bash
pip install -r requirements.txt
python -m spacy download en_core_web_sm
```

### 3. Run Flask App

```bash
python main.py
```

API will run on: `http://localhost:5000`

---

## 🖥️ Frontend Setup (`/frontend`)

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

App will run on: `http://localhost:3000`

Make sure it fetches backend data from `http://localhost:5000` or your deployed API URL.

---

## 📡 API Endpoints

| Endpoint             | Method | Description                               |
|----------------------|--------|-------------------------------------------|
| `/match`             | POST   | Match resume to job descriptions          |
| `/extract-skills`    | POST   | Extract and categorize skills from text   |
| `/health`            | GET    | Returns backend health status             |

---

## 🧪 Sample API Request

### `/match`

```json
{
  "resume_text": "Experienced in Python, Flask, and cloud deployment.",
  "method": "semantic"
}
```

### `/extract-skills`

```json
{
  "text": "Skilled in Kubernetes, AWS, and Terraform for DevOps automation."
}
```

---

## 🧠 Skill Domains

- **Programming**: Python, C++, Java, etc.
- **Data Science**: Pandas, TensorFlow, etc.
- **DevOps & Cloud**: AWS, Docker, Jenkins
- **Web Development**: HTML, CSS, React
- **Mobile Development**: Flutter, Swift
- **Databases**: MySQL, MongoDB
- **Frameworks**: Django, Spring Boot, etc.
- **Soft Skills**: Communication, Leadership
- **Security**: Cybersecurity, SIEM
- **Project Management**: Agile, JIRA, PMP

---

## ⚙️ Deployment

### Using Gunicorn for Production

```bash
gunicorn main:app --bind 0.0.0.0:5000 --workers 4
```

### Deploy Frontend on Vercel

1. Connect `/frontend` to your Vercel project
2. Add environment variables for backend API URL
3. Use `vercel.json` to configure routing

---

## ✅ Future Roadmap

- [ ] Resume Parsing from PDF
- [ ] Candidate Fit Scoring
- [ ] LLM-powered Job Suggestion
- [ ] Personalized Learning Resource Links
- [ ] Real-time Feedback System
