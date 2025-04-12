/**
 * CrimsonRealm Static Server
 * Copyright © 2023-2025 Berlianoel
 * All rights reserved.
 * This entire codebase was created by Berlianoel.
 * 
 * This fallback server is used for static deployments when the 
 * main application server is not available.
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 8000;

// Enable better error handling for Railway deployment
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
    // Keep the process running despite the error
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Try to determine the main HTML file
app.get('/', (req, res) => {
    // Check for common index files
    const possibleIndexFiles = ['index.html', 'home.html', 'default.html', 'main.html'];
    
    for (const indexFile of possibleIndexFiles) {
        if (fs.existsSync(path.join(__dirname, indexFile))) {
            return res.sendFile(path.join(__dirname, indexFile));
        }
    }
    
    // If no index file found, list the directory contents
    fs.readdir(__dirname, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading directory: ' + err.message);
        }
        
        // Filter out non-HTML files and system files
        const htmlFiles = files.filter(file => 
            file.endsWith('.html') && 
            !file.startsWith('.') && 
            file !== 'node_modules' && 
            file !== 'server.js' &&
            file !== 'wsgi.py' &&
            file !== 'extract_and_setup.py'
        );
        
        if (htmlFiles.length > 0) {
            // If there are HTML files, provide links to them
            let html = '<!DOCTYPE html><html lang="en"><head>';
            html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
            html += '<title>CrimsonRealm Website</title>';
            html += '<style>body{font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:20px;max-width:800px;margin:0 auto;}';
            html += 'h1{color:#8B0000;}ul{list-style-type:none;padding:0;}li{margin:10px 0;}';
            html += 'a{color:#8B0000;text-decoration:none;padding:5px 10px;border:1px solid #8B0000;border-radius:3px;}';
            html += 'a:hover{background:#8B0000;color:white;}</style></head><body>';
            html += '<h1>CrimsonRealm Website</h1>';
            html += '<p>Please select a page:</p><ul>';
            
            htmlFiles.forEach(file => {
                html += `<li><a href="/${file}">${file.replace('.html', '')}</a></li>`;
            });
            
            html += '</ul></body></html>';
            res.send(html);
        } else {
            // If no HTML files, show all relevant files
            const relevantFiles = files.filter(file => 
                !file.startsWith('.') && 
                file !== 'node_modules' && 
                file !== 'server.js' &&
                file !== 'wsgi.py' &&
                file !== 'extract_and_setup.py'
            );
            
            let html = '<!DOCTYPE html><html lang="en"><head>';
            html += '<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">';
            html += '<title>CrimsonRealm Website</title>';
            html += '<style>body{font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:20px;max-width:800px;margin:0 auto;}';
            html += 'h1{color:#8B0000;}ul{list-style-type:none;padding:0;}li{margin:10px 0;}</style></head><body>';
            html += '<h1>CrimsonRealm Website</h1>';
            html += '<p>No HTML files found. Available files:</p><ul>';
            
            if (relevantFiles.length > 0) {
                relevantFiles.forEach(file => {
                    html += `<li>${file}</li>`;
                });
            } else {
                html += '<li>No files found. Please extract the CrimsonRealm.zip file first.</li>';
            }
            
            html += '</ul></body></html>';
            res.send(html);
        }
    });
});

// Handle specific routes or files
app.get('/:file', (req, res, next) => {
    const filePath = path.join(__dirname, req.params.file);
    
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File doesn't exist, proceed to next middleware (404 handler)
            return next();
        }
        
        // File exists, send it
        res.sendFile(filePath);
    });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Page Not Found - CrimsonRealm</title>
            <style>
                body {font-family:Arial,sans-serif;line-height:1.6;margin:0;padding:20px;max-width:800px;margin:0 auto;text-align:center;}
                h1 {color:#8B0000;}
                a {color:#8B0000;text-decoration:none;}
                a:hover {text-decoration:underline;}
            </style>
        </head>
        <body>
            <h1>Page Not Found</h1>
            <p>The requested page does not exist.</p>
            <p><a href="/">Return to homepage</a></p>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`CrimsonRealm server running on http://0.0.0.0:${PORT}`);
    console.log(`Serving files from: ${__dirname}`);
    console.log(`Server ready for Railway deployment`);
});
