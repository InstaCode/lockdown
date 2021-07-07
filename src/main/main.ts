import * as core from '@actions/core'
import * as github from '@actions/github'
import * as verify from './verify'

const username = github.context.actor
const strictKey = 'strict'
const usersKey = 'users'
let verified = false
function run(): void {
  
  // comment to invoke change - DO NOT MERGE
  try {
    core.info(
      `Verifying that username (${username}) is approved for running builds`
    )
    const strict = Boolean(core.getInput(strictKey))
    if (!strict) {
      core.info('Checking repo ownership against author')
      verified = verify.verifyOwner(username)
    }
    if (!verified || strict) {
      const usernames = core.getInput(usersKey).trim()
      core.debug(usernames)
      verified = verify.verifyUser(username, usernames)
    }
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
