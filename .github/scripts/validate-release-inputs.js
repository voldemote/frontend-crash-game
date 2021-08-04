if (['staging', 'production'].includes(process.env.stage)) {
    console.log("stage must be either 'staging' or 'production'");
    process.exit(1);
  }