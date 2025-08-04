# Google Form Setup Instructions

## Step 1: Create Google Form
1. Go to [forms.google.com](https://forms.google.com)
2. Click "Blank" to create new form
3. Title: "Queen City Surface Coatings - Quote Request"

## Step 2: Add These Exact Fields
1. **First Name** (Short answer, Required)
2. **Last Name** (Short answer, Required)
3. **Email Address** (Short answer, Required)
4. **Phone Number** (Short answer, Required)
5. **Project Details** (Paragraph, Required)

## Step 3: Get Form ID
1. Click "Send" button in top right
2. Click the link icon (🔗)
3. Copy the URL - it looks like:
   `https://docs.google.com/forms/d/1BxIxabc123def456ghi789jkl/viewform`
4. The Form ID is the part between `/d/` and `/viewform`:
   `1BxIxabc123def456ghi789jkl`

## Step 4: Get Entry IDs
1. Go to your form and click "Responses" tab
2. Click the Google Sheets icon to create a spreadsheet
3. In a new tab, open the form as if you're filling it out:
   `https://docs.google.com/forms/d/YOUR_FORM_ID/viewform`
4. Right-click and "View Page Source"
5. Search for "entry." - you'll find lines like:
   - `name="entry.123456789"` (First Name)
   - `name="entry.987654321"` (Last Name)
   - `name="entry.555666777"` (Email)
   - `name="entry.888999000"` (Phone)
   - `name="entry.444555666"` (Project Details)

## Step 5: Update QuoteRequestForm.astro
Replace these values in the form:
- `YOUR_GOOGLE_FORM_ID` → Your actual form ID
- `FIRST_NAME_ENTRY_ID` → entry ID for first name
- `LAST_NAME_ENTRY_ID` → entry ID for last name
- `EMAIL_ENTRY_ID` → entry ID for email
- `PHONE_ENTRY_ID` → entry ID for phone
- `PROJECT_DETAILS_ENTRY_ID` → entry ID for project details

## Example:
```astro
<form class="quote-form" action="https://docs.google.com/forms/d/e/1BxIxabc123def456ghi789jkl/formResponse" method="POST" target="hidden_iframe" onsubmit="submitted=true;">
```

```astro
<FormInput
    type="text"
    label="First Name *"
    id="firstName"
    name="entry.123456789"
    required
/>
```