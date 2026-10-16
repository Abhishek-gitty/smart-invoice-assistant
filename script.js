
const invoiceText = document.getElementById("invoiceText");
const analyzeBtn = document.getElementById("analyzeBtn");
const status = document.getElementById("status");

const reminderBtn = document.getElementById("reminderBtn");
const reminderText = document.getElementById("reminderText");
const copyBtn = document.getElementById("copyBtn");

analyzeBtn.addEventListener("click", async function () {
    const text = invoiceText.value.trim();

    if (text === "") {
        status.textContent = "Please paste your invoice text first.";
        return;
    }

    analyzeBtn.disabled = true;
    status.textContent = "Analyzing invoice with local AI...";

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                invoice: text
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        status.textContent = data.result;
        reminderBtn.disabled = false;
        copyBtn.disabled = true;

    } catch (error) {
        status.textContent =
            "Error: " + error.message +
            " Check that the local server and Ollama are running.";
    } finally {
        analyzeBtn.disabled = false;
    }
});

reminderBtn.addEventListener("click", function () {
    const invoice = invoiceText.value.trim();

    reminderText.value =
        "Subject: Payment Reminder\n\n" +
        "Dear Client,\n\n" +
        "This is a friendly reminder regarding your invoice.\n\n" +
        invoice +
        "\n\nPlease arrange the payment at your earliest convenience.\n\n" +
        "Thank you.";

    copyBtn.disabled = false;
});

copyBtn.addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(reminderText.value);
        status.textContent = "Payment reminder copied!";
    } catch (error) {
        status.textContent = "Copy failed. Please copy the reminder manually.";
    }
});
