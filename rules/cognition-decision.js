/**
 * Global Auth0 Configuration Object
 * @typedef {Object} configuration
 * @property {string} PRECOGNITIVE_API_KEY
 * @property {string} PRECOGNITIVE_USERNAME
 * @property {string} PRECOGNITIVE_PASSWORD
 */

function cognitionDecision(user, context, callback) {
    // START-INJECT
    // END-INJECT

    // DO NOT edit above this line.
    // ---------------------------------------

    const pc = new Cognition({
        apiKey: configuration.PRECOGNITIVE_API_KEY,
        version: Cognition.Versions.v1,
        auth: {
            userName: configuration.PRECOGNITIVE_USERNAME,
            password: configuration.PRECOGNITIVE_PASSWORD
        }
    });

    // Filter user & context object as desired here
    pc.decision(user, context)
        .then((res) => {
            const isGoodLogin = Cognition.isGoodLogin(res);

            if (!isGoodLogin) {
                // do mutation
            }

            callback(null, user, context);
        })
        .catch((err) => {
            // Comment out if you want to suppress errors and continue auth w/o Precognitive
            callback(err, user, context);
        });
}
