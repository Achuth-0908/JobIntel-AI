import spacy
import re
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from sentence_transformers import SentenceTransformer

# Download required NLTK data
try:
    nltk.download('stopwords', quiet=True)
    nltk.download('punkt', quiet=True)
except:
    pass

class SkillExtractor:
    def __init__(self):
        # Load spaCy model
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            print("Please install spaCy English model: python -m spacy download en_core_web_sm")
            self.nlp = None
        
        # Initialize sentence transformer for better semantic matching
        try:
            self.sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
        except:
            print("Could not load sentence transformer model")
            self.sentence_model = None
        
        # Predefined skills database
        self.skills_database = {
            'programming': [
                'python', 'java', 'javascript', 'c++', 'c#', 'php', 'ruby', 'go', 'rust',
                'swift', 'kotlin', 'scala', 'r', 'matlab', 'sql', 'html', 'css', 'react',
                'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring',
                'laravel', 'rails', 'asp.net', 'jquery', 'bootstrap', 'typescript', 'nextjs',
                'react native', 'flutter', 'xamarin', 'ionic', 'cordova', 'electron'
            ],
            'data_science': [
                'machine learning', 'deep learning', 'data analysis', 'statistics',
                'pandas', 'numpy', 'scikit-learn', 'tensorflow', 'pytorch', 'keras',
                'matplotlib', 'seaborn', 'plotly', 'tableau', 'power bi', 'excel',
                'data visualization', 'predictive modeling', 'nlp', 'computer vision',
                'big data', 'hadoop', 'spark', 'data mining', 'statistical analysis'
            ],
            'cloud_devops': [
                'aws', 'azure', 'google cloud', 'docker', 'kubernetes', 'jenkins',
                'git', 'github', 'gitlab', 'terraform', 'ansible', 'chef', 'puppet',
                'ci/cd', 'linux', 'bash', 'shell scripting', 'monitoring', 'logging',
                'prometheus', 'grafana', 'elk stack', 'nagios', 'zabbix'
            ],
            'databases': [
                'mysql', 'postgresql', 'mongodb', 'redis', 'cassandra', 'oracle',
                'sqlite', 'dynamodb', 'elasticsearch', 'neo4j', 'firebase', 'mariadb',
                'couchdb', 'influxdb', 'snowflake', 'bigquery'
            ],
            'frameworks': [
                'django', 'flask', 'fastapi', 'spring boot', 'express', 'react',
                'angular', 'vue', 'laravel', 'symfony', 'codeigniter', 'zend',
                'asp.net', 'rails', 'sinatra', 'hibernate', 'struts'
            ],
            'tools': [
                'jira', 'confluence', 'slack', 'trello', 'asana', 'notion',
                'postman', 'insomnia', 'swagger', 'figma', 'sketch', 'adobe xd',
                'photoshop', 'illustrator', 'after effects', 'premiere pro'
            ],
            'soft_skills': [
                'leadership', 'communication', 'teamwork', 'problem solving',
                'project management', 'agile', 'scrum', 'analytical thinking',
                'creativity', 'adaptability', 'time management', 'collaboration',
                'critical thinking', 'decision making', 'negotiation', 'mentoring'
            ]
        }
        
        # Flatten skills for easier matching
        self.all_skills = []
        for category, skills in self.skills_database.items():
            self.all_skills.extend(skills)
    
    def preprocess_text(self, text):
        for skills in self.skills_database.values():
            self.all_skills.extend(skills)
        text = text.lower()
        
        # Remove special characters but keep alphanumeric, spaces, dots, and plus signs
        text = re.sub(r'[^a-zA-Z0-9\s+#.\-]', ' ', text)
        
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text
    
    def extract_skills_regex(self, text):
        """Extract skills using regex pattern matching"""
        text = self.preprocess_text(text)
        found_skills = []
        
        for skill in self.all_skills:
            # Create regex pattern for skill
            skill_pattern = skill.lower().replace('.', r'\.')
            pattern = r'\b' + re.escape(skill_pattern) + r'\b'
            if re.search(pattern, text):
                found_skills.append(skill)
        
        return list(set(found_skills))
    
    def extract_skills_spacy(self, text):
        """Extract skills using spaCy NLP"""
        if not self.nlp:
            return []
        
        try:
            doc = self.nlp(text)
            found_skills = []
            
            # Extract entities and noun phrases
            entities = [ent.text.lower() for ent in doc.ents]
            noun_phrases = [chunk.text.lower() for chunk in doc.noun_chunks]
            
            # Check if any skills match entities or noun phrases
            for skill in self.all_skills:
                if any(skill.lower() in entity for entity in entities + noun_phrases):
                    found_skills.append(skill)
            
            return list(set(found_skills))
        except Exception as e:
            print(f"Error in spaCy skill extraction: {e}")
            return []
    
    def extract_skills_semantic(self, text):
        """Extract skills using semantic similarity"""
        if not self.sentence_model:
            return []
        
        try:
            text = self.preprocess_text(text)
            
            # Get embeddings for text and skills
            text_embedding = self.sentence_model.encode([text])
            skill_embeddings = self.sentence_model.encode(self.all_skills)
            
            # Calculate similarity
            similarities = cosine_similarity(text_embedding, skill_embeddings)[0]
            
            # Get skills with high similarity (threshold > 0.3)
            found_skills = []
            for i, similarity in enumerate(similarities):
                if similarity > 0.3:
                    found_skills.append(self.all_skills[i])
            
            return found_skills
        except Exception as e:
            print(f"Error in semantic skill extraction: {e}")
            return []
    
    def extract_skills(self, text):
        """Main method to extract skills using multiple approaches"""
        # Combine results from different methods
        regex_skills = self.extract_skills_regex(text)
        spacy_skills = self.extract_skills_spacy(text) if self.nlp else []
        semantic_skills = self.extract_skills_semantic(text) if self.sentence_model else []
        
        # Combine and deduplicate
        all_found_skills = list(set(regex_skills + spacy_skills + semantic_skills))
        
        # Categorize skills
        categorized_skills = {}
        for category, skills in self.skills_database.items():
            categorized_skills[category] = [skill for skill in all_found_skills if skill in skills]
        
        return {
            'all_skills': all_found_skills,
            'categorized_skills': categorized_skills,
            'skill_count': len(all_found_skills)
        }
    
    def get_skill_frequency(self, text):
        """Get frequency of skills in text"""
        text = self.preprocess_text(text)
        skill_freq = {}
        
        for skill in self.all_skills:
            skill_pattern = skill.lower().replace('.', r'\.')
            pattern = r'\b' + re.escape(skill_pattern) + r'\b'
            count = len(re.findall(pattern, text))
            if count > 0:
                skill_freq[skill] = count
        
        return skill_freq