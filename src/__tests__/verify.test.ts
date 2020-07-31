import * as verify from '../main/verify'

describe('Verify User Tests', function () {
  it('Verify User As True', () => {
    expect(
      verify.verifyUser('fake-user', 'fake-user, dependabot-preview')
    ).toBe(true)
  })

  it('Verify User As False', () => {
    expect(
      verify.verifyUser('fake-user1', 'fake-user, dependabot-preview')
    ).toBe(false)
  })
})

describe('Verify Owner Tests', () => {
  it('Verify User Is The Owner', () => {
    expect(verify.verifyOwner('InstaCode')).toBe(true)
  })

  it('Verify User Is Not The Owner', () => {
    expect(verify.verifyOwner('fake-user')).toBe(false)
  })
})
