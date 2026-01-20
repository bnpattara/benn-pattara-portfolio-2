
const fs = require('fs');
const https = require('https');

// Read .env.local manually
let apiKey = '';
try {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (match) {
        apiKey = match[1].trim();
    }
} catch (e) {
    console.error("Could not read .env.local");
    process.exit(1);
}

if (!apiKey) {
    console.error("No API key found in .env.local");
    process.exit(1);
}

console.log('Checking models with key ending in...', apiKey.slice(-4));

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log('\nAvailable Models for generateContent:');
                json.models.forEach(m => {
                    if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent')) {
                        console.log(`- ${m.name.replace('models/', '')}`);
                    }
                });
            } else {
                console.log('Error response:', json);
            }
        } catch (e) {
            console.error("Error parsing JSON:", e);
        }
    });
}).on('error', (e) => {
    console.error("Network error:", e);
});
