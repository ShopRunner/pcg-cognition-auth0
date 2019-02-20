/**
 * Global Auth0 Configuration Object
 * @typedef {Object} configuration
 * @property {string} PRECOGNITIVE_API_KEY
 * @property {string} PRECOGNITIVE_USERNAME
 * @property {string} PRECOGNITIVE_PASSWORD
 */

function cognitionAutoDecision(user, context, callback) {
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
    pc.autoDecision(user, context, callback);
}
