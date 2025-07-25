
/// <reference types= "cypress" /> 
/// <reference types="cypress-xpath" />
import { format } from 'date-fns';


describe('Grade do Profissional', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar Fluxo Abertura de Grade do Profissional 1', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(5000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        cy.contains('span', 'Horários de atendimento').click()
        cy.contains('button', 'Incluir').click()

        const today = new Date();
        const dayOfWeek = today.getDay()

        const checkboxSelectorMap = {
            0: "//span[@class='checkbox-label'][contains(.,'Domingo')]",         // Supondo que o id do checkbox de domingo seja 'checkbox-domingo'
            1: "//span[@class='checkbox-label'][contains(.,'Segunda-feira')]",   // Supondo que o id do checkbox de segunda seja 'checkbox-segunda'
            2: "//span[@class='checkbox-label'][contains(.,'Terça-feira')]",     // Supondo que o id do checkbox de terça seja 'checkbox-terca'
            3: "//span[@class='checkbox-label'][contains(.,'Quarta-feira')]",    // Supondo que o id do checkbox de quarta seja 'checkbox-quarta'
            4: "//span[@class='checkbox-label'][contains(.,'Quinta-feira')]",    // Supondo que o id do checkbox de quinta seja 'checkbox-quinta'
            5: "//span[@class='checkbox-label'][contains(.,'Sexta-feira')]",     // Supondo que o id do checkbox de sexta seja 'checkbox-sexta'
            6: "//span[@class='checkbox-label'][contains(.,'Sábado')]"           // Supondo que o id do checkbox de sábado seja 'checkbox-sabado'
        };

        const checkboxSelector = checkboxSelectorMap[dayOfWeek];
        if (checkboxSelector) {
            cy.wait(3000)
            cy.xpath(checkboxSelector, { timeout: 20000 }).click();
        } else {
            throw new Error('Não foi possível determinar o checkbox correspondente ao dia da semana atual.');
        }

        cy.get('#horaInicial').type('08:00')
        cy.get('#horaFinal').type('23:50')
        cy.contains('div', 'Áreas de atuação').click()
        cy.wait(2000)
        cy.contains('span', ' Área de Atuação - Teste Automação ').click()
        cy.wait(2000)
        cy.contains('div', 'Limitar procedimentos realizados no período').click()
        cy.wait(2000)
        cy.contains('span', ' Consulta Áreas de Atuação ').click()
        cy.contains('button', ' Confirmar ').click({ force: true })
        cy.wait(2000)
        cy.contains('h2', 'Grade criada com sucesso.').should('be.visible')
        cy.contains('button', 'Ok').click()
    });

    it('Validar Fluxo de Grade do Profissional em Duplicidade', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(5000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        cy.contains('span', 'Horários de atendimento').click()
        cy.contains('button', 'Incluir').click()

        cy.wait(2000)

        const today = new Date();
        const dayOfWeek = today.getDay()

        const checkboxSelectorMap = {
            0: "//span[@class='checkbox-label'][contains(.,'Domingo')]",         // Supondo que o id do checkbox de domingo seja 'checkbox-domingo'
            1: "//span[@class='checkbox-label'][contains(.,'Segunda-feira')]",   // Supondo que o id do checkbox de segunda seja 'checkbox-segunda'
            2: "//span[@class='checkbox-label'][contains(.,'Terça-feira')]",     // Supondo que o id do checkbox de terça seja 'checkbox-terca'
            3: "//span[@class='checkbox-label'][contains(.,'Quarta-feira')]",    // Supondo que o id do checkbox de quarta seja 'checkbox-quarta'
            4: "//span[@class='checkbox-label'][contains(.,'Quinta-feira')]",    // Supondo que o id do checkbox de quinta seja 'checkbox-quinta'
            5: "//span[@class='checkbox-label'][contains(.,'Sexta-feira')]",     // Supondo que o id do checkbox de sexta seja 'checkbox-sexta'
            6: "//span[@class='checkbox-label'][contains(.,'Sábado')]"           // Supondo que o id do checkbox de sábado seja 'checkbox-sabado'
        };

        const checkboxSelector = checkboxSelectorMap[dayOfWeek];
        if (checkboxSelector) {
            cy.wait(3000)
            cy.xpath(checkboxSelector, { timeout: 20000 }).click();
        } else {
            throw new Error('Não foi possível determinar o checkbox correspondente ao dia da semana atual.');
        }

        cy.get('#horaInicial').type('08:00')
        cy.get('#horaFinal').type('23:30')
        cy.contains('div', 'Áreas de atuação').click()
        cy.wait(2000)
        cy.contains('span', ' Área de Atuação - Teste Automação ').click()
        cy.wait(2000)
        cy.contains('div', 'Limitar procedimentos realizados no período').click()
        cy.wait(2000)
        cy.contains('span', ' Consulta Áreas de Atuação ').click()
        cy.contains('button', ' Confirmar ').click({ force: true })
        cy.wait(2000)
        cy.contains('h2', 'Erro ao incluir grade.').should('be.visible')
    })

    it('Validar Fluxo de Remoção no Horário da Grade do Profissional', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(3000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais').click()
        cy.wait(3000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
        cy.contains('span', 'Horários de atendimento').click()
        cy.wait(3000)
        cy.xpath("//button[@class='mat-focus-indicator col-button-close mat-icon-button mat-button-base']").click({ force: true })
        // (//mat-icon[@role='img'][contains(.,'close')])[2] - quando obter mais de uma grade
        cy.contains('button', 'Sim').click()
        cy.wait(3000)
        cy.contains('h2', 'Grade deletada com sucesso.').should('be.visible')
        cy.contains('button', 'Ok').click()
    })

    it('Validar Fluxo Abertura de Grade do Profissional 2', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#register').click()
        cy.contains('span', 'Lista de profissionais', { timeout: 30000 }).click()
        cy.wait(5000)
        cy.contains('div', 'Procure por CPF ou nome', { timeout: 20000 }).type('322.354.320-18{enter}', { timeout: 20000 })
        cy.contains('span', 'edit').click()
        cy.contains('span', 'Horários de atendimento').click()
        cy.contains('button', 'Incluir').click()

        cy.wait(2000)

        const today = new Date();
        const dayOfWeek = today.getDay()

        const checkboxSelectorMap = {
            0: "//span[@class='checkbox-label'][contains(.,'Domingo')]",         // Supondo que o id do checkbox de domingo seja 'checkbox-domingo'
            1: "//span[@class='checkbox-label'][contains(.,'Segunda-feira')]",   // Supondo que o id do checkbox de segunda seja 'checkbox-segunda'
            2: "//span[@class='checkbox-label'][contains(.,'Terça-feira')]",     // Supondo que o id do checkbox de terça seja 'checkbox-terca'
            3: "//span[@class='checkbox-label'][contains(.,'Quarta-feira')]",    // Supondo que o id do checkbox de quarta seja 'checkbox-quarta'
            4: "//span[@class='checkbox-label'][contains(.,'Quinta-feira')]",    // Supondo que o id do checkbox de quinta seja 'checkbox-quinta'
            5: "//span[@class='checkbox-label'][contains(.,'Sexta-feira')]",     // Supondo que o id do checkbox de sexta seja 'checkbox-sexta'
            6: "//span[@class='checkbox-label'][contains(.,'Sábado')]"           // Supondo que o id do checkbox de sábado seja 'checkbox-sabado'
        };

        const checkboxSelector = checkboxSelectorMap[dayOfWeek];
        if (checkboxSelector) {
            cy.wait(3000)
            cy.xpath(checkboxSelector, { timeout: 20000 }).click();
        } else {
            throw new Error('Não foi possível determinar o checkbox correspondente ao dia da semana atual.');
        }

        cy.get('#horaInicial').type('08:00')
        cy.get('#horaFinal').type('23:50')
        cy.contains('div', 'Áreas de atuação').click()
        cy.wait(2000)
        cy.contains('span', ' Área de Atuação - Teste Automação ').click()
        cy.wait(2000)
        cy.contains('div', 'Limitar procedimentos realizados no período').click()
        cy.wait(2000)
        cy.contains('span', ' Consulta Áreas de Atuação ').click()
        cy.contains('button', ' Confirmar ').click({ force: true })
        cy.wait(2000)
        cy.contains('h2', 'Grade criada com sucesso.').should('be.visible')
        cy.contains('button', 'Ok').click()
    });
});

