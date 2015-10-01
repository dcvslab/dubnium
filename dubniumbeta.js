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

const DBVERSION = "A1.0.4B";

var _head = document.getElementsByTagName("head")[0];
$(_head).append("<link rel='stylesheet' type='text/css' href='https://rawgit.com/dcvslab/dubnium/master/dubnium.css'>");

var dubnium = {
    version: DBVERSION,
    site:{ 
        chat: document.getElementsByClassName("chat-main")[0],
        dubup: document.getElementsByClassName("dubup")[0]
    },
    addchat: function addChat(_message) {
        _message = (!_message) ? "Dubnium" : _message;

        var _c = $(".chat-messages")[0];
        var _shouldScroll = _c.scrollTop > _c.scrollHeight - $(".chat-messages").height() - 50;
        
        $(dubnium.site.chat).append(
            "<li class='chat-system-loading'>"
                +"" + _message
            +"</li>");

        if (_shouldScroll)  _c.scrollTop = _c.scrollHeight;
        if ($(".chat-messages").children().length > 512) $(".chat-messages").children().first().remove();
    }
}
//TEMP AUTO DUBUP 
Dubtrack.Events.bind('realtime:room_playlist-update', function(){ dubnium.site.dubup.click() });
dubnium.addchat("Dubnium v" + dubnium.version + "has started successfully!");
