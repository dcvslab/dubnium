/**
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

function r(_int, _floor) {
/**
 * Generates a random value from 0 - "_int"
 * @param {Number}  _int     Required. Integer range for the random number to be generated within.
 * @param {Boolean} [_floor] Optional. If "true", number will be floored. If "false", decimal spaces will be kept.
 */
    return (_int && _floor) ? ~~(Math.random() * _int) : (_int) ? (Math.random() * _int) : 0;
}

var _head = document.getElementsByTagName("head")[0];
$(_head).append("<link rel='stylesheet' type='text/css' href='https://rawgit.com/dcvslab/dubnium/master/dubnium.css'>");

var dubnium = {
    version: "A1.1.12B",
    init: function() {
        var _err = "";

        // API calls setup
        try {
            Dubtrack.Events.bind("realtime:room_playlist-update", dubnium.functions.aud);
            Dubtrack.Events.bind("realtime:room_playlist-update", dubnium.functions.DubsController.update);
        } catch (e) {
            console.error("----=[DUBNIUM ERROR]=----\nError binding event: aud\n@dubnium.init()\n" + e);
        }

        // Menu setup
        try {
            dubnium.menu.button.createbutton();
            dubnium.menu.body.createmenu();
        } catch (e) {
            console.error("----=[DUBNIUM ERROR]=----\nError creating menu\n@dubnium.init()\n" + e);
        }

        // Functions initializations
        try {
            dubnium.functions.VolumeController.init();
            dubnium.functions.DubsController.init();
            // ... //
        } catch (e) {
            console.error("----=[DUBNIUM ERROR]=----\nError initializing functions\n@dubnium.init()\n" + e);
        }

        // Start message
        try {
            dubnium.functions.addchat(
                "chat-system-loading",
                "<span style='color:#f0f'>Dubnium v " + dubnium.version + " has started successfully!</span>"
            );
        } catch (e) {
            console.error("----=[DUBNIUM ERROR]=----\nError appending chat message\n@dubnium.init()\n" + e);
        }
    },
    site: { 
        navright: document.getElementById("main-menu-right"),
        navbar: document.getElementsByClassName("user-header-menu")[0],
        pmbutton: document.getElementsByClassName("user-messages")[0],
        pm: document.getElementById("private-messages"),
        chat: document.getElementsByClassName("chat-main")[0],
        loading:{
            loading: document.getElementById("main-loading"),
            text: document.getElementsByClassName("loading-text")[0],
            spinner: document.getElementsByClassName("spinner")[0],
        },
        dubup: document.getElementsByClassName("dubup")[0]
    },
    settings: {
        aud: "true"  
    },
    functions: {
        addchat: function(_class, _message) {
            _class = (!_class) ? "system": _class;
            _message = (!_message) ? "Dubnium" : _message;

            var _c = $(".chat-messages")[0];
            var _shouldScroll = _c.scrollTop > _c.scrollHeight - $(".chat-messages").height() - 50;
            
            $(dubnium.site.chat).append(
                // Classes "chat-system-loading" or "system"
                "<li class='" + _class + "'>" 
                +    _message.toString().trim()
                +"</li>"
            );
            if (_shouldScroll) {
                _c.scrollTop = _c.scrollHeight;
            }
            if ($(".chat-messages").children().length > 512) {
                $(".chat-messages").children().first().remove();
            }
        },
        aud: function() {
                if (dubnium.settings.aud == "true") { dubnium.site.dubup.click() }
        },
        VolumeController: {
            init: function() {
                var isMouseDownOnDocument = !1;

                // Appens the percentage element to the volume bar
                $("div.left li.volume").append(
                    "<div id=\"db-volumeViewer\">"
                    +    dubnium.functions.VolumeController.getVolume()
                    +"</div>");

                // Binds the events
                document.onmousedown = function(e) {  isMouseDownOnDocument = !0;  }
                document.onmouseup   = function(e) {  isMouseDownOnDocument = !1;  }

                document.onmousemove = function(e) {
                    if (isMouseDownOnDocument) {
                        $("#db-volumeViewer").text(
                            dubnium.functions.VolumeController.getVolume()
                        );
                    }
                };
            },
            getVolume: function() {
                return $("div.left li.volume a.ui-slider-handle").attr("style").split("left: ")[1].split(";")[0];
            }
        },
        DubsController: {
            init: function() {
                var _path = "#player-controller > div.right > ul > li.copy";
                var _dubs = $("#avatar-list li.user-" + Dubtrack.session.attributes.username + " span").text().trim();
                var _role = (Dubtrack.session.attributes.roleid <= 0) ? "User" : "Mod";

                $(_path + " span").remove();
                $(_path).append(
                    "<div id=\"db-dubsController\"><b>" + _dubs + "</b> DUBS</div>"
                    +"<div id=\"db-roleController\">" + _role + "</div>"
                );
            },
            update: function() {
                var _t = setTimeout(function() {
                    var _dubs = $("#avatar-list li.user-" + Dubtrack.session.attributes.username + " span").text().trim();
                    if ($("#db-dubsController b").text() != _dubs) {
                        $("#db-dubsController b").text(_dubs);
                    }
                }, 5000);
            }
        }
    },
    menu: {
        button: {
            element: document.createElement("li"),
            btn: document.createElement("button"),
            buttontext: document.createElement("span"),
            createbutton: function createButton() {
                dubnium.menu.button.element.id = "dbbtn";
                dubnium.menu.button.element.className = "user-messages";
                dubnium.menu.button.buttontext.innerHTML = "dubnium";
                dubnium.menu.button.btn.appendChild(dubnium.menu.button.buttontext); 
                dubnium.menu.button.element.appendChild(dubnium.menu.button.btn);
                dubnium.site.navbar.insertBefore(dubnium.menu.button.element, dubnium.site.navbar.childNodes[0]);
                dubnium.menu.button.element.addEventListener("click", function() {
                    dubnium.site.pm.style.display = "none";
                });
                dubnium.site.pmbutton.addEventListener("click", function() {
                    dubnium.site.pm.style.display = "block";
                });
            }
        },
        body: {
            element: document.createElement("section"),
            content: {
                firstdiv: document.createElement("div"),
            },
            createmenu: function() {
                dubnium.menu.body.element.id = "dbmenu";
                dubnium.menu.body.element.className = "main-message-list";
                dubnium.menu.body.content.firstdiv.innerHTML = "IN PROGRESS"
                dubnium.site.navright.appendChild(dubnium.menu.body.element);
                dubnium.menu.body.element.appendChild(dubnium.menu.body.content.firstdiv);
            }
        }
    }
}

dubnium.init();