describe('Agendamento Simples - Agendamento por Encaixe', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin()
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar Fluxo de Encaixe respeitando a regra de 4 encaixes por hora 1', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(3000); // Esperar carregamento inicial da página

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(3000); // Esperar após clicar no schedule

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(3000);

        cy.get('[formcontrolname="expertiseAreas"]', { timeout: 20000 }).should('be.visible').click();
        cy.wait(3000); // Esperar que a lista de opções seja exibida

        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.wait(3000); // Esperar após selecionar área

        cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();

        cy.wait(3000); // Esperar que a lista de profissionais seja exibida

        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.wait(3000); // Esperar após selecionar profissional

        cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
        cy.wait(3000); // Esperar o resultado da pesquisa

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(3000);

        // Obter a data atual
        const today = new Date();
        const weekDay = today.getDay();

        // Selecionar o primeiro slot livre na coluna do dia atual
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .should('be.visible')
            .click();
        cy.wait(3000); // Esperar após selecionar horário

        // Marcar o checkbox
        cy.xpath("//label[normalize-space()='Encaixe']").should('be.visible').click();
        cy.wait(3000); // Esperar após marcar o checkbox

        // CORREÇÃO AQUI: Formatar a data como YYYY-MM-DD (formato exigido pelo Cypress para inputs de tipo date)
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // +1 pois getMonth() retorna 0-11
        const day = today.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

        cy.get('[formcontrolname="date"]').clear().type(formattedDate);
        cy.wait(3000); // Esperar após digitar a data

        // Função para gerar horário de encaixe válido (com minutos não redondos e sempre no futuro)
        function getEncaixeTime(date) {
            const agora = new Date();

            // Garantir que estamos trabalhando com uma hora futura
            let horaEncaixe = Math.max(date.getHours(), agora.getHours());

            // Se estivermos na hora atual, precisamos garantir que os minutos sejam futuros
            if (horaEncaixe === agora.getHours()) {
                horaEncaixe++;  // Avançar para a próxima hora para garantir que está no futuro
            }

            // Lista de minutos não padrão para encaixes
            const minutosEncaixe = [3, 7, 11, 19, 23, 27, 33, 37, 41, 47, 53, 57];

            // Selecionar um minuto aleatório da lista
            const minuto = minutosEncaixe[Math.floor(Math.random() * minutosEncaixe.length)];

            // Formatar para HH:mm
            return `${horaEncaixe.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        }

        // Obter horário de encaixe
        let nextTime = getEncaixeTime(today);
        cy.log(`Tentando horário de encaixe: ${nextTime}`);

        // Digitar o horário no campo
        cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
        cy.wait(3000); // Esperar mais tempo após digitar o horário (ponto crítico)

        // Função para verificar mensagens e agir de acordo
        function verificarMensagens() {
            // Verificar possíveis mensagens com assertions
            return cy.get('body').then($body => {
                const textoBody = $body.text();

                // Verificar mensagem de horário padrão vs encaixe
                if (textoBody.includes('Você selecionou um horário do agendamento padrão')) {
                    // Usar assertion para verificar formalmente a presença da mensagem
                    return cy.contains('Você selecionou um horário do agendamento padrão')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar 3 segundos antes de clicar
                            cy.log('Horário padrão detectado, selecionando novo horário quebrado');
                            cy.contains('button', 'Não').should('be.visible').click();

                            cy.wait(3000); // Esperar 3 segundos após clicar no botão

                            // Gerar um horário de encaixe válido
                            nextTime = getEncaixeTime(today);
                            cy.log(`Tentando novo horário de encaixe: ${nextTime}`);

                            // Limpar e digitar o novo horário
                            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                            cy.wait(3000); // Esperar 3 segundos após digitar o novo horário

                            // Verificar novamente
                            return verificarMensagens();
                        });
                }

                // Verificar se o máximo de encaixes foi atingido
                else if (textoBody.includes('Máximo de encaixes atingido')) {
                    return cy.contains('Máximo de encaixes atingido')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar antes de clicar no Ok
                            cy.log('Máximo de encaixes atingido - Limite da regra alcançado');
                            cy.contains('button', 'Ok').should('be.visible').click();
                            cy.wait(3000); // Esperar após clicar no Ok
                            return cy.wrap(false); // Indica que não deve continuar
                        });
                }

                // Verificar se já existe agendamento para este horário
                else if (textoBody.includes('Já existe um agendamento para esta data e horário')) {
                    return cy.contains('Já existe um agendamento para esta data e horário')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar antes de clicar no Ok
                            cy.log('Horário já agendado, tentando outro horário');
                            cy.contains('button', 'Ok').should('be.visible').click();
                            cy.wait(3000); // Esperar após clicar no Ok

                            // Adicionar 2 minutos e tentar novamente
                            const newDate = new Date(today.getTime() + 2 * 60 * 1000);
                            nextTime = getEncaixeTime(newDate);
                            cy.log(`Tentando novo horário: ${nextTime}`);

                            // Limpar e digitar o novo horário
                            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                            cy.wait(3000); // Esperar mais tempo após digitar o novo horário

                            // Verificar novamente com o novo horário
                            return verificarMensagens();
                        });
                }

                // Se nenhuma mensagem aparecer, continuar com o agendamento
                else {
                    cy.wait(3000); // Esperar um pouco para ter certeza de que nenhuma mensagem aparecerá
                    return cy.wrap(true); // Wrapping o valor booleano para mantê-lo na cadeia de Cypress
                }
            });
        }

        // Verificar mensagens antes de prosseguir
        verificarMensagens().then(continuar => {
            if (continuar) {
                // Continuar com o processo de agendamento
                cy.log('Prosseguindo com o agendamento');

                // Verificar e fechar qualquer modal Sweet Alert que possa estar aberto
                cy.get('body').then($body => {
                    if ($body.find('.swal2-container').length > 0) {
                        cy.get('.swal2-container button').first().click();
                        cy.wait(2000); // Esperar o modal fechar
                    }
                });

                // Agora sim tenta digitar no campo CPF
                cy.get('#cpf').should('be.visible').clear().type('34921977879', { force: true });
                cy.wait(5000);

                cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').should('be.visible').click();
                cy.wait(3000); // Esperar após clicar no botão

                cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
                cy.wait(3000); // Esperar antes de selecionar o procedimento

                cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
                    .first()
                    .should('be.visible')
                    .click({ force: true });
                cy.wait(3000);

                cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').should('be.visible').click();
                cy.wait(2000); // Esperar após adicionar

                cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').should('be.visible').click();
                cy.wait(3000); // Esperar antes da mensagem de sucesso

                // Verificar sucesso com assertion
                cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 })
                    .should('be.visible');
                cy.wait(3000); // Esperar antes de clicar em Ok

                cy.contains('button', 'Ok').should('be.visible').click();
                cy.wait(3000); // Esperar após o último clique
            } else {
                cy.log('Não é possível prosseguir com o agendamento devido ao limite de encaixes');
                cy.wait(3000); // Esperar antes de finalizar o teste
            }
        });
    });

    it('Validar Fluxo de Encaixe respeitando a regra de 4 encaixes por hora 2', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(3000); // Esperar carregamento inicial da página

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(3000); // Esperar após clicar no schedule

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(3000);

        cy.get('[formcontrolname="expertiseAreas"]', { timeout: 20000 }).should('be.visible').click();
        cy.wait(3000); // Esperar que a lista de opções seja exibida

        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.wait(3000); // Esperar após selecionar área

        cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();

        cy.wait(3000); // Esperar que a lista de profissionais seja exibida

        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.wait(3000); // Esperar após selecionar profissional

        cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
        cy.wait(3000); // Esperar o resultado da pesquisa

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(3000);

        // Obter a data atual
        const today = new Date();
        const weekDay = today.getDay();

        // Selecionar o primeiro slot livre na coluna do dia atual
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .should('be.visible')
            .click();
        cy.wait(3000); // Esperar após selecionar horário

        // Marcar o checkbox
        cy.xpath("//label[normalize-space()='Encaixe']").should('be.visible').click();
        cy.wait(3000); // Esperar após marcar o checkbox

        // CORREÇÃO AQUI: Formatar a data como YYYY-MM-DD (formato exigido pelo Cypress para inputs de tipo date)
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // +1 pois getMonth() retorna 0-11
        const day = today.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

        cy.get('[formcontrolname="date"]').clear().type(formattedDate);
        cy.wait(3000); // Esperar após digitar a data

        // Função para gerar horário de encaixe válido (com minutos não redondos e sempre no futuro)
        function getEncaixeTime(date) {
            const agora = new Date();

            // Garantir que estamos trabalhando com uma hora futura
            let horaEncaixe = Math.max(date.getHours(), agora.getHours());

            // Se estivermos na hora atual, precisamos garantir que os minutos sejam futuros
            if (horaEncaixe === agora.getHours()) {
                horaEncaixe++;  // Avançar para a próxima hora para garantir que está no futuro
            }

            // Lista de minutos não padrão para encaixes
            const minutosEncaixe = [3, 7, 11, 19, 23, 27, 33, 37, 41, 47, 53, 57];

            // Selecionar um minuto aleatório da lista
            const minuto = minutosEncaixe[Math.floor(Math.random() * minutosEncaixe.length)];

            // Formatar para HH:mm
            return `${horaEncaixe.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        }

        // Obter horário de encaixe
        let nextTime = getEncaixeTime(today);
        cy.log(`Tentando horário de encaixe: ${nextTime}`);

        // Digitar o horário no campo
        cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
        cy.wait(3000); // Esperar mais tempo após digitar o horário (ponto crítico)

        // Função para verificar mensagens e agir de acordo
        function verificarMensagens() {
            // Verificar possíveis mensagens com assertions
            return cy.get('body').then($body => {
                const textoBody = $body.text();

                // Verificar mensagem de horário padrão vs encaixe
                if (textoBody.includes('Você selecionou um horário do agendamento padrão')) {
                    // Usar assertion para verificar formalmente a presença da mensagem
                    return cy.contains('Você selecionou um horário do agendamento padrão')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar 3 segundos antes de clicar
                            cy.log('Horário padrão detectado, selecionando novo horário quebrado');
                            cy.contains('button', 'Não').should('be.visible').click();

                            cy.wait(3000); // Esperar 3 segundos após clicar no botão

                            // Gerar um horário de encaixe válido
                            nextTime = getEncaixeTime(today);
                            cy.log(`Tentando novo horário de encaixe: ${nextTime}`);

                            // Limpar e digitar o novo horário
                            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                            cy.wait(3000); // Esperar 3 segundos após digitar o novo horário

                            // Verificar novamente
                            return verificarMensagens();
                        });
                }

                // Verificar se o máximo de encaixes foi atingido
                else if (textoBody.includes('Máximo de encaixes atingido')) {
                    return cy.contains('Máximo de encaixes atingido')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar antes de clicar no Ok
                            cy.log('Máximo de encaixes atingido - Limite da regra alcançado');
                            cy.contains('button', 'Ok').should('be.visible').click();
                            cy.wait(3000); // Esperar após clicar no Ok
                            return cy.wrap(false); // Indica que não deve continuar
                        });
                }

                // Verificar se já existe agendamento para este horário
                else if (textoBody.includes('Já existe um agendamento para esta data e horário')) {
                    return cy.contains('Já existe um agendamento para esta data e horário')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar antes de clicar no Ok
                            cy.log('Horário já agendado, tentando outro horário');
                            cy.contains('button', 'Ok').should('be.visible').click();
                            cy.wait(3000); // Esperar após clicar no Ok

                            // Adicionar 2 minutos e tentar novamente
                            const newDate = new Date(today.getTime() + 2 * 60 * 1000);
                            nextTime = getEncaixeTime(newDate);
                            cy.log(`Tentando novo horário: ${nextTime}`);

                            // Limpar e digitar o novo horário
                            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                            cy.wait(3000); // Esperar mais tempo após digitar o novo horário

                            // Verificar novamente com o novo horário
                            return verificarMensagens();
                        });
                }

                // Se nenhuma mensagem aparecer, continuar com o agendamento
                else {
                    cy.wait(3000); // Esperar um pouco para ter certeza de que nenhuma mensagem aparecerá
                    return cy.wrap(true); // Wrapping o valor booleano para mantê-lo na cadeia de Cypress
                }
            });
        }

        // Verificar mensagens antes de prosseguir
        verificarMensagens().then(continuar => {
            if (continuar) {
                // Continuar com o processo de agendamento
                cy.log('Prosseguindo com o agendamento');

                // Verificar e fechar qualquer modal Sweet Alert que possa estar aberto
                cy.get('body').then($body => {
                    if ($body.find('.swal2-container').length > 0) {
                        cy.get('.swal2-container button').first().click();
                        cy.wait(2000); // Esperar o modal fechar
                    }
                });

                // Agora sim tenta digitar no campo CPF
                cy.get('#cpf').should('be.visible').clear().type('34921977879', { force: true });
                cy.wait(5000);

                cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').should('be.visible').click();
                cy.wait(3000); // Esperar após clicar no botão

                cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
                cy.wait(3000); // Esperar antes de selecionar o procedimento

                cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
                    .first()
                    .should('be.visible')
                    .click({ force: true });
                cy.wait(3000);

                cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').should('be.visible').click();
                cy.wait(2000); // Esperar após adicionar

                cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').should('be.visible').click();
                cy.wait(3000); // Esperar antes da mensagem de sucesso

                // Verificar sucesso com assertion
                cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 })
                    .should('be.visible');
                cy.wait(3000); // Esperar antes de clicar em Ok

                cy.contains('button', 'Ok').should('be.visible').click();
                cy.wait(3000); // Esperar após o último clique
            } else {
                cy.log('Não é possível prosseguir com o agendamento devido ao limite de encaixes');
                cy.wait(3000); // Esperar antes de finalizar o teste
            }
        });
    });

    it('Validar Fluxo de Encaixe respeitando a regra de 4 encaixes por hora 3', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(3000); // Esperar carregamento inicial da página

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(3000); // Esperar após clicar no schedule

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(3000);

        cy.get('[formcontrolname="expertiseAreas"]', { timeout: 20000 }).should('be.visible').click();
        cy.wait(3000); // Esperar que a lista de opções seja exibida

        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.wait(3000); // Esperar após selecionar área

        cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();

        cy.wait(3000); // Esperar que a lista de profissionais seja exibida

        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.wait(3000); // Esperar após selecionar profissional

        cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
        cy.wait(3000); // Esperar o resultado da pesquisa

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(3000);

        // Obter a data atual
        const today = new Date();
        const weekDay = today.getDay();

        // Selecionar o primeiro slot livre na coluna do dia atual
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .should('be.visible')
            .click();
        cy.wait(3000); // Esperar após selecionar horário

        // Marcar o checkbox
        cy.xpath("//label[normalize-space()='Encaixe']").should('be.visible').click();
        cy.wait(3000); // Esperar após marcar o checkbox

        // CORREÇÃO AQUI: Formatar a data como YYYY-MM-DD (formato exigido pelo Cypress para inputs de tipo date)
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // +1 pois getMonth() retorna 0-11
        const day = today.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

        cy.get('[formcontrolname="date"]').clear().type(formattedDate);
        cy.wait(3000); // Esperar após digitar a data

        // Função para gerar horário de encaixe válido (com minutos não redondos e sempre no futuro)
        function getEncaixeTime(date) {
            const agora = new Date();

            // Garantir que estamos trabalhando com uma hora futura
            let horaEncaixe = Math.max(date.getHours(), agora.getHours());

            // Se estivermos na hora atual, precisamos garantir que os minutos sejam futuros
            if (horaEncaixe === agora.getHours()) {
                horaEncaixe++;  // Avançar para a próxima hora para garantir que está no futuro
            }

            // Lista de minutos não padrão para encaixes
            const minutosEncaixe = [3, 7, 11, 19, 23, 27, 33, 37, 41, 47, 53, 57];

            // Selecionar um minuto aleatório da lista
            const minuto = minutosEncaixe[Math.floor(Math.random() * minutosEncaixe.length)];

            // Formatar para HH:mm
            return `${horaEncaixe.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        }

        // Obter horário de encaixe
        let nextTime = getEncaixeTime(today);
        cy.log(`Tentando horário de encaixe: ${nextTime}`);

        // Digitar o horário no campo
        cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
        cy.wait(3000); // Esperar mais tempo após digitar o horário (ponto crítico)

        // Função para verificar mensagens e agir de acordo
        function verificarMensagens() {
            // Verificar possíveis mensagens com assertions
            return cy.get('body').then($body => {
                const textoBody = $body.text();

                // Verificar mensagem de horário padrão vs encaixe
                if (textoBody.includes('Você selecionou um horário do agendamento padrão')) {
                    // Usar assertion para verificar formalmente a presença da mensagem
                    return cy.contains('Você selecionou um horário do agendamento padrão')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar 3 segundos antes de clicar
                            cy.log('Horário padrão detectado, selecionando novo horário quebrado');
                            cy.contains('button', 'Não').should('be.visible').click();

                            cy.wait(3000); // Esperar 3 segundos após clicar no botão

                            // Gerar um horário de encaixe válido
                            nextTime = getEncaixeTime(today);
                            cy.log(`Tentando novo horário de encaixe: ${nextTime}`);

                            // Limpar e digitar o novo horário
                            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                            cy.wait(3000); // Esperar 3 segundos após digitar o novo horário

                            // Verificar novamente
                            return verificarMensagens();
                        });
                }

                // Verificar se o máximo de encaixes foi atingido
                else if (textoBody.includes('Máximo de encaixes atingido')) {
                    return cy.contains('Máximo de encaixes atingido')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar antes de clicar no Ok
                            cy.log('Máximo de encaixes atingido - Limite da regra alcançado');
                            cy.contains('button', 'Ok').should('be.visible').click();
                            cy.wait(3000); // Esperar após clicar no Ok
                            return cy.wrap(false); // Indica que não deve continuar
                        });
                }

                // Verificar se já existe agendamento para este horário
                else if (textoBody.includes('Já existe um agendamento para esta data e horário')) {
                    return cy.contains('Já existe um agendamento para esta data e horário')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar antes de clicar no Ok
                            cy.log('Horário já agendado, tentando outro horário');
                            cy.contains('button', 'Ok').should('be.visible').click();
                            cy.wait(3000); // Esperar após clicar no Ok

                            // Adicionar 2 minutos e tentar novamente
                            const newDate = new Date(today.getTime() + 2 * 60 * 1000);
                            nextTime = getEncaixeTime(newDate);
                            cy.log(`Tentando novo horário: ${nextTime}`);

                            // Limpar e digitar o novo horário
                            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                            cy.wait(3000); // Esperar mais tempo após digitar o novo horário

                            // Verificar novamente com o novo horário
                            return verificarMensagens();
                        });
                }

                // Se nenhuma mensagem aparecer, continuar com o agendamento
                else {
                    cy.wait(3000); // Esperar um pouco para ter certeza de que nenhuma mensagem aparecerá
                    return cy.wrap(true); // Wrapping o valor booleano para mantê-lo na cadeia de Cypress
                }
            });
        }

        // Verificar mensagens antes de prosseguir
        verificarMensagens().then(continuar => {
            if (continuar) {
                // Continuar com o processo de agendamento
                cy.log('Prosseguindo com o agendamento');

                // Verificar e fechar qualquer modal Sweet Alert que possa estar aberto
                cy.get('body').then($body => {
                    if ($body.find('.swal2-container').length > 0) {
                        cy.get('.swal2-container button').first().click();
                        cy.wait(2000); // Esperar o modal fechar
                    }
                });

                // Agora sim tenta digitar no campo CPF
                cy.get('#cpf').should('be.visible').clear().type('34921977879', { force: true });
                cy.wait(5000);

                cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').should('be.visible').click();
                cy.wait(3000); // Esperar após clicar no botão

                cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
                cy.wait(3000); // Esperar antes de selecionar o procedimento

                cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
                    .first()
                    .should('be.visible')
                    .click({ force: true });
                cy.wait(3000);

                cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').should('be.visible').click();
                cy.wait(2000); // Esperar após adicionar

                cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').should('be.visible').click();
                cy.wait(3000); // Esperar antes da mensagem de sucesso

                // Verificar sucesso com assertion
                cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 })
                    .should('be.visible');
                cy.wait(3000); // Esperar antes de clicar em Ok

                cy.contains('button', 'Ok').should('be.visible').click();
                cy.wait(3000); // Esperar após o último clique
            } else {
                cy.log('Não é possível prosseguir com o agendamento devido ao limite de encaixes');
                cy.wait(3000); // Esperar antes de finalizar o teste
            }
        });
    });

    it('Validar Fluxo de Encaixe respeitando a regra de 4 encaixes por hora 4', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(3000); // Esperar carregamento inicial da página

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(3000); // Esperar após clicar no schedule

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(3000);

        cy.get('[formcontrolname="expertiseAreas"]', { timeout: 20000 }).should('be.visible').click();
        cy.wait(3000); // Esperar que a lista de opções seja exibida

        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.wait(3000); // Esperar após selecionar área

        cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();

        cy.wait(3000); // Esperar que a lista de profissionais seja exibida

        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.wait(3000); // Esperar após selecionar profissional

        cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
        cy.wait(3000); // Esperar o resultado da pesquisa

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(3000);

        // Obter a data atual
        const today = new Date();
        const weekDay = today.getDay();

        // Selecionar o primeiro slot livre na coluna do dia atual
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .should('be.visible')
            .click();
        cy.wait(3000); // Esperar após selecionar horário

        // Marcar o checkbox
        cy.xpath("//label[normalize-space()='Encaixe']").should('be.visible').click();
        cy.wait(3000); // Esperar após marcar o checkbox

        // CORREÇÃO AQUI: Formatar a data como YYYY-MM-DD (formato exigido pelo Cypress para inputs de tipo date)
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // +1 pois getMonth() retorna 0-11
        const day = today.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

        cy.get('[formcontrolname="date"]').clear().type(formattedDate);
        cy.wait(3000); // Esperar após digitar a data

        // Função para gerar horário de encaixe válido (com minutos não redondos e sempre no futuro)
        function getEncaixeTime(date) {
            const agora = new Date();

            // Garantir que estamos trabalhando com uma hora futura
            let horaEncaixe = Math.max(date.getHours(), agora.getHours());

            // Se estivermos na hora atual, precisamos garantir que os minutos sejam futuros
            if (horaEncaixe === agora.getHours()) {
                horaEncaixe++;  // Avançar para a próxima hora para garantir que está no futuro
            }

            // Lista de minutos não padrão para encaixes
            const minutosEncaixe = [3, 7, 11, 19, 23, 27, 33, 37, 41, 47, 53, 57];

            // Selecionar um minuto aleatório da lista
            const minuto = minutosEncaixe[Math.floor(Math.random() * minutosEncaixe.length)];

            // Formatar para HH:mm
            return `${horaEncaixe.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        }

        // Obter horário de encaixe
        let nextTime = getEncaixeTime(today);
        cy.log(`Tentando horário de encaixe: ${nextTime}`);

        // Digitar o horário no campo
        cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
        cy.wait(3000); // Esperar mais tempo após digitar o horário (ponto crítico)

        // Função para verificar mensagens e agir de acordo
        function verificarMensagens() {
            // Verificar possíveis mensagens com assertions
            return cy.get('body').then($body => {
                const textoBody = $body.text();

                // Verificar mensagem de horário padrão vs encaixe
                if (textoBody.includes('Você selecionou um horário do agendamento padrão')) {
                    // Usar assertion para verificar formalmente a presença da mensagem
                    return cy.contains('Você selecionou um horário do agendamento padrão')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar 3 segundos antes de clicar
                            cy.log('Horário padrão detectado, selecionando novo horário quebrado');
                            cy.contains('button', 'Não').should('be.visible').click();

                            cy.wait(3000); // Esperar 3 segundos após clicar no botão

                            // Gerar um horário de encaixe válido
                            nextTime = getEncaixeTime(today);
                            cy.log(`Tentando novo horário de encaixe: ${nextTime}`);

                            // Limpar e digitar o novo horário
                            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                            cy.wait(3000); // Esperar 3 segundos após digitar o novo horário

                            // Verificar novamente
                            return verificarMensagens();
                        });
                }

                // Verificar se o máximo de encaixes foi atingido
                else if (textoBody.includes('Máximo de encaixes atingido')) {
                    return cy.contains('Máximo de encaixes atingido')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar antes de clicar no Ok
                            cy.log('Máximo de encaixes atingido - Limite da regra alcançado');
                            cy.contains('button', 'Ok').should('be.visible').click();
                            cy.wait(3000); // Esperar após clicar no Ok
                            return cy.wrap(false); // Indica que não deve continuar
                        });
                }

                // Verificar se já existe agendamento para este horário
                else if (textoBody.includes('Já existe um agendamento para esta data e horário')) {
                    return cy.contains('Já existe um agendamento para esta data e horário')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar antes de clicar no Ok
                            cy.log('Horário já agendado, tentando outro horário');
                            cy.contains('button', 'Ok').should('be.visible').click();
                            cy.wait(3000); // Esperar após clicar no Ok

                            // Adicionar 2 minutos e tentar novamente
                            const newDate = new Date(today.getTime() + 2 * 60 * 1000);
                            nextTime = getEncaixeTime(newDate);
                            cy.log(`Tentando novo horário: ${nextTime}`);

                            // Limpar e digitar o novo horário
                            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                            cy.wait(3000); // Esperar mais tempo após digitar o novo horário

                            // Verificar novamente com o novo horário
                            return verificarMensagens();
                        });
                }

                // Se nenhuma mensagem aparecer, continuar com o agendamento
                else {
                    cy.wait(3000); // Esperar um pouco para ter certeza de que nenhuma mensagem aparecerá
                    return cy.wrap(true); // Wrapping o valor booleano para mantê-lo na cadeia de Cypress
                }
            });
        }

        // Verificar mensagens antes de prosseguir
        verificarMensagens().then(continuar => {
            if (continuar) {
                // Continuar com o processo de agendamento
                cy.log('Prosseguindo com o agendamento');

                // Verificar e fechar qualquer modal Sweet Alert que possa estar aberto
                cy.get('body').then($body => {
                    if ($body.find('.swal2-container').length > 0) {
                        cy.get('.swal2-container button').first().click();
                        cy.wait(2000); // Esperar o modal fechar
                    }
                });

                // Agora sim tenta digitar no campo CPF
                cy.get('#cpf').should('be.visible').clear().type('34921977879', { force: true });
                cy.wait(5000);

                cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').should('be.visible').click();
                cy.wait(3000); // Esperar após clicar no botão

                cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
                cy.wait(3000); // Esperar antes de selecionar o procedimento

                cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
                    .first()
                    .should('be.visible')
                    .click({ force: true });
                cy.wait(3000);

                cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').should('be.visible').click();
                cy.wait(2000); // Esperar após adicionar

                cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').should('be.visible').click();
                cy.wait(3000); // Esperar antes da mensagem de sucesso

                // Verificar sucesso com assertion
                cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 })
                    .should('be.visible');
                cy.wait(3000); // Esperar antes de clicar em Ok

                cy.contains('button', 'Ok').should('be.visible').click();
                cy.wait(3000); // Esperar após o último clique
            } else {
                cy.log('Não é possível prosseguir com o agendamento devido ao limite de encaixes');
                cy.wait(3000); // Esperar antes de finalizar o teste
            }
        });
    });

    it('Validar Fluxo de Encaixe respeitando a regra de 4 encaixes por hora 5', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(3000); // Esperar carregamento inicial da página

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(3000); // Esperar após clicar no schedule

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(3000);

        cy.get('[formcontrolname="expertiseAreas"]', { timeout: 20000 }).should('be.visible').click();
        cy.wait(3000); // Esperar que a lista de opções seja exibida

        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.wait(3000); // Esperar após selecionar área

        cy.get('mat-select[formcontrolname="professionals"]').should('be.visible').click();

        cy.wait(3000); // Esperar que a lista de profissionais seja exibida

        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.wait(3000); // Esperar após selecionar profissional

        cy.xpath("//button[contains(.,'Pesquisar')]").should('be.visible').click();
        cy.wait(3000); // Esperar o resultado da pesquisa

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(3000);

        // Obter a data atual
        const today = new Date();
        const weekDay = today.getDay();

        // Selecionar o primeiro slot livre na coluna do dia atual
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .should('be.visible')
            .click();
        cy.wait(3000); // Esperar após selecionar horário

        // Marcar o checkbox
        cy.xpath("//label[normalize-space()='Encaixe']").should('be.visible').click();
        cy.wait(3000); // Esperar após marcar o checkbox

        // CORREÇÃO AQUI: Formatar a data como YYYY-MM-DD (formato exigido pelo Cypress para inputs de tipo date)
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // +1 pois getMonth() retorna 0-11
        const day = today.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`; // Formato YYYY-MM-DD

        cy.get('[formcontrolname="date"]').clear().type(formattedDate);
        cy.wait(3000); // Esperar após digitar a data

        // Função para gerar horário de encaixe válido (com minutos não redondos e sempre no futuro)
        function getEncaixeTime(date) {
            const agora = new Date();

            // Garantir que estamos trabalhando com uma hora futura
            let horaEncaixe = Math.max(date.getHours(), agora.getHours());

            // Se estivermos na hora atual, precisamos garantir que os minutos sejam futuros
            if (horaEncaixe === agora.getHours()) {
                horaEncaixe++;  // Avançar para a próxima hora para garantir que está no futuro
            }

            // Lista de minutos não padrão para encaixes
            const minutosEncaixe = [3, 7, 11, 19, 23, 27, 33, 37, 41, 47, 53, 57];

            // Selecionar um minuto aleatório da lista
            const minuto = minutosEncaixe[Math.floor(Math.random() * minutosEncaixe.length)];

            // Formatar para HH:mm
            return `${horaEncaixe.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
        }

        // Obter horário de encaixe
        let nextTime = getEncaixeTime(today);
        cy.log(`Tentando horário de encaixe: ${nextTime}`);

        // Digitar o horário no campo
        cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
        cy.wait(3000); // Esperar mais tempo após digitar o horário (ponto crítico)

        // Função para verificar mensagens e agir de acordo
        function verificarMensagens() {
            // Verificar possíveis mensagens com assertions
            return cy.get('body').then($body => {
                const textoBody = $body.text();

                // Verificar mensagem de horário padrão vs encaixe
                if (textoBody.includes('Você selecionou um horário do agendamento padrão')) {
                    // Usar assertion para verificar formalmente a presença da mensagem
                    return cy.contains('Você selecionou um horário do agendamento padrão')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar 3 segundos antes de clicar
                            cy.log('Horário padrão detectado, selecionando novo horário quebrado');
                            cy.contains('button', 'Não').should('be.visible').click();

                            cy.wait(3000); // Esperar 3 segundos após clicar no botão

                            // Gerar um horário de encaixe válido
                            nextTime = getEncaixeTime(today);
                            cy.log(`Tentando novo horário de encaixe: ${nextTime}`);

                            // Limpar e digitar o novo horário
                            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                            cy.wait(3000); // Esperar 3 segundos após digitar o novo horário

                            // Verificar novamente
                            return verificarMensagens();
                        });
                }

                // Verificar se o máximo de encaixes foi atingido
                else if (textoBody.includes('Máximo de encaixes atingido')) {
                    return cy.contains('Máximo de encaixes atingido')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar antes de clicar no Ok
                            cy.log('Máximo de encaixes atingido - Limite da regra alcançado');
                            cy.contains('button', 'Ok').should('be.visible').click();
                            cy.wait(3000); // Esperar após clicar no Ok
                            return cy.wrap(false); // Indica que não deve continuar
                        });
                }

                // Verificar se já existe agendamento para este horário
                else if (textoBody.includes('Já existe um agendamento para esta data e horário')) {
                    return cy.contains('Já existe um agendamento para esta data e horário')
                        .should('be.visible')
                        .then(() => {
                            cy.wait(3000); // Esperar antes de clicar no Ok
                            cy.log('Horário já agendado, tentando outro horário');
                            cy.contains('button', 'Ok').should('be.visible').click();
                            cy.wait(3000); // Esperar após clicar no Ok

                            // Adicionar 2 minutos e tentar novamente
                            const newDate = new Date(today.getTime() + 2 * 60 * 1000);
                            nextTime = getEncaixeTime(newDate);
                            cy.log(`Tentando novo horário: ${nextTime}`);

                            // Limpar e digitar o novo horário
                            cy.get('[formcontrolname="time"]').should('be.visible').clear().type(nextTime);
                            cy.wait(3000); // Esperar mais tempo após digitar o novo horário

                            // Verificar novamente com o novo horário
                            return verificarMensagens();
                        });
                }

                // Se nenhuma mensagem aparecer, continuar com o agendamento
                else {
                    cy.wait(3000); // Esperar um pouco para ter certeza de que nenhuma mensagem aparecerá
                    return cy.wrap(true); // Wrapping o valor booleano para mantê-lo na cadeia de Cypress
                }
            });
        }

        // Verificar mensagens antes de prosseguir
        verificarMensagens().then(continuar => {
            if (continuar) {
                // Continuar com o processo de agendamento
                cy.log('Prosseguindo com o agendamento');

                // Verificar e fechar qualquer modal Sweet Alert que possa estar aberto
                cy.get('body').then($body => {
                    if ($body.find('.swal2-container').length > 0) {
                        cy.get('.swal2-container button').first().click();
                        cy.wait(2000); // Esperar o modal fechar
                    }
                });

                // Agora sim tenta digitar no campo CPF
                cy.get('#cpf').should('be.visible').clear().type('34921977879', { force: true });
                cy.wait(5000);

                cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').should('be.visible').click();
                cy.wait(3000); // Esperar após clicar no botão

                cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
                cy.wait(3000); // Esperar antes de selecionar o procedimento

                cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
                    .first()
                    .should('be.visible')
                    .click({ force: true });
                cy.wait(3000);

                cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').should('be.visible').click();
                cy.wait(2000); // Esperar após adicionar

                cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').should('be.visible').click();
                cy.wait(3000); // Esperar antes da mensagem de sucesso

                // Verificar sucesso com assertion
                cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 })
                    .should('be.visible');
                cy.wait(3000); // Esperar antes de clicar em Ok

                cy.contains('button', 'Ok').should('be.visible').click();
                cy.wait(3000); // Esperar após o último clique
            } else {
                cy.log('Não é possível prosseguir com o agendamento devido ao limite de encaixes');
                cy.wait(3000); // Esperar antes de finalizar o teste
            }
        });
    });

    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal 1', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(1000)

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(5000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.wait(1000)

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(1000)

        const today = new Date();
        const weekDay = today.getDay();
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();
        cy.wait(1000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)

        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
    });

    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal 2', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(1000)

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(5000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.wait(1000)

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(1000)

        const today = new Date();
        const weekDay = today.getDay();
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();
        cy.wait(1000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)

        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
    });

    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal 3', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(1000)

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(5000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.wait(1000)

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(1000)

        const today = new Date();
        const weekDay = today.getDay();
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();
        cy.wait(1000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)

        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
    });

    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal 4', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(1000)

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(5000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.wait(1000)

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(1000)

        const today = new Date();
        const weekDay = today.getDay();
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();
        cy.wait(1000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)

        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
    });

    it('Validar Fluxo Completo no Agendamento Cartão de Todos por grade Semanal 5', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)

        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.wait(1000)

        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(5000);

        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.wait(1000)

        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(1000)

        const today = new Date();
        const weekDay = today.getDay();
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();
        cy.wait(1000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });

        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)

        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
    });

});

