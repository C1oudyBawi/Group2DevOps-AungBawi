import { constructGET, constructPUT } from "./helpers/RequestHelpers.mjs";
import { Endpoints } from "./Endpoints.mjs";
import { ElementCollection } from "./ElementCollection.mjs";
import { Modal, ModalInput } from "./Modal.mjs";
import { MemberDTO, MemberDTOSchema } from "../../common/dtos/MemberDTO.mjs";
import { z } from "zod";
import { errorsToText } from "../../common/helpers/ErrorHelpers.mjs";

class MemberCardElementChildren
{
    /**
     * @type { string }
     * @public
     */
    id;

    /**
     * @type { HTMLHeadingElement }
     * @public
     */
    titleElement;

    /**
     * @type { HTMLParagraphElement }
     * @public
     */
    adminNumberValueElement;

    /**
     * @type { HTMLUListElement | undefined }
     * @public
     */
    gymProgramsValueElement;

    constructor({ id, titleElement, adminNumberValueElement, gymProgramsValueElement })
    {
        this.id = id;
        this.titleElement = titleElement;
        this.adminNumberValueElement = adminNumberValueElement;
        this.gymProgramsValueElement = gymProgramsValueElement;
    }
}

class UpdateModal extends Modal
{
    /**
     * @type { HTMLInputElement }
     * @private
     */
    nameInputElement;

    /**
     * @type { HTMLInputElement }
     * @private
     */
    adminNumberInputElement;

    /**
     * @type { HTMLInputElement }
     * @private
     */
    gymProgramsInputElement;

    constructor()
    {
        super();

        this.title = "Update Member";

        this.nameInputElement = this.addInput(
            new ModalInput(
                {
                    label: "Name",
                    placeholder: "Enter new name",
                    required: false
                })
        ).valueElement;

        this.adminNumberInputElement = this.addInput(
            new ModalInput(
                {
                    label: "Admin Number",
                    placeholder: "Enter new admin number",
                    required: false
                })
        ).valueElement;

        this.gymProgramsInputElement = this.addInput(
            new ModalInput(
                {
                    label: "Gym Program(s)",
                    placeholder: "Enter new gym program(s) ( Comma-separated )",
                    required: false
                })
        ).valueElement;

        this.actionButtonText = "Update Member!";
    }

    get name()
    {
        return this.nameInputElement.value;
    }

    set name(value)
    {
        this.nameInputElement.value = value;
    }

    get adminNumber()
    {
        return this.adminNumberInputElement.value;
    }

    set adminNumber(value)
    {
        this.adminNumberInputElement.value = value;
    }

    get gymPrograms()
    {
        return this.gymProgramsInputElement.value;
    }

    set gymPrograms(value)
    {
        this.gymProgramsInputElement.value = value;
    }
}

const updateMemberModal = new UpdateModal();

