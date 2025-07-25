/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />


describe('Validação Profusion - Acolhimento', () => {
    beforeEach(() => {
        cy.setupAndLogin(); // Usa o comando customizado
    });


    it('Validar url Acolhimento', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 10000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.url().should('include', 'https://amei-staging.amorsaude.com.br/waiting-room-v2/reception');
    })

    it('Validar bread Home', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.url().should('include', 'https://amei-staging.amorsaude.com.br/')
        
    });

    it('Validar bread Sala de espera', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//a[@routerlink='/waiting-room'][contains(.,'Sala de espera')]").click()

        cy.url().should('eq', 'https://amei-staging.amorsaude.com.br/waiting-room-v2')
    });

    it('Validar bread Acolhimento', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//a[@class='text-gray-medium'][contains(.,'Acolhimento')]").click()

        cy.url().should('eq', 'https://amei-staging.amorsaude.com.br/waiting-room-v2/reception')

    });

    it('Validar título Sala de espera', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//h3[contains(.,'Sala de espera')]").should('have.text', 'Sala de espera');
    });

    it('Validar subtítulo Acolhimento', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//h3[contains(.,'Acolhimento')]").should('contain.text', 'Acolhimento')
    });

    it('Validar input data com data valida', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.wait(5000)

        const today = new Date();
        const currentDay = today.getDate();
        const currentMonth = today.getMonth() + 1; // +1 porque getMonth() retorna 0-11
        const validDate = currentDay > 1 ? currentDay - 1 : 1;

        // Garante que a data tenha 2 dígitos
        const formatDate = (num) => String(num).padStart(2, '0');

        cy.get('#data_espera')
            .should('exist')
            .clear()
            .type(`${formatDate(validDate)}/${formatDate(currentMonth)}/${today.getFullYear()}`)
            .should('have.value', `${formatDate(validDate)}/${formatDate(currentMonth)}/${today.getFullYear()}`);
    });

    it('Validar input data sem data de preenchimento', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.wait(5000)

        cy.get('#data_espera')
            .should('exist')
            .clear()
            
        cy.xpath("//input[contains(@placeholder,'Profissionais')]").click()

        cy.xpath("//mat-error[@aria-atomic='true'][contains(.,'*Campo obrigatório.')]").should('be.visible')

    });

    it('Validar sem grade para visualização', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.wait(5000)

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        
        const formatDate = (num) => String(num).padStart(2, '0');
        
        cy.get('#data_espera')
           .should('exist')
           .clear()
           .type(`${formatDate(tomorrow.getDate())}/${formatDate(tomorrow.getMonth() + 1)}/${tomorrow.getFullYear()}`)
           .should('have.value', `${formatDate(tomorrow.getDate())}/${formatDate(tomorrow.getMonth() + 1)}/${tomorrow.getFullYear()}`);

           cy.xpath("//button[contains(.,'Pesquisar')]").click()

           cy.xpath("//p[@class='text-start'][contains(.,'Nenhum resultado encontrado!')]").should('be.visible')
    });

    it('Validar input area de atuação', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//input[contains(@placeholder,'Área de atuação')]").click();

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Acupuntura')]").should('be.visible');
        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Anestesiologia')]").should('be.visible');
    });

    it('Validar input Profissionais', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 10000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//input[contains(@placeholder,'Profissionais')]").click()

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Ivan Saude')]").should('be.visible')

    });

    it('Validar input Status', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//input[contains(@placeholder,'Status')]").click()

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Todos')]").should('be.visible')

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Agendado')]").should('be.visible')

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Atendimento acolhimento')]").should('be.visible')

        cy.xpath("//span[@class='mat-checkbox-label'][contains(.,'Aguardando acolhimento')]").should('be.visible')
    });

    it('Validar botão Pesquisar', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible')
    });

    it('Validar coluna Hora', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//th[@scope='col'][contains(.,'Hora')]", { timeout: 10000 }).should('be.visible')
    });

    it('Validar coluna Chegada', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//th[@scope='col'][contains(.,'Chegada')]", { timeout: 10000 }).should('be.visible')
    });

    it('Validar coluna Idade', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//th[@scope='col'][contains(.,'Idade')]", { timeout: 10000 }).should('be.visible')
    });

    it('Validar coluna Nome Paciente', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//th[@scope='col'][contains(.,'Nome Paciente')]", { timeout: 10000 }).should('be.visible')
    });

    it('Validar coluna Profissional', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//th[@scope='col'][contains(.,'Profissional')]", { timeout: 10000 }).should('be.visible')
    });

    it('Validar coluna Area de atuação', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//th[@scope='col'][contains(.,'Área de atuação')]", { timeout: 10000 }).should('be.visible')
    });

    it(' Validar coluna Procedimento', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//th[@scope='col'][contains(.,'Procedimento')]", { timeout: 10000 }).should('be.visible')
    });

    it('Validar coluna Status', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//th[@scope='col'][contains(.,'Status')]", { timeout: 10000 }).should('be.visible')
    });

    it('Validar coluna Ação', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("//th[@scope='col'][contains(.,'Ação')]", { timeout: 10000 }).should('be.visible')
    });

    it('Validar botão Atender', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.xpath("(//button[@color='primary'][contains(.,'Atender')])[1]", { timeout: 10000 }).should('be.visible')
    });

    it('Validar paginação', () => {
        cy.visit('/')

        cy.get('#waiting-room', { timeout: 1000 }).click()

        cy.wait(3000)

        cy.contains('span', 'Acolhimento').click()

        cy.wait(5000)

        cy.xpath("(//div[contains(.,'5')])[13]", { timeout: 10000 }).click({ force: true })

        cy.xpath("//span[@class='mdc-list-item__primary-text'][contains(.,'10')]").should('be.visible')

        cy.xpath("//span[@class='mdc-list-item__primary-text'][contains(.,'25')]").should('be.visible')

        cy.xpath("//span[@class='mdc-list-item__primary-text'][contains(.,'50')]").should('be.visible')
    });

})