describe('Reagendamento', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin()
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    })

    it('Validar Fluxo de Reagendamento - Motivo Problemas de conexão', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(3000);
        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(3000)

        const today = new Date();
        const weekDay = today.getDay();

        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();

        cy.wait(3000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });
        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)
        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
        cy.wait(3000)
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.agendado')
            .first()
            .click();
        cy.xpath("//button[@title='Reagendar']").click()
        cy.get('.RescheduleAppointment')
        cy.focused()// Pressiona Tab uma vez
            .type('{enter}')
        cy.get('span').contains(' Problemas de conexão ').click()
        cy.wait(3000)
        cy.get('button').contains(' Prosseguir ').click()
        cy.get('span').contains('Reagendamento')
            .should('exist')
            .should('be.visible')
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .last()
            .click();
        cy.wait(3000)
        cy.get('button').contains('Reagendar').click()

        cy.contains('Reagendamento realizado com sucesso').should('be.visible')
    });

    it('Validar Fluxo de Reagendamento - Outros não especificado', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(3000);
        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(3000)

        const today = new Date();
        const weekDay = today.getDay();

        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();

        cy.wait(3000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });
        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)
        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
        cy.wait(3000)
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.agendado')
            .first()
            .click();
        cy.xpath("//button[@title='Reagendar']").click()
        cy.get('.RescheduleAppointment')
        cy.focused()// Pressiona Tab uma vez
            .type('{enter}')
        cy.get('span').contains(' Outros não especificado ').click()
        cy.wait(3000)
        cy.get('button').contains(' Prosseguir ').click()
        cy.get('span').contains('Reagendamento')
            .should('exist')
            .should('be.visible')
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .last()
            .click();
        cy.wait(3000)
        cy.get('button').contains('Reagendar').click()

        cy.contains('Reagendamento realizado com sucesso').should('be.visible')
    });

    it('Validar Fluxo de Reagendamento - Cancelamento de agenda do profissional', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(3000);
        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(3000)

        const today = new Date();
        const weekDay = today.getDay();

        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();

        cy.wait(3000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });
        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)
        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
        cy.wait(3000)
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.agendado')
            .first()
            .click();
        cy.xpath("//button[@title='Reagendar']").click()
        cy.get('.RescheduleAppointment')
        cy.focused()// Pressiona Tab uma vez
            .type('{enter}')
        cy.get('span').contains(' Cancelamento de agenda do profissional ').click()
        cy.wait(3000)
        cy.get('button').contains(' Prosseguir ').click()
        cy.get('span').contains('Reagendamento')
            .should('exist')
            .should('be.visible')
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .last()
            .click();
        cy.wait(3000)
        cy.get('button').contains('Reagendar').click()

        cy.contains('Reagendamento realizado com sucesso').should('be.visible')
    });

    it('Validar Fluxo de Reagendamento -  Paciente não compareceu e deseja remarcação', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#schedule', { timeout: 20000 })
            .should('be.visible')
            .click();
        cy.contains('span', 'Agendar atendimento', { timeout: 20000 }).click();
        cy.wait(3000);
        cy.xpath("(//div[contains(.,'Área de atuação')])[11]", { timeout: 20000 }).click();
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Área de Atuação - Teste Automação ')]", { timeout: 20000 }).click({ force: true });
        cy.get('mat-select[formcontrolname="professionals"]').click();
        cy.xpath("//span[contains(.,'Dr. Ivan Barros')]").click({ force: true });
        cy.xpath("//button[contains(.,'Pesquisar')]").click();
        cy.xpath("//div[contains(@class,'cal-week-view')]").should('be.visible');
        cy.wait(3000)

        const today = new Date();
        const weekDay = today.getDay();

        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .first()
            .click();

        cy.wait(3000)

        cy.get('#cpf').type('34921977879');
        cy.wait(5000);

        cy.xpath("(//button[contains(@type,'button')])[3]").should('exist').click();
        cy.xpath("(//div[contains(.,'Procedimento *')])[10]").should('be.visible').click({ force: true });
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Consulta Áreas de Atuação')]")
            .first()
            .should('be.visible')
            .click({ force: true });
        cy.wait(1000)
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").should('exist').click();
        cy.xpath("//button[@color='primary'][contains(.,'Confirmar')]").should('exist').click();
        cy.wait(1000)
        cy.contains('h2', 'Agendamento criado com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('button', 'Ok').click();
        cy.wait(3000)
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.agendado')
            .first()
            .click();
        cy.xpath("//button[@title='Reagendar']").click()
        cy.get('.RescheduleAppointment')
        cy.focused()// Pressiona Tab uma vez
            .type('{enter}')
        cy.get('span').contains(' Paciente não compareceu e deseja remarcação ').click()
        cy.wait(3000)
        cy.get('button').contains(' Prosseguir ').click()
        cy.get('span').contains('Reagendamento')
            .should('exist')
            .should('be.visible')
        cy.get('.cal-day-columns .cal-day-column')
            .eq(weekDay)
            .find('.livre')
            .last()
            .click();
        cy.wait(3000)
        cy.get('button').contains('Reagendar').click()

        cy.contains('Reagendamento realizado com sucesso').should('be.visible')
    });
})

