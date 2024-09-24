describe('burgerConstructor tests', function () {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('should add bun', function () {
    cy.get('[data-cy="constructor"]').should('contain', 'Выберите булки');
    cy.get('[data-cy="bun-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-bun-1"]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').contains('Ингредиент 1').should('exist');
  });

  it('should add main ingredient', function () {
    cy.get('[data-cy="constructor"]').should('contain', 'Выберите начинку');
    cy.get('[data-cy="mains-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-ingredient-0"]').contains('Ингредиент 2').should('exist');
  });

  it('should add sauce ingredient', function () {
    cy.get('[data-cy="constructor"]').should('contain', 'Выберите начинку');
    cy.get('[data-cy="sauces-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="constructor-ingredient-0"]').contains('Ингредиент 4').should('exist');
  });

  it('should add all burger ingredients', function () {
    cy.get('[data-cy="constructor"]').should('contain', 'Выберите булки');
    cy.get('[data-cy="constructor"]').should('contain', 'Выберите начинку');

    cy.get('[data-cy="bun-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="mains-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="sauces-ingredients"]').contains('Добавить').click();

    cy.get('[data-cy="constructor-bun-1"]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy="constructor-ingredient-0"]').contains('Ингредиент 2').should('exist');
    cy.get('[data-cy="constructor-ingredient-1"]').contains('Ингредиент 4').should('exist');
  });

});

describe('modal tests', function () {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });

  it('should be open modal', function () {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="bun-ingredients"] li:first').click();
    cy.get('[data-cy="modal"]').should('be.visible');
  })

  it('should be correct modal ingredient', function () {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="bun-ingredients"] li:first').click();
    cy.get('[data-cy="modal"]').contains('Ингредиент 1').should('be.visible');
  })

  it('should be close opened modal', function () {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="bun-ingredients"] li:first').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="close-modal"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  })

  it('should be close opened modal by outside click', function () {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="bun-ingredients"] li:first').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('body').click(0, 0);
    cy.get('[data-cy="modal"]').should('not.exist');
  })
});

describe('order tests', function () {
  beforeEach(() => {
    cy.window().then((window) => {
      cy.setCookie('accessToken', 'Bearer mockAccessToken');
      window.localStorage.setItem('refreshToken', 'mockRefreshToken');
    });
    
    cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' });
    cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' });
    cy.intercept('POST', `api/orders`, { fixture: 'order.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
  });


  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should be order complete', function () {
    cy.get('[data-cy="constructor"]').should('contain', 'Выберите булки');
    cy.get('[data-cy="constructor"]').should('contain', 'Выберите начинку');

    cy.get('[data-cy="bun-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="mains-ingredients"]').contains('Добавить').click();
    cy.get('[data-cy="sauces-ingredients"]').contains('Добавить').click()
    ;
    cy.get('[data-cy="constructor-bun-1"]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy="constructor-ingredient-0"]').contains('Ингредиент 2').should('exist');
    cy.get('[data-cy="constructor-ingredient-1"]').contains('Ингредиент 4').should('exist');

    cy.contains('button', 'Оформить заказ').click();

    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').contains('6').should('exist');

    cy.get('[data-cy="close-modal"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="constructor"]').should('contain', 'Выберите булки');
    cy.get('[data-cy="constructor"]').should('contain', 'Выберите начинку');
  })

});
