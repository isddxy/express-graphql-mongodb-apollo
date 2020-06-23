module.exports = {
    client: {
        service: "user.gh.isddxy",
        includes: ["./src/**/*.js"],
        excludes: ["**/__tests__/**"]
    },
    engine: {
        apiKey: process.env.APOLLO_KEY
    },
};