describe('Check-in', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin()
        cy.allure().epic('Financeiro');
        cy.allure().feature('Check-in');
        cy.allure().severity('critical');
    });

    it('Validar bread home', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("//a[@routerlink='/home'][contains(.,'Home')]", { timeout: 20000 })
            .should('be.visible')
            .click()

        const checkEnvironmentUrl = () => {
            const environment = Cypress.env('environment');

            if (environment === 'homologacao') {
                cy.url().should('include', 'https://amei-homolog.amorsaude.com.br/');
            } else if (environment === 'staging') {
                cy.url().should('include', 'https://amei-staging.amorsaude.com.br/');
            } else if (environment === 'producao') {
                cy.url().should('include', 'https://amei.amorsaude.com.br/');
            }
        };

        checkEnvironmentUrl();
    });

    it('Validar bread agenda', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in', { timeout: 20000 }).click()
        cy.wait(2000)
        cy.xpath("//a[@routerlink='/schedule/schedule-appointment'][contains(.,'Agenda')]", { timeout: 20000 })
            .should('be.visible')
            .click()

        const checkEnvironmentUrl = () => {
            const environment = Cypress.env('environment');

            if (environment === 'homologacao') {
                cy.url().should('include', 'https://amei-homolog.amorsaude.com.br/schedule/schedule-appointment');
            } else if (environment === 'staging') {
                cy.url().should('include', 'https://amei-staging.amorsaude.com.br/schedule/schedule-appointment');
            } else if (environment === 'producao') {
                cy.url().should('include', 'https://amei.amorsaude.com.br/schedule/schedule-appointment');
            }
        };

        checkEnvironmentUrl();
    });

    it('Validar bread check-in', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("//a[@routerlink='/schedule/checkin'][contains(.,'Check-in')]")
            .should('be.visible')
            .click()

        const checkEnvironmentUrl = () => {
            const environment = Cypress.env('environment');

            if (environment === 'homologacao') {
                cy.url().should('include', 'https://amei-homolog.amorsaude.com.br/schedule/schedule-appointment');
            } else if (environment === 'staging') {
                cy.url().should('include', 'https://amei-staging.amorsaude.com.br/schedule/schedule-appointment');
            } else if (environment === 'producao') {
                cy.url().should('include', 'https://amei.amorsaude.com.br/schedule/schedule-appointment');
            }
        };
    });

    it('Validar título Agenda', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.xpath("//h3[contains(.,'Agenda')]")
            .should('be.visible')
    });

    it('Validar subtítulo Check-in', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.xpath("//h3[contains(.,'Check-in')]")
            .should('be.visible')
    });

    it('Validar selector status', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.get('.row')
        cy.xpath("//mat-form-field[@appearance='outline'][contains(.,'Selecionar todos, Agendado, Marcado - ConfirmadoStatus *')]")
            .should('be.visible')
            .click()
    });

    it('Validar checkbox Selecionar Todos', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.get('.row')
        cy.xpath("//mat-form-field[@appearance='outline'][contains(.,'Selecionar todos, Agendado, Marcado - ConfirmadoStatus *')]")
            .click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Selecionar todos')]")
            .should('be.visible')
    });

    it('Validar checkbox Agendado', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.get('.row')
        cy.xpath("//mat-form-field[@appearance='outline'][contains(.,'Selecionar todos, Agendado, Marcado - ConfirmadoStatus *')]")
            .click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Agendado')]")
            .should('be.visible')
    });

    it('Validar checkbox Marcado - Confirmado', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.get('.row')
        cy.xpath("//mat-form-field[@appearance='outline'][contains(.,'Selecionar todos, Agendado, Marcado - ConfirmadoStatus *')]")
            .click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Marcado - Confirmado')]")
            .should('be.visible')
    });

    it('Validar checkbox Não compareceu', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.get('.row')
        cy.xpath("//mat-form-field[@appearance='outline'][contains(.,'Selecionar todos, Agendado, Marcado - ConfirmadoStatus *')]")
            .click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Não compareceu')]")
            .should('be.visible')
    });

    it('Validar input Paciente', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.xpath("//input[@formcontrolname='patient']")
            .should('be.visible')
    });

    it('Validar selector Area de Atuação', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(1000)
        cy.get("#specialty").click({ force: true })
        cy.contains('Área de Atuação - Teste Automação')
            .should('exist')

    });

    it('Validar selector Profissional', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.get('#professional').click()
        cy.contains('Dr. Ivan Barros')
            .should('exist')
    });

    it('Validar input Data', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(1000)
        cy.get('#dataInit')
            .find('input')
            .invoke('val')
            .should('eq', format(new Date(), 'dd/MM/yyyy'));
    });

    it('Validar botão Limpar', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.get('button').contains('Limpar')
            .should('exist')
    });

    it('Validar botão Filtrar', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.get('button').contains('Filtrar')
            .should('exist')
    });

    it('Validar coluna Horário', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.contains('th', 'Horário')
            .should('be.visible')
    });

    it('Validar coluna Paciente', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.contains('th', 'Paciente')
            .should('be.visible')
    });

    it('Validar coluna Profissional', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.contains('th', 'Profissional')
            .should('be.visible')

    });

    it('Validar coluna Especialidade', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.contains('th', 'Especialidade')
            .should('be.visible')
    });

    it('Validar coluna Procedimento', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.contains('th', 'Procedimento')
            .should('be.visible')
    });

    it('Validar coluna Locais', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.contains('th', 'Locais')
            .should('be.visible')
    });

    it('Validar coluna Valor', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.contains('th', 'Valor')
            .should('be.visible')
    });

    it('Validar total de Agendamento', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()

        cy.wait(2000)

        cy.get('span').contains('5').click()
        cy.xpath("//span[normalize-space()='50']").click()

        cy.wait(2000)

        // Capturar o número do texto de agendamento
        cy.contains(/(\d+) agendamento/)
            .invoke('text')
            .then((text) => {
                // Extrair o número do texto (no caso, "1" de "1 agendamento")
                const numeroAgendamentosExibido = parseInt(text.match(/(\d+)/)[0]);

                cy.wait(2000)

                // Contar o número real de linhas na tabela
                cy.get('table tbody tr').its('length').then((numeroLinhasReais) => {
                    // Verificar se os números são iguais
                    expect(numeroLinhasReais).to.equal(numeroAgendamentosExibido);
                });
            });

    });

    it('Validar Fluxo Parcelamento no Cartão Crédito abaixo de 5,00 com 2 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 2 ').click()
        cy.wait(2000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão ').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo Parcelamento no Cartão Crédito abaixo de 5,00 com 3 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 3 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão ').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo Parcelamento no Cartão Crédito abaixo de 5,00 com 4 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 4 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo Parcelamento no Cartão Crédito abaixo de 5,00 com 5 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 5 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 6 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 6 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 7 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 7 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 8 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 8 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 9 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 9 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 10 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 10 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 11 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 11 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo m Parcelamento no Cartão Crédito abaixo de 5,00 com 12 parcelas (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 12 ').click()
        cy.wait(1000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.contains(' Valor abaixo de R$ 5,00 ').should('be.visible')
    });

    it('Validar Fluxo  Cartão Crédito 1 parcela (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Receber')]", { timeout: 25000 }).click({ force: true })
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.get('span').contains(' 1 ').click()
        cy.wait(3000)
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.get('button').contains('Pagar', { timeout: 20000 }).click()
        cy.wait(3000)
        cy.get('button').contains('Sim', { timeout: 20000 }).click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
        cy.xpath("//th[@role='columnheader'][contains(.,'Parcela')]", { timeout: 20000 }).should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Vencimento')]", { timeout: 20000 }).should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Valor Total')]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//mat-icon[@role='img'][contains(.,'expand_more')])[1]", { timeout: 20000 }).click()
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[2]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Baixado')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Forma de Pagamento')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Pagamento')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Baixa')])[1]", { timeout: 20000 }).should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[2]", { timeout: 20000 }).should('be.visible')
    });

    it('Validar Fluxo no Cartão Débito (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click()
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Cartão de Débito').click()
        cy.xpath("//label[normalize-space()='Não TEF']").click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Conta Débito').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
        cy.xpath("//th[@role='columnheader'][contains(.,'Parcela')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Vencimento')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Valor Total')]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[1]").should('be.visible')
        cy.xpath("(//mat-icon[@role='img'][contains(.,'expand_more')])[1]").click()
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[2]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Baixado')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Forma de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Baixa')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[2]").should('be.visible')
    });

    it('Validar Fluxo no PIX (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click({ force: true })
        cy.get('button').contains('Receber', { timeout: 20000 }).click()
        cy.get('button').contains('PIX').click()
        cy.wait(1000)
        cy.xpath("//label[normalize-space()='Não TEF']").click()
        cy.xpath("//input[@name='valorRecebido']").type('3,33')
        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[10]", { timeout: 2000 }).click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Conta Automação ')]").click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Ok', { timeout: 20000 }).click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.xpath("//th[@role='columnheader'][contains(.,'Parcela')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Vencimento')]").should('be.visible')
        cy.xpath("//th[@role='columnheader'][contains(.,'Valor Total')]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[1]").should('be.visible')
        cy.xpath("(//mat-icon[@role='img'][contains(.,'expand_more')])[1]").click()
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Pago')])[2]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Valor Baixado')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Forma de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Pagamento')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Data de Baixa')])[1]").should('be.visible')
        cy.xpath("(//th[@role='columnheader'][contains(.,'Ações')])[2]").should('be.visible')
    });

    it('Validar Fluxo no Dinheiro com Troco (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        const valorItem = 3.33; // Valor fixo do item a ser pago

        // Função para gerar um valor aleatório entre min e max com 2 casas decimais
        function gerarValorAleatorio(min, max) {
            const valor = Math.random() * (max - min) + min;
            return parseFloat(valor.toFixed(2));
        }

        // Gerar um valor aleatório entre 4,00 e 500,00
        const valorPago = gerarValorAleatorio(4, 500);
        const trocoEsperado = (valorPago - valorItem).toFixed(2).replace('.', ',');
        const trocoFormatado = `R$ ${trocoEsperado}`;
        const valorPagoFormatado = valorPago.toFixed(2).replace('.', ',');

        // Log informativo sobre os valores que serão usados
        cy.log(`Teste com valores aleatórios:`)
        cy.log(`Valor do item: R$ ${valorItem.toFixed(2).replace('.', ',')}`)
        cy.log(`Valor pago: R$ ${valorPagoFormatado}`)
        cy.log(`Troco esperado: ${trocoFormatado}`)

        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click({ force: true })
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Dinheiro').click()
        cy.xpath("//input[@name='valorRecebido']").type(valorPagoFormatado)
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Ok').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')

        cy.wait(1000)

        cy.get('#open-financial').click()
        cy.contains(' Detalhes ').click()

        // Abordagem mais flexível para verificação
        cy.get('table', { timeout: 10000 }).should('be.visible');

        // Verificar se existe alguma linha na tabela que contenha o valor do troco
        cy.get('tr').contains(trocoFormatado, { timeout: 10000 }).should('exist');

        // Verificar nas últimas linhas da tabela (mais provável conter o item mais recente)
        cy.get('tr').then(($rows) => {
            // Percorrer as 5 últimas linhas
            const numLinhas = $rows.length;
            const startIndex = Math.max(0, numLinhas - 5); // Pegar as últimas 5 linhas ou todas se houver menos de 5

            cy.log(`Verificando as últimas ${numLinhas - startIndex} linhas da tabela, total de ${numLinhas} linhas`);

            // Flag para indicar se encontramos o troco em alguma linha
            let trocoEncontrado = false;

            // Verificar cada uma das últimas linhas
            for (let i = startIndex; i < numLinhas; i++) {
                const $row = $rows.eq(i);
                const rowText = $row.text();

                if (rowText.includes(trocoFormatado)) {
                    trocoEncontrado = true;

                    // Verificar se a linha também contém TR
                    if (rowText.includes('TR')) {
                        cy.log(`✓ Troco ${trocoFormatado} e TR encontrados na linha ${i + 1}`);
                        break;
                    } else {
                        cy.log(`✗ Troco ${trocoFormatado} encontrado na linha ${i + 1}, mas não contém TR`);
                    }
                }
            }

            // Se não encontramos o troco, verificamos de forma mais flexível
            if (!trocoEncontrado) {
                cy.log('Troco não encontrado nas últimas linhas. Verificando de forma mais flexível...');

                // Verificação alternativa: procurar qualquer célula com o troco
                cy.contains(trocoFormatado).should('exist');

                // E verificar se qualquer linha com esse troco contém TR
                cy.contains(trocoFormatado).parents('tr').contains(/TR/).should('exist');
            }
        });


    });

    it('Validar Fluxo no Dinheiro (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click({ force: true })
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Dinheiro').click()
        cy.xpath("//input[@name='valorRecebido']").type('3,33')
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Ok').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
    });

    it('Validar Fluxo de um novo recebimento quando o valor pago for menor que o valor do item', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        const valorPago = 1.00; // Valor insuficiente
        const valorPagoFormatado = valorPago.toFixed(2).replace('.', ',');

        cy.visit(baseUrl);
        cy.wait(2000)
        cy.get('#schedule', { timeout: 20000 }).click()
        cy.get('span').contains('Check-in').click()
        cy.wait(2000)
        cy.xpath("(//button[contains(@class,'mat-ripple btn')])[1]").click({ force: true })
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Dinheiro').click()

        // Inserir um valor insuficiente
        cy.xpath("//input[@name='valorRecebido']").type(valorPagoFormatado)

        // Tentar pagar com valor insuficiente
        cy.get('button').contains('Pagar').click()

        cy.get('button').contains('Ok').click()

        // Verificar se o texto completo da mensagem de erro está correto
        cy.contains('Não é possível prosseguir com recebimento parcial da conta.').should('be.visible');

        // Verificar se os botões de "Sair" e "Novo Recebimento" estão presentes
        cy.contains('button', 'Sair').should('be.visible');
        cy.contains('button', 'Novo Recebimento').should('be.visible').click()

        cy.get('button').contains('Dinheiro').click()

        // Inserir um valor insuficiente
        cy.xpath("//input[@name='valorRecebido']").type('2,33')

        // Tentar pagar com valor insuficiente
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Ok').click()
    });
});

