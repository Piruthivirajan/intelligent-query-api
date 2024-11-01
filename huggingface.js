const axios = require('axios');

async function checkModelAvailability(modelName) {
    const apiUrl = `https://api-inference.huggingface.co/models/${modelName}`;
    const apiToken = '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'; // Replace with your Hugging Face API token

    try {
        const response = await axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${apiToken}` },
        });
        const availability = response.status === 200 ? "Free API available" : "Free API unavailable";
        console.log(`${modelName}: ${availability}`);
    } catch (error) {
        console.error(`Error checking ${modelName}:`, error.response ? error.response.data : error.message);
    }
}

// Example usage: Replace 'MODEL_NAME' with the model you want to check
checkModelAvailability('meta-llama/Llama-2-7b');
checkModelAvailability('bigscience/bloom');
checkModelAvailability('cssupport/t5-small-awesome-text-to-sql');
checkModelAvailability('NumbersStation/nsql-llama-2-7B');
checkModelAvailability('mrm8488/t5-base-finetuned-wikiSQL');