const core = require('@actions/core');
const github = require('@actions/github');
const collaborators = require('./verifyUser');

const username = github.context.actor;

async function run() {
    core.debug("Verifying that username ${username} is approved for running builds");
    const usernames = core.getInput('users');
    core.info(usernames);
    const verified = collaborators.

    if (!verified)
    {
        core.setFailed("User " + username + "is not approved to execute builds on the pipeline");
    }

}
run()