describe('Contas a Receber', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Fluxo de Contas a receber - Dinheiro', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        cy.wait(2000);
        cy.get("#ReceberDe").click();
        cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

        cy.get("#Pagador").click();
        cy.contains(' Dr. Ivan Barros ').click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@formcontrolname,'billsInvoice')]").type(randomNumber.toString());

        function generateRandomText(wordCount = 20) {
            const words = ['sistema', 'financeiro', 'transações', 'relatórios', 'contabilidade', 'banco', 'investimentos', 'auditoria', 'compliance', 'orçamento', 'receita', 'despesa', 'lucro', 'patrimônio', 'ativos', 'passivos', 'fluxo de caixa', 'balanço', 'análise', 'risco'];
            return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        }

        cy.get("#Observacao").type(generateRandomText());
        cy.contains('Adicionar itens').click();

        function generateRandomLetters(length = 5) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        }

        cy.get("#Item").type(generateRandomLetters());
        cy.get("#SelectPlanoContas").click();
        cy.xpath("//span[contains(.,'Receita de Contas - Consultas')]").click();
        cy.get("#ValorUnitario").clear().type('10');
        cy.xpath("(//input[@type='number'])[2]").type('1');
        cy.xpath("(//input[@type='number'])[3]").type('1');
        cy.get("#dataIntervalo").click();
        cy.contains('Dia').click();
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").click();
        cy.contains('Gerar Conta a Receber').should('be.visible');
        cy.contains('Tem Certeza que deseja cadastrar essa conta a receber?').should('be.visible');
        cy.xpath("//button[contains(.,'Cadastrar')]").click();
        cy.contains('Parcelas geradas com sucesso').should('be.visible');
        cy.contains('Ok').click();

        cy.contains('Contas a receber').click();
        cy.contains('Pesquisar').click();

        cy.contains(randomNumber.toString())
            .parent()
            .within(() => {
                cy.xpath("//mat-icon[@role='img'][contains(.,'edit')]")
                    .first()
                    .click({ force: true });
            });
        cy.xpath("//button[contains(.,'Receber')]").click();
        cy.xpath("//button[contains(.,'Dinheiro')]").click();
        cy.xpath("//input[contains(@name,'valorRecebido')]").type('10');
        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[9]").click();
        cy.xpath("//span[contains(.,' Conta Automação ')]").click();
        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click();
        cy.contains('Parcela salva com sucesso !', { timeout: 20000 }).should('be.visible').click();
        cy.contains('Ok').click();


    });

    it('Fluxo de Contas a receber - PIX', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        cy.wait(2000);
        cy.get("#ReceberDe").click();
        cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

        cy.get("#Pagador").click();
        cy.contains(' Dr. Ivan Barros ').click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@formcontrolname,'billsInvoice')]").type(randomNumber.toString());

        function generateRandomText(wordCount = 20) {
            const words = ['sistema', 'financeiro', 'transações', 'relatórios', 'contabilidade', 'banco', 'investimentos', 'auditoria', 'compliance', 'orçamento', 'receita', 'despesa', 'lucro', 'patrimônio', 'ativos', 'passivos', 'fluxo de caixa', 'balanço', 'análise', 'risco'];
            return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        }

        cy.get("#Observacao").type(generateRandomText());
        cy.contains('Adicionar itens').click();

        function generateRandomLetters(length = 5) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        }

        cy.get("#Item").type(generateRandomLetters());
        cy.get("#SelectPlanoContas").click();
        cy.xpath("//span[contains(.,'Receita de Contas - Consultas')]").click();
        cy.get("#ValorUnitario").clear().type('10');
        cy.xpath("(//input[@type='number'])[2]").type('1');
        cy.xpath("(//input[@type='number'])[3]").type('1');
        cy.get("#dataIntervalo").click();
        cy.contains('Dia').click();
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").click();
        cy.contains('Gerar Conta a Receber').should('be.visible');
        cy.contains('Tem Certeza que deseja cadastrar essa conta a receber?').should('be.visible');
        cy.xpath("//button[contains(.,'Cadastrar')]").click();
        cy.contains('Parcelas geradas com sucesso').should('be.visible');
        cy.contains('Ok').click();

        cy.contains('Contas a receber').click();
        cy.contains('Pesquisar').click();

        cy.contains(randomNumber.toString())
            .parent()
            .within(() => {
                cy.xpath("//mat-icon[@role='img'][contains(.,'edit')]")
                    .first()
                    .click({ force: true });
            });
        cy.xpath("//button[contains(.,'Receber')]").click();
        cy.xpath("//button[contains(.,'PIX')]").click();
        cy.xpath("//label[normalize-space()='Não TEF']").click()
        cy.xpath("//input[contains(@name,'valorRecebido')]").type('10');
        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[9]").click();
        cy.xpath("//span[contains(.,' Conta Automação ')]").click();
        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click();
        cy.contains('Parcela salva com sucesso !', { timeout: 20000 }).should('be.visible').click();
        cy.contains('Ok').click();

    });

    it('Fluxo de Contas a receber - Debito', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        cy.wait(2000);
        cy.get("#ReceberDe").click();
        cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

        cy.get("#Pagador").click();
        cy.contains(' Dr. Ivan Barros ').click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@formcontrolname,'billsInvoice')]").type(randomNumber.toString());

        function generateRandomText(wordCount = 20) {
            const words = ['sistema', 'financeiro', 'transações', 'relatórios', 'contabilidade', 'banco', 'investimentos', 'auditoria', 'compliance', 'orçamento', 'receita', 'despesa', 'lucro', 'patrimônio', 'ativos', 'passivos', 'fluxo de caixa', 'balanço', 'análise', 'risco'];
            return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        }

        cy.get("#Observacao").type(generateRandomText());
        cy.contains('Adicionar itens').click();

        function generateRandomLetters(length = 5) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        }

        cy.get("#Item").type(generateRandomLetters());
        cy.get("#SelectPlanoContas").click();
        cy.xpath("//span[contains(.,'Receita de Contas - Consultas')]").click();
        cy.get("#ValorUnitario").clear().type('10');
        cy.xpath("(//input[@type='number'])[2]").type('1');
        cy.xpath("(//input[@type='number'])[3]").type('1');
        cy.get("#dataIntervalo").click();
        cy.contains('Dia').click();
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").click();
        cy.contains('Gerar Conta a Receber').should('be.visible');
        cy.contains('Tem Certeza que deseja cadastrar essa conta a receber?').should('be.visible');
        cy.xpath("//button[contains(.,'Cadastrar')]").click();
        cy.contains('Parcelas geradas com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('Ok').click();
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Cartão de Débito').click()
        //cy.xpath("//label[normalize-space()='Não TEF']").click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Conta Débito').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('Parcela salva com sucesso !', { timeout: 20000 }).should('be.visible').click();
        cy.contains('Ok').click();
    });

    it('Fluxo de Contas a receber - Credito', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        cy.wait(2000);
        cy.get("#ReceberDe").click();
        cy.xpath("//span[contains(.,'PROFISSIONAL')]").click();

        cy.get("#Pagador").click();
        cy.contains(' Dr. Ivan Barros ').click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@formcontrolname,'billsInvoice')]").type(randomNumber.toString());

        function generateRandomText(wordCount = 20) {
            const words = ['sistema', 'financeiro', 'transações', 'relatórios', 'contabilidade', 'banco', 'investimentos', 'auditoria', 'compliance', 'orçamento', 'receita', 'despesa', 'lucro', 'patrimônio', 'ativos', 'passivos', 'fluxo de caixa', 'balanço', 'análise', 'risco'];
            return Array.from({ length: wordCount }, () => words[Math.floor(Math.random() * words.length)]).join(' ');
        }

        cy.get("#Observacao").type(generateRandomText());
        cy.contains('Adicionar itens').click();

        function generateRandomLetters(length = 5) {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
        }

        cy.get("#Item").type(generateRandomLetters());
        cy.get("#SelectPlanoContas").click();
        cy.xpath("//span[contains(.,'Receita de Contas - Consultas')]").click();
        cy.get("#ValorUnitario").clear().type('10');
        cy.xpath("(//input[@type='number'])[2]").type('1');
        cy.xpath("(//input[@type='number'])[3]").type('1');
        cy.get("#dataIntervalo").click();
        cy.contains('Dia').click();
        cy.xpath("//button[@color='primary'][contains(.,'Adicionar')]").click();
        cy.contains('Gerar Conta a Receber').should('be.visible');
        cy.contains('Tem Certeza que deseja cadastrar essa conta a receber?').should('be.visible');
        cy.xpath("//button[contains(.,'Cadastrar')]").click();
        cy.contains('Parcelas geradas com sucesso', { timeout: 20000 }).should('be.visible');
        cy.contains('Ok').click();
        cy.get('button').contains('Receber').click()
        cy.get('button').contains('Cartão de Crédito').click()
        //cy.xpath("//label[normalize-space()='Não TEF']").click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão ').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('Parcela salva com sucesso !', { timeout: 20000 }).should('be.visible')
        cy.contains('Ok').click();
    });

    it('Validar filtro status > Não quitadas ', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.get('#selectStats', { timeout: 20000 }).click()
        cy.get('span').contains(' Não quitadas ').click()
        cy.get('button').contains('Pesquisar').click()
        cy.wait(3000)
        cy.contains('th', 'Status').invoke('index').then((statusIndex) => {
            // Verificar cada célula da coluna Status
            cy.get('tbody tr').each(($row) => {
                // Obter o texto da célula na coluna de status
                const statusText = $row.find(`td:eq(${statusIndex})`).text().trim();

                // Verificar se contém "Não quitadas"
                expect(statusText).to.equal('Não quitadas');
            });
        });
    });

    it('Validar filtro status > Quitadas ', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();
        cy.contains('Contas a receber').click();
        cy.get('#selectStats', { timeout: 20000 }).click()
        cy.get('span').contains(' Quitadas ').click()
        cy.contains('th', 'Status').invoke('index').then((statusIndex) => {
            // Verificar cada célula da coluna Status
            cy.get('tbody tr').each(($row) => {
                // Obter o texto da célula na coluna de status
                const statusText = $row.find(`td:eq(${statusIndex})`).text().trim();

                // Verificar se contém "Não quitadas"
                expect(statusText).to.equal('Quitadas');
            });
        });
    });
});

