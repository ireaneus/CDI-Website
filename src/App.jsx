// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MarkdownViewer from './components/MarkdownViewer';

function App() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Router>
      <div style={{ fontFamily: 'EB Garamond, serif', display: 'flex' }}>
        {!isMobile ? (
          // Desktop Sidebar
          <Drawer variant="permanent" open={true}>
            <List>
              <ListItem button component={Link} to="/page1">
                <ListItemText primary="Page 1" />
              </ListItem>
              <ListItem button component={Link} to="/page2">
                <ListItemText primary="Page 2" />
              </ListItem>
            </List>
          </Drawer>
        ) : (
          // Mobile Dropdown
          <div>
            <button onClick={toggleDrawer}>Menu</button>
            {open && (
              <List>
                <ListItem button component={Link} to="/page1">
                  <ListItemText primary="Page 1" />
                </ListItem>
                <ListItem button component={Link} to="/page2">
                  <ListItemText primary="Page 2" />
                </ListItem>
              </List>
            )}
          </div>
        )}

        <main style={{ marginLeft: !isMobile ? '240px' : '0', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/page1" element={<MarkdownViewer fileName="page1.md" />} />
            <Route path="/page2" element={<MarkdownViewer fileName="page2.md" />} />
            <Route path="/" element={<h1>Welcome to the Markdown Reader!</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
