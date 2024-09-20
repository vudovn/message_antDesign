class VdMessage {
  constructor() {
    this.iconMap = {
      success: '<i class="bi bi-check-circle-fill"></i>',
      warning: '<i class="bi bi-exclamation-circle-fill"></i>',
      error: '<i class="bi bi-x-circle-fill"></i>',
      info: '<i class="bi bi-info-circle-fill"></i>',
    };

    this.messages = [];
    this.maxMessages = 2;
    this.insertMessageContainer();
    this.insertCSS();
  }

  insertMessageContainer() {
    // Tạo và chèn thẻ div với class 'vd_message_js' vào body nếu chưa tồn tại
    if ($(".vd_message_js").length === 0) {
      const messageContainer = $('<div class="vd_message_js"></div>');
      $("body").append(messageContainer);
    }
  }

  insertCSS() {
    // Thêm CSS trực tiếp vào trang nếu cần
    const css = `
            .vd_message_js {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2010;
            transition: 0.3s;
            position: fixed;
            }

            .vd_message {
            padding: 9px 12px;
            border-radius: 12px;
            box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
                0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
            background: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
            transition: 0.3s;
            width: auto;
            position: absolute;
            white-space: nowrap;
            }

            .vd_message_main {
            display: flex;
            gap: 5px;
            align-items: center;
            }

            .vd_message_noti {
            color: rgba(0, 0, 0, 0.88);
            font-size: 14px;
            line-height: 1.5714285714285714;
            list-style: none;
            pointer-events: none;
            }

            /* status */
            .vd_message.success .vd_message_icon {
            color: #52c41a;
            }

            .vd_message.error .vd_message_icon {
            color: red;
            }

            .vd_message.warning .vd_message_icon {
            color: orange;
            }

            .vd_message.info .vd_message_icon {
            color: #0d6efd;
            }
      `;

    // Chèn style vào head
    if ($("#vd_message_style").length === 0) {
      $('<style id="vd_message_style"></style>').text(css).appendTo("head");
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
    // Tạo khoảng cách giữa các thông báo, ví dụ mỗi thông báo cách nhau 3.2rem theo chiều dọc
    messages.each(function (index) {
      $(this).css({
        top: `${index * 3.2}rem`,
        position: "absolute", // Đảm bảo các thông báo được xếp chồng lên nhau và cách đều
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
// messageVD.show("success", "This is a success message!");
// messageVD.show("error", "This is an error message!", 5000);