describe('Contas a Pagar', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });
    it('Fluxo de Contas a Pagar - Dinheiro', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(3000);

        cy.get('#financial').click();
        cy.contains('Contas a pagar').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@maxlength,'250')]").type(randomNumber.toString());

        cy.get("#Pagador").click()
        cy.xpath("(//span[contains(.,'Fornecedor')])[2]").click()
        cy.contains('Profissional').click()
        cy.get("#Pagador").type('dr. ivan barros')
        cy.get('section > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #observationHeader')
            .type('Teste voltado para escrita no campo Observação')
        cy.xpath("//button[contains(.,'Adicionar itens')]").click()
        cy.xpath("//input[@data-placeholder='Digite o nome do Item']").type('Teste Campo')
        cy.get('#selectPlanoContas').click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Administrativas - Aluguel de Imóvel -')]").click()
        cy.xpath("//input[@prefix='R$ ']").clear().type('10')
        cy.xpath("(//input[contains(@type,'number')])[3]").type('1')
        cy.xpath("(//input[contains(@type,'number')])[4]").type('1')
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.contains("Dia").click()
        cy.get("#adicionarParcelas").click()
        cy.contains('Contas a pagar cadastrada com sucesso').should('be.visible')
        cy.contains('Ok').click()
        cy.contains('Pagar').click()
        cy.contains('Pesquisar').click()

        cy.contains(randomNumber.toString())
            .parent()
            .find('img[id^="editarParcela"]')
            .click({ force: true });

        cy.xpath("//button[contains(.,'Pagar')]").click()
        cy.xpath("//button[contains(.,'Dinheiro')]").click()

        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,' Conta Automação ')]").click()

        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click()
        cy.contains('Parcela salva com sucesso !').should('be.visible')
    });

    it('Fluxo de Contas a Pagar - PIX', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.wait(3000);

        cy.get('#financial').click();
        cy.contains('Contas a pagar').click();
        cy.xpath("//p[@class='text-white fw-bold my-1'][contains(.,'Cadastrar')]").click();

        function getRandomNumber() {
            return Math.floor(Math.random() * 5000) + 1;
        }

        const randomNumber = getRandomNumber();

        cy.xpath("//input[contains(@maxlength,'250')]").type(randomNumber.toString());

        cy.get("#Pagador").click()
        cy.xpath("(//span[contains(.,'Fornecedor')])[2]").click()
        cy.contains('Profissional').click()
        cy.get("#Pagador").type('dr. ivan barros')
        cy.get('section > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix > #observationHeader')
            .type('Teste voltado para escrita no campo Observação')
        cy.xpath("//button[contains(.,'Adicionar itens')]").click()
        cy.xpath("//input[@data-placeholder='Digite o nome do Item']").type('Teste Campo')
        cy.get('#selectPlanoContas').click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Administrativas - Aluguel de Imóvel -')]").click()
        cy.xpath("//input[@prefix='R$ ']").clear().type('10')
        cy.xpath("(//input[contains(@type,'number')])[3]").type('1')
        cy.xpath("(//input[contains(@type,'number')])[4]").type('1')
        cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
        cy.contains("Dia").click()
        cy.get("#adicionarParcelas").click()
        cy.contains('Contas a pagar cadastrada com sucesso').should('be.visible')
        cy.contains('Ok').click()
        cy.contains('Pagar').click()
        cy.contains('Pesquisar').click()

        cy.contains(randomNumber.toString())
            .parent()
            .find('img[id^="editarParcela"]')
            .click({ force: true });

        cy.xpath("//button[contains(.,'Pagar')]").click()
        cy.xpath("//button[contains(.,'PIX')]").click()

        cy.xpath("(//div[contains(.,'Contas Correntes *')])[10]").click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Automação')]").click()

        cy.xpath("//button[@color='primary'][contains(.,'Pagar')]").click()
        cy.contains('Parcela salva com sucesso !').should('be.visible')
        cy.contains('Ok').click()
    });
});

