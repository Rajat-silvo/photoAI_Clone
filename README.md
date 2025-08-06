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


/ ├── apps/ 
│ ├── backend/      # Backend Express.js app (powered by Bun) 
│ └── web/         # Frontend Next.js app 
│ ├── packages/ 
│   ├── db/          # Prisma schema and database configurations 
│   ├── eslint-config/ # Shared ESLint configurations 
│   ├── tsconfig/    # Shared TypeScript configurations 
│   └── ui/          # Shared React components (using ShadCN) 
│ └── package.json


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

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/photoai-clone.git](https://github.com/your-username/photoai-clone.git)
    cd photoai-clone
    ```

2.  **Install dependencies:**
    From the root of the project, run:
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `apps/server` directory and another one in the `apps/web` directory. Populate them based on the `.env.example` files in each respective directory.

    **`apps/web/.env`:**
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
    CLERK_SECRET_KEY=sk_...
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    ```

    **`apps/server/.env`:**
    ```env
    DATABASE_URL="postgresql://..."
    FAL_AI_KEY="your-fal-ai-key"
    CLOUDFLARE_R2_ACCESS_KEY_ID="..."
    CLOUDFLARE_R2_SECRET_ACCESS_KEY="..."
    CLOUDFLARE_R2_BUCKET_NAME="..."
    CLOUDFLARE_R2_ACCOUNT_ID="..."
    CLOUDFLARE_R2_PUBLIC_URL="https://your-public-r2-url"
    ```

4.  **Push the database schema:**
    Make sure your PostgreSQL database is running, then run the following command from the root to apply the schema:
    ```bash
    pnpm db:push
    ```

5.  **Run the development servers:**
    This command will start both the frontend and backend applications concurrently.
    ```bash
    pnpm dev
    ```

    * The Next.js frontend will be available at `http://localhost:3000`.
    * The Express.js backend will be available at `http://localhost:8000`.

---

## 🚀 Deployment

The application is deployed to two separate services:

* **Frontend (`apps/web`):** Deployed on **[Vercel](https://vercel.com/)**. Vercel provides seamless integration with Next.js for optimal performance and CI/CD.
* **Backend (`apps/backend`):** Deployed on **[Render](https://render.com/)**. Render is used to host the Express.js backend server and the PostgreSQL database.

---

