const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "YOUR_API_KEY",
});

const openai = new OpenAIApi(configuration);

async function generateSQL(tableSchema, userRequest) {
  const prompt = `
  You are a SQL expert for a MySQL database. Here is the table schema:
  ${tableSchema}

  Based on this schema, please create a SQL query for the following request:
  "${userRequest}"
  `;

  const response = await openai.createChatCompletion({
    model: "gpt-4o-mini-2024-07-18",
    messages: [{ role: "system", content: "Act as an SQL generation assistant." }, { role: "user", content: prompt }],
    max_tokens: 150,
    temperature: 0,
  });

  console.log(response.data.choices[0].message.content);
}

const tableSchema = `
Table: employees
- employee_id (INT)
- name (VARCHAR)
- department_id (INT)

Table: departments
- department_id (INT)
- department_name (VARCHAR)
`;

const userRequest = "List all employees in the 'Sales' department.";

generateSQL(tableSchema, userRequest);
