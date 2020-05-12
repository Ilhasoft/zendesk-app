const domain = "$DOMAIN$";
const pathExternalSrc = "ticket.via.source.from.service_info.registered_integration_service_external_id";
const pathRequesterIdentity = "ticket.requester.identities.0";

(function () {
    const app = new Vue({
        el: '#app',
        data: {
            ready: false,
            ourTicket: false,
            contactURL: "",
        },
    });

    const client = ZAFClient.init();

    client.get([pathExternalSrc, pathRequesterIdentity]).then(function (data) {
        app.ourTicket = (data[pathExternalSrc] == domain);
        if (app.ourTicket) {
            const contactUUID = data[pathRequesterIdentity].value.split(":")[1];
            app.contactURL = `https://${domain}/contact/read/${contactUUID}/`;
        }
        app.ready = true;
    });
})();