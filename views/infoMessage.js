const BUTTON_NAME = "GOT THAT";

const promptInfoMessage = messageToDisplay => {
    const modalContainer = document.createElement("div");
    modalContainer.id = "formOpenModal";
    modalContainer.classList.add("modalDialog");
    modalContainer.innerHTML = 
        `
            <div>
                <p>${messageToDisplay}<p>
                <a href="#" id="redirectLink"><input type="button" id="hitBtn" value="${BUTTON_NAME}"></a>
            </div>
        `
    document.body.appendChild(modalContainer);
    document.getElementById("hitBtn").addEventListener("click", () => document.getElementById("formOpenModal").remove());
}