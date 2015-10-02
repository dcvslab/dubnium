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

if (!dubnium) {

var _head = document.getElementsByTagName("head")[0];
$(_head).append("<link rel='stylesheet' type='text/css' href='https://rawgit.com/dcvslab/dubnium/master/dubnium.css'>");

var dubnium = {
    version: "A1.1.3B",
    site: { 
        menuright: document.getElementById("main-menu-right"),
        navbar: document.getElementsByClassName("user-header-menu")[0],
        pmbutton: document.getElementsByClassName("user-messages")[0],
        pm: document.getElementById("private-messages"),
        chat: document.getElementsByClassName("chat-main")[0],
        loading:{
            loading: document.getElementById("main-loading"),
            text: document.getElementsByClassName("loading-text")[0],
            spinner: document.getElementsByClassName("spinner")[0],
        },
        dubup: document.getElementsByClassName("dubup")[0],
    },
    settings:{
        autoupdub: "true"  
    },
    functions:{
        addchat: function addChat(_class, _message) {
        _class = (!_class) ? "system": _class;
        _message = (!_message) ? "Dubnium" : _message;

        var _c = $(".chat-messages")[0];
        var _shouldScroll = _c.scrollTop > _c.scrollHeight - $(".chat-messages").height() - 50;
        
        $(dubnium.site.chat).append(
            "<li class='" + _class + "'>"  // "chat-system-loading" or "system"
                +"" + _message
            +"</li>");

        if (_shouldScroll)  _c.scrollTop = _c.scrollHeight;
        if ($(".chat-messages").children().length > 512) $(".chat-messages").children().first().remove();
        },
        aud: function aUd() {
            if (dubnium.settings.autoupdub == "true") {
                dubnium.site.dubup.click();
            }
        },
    },
    menu:{
        button:{
            button: document.createElement("li"),
            buttonbtn: document.createElement("button"),
            buttontext: document.createElement("span"),
            createbutton: function createButton() {
                dubnium.menu.button.button.id = "dbbtn";
                dubnium.menu.button.button.className = "user-messages";
                dubnium.menu.button.buttontext.innerHTML = "dubnium";
                dubnium.menu.button.buttonbtn.appendChild(dubnium.menu.button.buttontext); 
                dubnium.menu.button.button.appendChild(dubnium.menu.button.buttonbtn);
                dubnium.site.navbar.insertBefore(dubnium.menu.button.button, dubnium.site.navbar.childNodes[0]);
                dubnium.menu.button.button.addEventListener("click", function(){ dubnium.site.pm.style.display = "none"; })
                dubnium.site.pmbutton.addEventListener("click", function(){ dubnium.site.pm.style.display = "block"; })
            },
        },
        content:{
            element: document.createElement("section"),
            menuc: {
                 cont: document.createElement("div"),
                 audm: document.createElement("li"),
            },
            createmenu: function createMenu() {
                dubnium.menu.content.element.id = "dbmenu";
                dubnium.menu.content.menuc.className = "main-message-list";
                dubnium.menu.content.menuc.audm.className = "message-item display-0-users dbms";

                $(dubnium.menu.content.menuc.audm).append(
                    "<div class='message-content'>"
                    +    "<h3 class='dbmsh'>Auto Updub</h3>"
                    +    "<p class='dbmsb' id='audoo'>ON</p>"
                    +"</div>");
                $(dubnium.menu.content.menuc.cont).append(dubnium.menu.content.menuc.audm);
                dubnium.menu.content.menuc.audm.addEventListener("click", function () {
                    if (dubnium.settings.autoupdub == "true") {
                        dubnium.settings.autoupdub = "false";
                        dubnium.menu.content.menuc.audm.children[0].children[0].className = "dbmsh dtpurple";
                    } else {
                        dubnium.settings.autoupdub = "true";
                        dubnium.menu.content.menuc.audm.children[0].children[0].className = "dbmsh dtblue";
                    }
                });
                dubnium.menu.content.element.appendChild(dubnium.menu.content.menuc.cont);
                dubnium.site.menuright.appendChild(dubnium.menu.content.element);
                
            },
            
        },
    },
}

// API call setups
Dubtrack.Events.bind("realtime:room_playlist-update", function() {
    dubnium.functions.aud()
});

// Menu setups
dubnium.menu.button.createbutton()
dubnium.menu.content.createmenu()
dubnium.functions.addchat("chat-system-loading", "<span style='color:#f0f'>Dubnium v " + dubnium.version + " has started successfully!</span>");

} else {
    dubnium.functions.addchat("chat-system-loading", "<span style='color:#f0f'>Dubnium was already loaded!</span>");
}