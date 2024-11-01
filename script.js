function sendQuery() {
    const userInput = document.getElementById('user-input').value.trim();
    const chatOutput = document.getElementById('chat-output');

    if (userInput === '') return;

    // Display user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.textContent = `User: ${userInput}`;
    chatOutput.appendChild(userMessage);

    // Clear input field
    document.getElementById('user-input').value = '';

    // Send query to backend
    fetch('http://localhost:5000/dynamic-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userInput })
    })
    .then(response => response.json())
    .then(data => {
        // Display bot response
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot-message';
        botMessage.textContent = `Bot: ${data.response}`;
        chatOutput.appendChild(botMessage);

        // Auto-scroll to the latest message
        chatOutput.scrollTop = chatOutput.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'chat-message bot-message';
        errorMessage.textContent = "Bot: Sorry, there was an error processing your request.";
        chatOutput.appendChild(errorMessage);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    });
}
