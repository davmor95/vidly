

function init() {

}

function log(error) {
    console.log(error)
    // Sentry.captureException(error);
}

export default {
    init,
    log
}
