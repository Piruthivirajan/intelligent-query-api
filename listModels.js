
require('dotenv').config();

const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function listModels() {
  try {
    const response = await openai.models.list();
    response.data.forEach(model => {
      console.log(model.id);
    });
  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

listModels();
