$.widget("coalexe.notifications", {

  options: {
    // Configure how the notification is removed.
    // auto: notification hides automatically
    // click: notification hides on click
    // button: notification hides on close button click    
    closeMethod: "auto",
    // Duration in ms to show the notification
    showDuration: 200,
    // Duration in ms to hide the notification
    hideDuration: 500
  },
  
  _create: function() {
    var that = this;
    var initialNotifications = [];
    that._id = 1;
    that._notifications = [];
    
    that._bindEvents();
    
    // Add the notifications css class if it's not already present.
    if (!that.element.hasClass("notifications"))
      that.element.addClass("notifications");
    
    // Find notifications present at startup (inside the html).
    that.element.find("li").each(function () {
      var $this = $(this);
      var message = $this.html();
      var classes = $this.attr("class") ? $this.attr("class").split(" ") : [];
      var type = classes.find(function (currentClass) {
        return currentClass.startsWith("notification-");
      });
      
      // Check if there is a notification type.
      if (type) {
        type = type.substr(type.indexOf("-") + 1);
      } else { // If no notification type, default to info.
        type = "info";
      }
      
      initialNotifications.push({message: message, type: type}); // Store the initial notifications.
      $this.remove(); // Remove the current li. It will be replaced when calling the "add"" method.
    });
    
    // Add each initial notification by calling the "add" method to make sure options are respected.  
    initialNotifications.forEach(function (notification) {
      that.add(notification.message, notification.type);
    });
  },
  
  _destroy: function() {
    this._notifications = null;
    this.element.find("li").removeAttr("data-notification-id");
  },
  
  _bindEvents: function () {
    if (this.options.closeMethod === "click")
      this._on({ "click li": this._removeNotificationClickHandler });
    else if (this.options.closeMethod === "button")
      this._on({ "click .close-button": this._removeNotificationCloseButtonHandler });          
  },
  
  add: function (message, type) {
    var that = this;
    var notification = this._findNotificationByMessageAndType(message, type);

    // Check if the notification already exist.
    if (notification === undefined) { // New notification.
      that._notifications.push({id: that._id, message: message, type: type });
      var $newNotification = $("<li></li>").addClass("notification-" + type).html(message).attr("data-notification-id", that._id++).hide();
      
      if (that.options.closeMethod === "button") {
        var $closeButton = $("<span></span>").addClass("close-button");
        $newNotification.append($closeButton);
      }
      
      if (that.options.closeMethod === "click")
        $newNotification.addClass("notification-click").attr("title", "Click to close");
      
      that.element.append($newNotification);
      
      // If notification hide automatically.
      if (that.options.closeMethod === "auto") 
        $newNotification.slideDown(that.options.showDuration, function () { that._removeNotification($newNotification); });
      else // Notification close on click or close button click.      
        $newNotification.slideDown(that.options.showDuration);

    } else { // Existing notification, do not add another, refresh it.
      var $existingNotification = that.element.find("li[data-notification-id=" + notification.id + "]");
      $existingNotification.fadeOut(250, function () {
        $existingNotification.fadeIn(250);
      });
    }
  },

  _removeNotificationClickHandler: function (event) {
    this._removeNotification($(event.target));
  },
  
  _removeNotificationCloseButtonHandler: function (event) {
    this._removeNotification($(event.target).parent());
  },  
  
  _removeNotification: function ($notification) {
    var that = this;
    var id = $notification.data("notification-id");
    var index = that._findNotificationIndexById(id);
    
    var removeCallback = function () {
      $notification.remove();
      // Remove the notification from the internal notifications list.
      if (typeof index === "number")
        that._notifications.splice(index, 1);      
    };
    
    // Remove the notification. 
    if (index === 0) // FadeOut effect if it's the top notification.
      $notification.fadeOut(that.options.hideDuration, removeCallback);
    else // SlideUp effect for other notifications.
      $notification.slideUp(that.options.hideDuration, removeCallback);
  },  
  
  _findNotificationIndexById: function (id) {
    var result;
    var nbNotifications = this._notifications.length;

    for (var i = 0; i < nbNotifications; i++) {
        if (this._notifications[i].id === id) {
            result = i;
            break;
        }
    }

    return result;
  },
  
  _findNotificationByMessageAndType: function (message, type) {
    var result;
    var nbNotifications = this._notifications.length;

    for (var i = 0; i < nbNotifications; i++) {
        if (this._notifications[i].type === type && this._notifications[i].message === message) {
            result = this._notifications[i];
            break;
        }
    }

    return result;
  }

});
