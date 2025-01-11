describe('Create Gym Program Frontend', () => {
  let baseUrl;

  before(() => {
    cy.task('startServer').then((url) => {
      baseUrl = url;
      console.log(baseUrl)
    });
  });

  beforeEach(() => {
    cy.visit(`${baseUrl}/pages/ManageGymPrograms.html`);
  });

  after(() => {
    return cy.task('stopServer');
  });

  // Test - Creating a new program
  it('should create a new program', () => {
    cy.get('button[data-target="#openModalButton"]').click(); // Click on the button to open Create Program modal
    cy.get('#programModal').should('be.visible'); // Ensure the modal is visible after clicking Create Program button
    cy.get('#name').type('Test Program 1', { force: true }); // Type name into input
    cy.get('#focusBodyPart').select('Upper', { force: true }); // Select Upper from dropdown
    cy.get('#difficulty').select('Beginner', { force: true }); // force:true ensures action is performed even if elements of select are hidden or not clickable 
    cy.get('#intensity').select('Mild', { force: true }); 
    cy.get('#targetAudience').select('Teenagers', { force: true });
    cy.get('#reps').type('1', { force: true }); 
    cy.get('button.btn-primary').contains('Create Program').click(); // Click Create Program button to create program
    cy.get('#programList').contains('TEST PROGRAM').should('exist'); // Ensure newly created program is shown 
  });

  // Test - Alerting user that it failed to fetch programs
  it('should alert the user when fetching programs fails', () => {
    cy.intercept('GET', 'http://localhost:5050/api/gym-programs', { // Intercept GET request to simulate a failed response
      statusCode: 500
    }).as('fetchProgramsError'); // Custom alias name to simulate fetching program error
    cy.wait('@fetchProgramsError', {timeout: 100000}); // Wait for intercepted request with custom alias name to be completed
    cy.on('window:alert', (alertText) => { // Listen for window alert to validate the message
      expect(alertText).to.equal('Failed to fetch programs.');
    });
  });

  // Test - Submitting form and closing modal 
  it('should submit the form and close the modal on success', () => {
    const mockProgram = { // Mock program data to fill the fields
      name: 'Test Program',
      focusBodyPart: 'Upper',
      difficulty: 'Beginner',
      intensity: 'Mild',
      targetAudience: 'Teenagers',
      reps: 5,
    };
    cy.intercept('POST', 'http://localhost:5050/api/gym-programs/create', {
      statusCode: 201,
    }).as('createProgram'); // Intercept POST request with createProgram as alias 
    cy.get('button[data-target="#openModalButton"]').click();
    cy.get('#programModal').should('be.visible');
    cy.get('#name').type(mockProgram.name, { force: true });
    cy.get('#focusBodyPart').select(mockProgram.focusBodyPart, { force: true });
    cy.get('#difficulty').select(mockProgram.difficulty, { force: true });
    cy.get('#intensity').select(mockProgram.intensity, { force: true });
    cy.get('#targetAudience').select(mockProgram.targetAudience, { force: true });
    cy.get('#reps').type(mockProgram.reps, { force: true });
    cy.get('#programForm').submit();
    cy.wait('@createProgram').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    }); // Wait for intercepted POST request with custom alias name then checks the interception response code is 201, success
    cy.get('#programModal').should('not.be.visible'); // Ensure the modal is closed after form submission
  });

  // Test - Display Inactive when program is not active
  it('should display "Inactive" when the program is not active', () => {
    const program = {
      name: 'Inactive Program',
      focusBodyPart: 'Upper',
      difficulty: 'Intermediate',
      intensity: 'High',
      targetAudience: 'Teenagers',
      reps: 10,
      isActive: false,
    };
    cy.intercept('GET', 'http://localhost:5050/api/gym-programs', {
      statusCode: 200,
      body: { programs: [program] },
    }).as('getPrograms');
    cy.wait('@getPrograms');
    cy.contains('Inactive').should('be.visible'); // Ensure Status is shown as Inactive 
  });

  // Test - Should alert user if server is down or network error
  it('should alert "Failed to connect to the server." when the server is unreachable', () => {
    cy.intercept('POST', 'http://localhost:5050/api/gym-programs/create', {
      forceNetworkError: true, // Cypress built-in feature forcing a network error to simulate server down or network issue
    }).as('createProgramError'); 

    cy.get('#openModalButton').click();
    cy.get('#name').type('Test Program 1', { force: true });
    cy.get('#focusBodyPart').select('Upper', { force: true });
    cy.get('#difficulty').select('Beginner', { force: true });
    cy.get('#intensity').select('Mild', { force: true });
    cy.get('#targetAudience').select('Teenagers', { force: true });
    cy.get('#reps').type('5', { force: true });
    cy.get('#programForm').submit();
    cy.wait('@createProgramError');
    cy.on('window:alert', (alertText) => { // Listen for window alert pop up
      expect(alertText).to.equal('Failed to connect to the server.'); // Check if alert equals to error message
    });
  });

  // Test - Should log error if form submission fails
  it('should log an error to the console when form submission fails', () => {
    cy.intercept('POST', 'http://localhost:5050/api/gym-programs/create', {
      forceNetworkError: true,
    }).as('createProgramError'); // Intercept POST request forcing network error with createProgramError alias
    cy.get('#openModalButton').click();
    cy.get('#name').type('Test Program 2', { force: true });
    cy.get('#focusBodyPart').select('Upper', { force: true });
    cy.get('#difficulty').select('Beginner', { force: true });
    cy.get('#intensity').select('Mild', { force: true });
    cy.get('#targetAudience').select('Teenagers', { force: true });
    cy.get('#reps').type('5', { force: true });
    cy.window().then((win) => { // 
      cy.spy(win.console, 'error').as('consoleError'); // Spy method is used to monitor console.error call 
    });
    cy.get('#programForm').submit();
    cy.wait('@createProgramError'); // Wait for POST call to complete
    cy.get('@consoleError').should(
      'be.calledWith', // Assert that console.error was called with specific arguments
      'Error submitting form: ', // Expected first argument in console.error
      Cypress.sinon.match.any // Ensure second argument is passedin console.error
    );
  });

  // Test - Should alert Unknown error if server responds with unknown error
  it('should alert "Error creating program: Unknown error!" when the server responds with an unknown error', () => {
    cy.intercept('POST', 'http://localhost:5050/api/gym-programs/create', {
      statusCode: 400,
      body: {}, // Simulating unknown error 400 response with empty body with custom createProgramError alias
    }).as('createProgramError');
    cy.get('#openModalButton').click();
    cy.get('#name').type('Test Program 3', { force: true });
    cy.get('#focusBodyPart').select('Upper', { force: true });
    cy.get('#difficulty').select('Beginner', { force: true });
    cy.get('#intensity').select('Mild', { force: true });
    cy.get('#targetAudience').select('Teenagers', { force: true });
    cy.get('#reps').type('5', { force: true });
    cy.get('#programForm').submit();
    cy.wait('@createProgramError');
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Error creating program: Unknown error!');
    });
  });
});


