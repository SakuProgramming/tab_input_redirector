let redirectionEnabled = false;

function debounceInput(event) {
    if (event.isTrusted && event.originalEvent === undefined && event.key !== "f" && event.key !== "F12") {
        console.log("First tab - Keydown event intercepted and redirected:", event.key);
        if (!redirectionEnabled) return;
        event.preventDefault();
        const nextTab = (document.activeElement.nextElementSibling) ? document.activeElement.nextElementSibling : document.activeElement.parentElement.firstElementChild;
        nextTab.focus();
        nextTab.dispatchEvent(new event.constructor(event.type, event));
    }
}

document.addEventListener("keydown", debounceInput);

function toggleRedirection(event) {
    if (event.key === "f") {
        redirectionEnabled = !redirectionEnabled;
        console.log("Input redirection toggled:", redirectionEnabled);
        if (!redirectionEnabled) {
            console.log("Input redirection disabled");
        } else {
            console.log("Input redirection enabled");
        }
    }
}

document.addEventListener("keydown", toggleRedirection);

window.addEventListener("message", function(event) {
    if (event.origin === "https://gota.io" && event.data) {
        try {
            const inputData = JSON.parse(event.data);
            console.log("Second tab - Input received:", inputData);
        } catch (error) {
            console.log("Second tab - Received data is not in JSON format:", event.data);
        }
    }
});
