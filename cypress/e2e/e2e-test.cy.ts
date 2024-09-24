describe('burgerConstructor tests', function () {
  beforeEach(() => {
    cy.visit('http://localhost:4000/');
    cy.viewport(1300, 800);
    cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' });
    cy.get('[data-cy="constructor"]').as('constructor');
    cy.get('[data-cy="bun-ingredients"]').as('bunIngredients');
    cy.get('[data-cy="mains-ingredients"]').as('mainsIngredients');
    cy.get('[data-cy="sauces-ingredients"]').as('saucesIngredients');
  });

  it('should add bun', function () {
    cy.get('@constructor').should('contain', 'Выберите булки');
    cy.get('@bunIngredients').contains('Добавить').click();
    cy.get('[data-cy="constructor-bun-1"]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').contains('Ингредиент 1').should('exist');
  });

  it('should add main ingredient', function () {
    cy.get('@constructor').should('contain', 'Выберите начинку');
    cy.get('@mainsIngredients').contains('Добавить').click();
    cy.get('[data-cy="constructor-ingredient-0"]').contains('Ингредиент 2').should('exist');
  });

  it('should add sauce ingredient', function () {
    cy.get('@constructor').should('contain', 'Выберите начинку');
    cy.get('@saucesIngredients').contains('Добавить').click();
    cy.get('[data-cy="constructor-ingredient-0"]').contains('Ингредиент 4').should('exist');
  });

  it('should add all burger ingredients', function () {
    cy.get('@constructor').should('contain', 'Выберите булки');
    cy.get('@constructor').should('contain', 'Выберите начинку');

    cy.get('@bunIngredients').contains('Добавить').click();
    cy.get('@mainsIngredients').contains('Добавить').click();
    cy.get('@saucesIngredients').contains('Добавить').click();

    cy.get('[data-cy="constructor-bun-1"]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy="constructor-ingredient-0"]').contains('Ингредиент 2').should('exist');
    cy.get('[data-cy="constructor-ingredient-1"]').contains('Ингредиент 4').should('exist');
  });

});

describe('modal tests', function () { //модалки не выношу с ипользование as, потому что они открываются только после кликов в тестах
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000/');
    cy.get('[data-cy="bun-ingredients"]').as('bunIngredients');
  });

  it('should be open modal', function () {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('@bunIngredients').find('li:first').click();
    cy.get('[data-cy="modal"]').should('be.visible');
  })

  it('should be correct modal ingredient', function () {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('@bunIngredients').find('li:first').click();
    cy.get('[data-cy="modal"]').contains('Ингредиент 1').should('be.visible');
  })

  it('should be close opened modal', function () {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('@bunIngredients').find('li:first').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="close-modal"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  })

  it('should be close opened modal by outside click', function () {
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('@bunIngredients').find('li:first').click();
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
    cy.get('[data-cy="constructor"]').as('constructor');
    cy.get('[data-cy="bun-ingredients"]').as('bunIngredients');
    cy.get('[data-cy="mains-ingredients"]').as('mainsIngredients');
    cy.get('[data-cy="sauces-ingredients"]').as('saucesIngredients');
  });


  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should be order complete', function () {
    cy.get('@constructor').should('contain', 'Выберите булки');
    cy.get('@constructor').should('contain', 'Выберите начинку');

    cy.get('@bunIngredients').contains('Добавить').click();
    cy.get('@mainsIngredients').contains('Добавить').click();
    cy.get('@saucesIngredients').contains('Добавить').click()
    ;
    cy.get('[data-cy="constructor-bun-1"]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy="constructor-bun-2"]').contains('Ингредиент 1').should('exist');
    cy.get('[data-cy="constructor-ingredient-0"]').contains('Ингредиент 2').should('exist');
    cy.get('[data-cy="constructor-ingredient-1"]').contains('Ингредиент 4').should('exist');

    cy.contains('button', 'Оформить заказ').click();

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains('6').should('be.visible');

    cy.get('[data-cy="close-modal"]').click();

    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('@constructor').should('contain', 'Выберите булки');
    cy.get('@constructor').should('contain', 'Выберите начинку');
  })

});
