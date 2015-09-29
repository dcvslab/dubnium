//Dubnium Script
//A script for dubtrack.fm
//Created by DCV & MatheusAvellar
//This code may or may not work, as it is an unofficial, beta test for the actual release!

var dubnium = {
  version: "A1.0.0B",
  chat: document.getElementsByClassName("chat-main")[0],
  addchat: function addChat(username, message) { $(dubnium.chat).append("<li class='user-dubniumscript'><div class='stream-item-content'><div class='image_row'></div><div class='activity-row'><div class='text'><p><a class='username'>" + username + "</a> " + message + "</p></div><div class='meta-info'><span class='username'>Dubnium </span><i class='icon-dot'></i><span class='timeinfo'><time title='Dubnium' class='timeago' datetime='Dubnium'>Dubnium Script</time></span></div></div></div></li>")}
}
dubnium.addchat("Dubnium v" + dubnium.version + "", "has started successfully!")
  
