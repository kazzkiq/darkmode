describe('Darkmode: true', () => {
  it('Open test page', () => {
    cy.visit('http://localhost:5001/index.html');
  });

  it('Confirm escuro is in window', () => {
    cy.window()
    .then((win) => {
      expect(!!win.escuro).to.be.true;
    });
  });

  it('isDarkLocal(): confirm is dark-mode', () => {
    cy.window()
    .then((win) => {
      expect(win.escuro.isDarkLocal()).to.be.true;
    });
  });

  it('isDark(): confirm is dark-mode', () => {
    cy.window()
    .then((win) => {
      expect(win.escuro.isDark()).to.be.true;
    });
  });

  it('body.dark: confirm body received programmatic CSS class', () => {
    cy.window()
    .then((win) => {
      expect(win.document.body.classList.contains('dark')).to.be.true;
    });
  });

  it('setDark(): set NOT dark-mode and check it', () => {
    cy.window()
    .then((win) => {
      win.escuro.setDark(false);
      expect(win.escuro.isDarkLocal()).to.be.false;
      expect(win.escuro.isDark()).to.be.true;
    });
  });

  it('onUpdate(): check update triggered', () => {
    cy.window()
    .then((win) => {
      win.escuro.onUpdate((isDark) => win.isDark = isDark);
      win.escuro.setDark(true);
      expect(win.isDark).to.be.true;
      win.escuro.setDark(false);
      expect(win.isDark).to.be.false;
      win.escuro.setDark(true);
      expect(win.isDark).to.be.true;
    });
  });

  it('onUpdate(): check body .dark CSS class toggle', () => {
    cy.window()
    .then((win) => {
      win.escuro.setDark(true);
      expect(win.document.body.classList.contains('dark')).to.be.true;
      win.escuro.setDark(false);
      expect(win.document.body.classList.contains('dark')).to.be.false;
      win.escuro.setDark(true);
      expect(win.document.body.classList.contains('dark')).to.be.true;
    });
  });
});