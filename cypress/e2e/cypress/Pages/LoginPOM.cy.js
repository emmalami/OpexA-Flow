export class loginPage {

    loginPage_username = "input[placeholder='example@mail.com']" 
    loginPage_password = '.relative > .flex'
    loginPage_Submitbtn= '.text-center'
    loginPage_loginlink= '.gap-3 > [href="/auth/login"] > .inline-flex'

    navigate(url) {
        cy.visit(url);

    }

    Username(username) {
        cy.get(this.loginPage_username).clear(username);
        cy.get(this.loginPage_username).type(username);


    }

    Password(password) {
        cy.get(this.loginPage_password).clear('T');
        cy.get(this.loginPage_password).type(password);


    }

    clickLogin() {

        cy.get(this.loginPage_Submitbtn).click();

    }
    homepage_login() {
        cy.get(this.loginPage_loginlink).click();
    }
}

