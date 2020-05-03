describe('Testing DarkMode in a browser with dark mode enabled', () => {
  it('Open test page', () => {
    cy.visit('http://localhost:5001/index.html');
  });

  it('Confirms DarkMode is loaded into window object', () => {
    cy.window()
    .then((win) => {
      expect(!!win.darkmode).to.be.true;
    });
  });

  it('isDarkLocal(): confirms user preference is dark-mode', () => {
    cy.window()
    .then((win) => {
      expect(win.darkmode.isDarkLocal()).to.be.true;
    });
  });

  it('isDark(): confirms is dark-mode', () => {
    cy.window()
    .then((win) => {
      expect(win.darkmode.isDark()).to.be.true;
    });
  });

  it('body.dark: confirms <body> received programmatic CSS class .dark', () => {
    cy.window()
    .then((win) => {
      expect(win.document.body.classList.contains('dark')).to.be.true;
    });
  });

  it('setDark(): programatically set user prefs to "false" and checks it', () => {
    cy.window()
    .then((win) => {
      win.darkmode.setDark(false);
      expect(win.darkmode.isDarkLocal()).to.be.false;
      expect(win.darkmode.isDark()).to.be.true;
    });
  });

  it('onUpdate(): checks if update triggered', () => {
    cy.window()
    .then((win) => {
      win.darkmode.onUpdate((isDark) => win.isDark = isDark);
      win.darkmode.setDark(true);
      expect(win.isDark).to.be.true;
      win.darkmode.setDark(false);
      expect(win.isDark).to.be.false;
      win.darkmode.setDark(true);
      expect(win.isDark).to.be.true;
    });
  });

  it('onUpdate(): checks if <body> .dark CSS class toggled', () => {
    cy.window()
    .then((win) => {
      win.darkmode.setDark(true);
      expect(win.document.body.classList.contains('dark')).to.be.true;
      win.darkmode.setDark(false);
      expect(win.document.body.classList.contains('dark')).to.be.false;
      win.darkmode.setDark(true);
      expect(win.document.body.classList.contains('dark')).to.be.true;
    });
  });
});