(function () {
    if (document.readyState !== "complete") {
        window.addEventListener("load", main);
    } else {
        main();
    }

    function main() {
        const customBtn = document.createElement("button");
        customBtn.innerText = "Assume Identity";
        customBtn.style.cssText =
            "position: fixed; top: 80px; right: 48px; z-index: 9999; background: #4f46e5; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;";
        document.body.appendChild(customBtn);

        customBtn.addEventListener("click", async () => {
            try {
                // Step 1: Click the dropdown
                const dropdownBtn = document.querySelector('[dusk$="control-selector"]');
                if (!dropdownBtn) throw new Error("Dropdown button not found");
                dropdownBtn.click();
                await delay(300);

                // Step 2: Click "Assume Identity" from dropdown
                const assumeBtn = [...document.querySelectorAll("button")].find(
                    (btn) =>
                        btn.textContent.trim() === "Assume Identity" &&
                        btn.dataset.actionId === "assume-identity"
                );
                if (!assumeBtn) throw new Error('"Assume Identity" button not found');
                assumeBtn.click();

                // Step 3: Wait for the textarea to appear
                await waitForElement("#reason-default-textarea-field", 5000);
                const textarea = document.querySelector("#reason-default-textarea-field");
                textarea.value = "testing";
                textarea.dispatchEvent(new Event("input", { bubbles: true }));
                await delay(300);

                // Step 4: Get modal form, then the correct "Assume Identity" button
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

        function delay(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

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
    }
})();
