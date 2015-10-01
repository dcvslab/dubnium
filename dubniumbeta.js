/*
 *           Dubnium Script
 *
 *      A script for dubtrack.fm
 *
 *   Created by DCV & MatheusAvellar
 *
 *    This code may or may not work,
 *  as it is an unofficial, beta test
 *      for the actual release!
 *
 */

const DBVERSION = "A1.0.3B";

var _head = document.getElementsByTagName("head")[0];
$(_head).append("<link rel='stylesheet' type='text/css' href='https://rawgit.com/dcvslab/dubnium/master/dubnium.css'>");

var dubnium = {
    version: DBVERSION,
    site:{ 
        chat: document.getElementsByClassName("chat-main")[0],
        dubup: document.getElementsByClassName("dubup")[0]
    },
    addchat: function addChat(_username, _message) {
        _username = (!_username) ? "Dubnium" : _username;
        _message = (!_message) ? "Message" : _message;

        var _c = $(".chat-messages")[0];
        var _shouldScroll = _c.scrollTop > _c.scrollHeight - $(".chat-messages").height() - 50;

        $(dubnium.site.chat).append(
            "<li class='user-dubniumscript'>"
            +   "<div class='stream-item-content'>"
            +       "<div class='image_row'></div>"
            +       "<div class='activity-row'>"
            +           "<div class='text'>"
            +               "<p><a class='username'>" + _username + "</a> " + _message + "</p>"
            +           "</div>"
            +           "<div class='meta-info'>"
            +               "<span class='username'>Dubnium </span>"
            +               "<i class='icon-dot'></i>"
            +               "<span class='timeinfo'>"
            +                   "<time title='Dubnium' class='timeago' datetime='Dubnium'>Dubnium Script</time>"
            +               "</span>"
            +           "</div>"
            +       "</div>"
            +   "</div>"
            +"</li>");

        if (_shouldScroll)  _c.scrollTop = _c.scrollHeight;
        if ($(".chat-messages").children().length > 512) $(".chat-messages").children().first().remove();
    }
}
//TEMP AUTO DUBUP 
Dubtrack.Events.bind('realtime:room_playlist-update', function(){ dubnium.site.dubup.click() });
dubnium.addchat("Dubnium v" + dubnium.version + "", "has started successfully!");
