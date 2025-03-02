class VdMessage {
  constructor(maxMessages = 2) {
    this.iconMap = {
      success: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>`,
      warning: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                </svg>`,
      error: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
              </svg>`,
      info: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
            </svg>`,
      loading: `
          <div class="spinner-border spinner-border-sm text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
      `,
    };

    this.messages = [];
    this.maxMessages = maxMessages;
    this.insertMessageContainer();
  }

  insertMessageContainer() {
    if ($(".vd_message_js").length === 0) {
      const messageContainer = $('<div class="vd_message_js"></div>');
      $("body").append(messageContainer);
    }
  }

  createMessage(type, message) {
    const icon = this.iconMap[type] || this.iconMap.info;
    const htmlMessage = `
        <div class="vd_message ${type} animate__animated animate__faster animate__fadeInDown">
          <div class="vd_message_main">
            <div class="vd_message_icon">
              ${icon}
            </div>
            <div class="vd_message_noti">
              ${message}
            </div>
          </div>
        </div>
      `;
    return htmlMessage;
  }

  show(type, message, timeout = 3000) {
    const htmlMessage = this.createMessage(type, message);
    const messageContainer = $(".vd_message_js");

    if (this.messages.length >= this.maxMessages) {
      const firstMessage = this.messages.shift();
      firstMessage.remove();
    }

    const newMessage = $(htmlMessage);
    this.messages.push(newMessage);
    messageContainer.append(newMessage);

    this.updateMessagePositions();
    newMessage.fadeIn(5, function () {
      setTimeout(() => {
        $(this)
          .removeClass("animate__fadeInDown")
          .addClass("animate__fadeOutUp");
        setTimeout(() => {
          $(this).remove();
        }, 1000);
      }, timeout);
    });
  }

  updateMessagePositions() {
    const messageContainer = $(".vd_message_js");
    const messages = messageContainer.children();
    messages.each(function (index) {
      $(this).css({
        top: `${index * 3.2}rem`,
        position: "absolute",
      });
    });
  }

  destroy() {
    this.messages.forEach((message) => {
      message.removeClass("animate__fadeInDown").addClass("animate__fadeOutUp");
      setTimeout(() => {
        message.remove();
      }, 1000);
    });
  }
}

// Sử dụng thư viện
// messageVD.show("success", "message!");
// messageVD.show("error", "message!", 5000);
