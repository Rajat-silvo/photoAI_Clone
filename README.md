# PhotoAI Clone 📸✨

This project is a full-stack clone of PhotoAI, a platform where users can train a personalized AI model on their own images. Once the model is trained, users can generate new, high-quality images of themselves in various styles and themes using simple text prompts or pre-defined image packs.

---

## 🚀 Key Features

* **Custom AI Model Training:** Users can upload a set of their photos (conveniently packaged in a `.zip` file) to train a unique image generation model.
* **Personalized Image Generation:** Generate images with your face by providing a descriptive text prompt.
* **Themed Image Packs:** Create batches of images based on exciting, pre-defined themes like "Valentine's Day" or "Millionaire."
* **Secure Authentication:** User management and authentication handled securely by Clerk.
* **Scalable File Storage:** All user-uploaded images and generated content are stored reliably on Cloudflare R2.
* **Monorepo Architecture:** Built with Turborepo for efficient management of the frontend and backend codebases.

---

## 🛠️ Tech Stack

This project leverages a modern, powerful, and scalable tech stack.

| Area                  | Technology / Service                                                              |
| --------------------- | --------------------------------------------------------------------------------- |
| **Monorepo** | [Turborepo](https://turbo.build/repo)                                             |
| **Frontend** | [Next.js](https://nextjs.org/), [React](https://react.dev/)                        |
| **Backend** | [Bun](https://bun.sh/), [Express.js](https://expressjs.com/)                       |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/), [ShadCN/UI](https://ui.shadcn.com/)      |
| **Database** | [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/) |
| **AI Image Generation** | [Fal.AI](https://fal.ai/)                                                         |
| **Authentication** | [Clerk](https://clerk.com/)                                                       |
| **File Storage** | [Cloudflare R2](https://www.cloudflare.com/products/r2/)                          |
| **Libraries** | [JSZip](https://stuk.github.io/jszip/)                                            |
| **Deployment** | Frontend on [Vercel](https://vercel.com/), Backend on [Render](https://render.com/) |

---

## 📂 Project Structure

This project is a monorepo managed by Turborepo. The codebase is organized into `apps` and `packages`.

* **`apps/web`**: The main user-facing Next.js application.
* **`apps/backend`**: The backend API built with Express and running on the Bun runtime. It handles API requests, database interactions, and communication with the Fal.AI service.
* **`packages/db`**: Contains the Prisma schema, client, and any database-related utilities. It's shared between the `server` and potentially the `web` app if needed.
* **`packages/ui`**: A collection of shared UI components built with ShadCN/UI, ensuring a consistent look and feel across the application.

---

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/en) (v18 or later)
* [Bun](https://bun.sh/)
* [pnpm](https://pnpm.io/) (or your preferred package manager)
* Access keys for Clerk, Cloudflare R2, Fal.AI, and Postgres database URL.

---

## 🚀 Deployment

The application is deployed to two separate services:

* **Frontend (`apps/web`):** Deployed on **[Vercel](https://vercel.com/)**. Vercel provides seamless integration with Next.js for optimal performance and CI/CD.
* **Backend (`apps/backend`):** Deployed on **[Render](https://render.com/)**. Render is used to host the Express.js backend server and the PostgreSQL database.

---