const onLoadAsync = async () =>
{
    /**
     * @type { Response }
     */
    let response;

    try
    {
        response = await fetch(
            Endpoints.MEMBER_GET_ENDPOINT,
            constructGET()
        );
    }

    catch (error)
    {
        console.error(error);
        response.ok = false;
    }

    let memberListElement = ElementCollection.getMemberListContainer();

    // Clear the member list, we use this function for reloading as well.
    memberListElement.innerText = "";

    const createCenteredHeading = (text) =>
    {
        const headingElement = document.createElement("h2");
        headingElement.classList.add("text-center", "p-5");
        headingElement.innerText = text;
        return headingElement;
    }

    if (!response.ok)
    {
        memberListElement.appendChild(createCenteredHeading("Failed to fetch members!"));
        return;
    }

    /**
     * @type { MemberDTO[] }
     */
    const members = (await response.json()).members;

    if (members.length === 0)
    {
        memberListElement.appendChild(createCenteredHeading("No members found!"));
        return;
    }

    const memberListPaddedElement = document.createElement("div");
    memberListPaddedElement.classList.add("container");
    memberListElement.appendChild(memberListPaddedElement);

    members.sort((left, right) =>
        Number(
            BigInt(right.id) - BigInt(left.id)
        )
    );

    for (const member of members)
    {
        // https://getbootstrap.com/docs/4.1/components/card/

        const cardElement = document.createElement("div");
        // mb-3 is for bottom margin
        cardElement.classList.add("card", "mb-3");
        cardElement.id = member.id;
        memberListPaddedElement.appendChild(cardElement);

        const cardHeaderElement = document.createElement("div");
        cardHeaderElement.classList.add(
            "card-header",
            "d-flex",
            "justify-content-between",
            "align-items-center"
        );
        cardElement.appendChild(cardHeaderElement);

        const memberNameElement = document.createElement("h5");
        memberNameElement.classList.add("card-title", "m-0");
        memberNameElement.innerText = member.name;
        cardHeaderElement.appendChild(memberNameElement);

        const editButtonElement = document.createElement("button");
        editButtonElement.classList.add("btn", "btn-primary");
        editButtonElement.innerText = "Edit";
        cardHeaderElement.appendChild(editButtonElement);

        const cardBodyElement = document.createElement("div");
        cardBodyElement.classList.add("card-body");
        cardElement.appendChild(cardBodyElement);

        const adminNumberTitleElement = document.createElement("h5");
        adminNumberTitleElement.classList.add("card-title");
        adminNumberTitleElement.innerText = "Admin Number";
        cardBodyElement.appendChild(adminNumberTitleElement);

        const adminNumberValueElement = document.createElement("p");
        adminNumberValueElement.classList.add("card-text");
        adminNumberValueElement.innerText = member.adminNumber;
        cardBodyElement.appendChild(adminNumberValueElement);

        let gymProgramsValueElement;

        if (member.gymPrograms.length !== 0)
        {
            const gymProgramsTitleElement = document.createElement("h5");
            gymProgramsTitleElement.classList.add("card-title");
            gymProgramsTitleElement.innerText = "Gym Programs";
            cardBodyElement.appendChild(gymProgramsTitleElement);

            gymProgramsValueElement = document.createElement("ul");
            gymProgramsValueElement.classList.add("list-group");
            cardBodyElement.appendChild(gymProgramsValueElement);
            gymProgramsValueElement.innerText = member.gymPrograms.join(", ");
        }

        else
        {
            gymProgramsValueElement = undefined;
        }

        const memberCardElementChildren = new MemberCardElementChildren(
        {
            id: member.id,
            titleElement: memberNameElement,
            adminNumberValueElement: adminNumberValueElement,
            gymProgramsValueElement: gymProgramsValueElement
        });

        editButtonElement.onclick = () => showUpdateMemberModal(memberCardElementChildren);
    }
}

document.addEventListener("DOMContentLoaded", onLoadAsync);

/**
 * @param { MemberCardElementChildren } memberCardElementChildren
 */
const showUpdateMemberModal = (memberCardElementChildren) =>
{
    const memberID = memberCardElementChildren.id;

    updateMemberModal.name = memberCardElementChildren.titleElement.innerText;

    updateMemberModal.adminNumber = memberCardElementChildren.adminNumberValueElement.innerText;

    updateMemberModal.gymPrograms = memberCardElementChildren.gymProgramsValueElement?.innerText ?? "";

    updateMemberModal.actionButtonCallback = (modal) => updateMemberAsync(modal, memberID);

    updateMemberModal.show(true);
}


const updateMemberModalSchema = MemberDTOSchema.extend(
{
    gymPrograms: z
        .string()
        .transform(programs => programs.split(',').map(program => program.trim()))
        .transform(programs => programs.length === 1 && programs[0] === '' ? [] : programs)
});

/**
 * @param { UpdateModal } modal
 * @param { string } memberID
 */
const updateMemberAsync = async (modal, memberID) =>
{
    // const name = undefinedIfDefault(modal.name);
    // const adminNumber = undefinedIfDefault(modal.adminNumber);
    // let gymPrograms = undefinedIfDefault(modal.gymPrograms);
    //
    // if (gymPrograms !== undefined)
    // {
    //     gymPrograms = gymPrograms.split(',').map(program => program.trim());
    //
    //     if (gymPrograms.length === 1 && gymPrograms[0] === TEXT_INPUT_DEFAULT_VALUE)
    //     {
    //         gymPrograms = [];
    //     }
    // }

    const parseResult = await updateMemberModalSchema.safeParseAsync(
    {
        name: modal.name,
        adminNumber: modal.adminNumber,
        gymPrograms: modal.gymPrograms
    });

    if (!parseResult.success)
    {
        modal.errorMessage = errorsToText(parseResult.error.errors);
        return;
    }

    /**
     * @type { Response }
     */

    let response;

    try
    {
        response = await fetch(
            `${Endpoints.MEMBER_UPDATE_ENDPOINT}/${memberID}`,
            constructPUT(
                MemberDTO.fromSchema(parseResult.data)
            )
        );
    }

    catch (error)
    {
        console.error(error);
        response.ok = false;
    }

    const responseJSON = await response.json();

    if (!response.ok)
    {
        /**
         * @type { ErrorDTO }
         */
        responseJSON;

        // TODO: Improve this to be specific to the input field.
        modal.message = errorsToText(responseJSON.errors);

        return;
    }

    modal.show(false);

    await onLoadAsync();
}