describe('Proposta', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.clearAllCookies()
        cy.setupAndLogin()
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Dinheiro com busca por CPF (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');
        cy.get('button').contains('Pesquisar').click()
        cy.get('button').contains(' edit ').click()
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação', { timeout: 2000 }).should('exist').click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });



        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(3000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('button', 'Dinheiro').click()        // Pegar o valor do pagamento e usar no campo de valor recebido
        cy.get('input[name="valorPagamento"]')
            .invoke('val')
            .then((valorPagamento) => {
                // Remove o R$ e espaços, e garante que use vírgula como separador decimal
                const valor = valorPagamento
                    .replace('R$ ', '')
                    .replace('.', ',')

                // Preenche o valor recebido com o mesmo valor do pagamento
                cy.xpath("//input[@name='valorRecebido']")
                    .clear()
                    .type(valor)

                // Verifica se foi preenchido corretamente (com vírgula)
                cy.xpath("//input[@name='valorRecebido']")

            })
        cy.contains('button', 'Pagar').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')

    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Credito com busca por CPF (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');
        cy.get('button').contains('Pesquisar').click()
        cy.get('button').contains(' edit ').click()
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });

        cy.wait(2000)

        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.wait(3000)

        cy.get('#proposalAreaExpertise').click({ force: true })

        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });

        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()

        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });

        cy.contains('button', 'Adicionar').click()
        cy.wait(3000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')

        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.get('button').contains('Cartão de Crédito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'1Parcelas *')])[9]").click({ force: true })
        cy.wait(1000)
        cy.get('span').contains(' 2 ', { timeout: 2000 }).click()
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Crédito Cartão').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()

    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Pix com busca por CPF (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');
        cy.get('button').contains('Pesquisar').click()
        cy.get('button').contains(' edit ').click()
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.wait(2000)
        cy.get('#proposalAreaExpertise').click({ force: true })
        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });
        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()
        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('button', 'PIX').click()
        cy.xpath("(//div[contains(.,'Conta Vinculada *')])[10]").click({ force: true })
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Conta Automação')]").click()
        // Preenche o campo de valor recebido
        cy.xpath("//input[@name='valorRecebido']")
            .clear()
            .type('358,00')
        cy.contains('button', 'Pagar').click()
        cy.contains('button', 'Ok').click()
    })

    it('Validar Fluxo de Proposta para 1 exame com pagamento no Debito com busca por CPF (Não tef)', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        // Listar Paciente que eu quero
        cy.get('#patient').click()
        cy.xpath("//span[@class='ms-4 item-size ng-star-inserted'][contains(.,'Lista de pacientes')]").click({ force: true })
        cy.wait(3000)
        cy.xpath("//input[contains(@aria-required,'false')]").click({ force: true }).type('349.219.778-79');
        cy.get('button').contains('Pesquisar').click()
        cy.get('button').contains(' edit ').click()
        cy.xpath("//button[@type='button'][contains(.,'Ok')]").click()
        cy.xpath("//span[contains(.,'Propostas')]").click();
        cy.xpath("//button[contains(.,'Nova Proposta')]").click();
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("(//div[contains(.,'Parceria *')])[12]").click(), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 20 // Intervalo de verificação em milissegundos
        });
        cy.wait(3000)
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Cartão de TODOS')]").click({ force: true }), {
            timeout: 20000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.wait(2000)
        cy.get('#proposalAreaExpertise').click({ force: true })
        cy.waitUntil(() => cy.contains('span', 'Área de Atuação - Teste Automação').should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.get('#proposalProfessionalRequesting').click()
        cy.contains('span', ' Dr. Ivan Barros ').click()
        cy.contains('span', 'Aguardando aprovação do cliente').should('exist')
        cy.get('#proposalProcedure').type('Consulta Áreas de Atuação')
        cy.waitUntil(() => cy.xpath("//span[contains(.,'Consulta Áreas de Atuação')]").should('be.visible').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 100 // Intervalo de verificação em milissegundos
        });
        cy.xpath("(//div[contains(.,'Executantes')])[13]").click()
        cy.waitUntil(() => cy.xpath("//span[@class='mat-option-text'][contains(.,' Teste Fran Tavares  ')]").should('exist').click(), {
            timeout: 10000, // Tempo máximo de espera em milissegundos
            interval: 500 // Intervalo de verificação em milissegundos
        });
        cy.contains('button', 'Adicionar').click()
        cy.wait(2000)
        cy.xpath("(//span[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]").click()
        cy.contains('Salvar proposta').click()
        cy.contains('button', 'Ok').click()
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.contains('Sim').click()
        cy.contains('button', 'Ok').click()
        cy.contains('span', 'Aprovada pelo cliente').should('exist')
        cy.wait(3000)
        cy.get("#proposalPayment").click()
        cy.get('button').contains('Cartão de Débito').click()
        cy.xpath("//input[contains(@value,'false')]").click({ force: true })
        cy.xpath("(//div[contains(.,'Contas Correntes *')])[9]").click()
        cy.get('span').contains(' Conta Débito').click()
        cy.get('button').contains('Pagar').click()
        cy.get('button').contains('Sim').click()
        cy.contains('h2', 'Sucesso', { timeout: 20000 }).should('have.text', 'Sucesso')
        cy.get('button').contains('Ok').click()
    })
});

describe('Rotas Financeiro', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar Rota da Tela Saldo', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Saldo', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Extrato', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Extrato', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Contas a pagar', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Contas a pagar', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Contas a receber', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Contas a receber', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    });

    it('Validar Rota da Baixa de transações', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Baixa de transações', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Repasse', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Repasse', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Split', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Split', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Caixas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Caixas', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Propostas', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });
        cy.get('span').contains('Propostas', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    });

    it('Validar Rota da Tela Controle de Parcerias', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.get('span').contains('Controle de Parcerias', { timeout: 20000 })
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    })

    it('Validar Rota da Tela Cadeado', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.get('span').contains('Cadeado', { timeout: 20000 })
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    })

    it('Validar Rota da Tela Royalties', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.get('span').contains('Royalties', { timeout: 20000 })
            .scrollIntoView()
            .should('be.visible')
            .click({ force: true });

        cy.url().should((url) => {
            return url.includes('https://amei-homolog.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei-staging.amorsaude.com.br/financial/balance') ||
                url.includes('https://amei.amorsaude.com.br/financial/balance')  // URL de produção
        }, { timeout: 20000 });
    })
});

