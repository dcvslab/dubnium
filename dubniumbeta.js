//Dubnium Script
//A script for dubtrack.fm
//Created by DCV & MatheusAvellar
//This code may or may not work, as it is an unofficial, beta test for the actual release!
var head = document.getElementsByTagName("head")[0]; $(head).append("<link rel='stylesheet' type='text/css' href='https://rawgit.com/dcvslab/dubnium/master/dubnium.css'>");
var dubnium = {
  version: "A1.0.1.1B",
  chat: document.getElementsByClassName("chat-main")[0],
  addchat: function addChat(username, message) { $(dubnium.chat).append("<li class='user-dubniumscript'><div class='stream-item-content'><div class='image_row'></div><div class='activity-row'><div class='text'><p><a class='username'>" + username + "</a> " + message + "</p></div><div class='meta-info'><span class='username'>Dubnium </span><i class='icon-dot'></i><span class='timeinfo'><time title='Dubnium' class='timeago' datetime='Dubnium'>Dubnium Script</time></span></div></div></div></li>")}
}
dubnium.addchat("Dubnium v" + dubnium.version + "", "has started successfully!")
  
