export class ModalInput
{
    /**
     * @type { string }
     * @public
     */
    label;

    /**
     * @type { string }
     * @public
     */
    placeholder;

    /**
     * @type { boolean }
     * @public
     */
    required;

    /**
     * @type { HTMLInputElement | null }
     * @public
     */
    valueElement;

    constructor({ label, placeholder, required })
    {
        this.label = label;
        this.placeholder = placeholder;
        this.required = required;
        this.valueElement = null;
    }
}

export class Modal
{
    /**
     * @type { HTMLDivElement }
     * @private
     */
    modalElement;

    /**
     * @type { HTMLHeadingElement }
     * @private
     */
    titleElement;

    /**
     * @type { HTMLFormElement }
     * @private
     */
    formElement;

    /**
     * @type { HTMLParagraphElement }
     * @private
     */
    modalMessageElement;

    /**
     * @type { HTMLButtonElement }
     * @private
     */
    actionButtonElement;

    /**
     * @type { (Modal) => void }
     * @public
     */
    actionButtonCallback;

    constructor()
    {
        let modalElement = this.modalElement = document.createElement("div");
        modalElement.className = "modal fade";
        modalElement.setAttribute("tabindex", "-1");
        modalElement.setAttribute("role", "dialog");
        modalElement.setAttribute("aria-labelledby", "member-update-modal-label");
        modalElement.setAttribute("aria-hidden", "true");

        const modalDialogElement = document.createElement("div");
        modalDialogElement.className = "modal-dialog";
        modalDialogElement.setAttribute("role", "document");
        modalElement.appendChild(modalDialogElement);

        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        modalDialogElement.appendChild(modalContent);

        // Header
        const modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";
        modalContent.appendChild(modalHeader);

        const titleElement = this.titleElement = document.createElement("h5");
        titleElement.className = "modal-title";
        modalHeader.appendChild(titleElement);

        const closeButtonElement = document.createElement("button");
        closeButtonElement.type = "button";
        closeButtonElement.className = "close";
        closeButtonElement.setAttribute("data-dismiss", "modal");
        closeButtonElement.setAttribute("aria-label", "Close");
        modalHeader.appendChild(closeButtonElement);

        const closeSpanElement = document.createElement("span");
        closeSpanElement.setAttribute("aria-hidden", "true");
        closeSpanElement.textContent = '×';
        closeButtonElement.appendChild(closeSpanElement);

        // Body
        const modalBodyElement = document.createElement("div");
        modalBodyElement.className = "modal-body";
        modalContent.appendChild(modalBodyElement);

        const form = this.formElement = document.createElement("form");
        modalBodyElement.appendChild(form);

        const modalMessageElement = this.modalMessageElement = document.createElement('p');
        modalMessageElement.className = "text-right";
        form.appendChild(modalMessageElement);

        // Footer
        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer";
        modalContent.appendChild(modalFooter);

        const closeModalButtonElement = document.createElement("button");
        closeModalButtonElement.type = "button";
        closeModalButtonElement.className = "btn btn-secondary";
        closeModalButtonElement.setAttribute("data-dismiss", "modal");
        closeModalButtonElement.textContent = "Close";
        modalFooter.appendChild(closeModalButtonElement);

        const actionButtonElement = this.actionButtonElement = document.createElement("button");
        actionButtonElement.type = "button";
        actionButtonElement.className = "btn btn-primary";
        // () => is intentional - This is so that if we update the callback, it will be reflected in the button
        actionButtonElement.onclick = () => this.actionButtonCallback(this);
        modalFooter.appendChild(actionButtonElement);

        document.body.appendChild(modalElement);
    }

    /**
     * @param { ModalInput } input
     * @returns { ModalInput }
     */
    addInput(input)
    {
        const formGroupElement = document.createElement('div');
        formGroupElement.className = 'form-group';
        this.formElement.appendChild(formGroupElement);

        const labelElement = document.createElement('label');
        labelElement.textContent = input.label;
        formGroupElement.appendChild(labelElement);

        const valueElement = document.createElement('input');
        valueElement.type = 'text';
        valueElement.className = 'form-control';
        valueElement.placeholder = input.placeholder;
        formGroupElement.appendChild(valueElement);

        if (input.required)
        {
            valueElement.required = true;
        }

        input.valueElement = valueElement;

        return input;
    }

    /**
     * @param { boolean } enable
     */
    show(enable)
    {
        let enableText;

        if (enable)
        {
            enableText = "show";
            this.clearInputValues();
            this.clearMessage();
        }

        else
        {
            enableText = "hide";
        }

        $(this.modalElement).modal(enableText);
    }

    clearInputValues()
    {
        this.formElement.reset();
    }

    clearMessage()
    {
        this.message = '';
    }

    get title()
    {
        return this.titleElement.textContent;
    }

    set title(value)
    {
        this.titleElement.textContent = value;
    }

    get message()
    {
        return this.modalMessageElement.textContent;
    }

    set message(value)
    {
        this.modalMessageElement.textContent = value;
    }

    get actionButtonText()
    {
        return this.actionButtonElement.textContent;
    }

    set actionButtonText(value)
    {
        this.actionButtonElement.textContent = value;
    }
}