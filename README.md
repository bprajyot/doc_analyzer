# doc_analyzer

## Overview
Legal Document Summarization and Analyzer is a powerful tool designed to automate the process of summarizing and analyzing legal documents. This project leverages advanced natural language processing (NLP) techniques to extract key metadata, summarize documents, and identify potential legal risks. Whether you're a legal professional, a data analyst, or a developer, this tool can significantly streamline your workflow and provide valuable insights.

## Features
- **Document Summarization**: Automatically generate concise summaries of legal documents.
- **Metadata Extraction**: Extract key metadata fields such as title, author, date, and keywords.
- **Risk Analysis**: Identify potential legal, ethical, or data privacy risks within documents.
- **User-Friendly Interface**: A clean and intuitive web interface for easy interaction.
- **Scalability**: Designed to handle large volumes of documents efficiently.

## Tech Stack
- **Programming Language**: JavaScript
- **Frameworks and Libraries**:
  - React for the frontend
  - Flask for the backend
  - Tailwind CSS for styling
  - Supabase for database management
- **Tools**:
  - Vite for frontend development
  - Langchain for NLP tasks

## Installation

### Prerequisites
- Node.js (v14 or later)
- Python (v3.8 or later)
- Supabase account

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/doc_analyzer.git

# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

### Basic Usage
```javascript
// Example of using the document summarization API
import { documentApi } from './libs/apis';

documentApi.uploadDoc(file).then(response => {
  console.log('Document uploaded successfully:', response);
});
```

### Advanced Usage
- **Customizing Summarization**: Modify the summarization prompt to fit specific needs.
- **Risk Analysis Configuration**: Adjust the risk analysis system prompt for different types of documents.

## Project Structure
```
doc_analyzer/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── libs/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── server/
│   ├── agents/
│   │   ├── base.py
│   │   ├── metadata_collector.py
│   │   ├── risk_analyzer.py
│   │   └── summarizer.py
│   ├── app.py
│   ├── config.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── documents.py
│   │   └── risks.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   └── files.py
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── create_pdf.py
│   │   ├── document_parser.py
│   │   └── get_metadata.py
│   ├── __init__.py
│   ├── requirements.txt
│   └── README.md
├── .gitignore
├── README.md
└── requirements.txt
```

## Configuration
- **Environment Variables**: Set up environment variables for Supabase and other configurations.
- **Configuration Files**: Modify the `config.py` file to set up your Supabase credentials.