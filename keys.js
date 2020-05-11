// HINT: hide your keys/secret/bucket name using a `.env` file and the npm package `dotenv`; see
// the 'Protecting-API-Keys-In-Node' tutorial in the 'Resources' folder in your class GitLab
const keys = {
    "s3bucket": "du-garage-sale",
    "s3key": process.env.AWS_ACCESS_KEY_ID,
    "s3secret": process.env.AWS_SECRET_ACCESS_KEY
};

module.exports = keys;