import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

// Use Vite's import.meta.glob to load all markdown files
const markdownFiles = import.meta.glob('../content/*.md');

const MarkdownViewer = ({ fileName }) => {
  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    // Dynamically load the markdown file using the provided fileName
    const filePath = `../content/${fileName}`;
    
    if (markdownFiles[filePath]) {
      markdownFiles[filePath]().then((module) => {
        fetch(module.default)
          .then((response) => response.text())
          .then((text) => setContent(text));
      });
    } else {
      setContent('Markdown file not found.');
    }
  }, [fileName]);

  return (
    <div>
      <ReactMarkdown>
        {readMore ? content : content.substring(0, 300)} {/* Truncate for Read More */}
      </ReactMarkdown>

      {!readMore && (
        <button onClick={() => setReadMore(true)}>Read More</button>
      )}

      {readMore && (
        <div>
          <Link to="/">Return to Home</Link>
        </div>
      )}
    </div>
  );
};

export default MarkdownViewer;
