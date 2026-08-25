# Production asset and analytics findings

Observed on https://aiforstudents.in/ on 2026-08-25:

The homepage HTML renders and all main text/routes are present, but the hero, study, career and mark images reference `/manus-storage/...` paths. The user reports these requests return HTTP 500:

- `/manus-storage/ai-students-mark_e5155fd0.png`
- `/manus-storage/ai-students-hero_35b0cd1d.png`
- `/manus-storage/ai-students-study_51c9ad49.png`
- `/manus-storage/ai-students-career_6d4310b6.png`

The browser also reports an Umami request returning HTTP 400. The homepage currently exposes the image references in the deployed HTML, confirming that the production build retained Manus storage paths rather than deployable Hostinger/static asset URLs. Favicon and logo are not visible to the user; this requires inspection of client/index.html and the app logo reference.
