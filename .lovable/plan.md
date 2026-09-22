# Dream Team website simplification

## Goal
Restructure the academy website into a cleaner experience focused on current courses, founder information, registration, student feedback, and contact details.

## Changes
- Remove the AI Prompt Studio and other redundant homepage presentation.
- Move all student certificates to a dedicated `/certificates` page, clearly labeled as Prompt Engineering Batch 1.
- Add a navigation link to the certificates page.
- Display approved feedback from the admin-managed feedback collection on the public website in a continuous horizontal moving strip.
- Replace selectable themes with one consistent Cream Light foundation and Deep Ocean accent palette across the public and admin pages.
- Keep registration, feedback submission, course status, and admin functionality unchanged.

## Technical details
- Reuse the existing certificate assets and lightbox/download controls on the new page.
- Reuse the current backend feedback records and approval status; no duplicate content source.
- Remove theme selectors rather than retaining inactive controls.
- Preserve English/Urdu behavior unless theme removal makes a selector section unnecessary.

## Verification
- Check the home page and certificates page at desktop and phone sizes.
- Confirm certificate viewing and download links, navigation, feedback animation, registration form, and admin page rendering.
