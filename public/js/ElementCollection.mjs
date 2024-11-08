export class ElementCollection
{
    static MEMBER_MODAL_ID = "member-modal";

    static MEMBER_MODAL_LABEL_ID = "member-modal-label";

    static MEMBER_MODAL_NAME_FIELD_ID = "member-modal-name";

    static MEMBER_MODAL_ADMIN_NUMBER_FIELD_ID = "member-modal-admin-number";

    static MEMBER_MODAL_GYM_PROGRAMS_FIELD_ID = "member-modal-gym-programs";

    static EMBER_MODAL_MESSAGE_ID = "member-modal-message";

    static MEMBER_LIST_CONTAINER_ID = "member-list-container";

    static getMemberModal()
    {
        return document.getElementById(ElementCollection.MEMBER_MODAL_ID);
    }

    static getMemberModalLabel()
    {
        return document.getElementById(ElementCollection.MEMBER_MODAL_LABEL_ID);
    }

    static getMemberModalNameField()
    {
        return document.getElementById(ElementCollection.MEMBER_MODAL_NAME_FIELD_ID);
    }

    static getMemberModalAdminNumberField()
    {
        return document.getElementById(ElementCollection.MEMBER_MODAL_ADMIN_NUMBER_FIELD_ID);
    }

    static getMemberModalGymProgramsField()
    {
        return document.getElementById(ElementCollection.MEMBER_MODAL_GYM_PROGRAMS_FIELD_ID);
    }

    static getMemberModalMessage()
    {
        return document.getElementById(ElementCollection.EMBER_MODAL_MESSAGE_ID);
    }

    static getMemberListContainer()
    {
        return document.getElementById(ElementCollection.MEMBER_LIST_CONTAINER_ID);
    }
}

// Do not reorder this, otherwise it will result in "Uncaught ReferenceError: Cannot access 'ElementCollection' before initialization"
window.ElementCollection = ElementCollection;