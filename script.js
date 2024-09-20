const VdMessage = (function() {
    const iconMap = {
        success: '<i class="bi bi-check-circle-fill"></i>',
        warning: '<i class="bi bi-exclamation-circle-fill"></i>',
        error: '<i class="bi bi-x-circle-fill"></i>',
        info: '<i class="bi bi-info-circle-fill"></i>'
    };

    const messages = []; 

    function createMessage(type, message) {
        const icon = iconMap[type] || iconMap.info;
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

    function displayMessage(type, message) {
        const htmlMessage = createMessage(type, message);
        const messageContainer = $(".vd_message_js");

        const maxMessages = 5; 
        if (messages.length >= maxMessages) {
            const firstMessage = messages.shift(); 
            firstMessage.remove(); 
        }

        const newMessage = $(htmlMessage);
        messages.push(newMessage);
        messageContainer.append(newMessage);

        newMessage.fadeIn(5, function() {
            setTimeout(() => {
                $(this).removeClass('animate__fadeInDown').addClass('animate__fadeOutUp');
                setTimeout(() => {
                    $(this).remove();
                }, 1000);
            }, 3000); 
        });
    }


    return {
        show: displayMessage
    };
})();

// // Sử dụng thư viện
// VdMessage.show("error", "This is an error message");
// VdMessage.show("success", "This is a success message");
// VdMessage.show("warning", "This is a warning message");
// VdMessage.show("info", "This is an info message");
