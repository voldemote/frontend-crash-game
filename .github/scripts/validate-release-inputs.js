if (['staging', 'production'].includes(process.env.stage)) {
    console.log("stage must be either 'staging' or 'production'");
    process.exit(1);
}

if (['dev', 'prod', 'latest'].includes(process.env.version)) {
    console.log("version must follow semantic syntax like 1.x.x, 'prod', 'dev' and 'latest' are not valid inputs");
    process.exit(1);
}