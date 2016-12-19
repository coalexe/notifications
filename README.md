# notifications
Simple notifications for your web application.

# description
Shows a success, info, warning and error notification messages at the bottom of the screen. Multiple notifications stack up one above the other. You can configure the widget to hide automatically, to hide on click or to hide on close button.

# requirements
jQuery-ui

# usage
## initialization
### empty list
Add an empty unordered list element (<ul id="notifications"></ul> in your html.

var notificationWidget = $("#notifications").notifications();

### list containing notifications
You can init the widget with "li" elements in your unordered list like this:
<ul id="notifications">
<li class="notification-info">Info</li>
<li class="notification-success">Success</li>
<li class="notification-warning">Warning</li>
<li class="notification-error">Error</li>
</ul>

Notifications will automatically appear when initializing the widget.
Note that "li" elements need to have one of these css classes:
*notification-info
*notification-succes
*notification-warning
*notification-error

## add notification
notificationWidget.notifications("add", "type", "message");

Supported types:
*success
*info
*warning
*error




