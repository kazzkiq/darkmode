describe('Testing DarkMode in a browser with dark mode enabled', () => {
  it('Open test page', () => {
    cy.visit('http://localhost:5001/index.html');
  });

  it('Confirms DarkMode is loaded into window object', () => {
    cy.window()
    .then((win) => {
      expect(!!win.DarkMode).to.be.true;
    });
  });

  it('isDarkLocal(): confirms user preference is dark-mode', () => {
    cy.window()
    .then((win) => {
      expect(win.DarkMode.isDarkLocal()).to.be.true;
    });
  });

  it('isDark(): confirms is dark-mode', () => {
    cy.window()
    .then((win) => {
      expect(win.DarkMode.isDark()).to.be.true;
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
      win.DarkMode.setDark(false);
      expect(win.DarkMode.isDarkLocal()).to.be.false;
      expect(win.DarkMode.isDark()).to.be.true;
    });
  });

  it('onUpdate(): checks if update triggered', () => {
    cy.window()
    .then((win) => {
      win.DarkMode.onUpdate((isDark) => win.isDark = isDark);
      win.DarkMode.setDark(true);
      expect(win.isDark).to.be.true;
      win.DarkMode.setDark(false);
      expect(win.isDark).to.be.false;
      win.DarkMode.setDark(true);
      expect(win.isDark).to.be.true;
    });
  });

  it('onUpdate(): checks if <body> .dark CSS class toggled', () => {
    cy.window()
    .then((win) => {
      win.DarkMode.setDark(true);
      expect(win.document.body.classList.contains('dark')).to.be.true;
      win.DarkMode.setDark(false);
      expect(win.document.body.classList.contains('dark')).to.be.false;
      win.DarkMode.setDark(true);
      expect(win.document.body.classList.contains('dark')).to.be.true;
    });
  });
});