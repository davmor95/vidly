const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        proxy(
            "/genres", {
                target: "http://localhost:8081/api",
                changeOrigin: true
            }
        )
    );

    app.use(
        proxy(
            "/movies", {
                target: "http://localhost:8081/api",
                changeOrigin: true
            }
        )
    );

    app.use(
        proxy(
            "/users", {
                target: "http://localhost:8081/api",
                changeOrigin: true
            }
        )
    );

    app.use(
        proxy(
            "/auth", {
                target: "http://localhost:8081",
                changeOrigin: true
            }
        )
    );

    app.use(
        proxy(
            "/register", {
                target: "http://localhost:8081",
                changeOrigin: true
            }
        )
    );
};
