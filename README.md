# Frontend Interview Challenge

![ecommerce_github_banner](https://github.com/user-attachments/assets/3018c781-0969-45a1-b8bb-3f638aa4260d)

## Requirements

- You must use Next.js and Tailwind CSS to build the project.

- You may use any additional libraries, **but UI libraries that do not integrate with Tailwind CSS are not allowed.**

- While this is a frontend-focused challenge, you should write backend code if necessary (e.g., for SSR/SSG or handling API requests).

- Deploy the project to a publicly accessible URL.

- Extra features that go beyond the requirements and impress us are encouraged!

## Project Description

This is a minimalistic e-commerce project built using Next.js and Tailwind CSS.

## Task 1: E-Commerce Website

- Build an e-commerce website based on the wireframe provided in the `assets` folder.
- Design the UI and layout freely—do not limit yourself to a specific theme or style.
- Add interactivity: Users must be able to add items to a shopping cart. Each user’s cart should be unique and persist independently (e.g., using local storage, cookies, or a backend solution).
- For inspiration, you can refer to this [website](https://themes.shopify.com/). Feel free to draw ideas from its design or functionality, but do not copy it directly.

## Task 2: Preview and Content Editor

- Create an A/B test settings page that includes a live preview of the e-commerce site from Task 1 (e.g., via an iframe or embedded view).
- Enable users to interact with the preview by clicking on specific UI elements (e.g., buttons, product descriptions) to mark them as areas for A/B testing.
- Implement an A/B test on pricing: Split users into two groups upon visiting the site, with each group seeing different prices for the same products. You may choose the grouping method (e.g., random assignment, cookies, or URL parameters).
- Integrate an LLM (e.g., via an API like OpenAI) to generate A/B test ideas and content variations for the selected areas, including pricing variations for testing.
- Allow users to apply these LLM-generated suggestions (including price changes) directly to the e-commerce site, updating the live preview dynamically.
- Finally, these changes must actually affect the Task 1 website and be reflected when it is accessed.

## Evaluation criteria

#### Requirement Fulfillment

- Does the project fully implement Task 1 and Task 2 as outlined?
- Are there extra features that exceed the requirements?

#### Code Readability

- Are variable and function names meaningful and self-explanatory?
- Is the naming convention consistent (e.g., camelCase, kebab-case)?
- Are comments concise, relevant, and helpful?

#### Code Quality

- Does the project follow Next.js and Tailwind CSS best practices?
- Is the code efficient, modular, and maintainable?
- Are performance optimizations applied effectively?
- Is the styling clean, responsive, and consistent?

#### Code Maintainability

- Does the project adhere to a consistent style guide (e.g., Prettier, ESLint)?
- Is there clear documentation explaining the codebase?

#### Code Performance

- Does the project pass performance tests? (Check using [PageSpeed Insights](https://pagespeed.web.dev/))
- Minimum passing standard: Performance, Accessibility, Best Practices, and SEO must all score 90 or above.

#### Documentation

- Is there a well-structured README file?
- Does it cover setup, usage, and key features?
- Are installation and deployment steps clear?
- Are API endpoints (if any) documented with examples?

#### Communication

- Can you explain your project clearly during a follow-up discussion?
- Are questions or clarifications handled professionally and promptly?

## Submission

Please submit the following to talent@abconvert.io.

1. A public GitHub repository with your project code.
2. A live URL.
3. A demo video showcasing your project

There is no strict deadline for this project; please submit it when you believe it is ready for review.
Good luck :)
