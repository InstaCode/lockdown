import * as core from '@actions/core'
import * as github from '@actions/github'
import * as verify from './verify'

const username = github.context.actor

function run(): void {
  
  // comment to invoke change - DO NOT MERGE
  try {
    core.info(
      `Verifying that username (${username}) is approved for running builds`
    )
    const usernames = core.getInput('users').trim()
    core.debug(usernames)
    const verified = verify.verifyUser(username, usernames)

    if (!verified) {
      core.setFailed(
        `User ${username} is not approved to execute builds on the pipeline`
      )
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
