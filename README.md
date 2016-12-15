# notifications
Simple notifications for your web application.

# description
Shows a success, info, warning and error notification messages at the bottom of the screen. Multiple notifications stack up one above the other. You can configure the widget to hide automatically, to hide on click or to hide on close button.

# requirements
jQuery-ui

# usage
## initialization
var n = $("#id").notifications();

## add notification
n.notifications("add", "type", "message");

Supported types:
*success
*info
*warning
*error




