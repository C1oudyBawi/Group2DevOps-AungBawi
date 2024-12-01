export class ElementCollection
{
    static MEMBER_CREATE_BUTTON_ID = "member-create-button";

    static MEMBER_CREATE_MODAL_ID = "member-create-modal";

    static MEMBER_CREATE_MODAL_LABEL_ID = "member-create-modal-label";

    static MEMBER_CREATE_MODAL_NAME_FIELD_ID = "member-create-modal-name";

    static MEMBER_CREATE_MODAL_ADMIN_NUMBER_FIELD_ID = "member-create-modal-admin-number";

    static MEMBER_CREATE_MODAL_GYM_PROGRAMS_FIELD_ID = "member-create-modal-gym-programs";

    static MEMBER_CREATE_MODAL_MESSAGE_ID = "member-create-modal-message";

    static MEMBER_LIST_CONTAINER_ID = "member-list-container";

    static getMemberCreateButton()
    {
        return document.getElementById(ElementCollection.MEMBER_CREATE_BUTTON_ID);
    }

    static getMemberCreateButtonCypress()
    {
        return cy.get(`#${ElementCollection.MEMBER_CREATE_BUTTON_ID}`);
    }

    static getMemberListContainer()
    {
        return document.getElementById(ElementCollection.MEMBER_LIST_CONTAINER_ID);
    }

    static getMemberCreateModal()
    {
        return document.getElementById(ElementCollection.MEMBER_CREATE_MODAL_ID);
    }

    static getMemberCreateModalCypress()
    {
        return cy.get(`#${ElementCollection.MEMBER_CREATE_MODAL_ID}`);
    }

    static getMemberCreateModalLabel()
    {
        return document.getElementById(ElementCollection.MEMBER_CREATE_MODAL_LABEL_ID);
    }

    static getMemberCreateModalNameField()
    {
        return document.getElementById(ElementCollection.MEMBER_CREATE_MODAL_NAME_FIELD_ID);
    }

    static getMemberCreateModalAdminNumberField()
    {
        return document.getElementById(ElementCollection.MEMBER_CREATE_MODAL_ADMIN_NUMBER_FIELD_ID);
    }

    static getMemberCreateModalGymProgramsField()
    {
        return document.getElementById(ElementCollection.MEMBER_CREATE_MODAL_GYM_PROGRAMS_FIELD_ID);
    }

    static getMemberCreateModalMessage()
    {
        return document.getElementById(ElementCollection.MEMBER_CREATE_MODAL_MESSAGE_ID);
    }
}

// // Do not reorder this, otherwise it will result in "Uncaught ReferenceError: Cannot access 'ElementCollection' before initialization"
// window.ElementCollection = ElementCollection;