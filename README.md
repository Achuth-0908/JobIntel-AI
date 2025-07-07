# JobIntel-AI

**JobIntel-AI** is an end-to-end AI-powered platform that matches candidates to the most relevant jobs using advanced NLP, machine learning, and semantic similarity techniques. It also provides skill extraction, recommendations, and an intelligent dashboard for recruiters and job seekers.

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

---

## 👨‍💻 Contributors

- **Achuth G** – Fullstack & AI/NLP Developer  
- You? Submit a PR or Issue!

---
