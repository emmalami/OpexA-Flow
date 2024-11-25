const serverId = 'i24z8i8q';
const emailDomain = '@i24z8i8q.mailosaur.net';
const apiKey = Cypress.env('MAILOSAUR_API_KEY');
let emailAddress;
let receivedAfter;

describe('OpexA SignUp flow', () => {
    beforeEach(() => {
        // Generate a unique email address with current time
        const randomString = new Date().getTime();
        emailAddress = `${randomString}${emailDomain}`;
        receivedAfter = new Date(); // Set timestamp for email retrieval
        cy.log(apiKey);
    });

    it('OpexA signup and OTP retrieval', () => {
        cy.visit('https://opexa-user-client-staging-833597492714.us-central1.run.app/');
        
        // Initiate signup process
        cy.get('.gap-3 > [href="/auth/register"] > .inline-flex').click();
        cy.contains('Create Account').click();
        cy.get('.flex-col > .flex').clear(emailAddress);
        cy.get('.flex-col > .flex').type(emailAddress);
        cy.contains('Next').click();

        // Retrieve OTP from email
        cy.mailosaurGetMessage(serverId, { sentTo: emailAddress, receivedAfter }, { timeout: 60000 })
            .then((email) => {
                // Parse email to locate the OTP
                const parser = new DOMParser();
                const doc = parser.parseFromString(email.html.body, 'text/html');
                const otpElement = Array.from(doc.querySelectorAll('p')).find((p) => p.textContent.includes('Enter OTP:'));
                const otpCode = otpElement ? otpElement.textContent.match(/\d{4}/)[0].trim() : null;
                
                cy.log(`OTP Code: ${otpCode}`);
                cy.wrap(otpCode).as('otpCode');
                
                // Enter OTP code
                cy.get('[style="position: absolute; inset: 0px; pointer-events: none;"] > .disabled\\:cursor-not-allowed').clear(otpCode);
                cy.get('[style="position: absolute; inset: 0px; pointer-events: none;"] > .disabled\\:cursor-not-allowed').type(otpCode);
                cy.get('.flex.h-full > .flex-col > :nth-child(2) > .flex').clear('T');
                cy.get('.flex.h-full > .flex-col > :nth-child(2) > .flex').type('Testqa1101$');
                cy.get(':nth-child(4) > .flex').clear();
                cy.get(':nth-child(4) > .flex').type('Testqa1101$');
                cy.get('.z-0 > .text-center').click();
                cy.get('#First\\ Name').clear('o');
                cy.get('#First\\ Name').type('olamide');
                cy.get('#Last\\ Name').clear();
                cy.get('#Last\\ Name').type('john');
                cy.get('#Middle\\ Name\\ \\(optional\\)').clear();
                cy.get('#Middle\\ Name\\ \\(optional\\)').type('AAA');
                cy.get('.z-0 > .text-center').click();
                cy.contains('Confirm').click();
            });
    });


    it('OpexA assertion', function() {
        cy.visit('https://opexa-user-client-staging-833597492714.us-central1.run.app/');
        cy.get('.flex-col > .max-w-2xl').should('have.text', 'Unlocking Your Full Potential in Tech');
        cy.get('.md\\:flex-row > .flex-col > .w-full').should('have.text', 'Chart your unique career path, elevate your skills, and achieve your highest ambitions with OpexA, your ultimate career companion.');
        cy.get('.w-20').should('be.visible');
        cy.get('.gap-8 > :nth-child(1) > [href="/"] > img').should('be.visible');
        cy.get('.hidden > :nth-child(1) > a').should('be.visible');
        cy.get('.gap-8 > .hidden > :nth-child(2) > .font-medium').should('be.visible');
        cy.get('.hidden > :nth-child(3) > .font-medium').should('be.visible');
        cy.get('.hidden > :nth-child(4) > .font-medium').should('be.visible');
        cy.get('.text-white.flex > .flex-col > :nth-child(1) > p').should('have.text', 'info@opexa.org');
        cy.get('.text-white.flex > .flex-col > :nth-child(2) > p').should('have.text', '+234 905 074 2802');
        cy.get('.text-white.flex > :nth-child(2) > p').should('have.text', '7b, Ibeju Lekki Street, Dolphin Estate, Ikoyi, Lagos, Nigeria.');
        cy.get('[href="/terms"] > .md\\:border-r').should('be.visible');
        cy.get('.md\\:text-center').should('have.text', 'Copyright © 2024 OpexA Ltd');
    });
});