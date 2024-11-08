import { constructGET } from "./helpers/RequestHelpers.mjs";
import { Endpoints } from "./Endpoints.mjs";
import { ElementCollection } from "./ElementCollection.mjs";

const onLoad = async () =>
{
    const response = await fetch(
        Endpoints.MEMBER_GET_ENDPOINT,
        constructGET()
    );

    let memberListElement = ElementCollection.getMemberListContainer();

    if (!response.ok)
    {
        memberListElement.innerText = "Failed to fetch members!";
        return;
    }

    // Clear the member list, we use this function for reloading as well.
    memberListElement.innerText = "";

    /**
     * @type { MemberDTO[] }
     */
    const members = (await response.json()).members;

    const memberListPaddedElement = document.createElement("div");
    memberListPaddedElement.classList.add("container");
    memberListElement.appendChild(memberListPaddedElement);

    for (const member of members)
    {
        // https://getbootstrap.com/docs/4.1/components/card/

        const cardElement = document.createElement("div");
        // mb-3 is for bottom margin
        cardElement.classList.add("card", "mb-3");
        memberListPaddedElement.appendChild(cardElement);

        const cardHeaderElement = document.createElement("div");
        cardHeaderElement.classList.add("card-header");
        cardHeaderElement.innerText = member.name;
        cardElement.appendChild(cardHeaderElement);

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

        if (member.gymPrograms.length !== 0)
        {
            const gymProgramsTitleElement = document.createElement("h5");
            gymProgramsTitleElement.classList.add("card-title");
            gymProgramsTitleElement.innerText = "Gym Programs";
            cardBodyElement.appendChild(gymProgramsTitleElement);

            const gymProgramsValueElement = document.createElement("ul");
            gymProgramsValueElement.classList.add("list-group");
            cardBodyElement.appendChild(gymProgramsValueElement);
            gymProgramsValueElement.innerText = member.gymPrograms.join(", ");
        }
    }
}

document.addEventListener("DOMContentLoaded", onLoad);

const updateMember = () =>
{

}

// For modules ( .mjs ), we need to export the function
window.updateMember = updateMember;