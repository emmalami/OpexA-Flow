import {loginPage} from '../Pages/LoginPOM.cy'

const login = new loginPage   //class name is the new login

    it('Login to OpexA', () => {
        login.navigate('https://opexa-user-client-staging-833597492714.us-central1.run.app/')
        cy.wait(10000)
        login.homepage_login()
        login.Username('qatester@opexconsult.co.uk')
        login.Password('Testqa1101')
        login.clickLogin()           

    })