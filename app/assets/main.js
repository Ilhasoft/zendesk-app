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
        }
        app.ready = true;
    });
})();