import { ElementCollection } from "../../public/js/ElementCollection.mjs";

let setBaseURLPromise;

describe('Resource Management Frontend', () => {
  let baseUrl;

  before(() =>
  {
    // const shutdownServer = async () =>
    // {
    //   try
    //   {
    //     await fetch('http://localhost:5050/api/kill', { method: 'GET' });
    //   }
    //
    //   catch(err) { }
    // }

    cy.task('startServer').then((url) =>
    {
      setBaseURLPromise = async () =>
      {
        baseUrl = url;

      };

      setBaseURLPromise();
    });
  });

  // after(() =>
  // {
  //   cy.task('coverageReport');
  // });

  after(() =>
  {
    return cy.task('stopServer'); // Stop the server after the report is done
  });

  // it('Blank', () =>
  // {
  //
  // });

  // it('ManageMembers - Clicking on "Create Member" button should cause member creation modal to pop-up.', () => {
  //   const body = async () =>
  //   {
  //     await setBaseURLPromise;
  //
  //     cy.visit(`${baseUrl}/pages/ManageMembers.html`);
  //
  //     // const delay = ms => new Promise(res => setTimeout(res, ms));
  //     //
  //     // await delay(3000);
  //
  //     ElementCollection.getMemberCreateButtonCypress().click();
  //
  //     const memberCreateModal = ElementCollection.getMemberCreateModalCypress();
  //
  //     memberCreateModal.should('be.visible');
  //   }
  //
  //   cy.wrap(null).then(body);
  // });

  it('Z', () => {
    const body = async () =>
    {
      await setBaseURLPromise;

      cy.visit(`${baseUrl}/pages/ManageMembers.html`);

      // cy.get("#edit").click();

      // Get first button with "Edit" as its text
      cy.get("button").contains("Edit").click();

      // const delay = ms => new Promise(res => setTimeout(res, ms));
      //
      // await delay(3000);

      // Update fields

      // updateMemberModal.nameInputElement.id = "update-member-name";
      // updateMemberModal.adminNumberInputElement.id = "update-member-admin-number";
      // updateMemberModal.gymPrograms.inputElement.id = "update-member-gym-programs";

      cy.get("#update-member-name").clear().type("Updated Name");
      cy.get("#update-member-admin-number").clear().type("1111111I");
      cy.get("#update-member-gym-programs").clear();

      cy.get("#update-member-button").click();
    }

    cy.wrap(null).then(body);
  });
});
