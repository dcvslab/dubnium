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

const DBVERSION = "A1.0.7B";

var _head = document.getElementsByTagName("head")[0];
$(_head).append("<link rel='stylesheet' type='text/css' href='https://rawgit.com/dcvslab/dubnium/master/dubnium.css'>");

var dubnium = {
    version: DBVERSION,
    site:{ 
        menuright: document.getElementById("main-menu-right"),
        navbar: document.getElementsByClassName("user-header-menu")[0],
        pmbutton: document.getElementsByClassName("user-messages-button")[0],
        pm: document.getElementById("private-messages"),
        chat: document.getElementsByClassName("chat-main")[0],
        loading:{
            loading: document.getElementById("main-loading"),
            text: document.getElementsByClassName("loading-text")[0],
            spinner: document.getElementsByClassName("spinner")[0],
        },
        dubup: document.getElementsByClassName("dubup")[0],
    },
    menu:{
        button:{
            button: document.createElement("li"),
            buttonbtn: document.createElement("button"),
            buttontext: document.createElement("span"),
            createbutton: function createButton() {
                dubnium.menu.button.button.id = "dbbtn";
                dubnium.menu.button.button.className = "user-messages-button";
                dubnium.menu.button.buttontext.innerHTML = "dubnium";
                dubnium.menu.button.buttonbtn.appendChild(dubnium.menu.button.buttontext); 
                dubnium.menu.button.button.appendChild(dubnium.menu.button.buttonbtn);
                dubnium.site.navbar.insertBefore(dubnium.menu.button.button, dubnium.site.navbar.childNodes[0]);
                dubnium.menu.button.button.addEventListener("click", function(){ dubnium.menu.menu.menu.style.display = "block"; dubnium.site.pm.style.display = "none"; }
                dubnium.site.pmbutton.addEventListener("click", function(){ dubnium.menu.menu.menu.style.display = "none"; dubnium.site.pm.style.display = "block"; }
            },
        },
        menu:{
            menu: document.createElement("section"),
            createmenu: function createMenu() {
                dubnium.menu.menu.menu.id = "dbmenu";
                dubnium.site.menuright.appendChild(dubnium.menu.menu.menu);
                
            },
            
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

dubnium.menu.button.createbutton()
dubnium.addchat("<span style='color:#f0f'>Dubnium v" + dubnium.version + " has started successfully!</span>");

