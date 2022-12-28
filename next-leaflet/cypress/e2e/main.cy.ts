
describe('main', () => {

  beforeEach(() => {
    cy.visit('https://bill.farxan.com')
    cy.get('#__next > div > div > div > div:nth-child(1) > input').type('mail@thijmenheuvelink.nl')
    cy.get('#__next > div > div > div > div:nth-child(2) > input').type('p8PSY8727Hg3ar8v4seG7t8a9FNFd29tGjQZ')
    cy.get('#__next > div > div > div > button').click()
    cy.wait(10 * 1000)
  })

  it('Auth / Logout', () => {
    cy.get('#__next > div > div.min-h-screen.border-r-2.p-2.flex-col.bg-slate-100.min-w-\[160px\].shadow-md.overflow-x-hidden > div > button').click()
  })

})
