module.exports = {
  apps: [
    {
      name: "JCWDOL-09-03", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 9003,
      },
      time: true,
    },
  ],
};
