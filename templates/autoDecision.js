/**
 * Global Auth0 Configuration Object
 * @typedef {Object} configuration
 * @property {string} PRECOGNITIVE_API_KEY
 * @property {string} PRECOGNITIVE_USERNAME
 * @property {string} PRECOGNITIVE_PASSWORD
 */

/**
 * @typedef {Context} context
 * @typedef {User} user
 * @typedef {Callback} callback
 * @typedef {Cognition} Cognition
 * @typedef {Versions} Versions
 */

function (user, context, callback) {

    // DO NOT EDIT BELOW THIS LINE
    // --------------------------------

<%= contents %>

    // DO NOT EDIT ABOVE THIS LINE
    // --------------------------------

    /** @type {Cognition} */
    const pc = new Cognition({
        apiKey: configuration.PRECOGNITIVE_API_KEY,
        version: Versions.v1,
        auth: {
            userName: configuration.PRECOGNITIVE_USERNAME,
            password: configuration.PRECOGNITIVE_PASSWORD
        }
    });
    pc.autoDecision(user, context, callback);
}
