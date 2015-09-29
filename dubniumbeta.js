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

const DBVERSION = "A1.0.21B";
const PATH = "https://rawgit.com/dcvslab/projects/master/dubnium/";

var _head = document.getElementsByTagName("head")[0];
$(_head).append("<link rel='stylesheet' type='text/css' href='" + PATH + "dubnium.css'>");

var dubnium = {
    version: DBVERSION,
    chat: document.getElementsByClassName("chat-main")[0],
    addchat: function addChat(_username, _message) {
        _username = (!_username) ? "Dubnium" : _username;
        _message = (!_username) ? "Message" : _username;

        var _c = $(".chat-messages")[0];
        var _shouldScroll = _c.scrollTop > _c.scrollHeight - $(".chat-messages").height() - 50;

        $(dubnium.chat).append(
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

dubnium.addchat("Dubnium v" + dubnium.version + "", "has started successfully!");