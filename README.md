# Smart Invoice Assistant

A beginner-friendly invoice management tool powered by a local open-source AI model.

## Features

- Extract invoice details using local AI.
- Identify client name, invoice number, amount, currency, and due date.
- Generate professional payment reminder drafts.
- Copy payment reminders with one click.
- Run AI analysis locally using Ollama and Qwen 2.5.
- No external AI API key required.

## Tech Stack

- HTML
- CSS
- JavaScript
- Node.js
- Ollama
- Qwen 2.5 (3B)

## Prerequisites

- Node.js installed
- Ollama installed
- The `qwen2.5:3b` model downloaded

## Run Locally

1. Start Ollama and make sure the model is available:

   ```bash
   ollama run qwen2.5:3b
   ```

2. Open a terminal in the project directory.

3. Start the application:

   ```bash
   node server.js
   ```

4. Open `http://localhost:3000` in your browser.

5. Paste invoice text and click **Analyze Invoice**.

## Privacy

Invoice text is sent to the local Ollama service running on your machine for analysis. Avoid entering real sensitive financial or personal information while testing.

## Current Limitations

- Invoice details are entered as text; PDF upload and OCR are not supported yet.
- Payment reminders are drafts and are not sent automatically.
- Invoice data is not stored in a database.

## Future Improvements

- PDF invoice upload and text extraction
- Invoice history
- Due-date reminders
- Improved validation and error handling

## License

MIT
