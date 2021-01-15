module.exports = {
  siteMetadata: {
    title: `Attila Kun`,
    author: `Attila Kun`,
    firstName: `Attila`,
    lastName: `Kun`,
    description: `Attila Kun's personal site`,
    occupation: `Software Engineer`,
    keywords: [`Attila`, `Kun`, `Personal`, `Blog`, `Resume`, `Projects`, `Work`],
    siteUrl: process.env.URL || process.env.DEPLOY_URL || `http://localhost:8000`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-186314685-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true
      },
    },
    `gatsby-plugin-sass`
  ],
};
