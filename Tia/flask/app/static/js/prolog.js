// chatbot
const chatbotConnection = openChatbotWebSocket()
document.getElementById("chatbot-question").onkeydown = getChatbotQuestion;

function getChatbotQuestion(event) {
    if (event.key === "Enter") {
        sendMessage(chatbotConnection, this.value);
        this.value = "";
    }
    ;
}

function getChatbotAnswer(event) {
    response = event.data.substring(1, event.data.length-1);
    document.getElementById("chatbot-answer").textContent = response;

}

function sendMessage(connection, message) {
    connection.send(JSON.stringify({message: message}));
}

function openChatbotWebSocket() {
    const connection = new WebSocket("ws://localhost:3000/chatbot")
    connection.onerror = (error) => {
        console.log(error)
    }
    connection.onmessage = getChatbotAnswer
    return connection
}
