var domain = "$DOMAIN$";
var pathExternalSrc = "ticket.via.source.from.service_info.registered_integration_service_external_id";
var pathRequesterIdentity = "ticket.requester.identities.0";

(function () {
    var app = new Vue({
        el: '#app',
        data: {
            ready: false,
            ourTicket: false,
            contactURL: "",
        },
    });

    var client = ZAFClient.init();

    client.get([pathExternalSrc, pathRequesterIdentity]).then(function (data) {
        app.ourTicket = (data[pathExternalSrc] == domain);
        if (app.ourTicket) {
            var contactUUID = data[pathRequesterIdentity].value.split(":")[1];
            app.contactURL = `https://${domain}/contact/read/${contactUUID}/`;

            client.on('ticket.status.changed', function (e) {
                if (e == "solved") {
                    handleTicketSolved();
                }
            });
        }
        app.ready = true;
    });

    function handleTicketSolved() {
        // our external ticket UUID is stored in display_info on comments from us.. like the initial one
        client.get("ticket.comments").then(function (data) {
            var comments = data["ticket.comments"];
            var initialComment = comments[comments.length - 1];
            var ticketUUID = initialComment.channelDisplayInfo["temba-ticket"]["uuid"];

            console.log(`TODO: notify $BRAND$ that ticket ${ticketUUID} has been closed`);
        });
    }
})();