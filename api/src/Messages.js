const messages = [];

exports.saveMessages = (message) => {
  messages.push(message);
};

exports.getMessagesForUser = (userId) => {
    return messages.filter((message) => {
      return message.to === userId || message.from === userId;
    });
}

