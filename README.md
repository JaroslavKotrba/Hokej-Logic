# 🏒 Hokej Logic Chatbot

A sophisticated Czech-language AI-powered chatbot for **hokejlogic.cz**, designed to help users navigate the website, analyze ice hockey statistics, and provide expert insights. Built with FastAPI, LangChain, OpenAI GPT models, and FAISS vector search.

## 🚀 Features

- 🤖 **Intelligent Navigation Assistant** - Helps users find specific content and sections on hokejlogic.cz
- 📊 **Hockey Analytics Expert** - Interprets statistical metrics and provides data insights
- 🔍 **Context-Aware Responses** - Uses FAISS vector store for relevant document retrieval
- 🧠 **Advanced AI Integration** - Powered by OpenAI GPT-4o-mini with custom Czech prompts
- 💾 **Conversation Tracking** - Logs all interactions with categorization and analytics
- 🔐 **Admin Dashboard** - Protected endpoints for usage statistics and monitoring
- 🌐 **Production Ready** - Deployed on Heroku with MySQL/PostgreSQL support

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Backend Framework** | FastAPI |
| **AI/ML** | LangChain + OpenAI (GPT-4o-mini, text-embedding-ada-002) |
| **Vector Database** | FAISS |
| **Database** | SQLAlchemy with MySQL (JawsDB) / PostgreSQL (Heroku) / SQLite (local) |
| **Frontend** | Jinja2 Templates + Static Files |
| **Deployment** | Heroku |
| **Environment** | Python 3.12 + Conda |

## ⚙️ Quick Start

### 1. Environment Setup

**Option A: Using Conda (Recommended)**
```bash
# Create environment from file
conda env create -f environment.yml
conda activate hokej_logic

# Or create manually
conda create -n hokej_logic python=3.12
conda activate hokej_logic
pip install -r requirements.txt
```

**Option B: Using pip**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file in the project root:

```env
# Required
OPENAI_API_KEY=your_openai_api_key_here
ADMIN_API_KEY=your_secure_admin_key_here

# Optional (for production deployment)
JAWSDB_URL=mysql://user:pass@host:port/database
PORT=8000
```

### 3. Vector Store Setup

Ensure your FAISS vector store is properly set up in `data/vector_store/`. The application expects:
- `index.faiss` - The FAISS index file
- `index.pkl` - The metadata pickle file

### 4. Run the Application

```bash
# Development mode with auto-reload
uvicorn app.main:app --reload

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

Access the application at: **http://localhost:8000**

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Main chat interface |
| `POST` | `/chat` | Send message to chatbot |
| `POST` | `/clear` | Clear conversation history |
| `GET` | `/health` | Health check and system metrics |

### Protected Endpoints (Require `X-API-Key` header)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/stats` | Detailed usage statistics and conversation logs |

### Example API Usage

```bash
# Send a chat message
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Kde najdu statistiky hráčů?", "session_id": "optional-session-id"}'

# Get system health
curl "http://localhost:8000/health"

# Get admin statistics (requires API key)
curl "http://localhost:8000/stats" \
  -H "X-API-Key: your_admin_api_key"
```

## 🎯 Chatbot Capabilities

The chatbot specializes in:

### Navigation Assistance
- Finding specific sections on hokejlogic.cz
- Explaining website structure and features
- Providing direct links to relevant pages
- Guiding users to data analysis tools

### Hockey Expertise
- Interpreting statistical metrics
- Explaining advanced analytics
- Providing context for displayed data
- Navigating to analytical tools

### Conversation Categories
The system automatically categorizes messages:
- `hraci` - Player-related queries
- `formace` - Formation and line combinations
- `videomapy` - Video analysis and heat maps
- `brankari` - Goaltender statistics
- `zapasy` - Game reports and visualizations
- `tymy` - Team-related information
- `ostatni` - General queries

## 📊 Monitoring & Analytics

The application provides comprehensive monitoring:

### Health Check (`/health`)
- System component status
- Memory usage and uptime
- Configuration verification
- Model and vector store status

### Usage Statistics (`/stats`) 
- Total interactions and response times
- Error rates and category distribution
- Complete conversation history
- Performance metrics

## 🔧 Development Commands

```bash
# Environment management
conda env export --name hokej_logic > environment.yml
conda env remove -n hokej_logic

# Dependencies
pip list --format=freeze > requirements.txt

# Development server
uvicorn app.main:app --reload --log-level debug

# Database operations (if using migrations)
alembic revision --autogenerate -m "Description"
alembic upgrade head
```

## 🔒 Security Features

- **API Key Protection**: Admin endpoints secured with custom API keys
- **CORS Configuration**: Restricted to specific domains (hokejlogic.cz, Heroku app)
- **Input Validation**: Pydantic models for request/response validation
- **Error Handling**: Comprehensive exception handling with logging
- **Environment Variables**: Sensitive data stored securely

## 📋 Configuration Options

### Chatbot Parameters (in `ChatbotConfig`)
- `model_name`: OpenAI model (default: "gpt-4o-mini")
- `temperature`: Response randomness (default: 0.4)
- `chunk_size`: Text processing chunks (default: 1000)
- `chunk_overlap`: Chunk overlap for context (default: 200)
- `top_k_results`: Retrieved documents count (default: 5)
- `max_history`: Conversation memory (default: 4)

## 🐛 Troubleshooting

### Common Issues

**Vector Store Loading Error**
```bash
Error while loading of the vector store: [Errno 2] No such file or directory
```
- Ensure `data/vector_store/` directory exists with FAISS files

**OpenAI API Issues**
```bash
ValueError: OPENAI_API_KEY is not available in .env
```
- Check `.env` file exists and contains valid API key
- Verify API key has sufficient credits

**Database Connection**
- Local: Check SQLite permissions
- Production: Verify `JAWSDB_URL` format and credentials

## 👥 Team

Developed for **hokejlogic.cz** - Czech ice hockey analytics platform

For questions, support, or feature requests, please contact the development team.

---

**Happy Hockey Analytics! 🏒📊**