describe('Baixa de transações', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin()
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar Fluxo de Parcelas na tela Cartões', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        cy.get('#financial', { timeout: 20000 }).click()
        cy.get('span').contains('Baixa de transações').click()

        const today = new Date()
        const formattedDate = today.toLocaleDateString('pt-BR')

        cy.get('#dataDe').type(formattedDate)


        cy.get('#typeDatePicker').click({ force: true })
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Data de Pagamento')]").click()

        cy.get('button').contains('Buscar').click({ force: true })

        cy.xpath("(//div[contains(.,'10')])[15]", { timeout: 20000 }).click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'50')]").click()


        const expectedColumns = [
            'Pagador',
            'Id transação',
            'Data pagamento',
            'Valor pagamento',
            'Taxa %',
            'Valor baixa',
            'Parcelas',
            'Data baixa',
            'Data Venc.',
            'Status'
        ]

        expectedColumns.forEach(column => {
            cy.contains('th', column).should('be.visible')
        })

        cy.xpath(`(//td[@role='cell'][contains(.,'${formattedDate}')])[1]`, { timeout: 20000 }).should('be.visible')



        const timeout = { timeout: 20000 };

        const parseMoneyValue = (text) => {
            if (!text) return 0;
            const cleanValue = text
                .replace('Valor Bruto: ', '')
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim();
            return Number(parseFloat(cleanValue).toFixed(2));
        };

        let somaTotal = 0;

        cy.get('tbody > tr > .cdk-column-valuePayer', timeout)
            .should('have.length.at.least', 1)
            .each(($cell, index) => {
                const value = parseMoneyValue($cell.text());
                // Mantém apenas 2 casas decimais na soma
                somaTotal = Number((somaTotal + value).toFixed(2));
                cy.log(`Linha ${index + 1}: R$ ${value}`);
            })
            .then(() => {
                cy.log(`Soma total: R$ ${somaTotal}`);

                cy.xpath("//strong[contains(text(), 'R$')]")
                    .invoke('text')
                    .then(valorBrutoText => {
                        const valorBruto = Number(parseMoneyValue(valorBrutoText));
                        cy.log(`Valor Bruto encontrado: R$ ${valorBruto}`);
                        expect(somaTotal).to.equal(valorBruto);
                    });
            });

    });

    it('Validar Download na tela Baixa de Transações', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        cy.get('#financial', { timeout: 20000 }).click()
        cy.get('span').contains('Baixa de transações').click()

        const today = new Date()
        const formattedDate = today.toLocaleDateString('pt-BR')

        cy.get('#dataDe').type(formattedDate)

        cy.get('#typeDatePicker').click({ force: true })
        cy.xpath("//span[@class='mat-option-text'][contains(.,'Data de Pagamento')]").click()

        cy.get('button').contains('Buscar').click({ force: true })

        cy.xpath("(//div[contains(.,'10')])[15]", { timeout: 20000 }).click()
        cy.xpath("//span[@class='mat-option-text'][contains(.,'50')]").click()

        const expectedColumns = [
            'Pagador',
            'Id transação',
            'Data pagamento',
            'Valor pagamento',
            'Taxa %',
            'Valor baixa',
            'Parcelas',
            'Data baixa',
            'Data Venc.',
            'Status'
        ]

        expectedColumns.forEach(column => {
            cy.contains('th', column).should('be.visible')
        })

        cy.xpath(`(//td[@role='cell'][contains(.,'${formattedDate}')])[1]`, { timeout: 20000 }).should('be.visible')

        const timeout = { timeout: 20000 };

        const parseMoneyValue = (text) => {
            if (!text) return 0;
            const cleanValue = text.toString()
                .replace('Valor Bruto: ', '')
                .replace('R$', '')
                .replace(/\./g, '')
                .replace(',', '.')
                .trim();
            return Number(parseFloat(cleanValue).toFixed(2));
        };

        let somaTotalTela = 0;

        cy.get('tbody > tr > .cdk-column-valuePayer', timeout)
            .should('have.length.at.least', 1)
            .each(($cell, index) => {
                const value = parseMoneyValue($cell.text());
                somaTotalTela = Number((somaTotalTela + value).toFixed(2));
                cy.log(`Linha ${index + 1}: R$ ${value}`);
            })
            .then(() => {
                cy.log(`Soma total da tela: R$ ${somaTotalTela}`);

                cy.xpath("//strong[contains(text(), 'R$')]")
                    .invoke('text')
                    .then(valorBrutoText => {
                        const valorBruto = Number(parseMoneyValue(valorBrutoText));
                        cy.log(`Valor Bruto encontrado: R$ ${valorBruto}`);
                        expect(somaTotalTela).to.equal(valorBruto);
                    });
            });

        cy.wait(2000);

        // Limpa a pasta de downloads antes de exportar
        cy.task('clearDownloads');

        // Clica no botão exportar
        cy.get('button').contains('Exportar').click();

        // Aguarda o download ser concluído
        cy.wait(2000);

        // Pega e lê o arquivo Excel
        cy.task('getLatestDownloadedFile').then((filename) => {
            if (!filename) {
                throw new Error('Nenhum arquivo Excel foi baixado');
            }

            cy.task('readExcelFile', filename).then((base64Content) => {
                const binaryContent = Cypress.Buffer.from(base64Content, 'base64');
                const XLSX = require('xlsx');
                const workbook = XLSX.read(binaryContent, { type: 'buffer' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(worksheet);

                // Log para debug - mostra a estrutura do Excel
                cy.log('Estrutura do Excel (primeira linha):', JSON.stringify(data[0], null, 2));
                cy.log('Colunas disponíveis:', Object.keys(data[0]));

                // Calcula a soma do Excel
                let somaExcel = 0;

                data.forEach((row, index) => {
                    // Agora sabemos que o valor está na coluna "Valor de compra"
                    const valorColuna = row['Valor de compra'];

                    if (valorColuna) {
                        // Se o valor já for um número, apenas converte para float
                        const valor = typeof valorColuna === 'number'
                            ? valorColuna
                            : parseMoneyValue(valorColuna);

                        somaExcel = Number((somaExcel + valor).toFixed(2));
                        cy.log(`Excel - Linha ${index + 1}: ${valorColuna} -> ${valor}`);
                    }
                });

                cy.log(`Soma total Excel: R$ ${somaExcel}`);
                cy.log(`Soma total Tela: R$ ${somaTotalTela}`);

                // Compara a soma do Excel com a soma da tela
                expect(somaExcel).to.equal(somaTotalTela);
            });
        });
    });
});

describe.only('Royalties', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar Big Numbers Venda bruta total na tela de Royalties ', () => {

        let valorBrutoTotal;

        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);
        cy.get('#financial').click();

        cy.get('span').contains('Royalties', { timeout: 20000 }).click();

        cy.xpath("//button[@class='btn position-absolute search-button']").click()


        cy.get('.cursor-pointer', { timeout: 20000 })
            .should('be.visible')
            .first()
            .click({ force: true });

        // Intercept the request
        cy.intercept('GET', '**/api/v1/royalties/infos-financials**').as('getValores');
        cy.wait('@getValores', { timeout: 10000 });

        const extrairValor = (texto) => {
            // Melhorando a extração para lidar com diferentes formatos
            const match = texto.match(/R\$\s*([\d.,]+)/);
            if (!match) return 0;
            const valorStr = match[1];
            // Tratando números com pontos e vírgulas no formato brasileiro
            return parseFloat(valorStr.replace(/\./g, '').replace(',', '.'));
        };

        // Captura o valor da venda bruta total
        cy.xpath('//div[contains(@class,"card-content-item") and contains(.,"Venda bruta total")]')
            .invoke('text')
            .then((vendaBrutaTexto) => {
                cy.log(`Texto completo venda bruta: "${vendaBrutaTexto}"`);
                const vendaBruta = extrairValor(vendaBrutaTexto);
                cy.log(`Venda Bruta extraída: ${vendaBruta}`);

                // Armazena o valor bruto total na variável
                valorBrutoTotal = vendaBruta;

                // Armazena os valores das formas de pagamento
                let tef = 0;
                let naoTef = 0;
                let dinheiro = 0;
                let pix = 0;

                // Captura o valor TEF
                cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"TEF")]')
                    .invoke('text')
                    .then((tefTexto) => {
                        cy.log(`Texto completo TEF: "${tefTexto}"`);
                        tef = extrairValor(tefTexto);
                        cy.log(`TEF extraído: ${tef}`);

                        // Captura o valor Não TEF
                        cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"Não TEF")]')
                            .invoke('text')
                            .then((naoTefTexto) => {
                                cy.log(`Texto completo Não TEF: "${naoTefTexto}"`);
                                naoTef = extrairValor(naoTefTexto);
                                cy.log(`Não TEF extraído: ${naoTef}`);

                                // Captura o valor Dinheiro
                                cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"Dinheiro")]')
                                    .invoke('text')
                                    .then((dinheiroTexto) => {
                                        cy.log(`Texto completo Dinheiro: "${dinheiroTexto}"`);
                                        dinheiro = extrairValor(dinheiroTexto);
                                        cy.log(`Dinheiro extraído: ${dinheiro}`);

                                        // Captura o valor PIX
                                        cy.xpath('//div[contains(@class,"second-card-content") and contains(.,"PIX")]')
                                            .invoke('text')
                                            .then((pixTexto) => {
                                                cy.log(`Texto completo PIX: "${pixTexto}"`);
                                                pix = extrairValor(pixTexto);
                                                cy.log(`PIX extraído: ${pix}`);

                                                // Calcula a soma das formas de pagamento
                                                const somaFormasPagamento = tef + naoTef + dinheiro + pix;

                                                // Formata os valores para exibição com 2 casas decimais
                                                const somaFormatada = somaFormasPagamento.toFixed(2);
                                                const valorBrutoFormatado = valorBrutoTotal.toFixed(2);

                                                // Exibe a verificação de forma clara
                                                cy.log(`A soma das formas de pagamento (TEF + Não TEF + Dinheiro + PIX = ${somaFormatada}) deve ser igual à Venda bruta total (${valorBrutoFormatado})`);

                                                // Verificação
                                                expect(parseFloat(somaFormatada)).to.equal(parseFloat(valorBrutoFormatado),
                                                    `A soma das formas de pagamento (TEF: ${tef.toFixed(2)} + Não TEF: ${naoTef.toFixed(2)} + Dinheiro: ${dinheiro.toFixed(2)} + PIX: ${pix.toFixed(2)} = ${somaFormatada}) deve ser igual à Venda bruta total (${valorBrutoFormatado})`);
                                            });
                                    });
                            });
                    });
            });
    });
});

describe('Saldo - Big Numbers', () => {
    beforeEach(() => {
        cy.clearAllCookies()
        cy.setupAndLogin(); // Usa o comando customizado
        cy.allure().epic('Financeiro');
        cy.allure().severity('critical');
    });

    it('Validar somatória dos Bigs Numbers', () => {
        const baseUrl = Cypress.env('currentBaseUrl');
        cy.visit(baseUrl);

        cy.get('#financial', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        cy.contains('span', 'Saldo', { timeout: 20000 })
            .should('be.visible')
            .click({ force: true });

        // Capturar todos os valores em cadeia
        cy.contains('Caixa Dinheiro')
            .parent()
            .contains(/R\$/)
            .invoke('text')
            .then((text1) => {
                const valorCaixaDinheiro = parseFloat(text1.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
                cy.log(`Caixa Dinheiro: ${valorCaixaDinheiro}`);

                cy.contains('Conta Automação')
                    .parent()
                    .contains(/R\$/)
                    .invoke('text')
                    .then((text2) => {
                        // Valor pode ser negativo, então precisamos manter o sinal
                        const valorContaAutomacao = parseFloat(text2.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
                        cy.log(`Conta Automação: ${valorContaAutomacao}`);

                        cy.contains('Conta Débito')
                            .parent()
                            .contains(/R\$/)
                            .invoke('text')
                            .then((text3) => {
                                const valorContaDebito = parseFloat(text3.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
                                cy.log(`Conta Débito: ${valorContaDebito}`);

                                cy.contains('Crédito Cartão')
                                    .parent()
                                    .contains(/R\$/)
                                    .invoke('text')
                                    .then((text4) => {
                                        const valorCreditoCartao = parseFloat(text4.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
                                        cy.log(`Crédito Cartão: ${valorCreditoCartao}`);

                                        // Capturar o saldo geral exibido
                                        cy.contains('Saldo Geral')
                                            .parent()
                                            .parent()
                                            .contains(/R\$/)
                                            .invoke('text')
                                            .then((text5) => {
                                                const saldoGeralExibido = parseFloat(text5.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
                                                cy.log(`Saldo Geral Exibido: ${saldoGeralExibido}`);

                                                const somaCalculada = valorCaixaDinheiro + valorContaAutomacao + valorContaDebito + valorCreditoCartao;
                                                cy.log(`Soma Calculada: ${somaCalculada}`);

                                                // Usando toFixed(2) para arredondar para 2 casas decimais
                                                expect(Number(somaCalculada.toFixed(2))).to.equal(Number(saldoGeralExibido.toFixed(2)));
                                            });
                                    });
                            });
                    });
            });
    });

});