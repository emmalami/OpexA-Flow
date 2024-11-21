describe('reading file in cypress', ()=> {


it('testing multiple login', ()=>{
cy.visit('https://trytestingthis.netlify.app')
cy.get('#myfile').attachFile('Messi_inArsenal.jfif')
cy.fixture('example.json').then((data)=>{
    cy.log(data.name)
    cy.log(data.email)
})



})


})