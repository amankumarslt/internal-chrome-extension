(function () {
    if (document.readyState !== "complete") {
        window.addEventListener("load", main);
    } else {
        main();
    }

    async function main() {
        try {
            // Get initial user id from URL
            let currentUserId = getUserIdFromUrl();

            // Check for URL changes and reload if user id changes
            setInterval(() => {
                const newUserId = getUserIdFromUrl();
                if (newUserId && newUserId !== currentUserId) {
                    location.reload();
                }
            }, 1000);

            // Try wait for dropdown by ID first
            let dropdownBtn;
            try {
                dropdownBtn = await waitForElementById("nova-ui-dropdown-button-5", 3000);
            } catch {
                // fallback to dusk attribute selector
                dropdownBtn = await waitForElement('[dusk$="control-selector"]', 3000);
            }

            if (!dropdownBtn) throw new Error("Dropdown button not found");

            // Open dropdown
            dropdownBtn.click();
            await delay(300);

            // Check for Assume Identity button inside dropdown
            const assumeBtn = [...document.querySelectorAll("button")].find(
                (btn) =>
                    btn.textContent.trim() === "Assume Identity" &&
                    btn.dataset.actionId === "assume-identity"
            );

            // Close dropdown
            dropdownBtn.click();

            if (assumeBtn) {
                createCustomAssumeIdentityButton();
            } else {
                console.log('"Assume Identity" button not found — custom button will not be shown');
            }
        } catch (err) {
            console.error("Error during initialization:", err);
        }
    }

    function createCustomAssumeIdentityButton() {
        const customBtn = document.createElement("button");
        customBtn.innerText = "Assume Identity";
        customBtn.style.cssText =
            "position: fixed; top: 5em; right: 3em; z-index: 9999; background: #18b68b; color: #1e392b; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;";
        document.body.appendChild(customBtn);

        customBtn.addEventListener("click", async () => {
            try {
                // Try dropdown button again (ID first then dusk)
                let dropdownBtn;
                try {
                    dropdownBtn = await waitForElementById("nova-ui-dropdown-button-5", 3000);
                } catch {
                    dropdownBtn = await waitForElement('[dusk$="control-selector"]', 3000);
                }
                if (!dropdownBtn) throw new Error("Dropdown button not found");
                
                dropdownBtn.click();
                await delay(300);

                // Find and click Assume Identity in dropdown
                const assumeBtn = [...document.querySelectorAll("button")].find(
                    (btn) =>
                        btn.textContent.trim() === "Assume Identity" &&
                        btn.dataset.actionId === "assume-identity"
                );
                if (!assumeBtn) throw new Error('"Assume Identity" button not found');
                assumeBtn.click();

                // Wait for textarea to appear
                await waitForElement("#reason-default-textarea-field", 5000);
                const textarea = document.querySelector("#reason-default-textarea-field");
                textarea.value = "testing";
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
                await delay(300);

                // Find modal form and final Assume Identity submit button
                const modalForm = document.querySelector('form[data-form-unique-id]');
                if (!modalForm) throw new Error("Modal form not found");

                const confirmBtn = modalForm.querySelector('button[type="submit"]');
                if (!confirmBtn || confirmBtn.textContent.trim() !== "Assume Identity") {
                    throw new Error("Final 'Assume Identity' button not found in modal");
                }

                confirmBtn.click();
            } catch (err) {
                alert("Error: " + err.message);
                console.error(err);
            }
        });
    }

    // Helper: wait for element by ID
    function waitForElementById(id, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const interval = 100;
            let elapsed = 0;

            const checkExist = setInterval(() => {
                const el = document.getElementById(id);
                if (el) {
                    clearInterval(checkExist);
                    resolve(el);
                } else if (elapsed >= timeout) {
                    clearInterval(checkExist);
                    reject(new Error(`Element with id #${id} not found after ${timeout}ms`));
                }
                elapsed += interval;
            }, interval);
        });
    }

    // Helper: wait for element by selector
    function waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const interval = 100;
            let elapsed = 0;

            const checkExist = setInterval(() => {
                const el = document.querySelector(selector);
                if (el) {
                    clearInterval(checkExist);
                    resolve(el);
                } else if (elapsed >= timeout) {
                    clearInterval(checkExist);
                    reject(new Error(`Element ${selector} not found after ${timeout}ms`));
                }
                elapsed += interval;
            }, interval);
        });
    }

    // Simple delay helper
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Get user id from URL
    function getUserIdFromUrl() {
        const match = window.location.pathname.match(/\/users\/(\d+)/);
        return match ? match[1] : null;
    }
})();
