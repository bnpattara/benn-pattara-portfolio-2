
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

const testModel = async (modelId) => {
    return new Promise((resolve) => {
        console.log(`Testing model: ${modelId}...`);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
        const data = JSON.stringify({
            contents: [{ parts: [{ text: "Hello" }] }]
        });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(url, options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log(`✅ ${modelId} SUCCESS`);
                    resolve(true);
                } else {
                    console.log(`❌ ${modelId} FAILED: ${res.statusCode}`);
                    // console.log(body);
                    resolve(false);
                }
            });
        });

        req.on('error', (e) => {
            console.error(`Error testing ${modelId}:`, e);
            resolve(false);
        });

        req.write(data);
        req.end();
    });
};

async function runTests() {
    await testModel('gemini-2.5-flash');
    await testModel('gemini-flash-latest');
    await testModel('gemini-2.0-flash-lite-preview-02-05');
}

runTests();
