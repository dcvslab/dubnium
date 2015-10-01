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

const DBVERSION = "A1.0.6B";

var _head = document.getElementsByTagName("head")[0];
$(_head).append("<link rel='stylesheet' type='text/css' href='https://rawgit.com/dcvslab/dubnium/master/dubnium.css'>");

var dubnium = {
    version: DBVERSION,
    site:{ 
        menuright: document.getElementById("main-menu-right"),
        navbar: document.getElementsByClassName("user-header-menu")[0],
        pmbutton: document.getElementsByClassName("user-messages-button")[0],
        chat: document.getElementsByClassName("chat-main")[0],
        dubup: document.getElementsByClassName("dubup")[0],
    },
    menu:{
        button:{
            button: document.createElement("li"),
            buttonbtn: document.createElement("button"),
            buttontext: document.createElement("span"),
            createbutton: function createButton() {
                dubnium.menu.button.button.id = "dbbtn";
                dubnium.menu.button.buttontext.innerHTML = "dubnium";
                dubnium.menu.button.buttonbtn.appendChild(dubnium.menu.button.buttontext); 
                dubnium.menu.button.button.appendChild(dubnium.menu.button.buttonbtn);
                dubnium.site.navbar.insertBefore(dubnium.menu.button.button, dubnium.site.navbar.childNodes[0]);
            },
        },
        menu:{
            menu: document.createElement("section"),
            createmenu: function createMenu() {
                dubnium.menu.menu.menu.id = "dbmenu"
            }
            
        }
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

dubnium.menu.createbutton()
dubnium.addchat("<span style='color:#f0f'>Dubnium v" + dubnium.version + " has started successfully!</span>");
