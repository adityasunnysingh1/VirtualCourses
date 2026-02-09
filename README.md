# 🎓 VirtualCourses
> **A production-grade LMS featuring AI-powered search and cryptographically secure payments.**

![Project Banner](public/VC.png) 
### 🌐 [Live Demo](#) | 🔌 [Backend API](#)

---

## 📖 The Story
I built **VirtualCourses** because I wanted to move beyond simple CRUD apps. I wanted to understand the "messy" parts of real-world software: handling money securely, managing complex global state, and integrating modern AI.

This isn't just a clone. It's a fully functional platform where educators can publish content and students can learn without friction. I focused heavily on security (JWT & Razorpay verification) and UX (AI Search & Redux), ensuring the app feels as solid as it looks.

---

## ⚡ Under the Hood (Key Highlights)

### 🤖 AI-Powered Search (Google Gemini)
Standard regex search wasn't enough. I integrated the **Gemini API** to handle natural language queries.
* **The Win:** Users can search for *concepts* (e.g., "how to build a backend") and find relevant courses even if the exact keyword isn't in the title.

### 🛡️ Secure Payment Handshake (Razorpay)
I didn't trust the frontend with money.
* **The Logic:** Orders are generated on the server (`orderController.js`). Course access is only granted *after* the backend cryptographically verifies the payment signature from Razorpay. Zero chance of client-side price tampering.

### 🔐 Role-Based Security (JWT)
* **Custom Middleware:** I wrote a `verifyJWT` middleware that sits between the user and sensitive routes. It strictly segregates `Student` and `Educator` capabilities, ensuring educators can't accidentally be treated as students (and vice versa).

### ☁️ Optimized Media Pipeline
* **Tech:** Multer + Cloudinary.
* **The Win:** Video lectures are uploaded in chunks and served via CDN, ensuring fast load times even on slower networks.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, **Redux Toolkit** |
| **Backend** | Node.js, Express.js, **JWT** (Auth) |
| **Database** | MongoDB (Mongoose Schema Design) |
| **Services** | **Razorpay** (Payments), **Google Gemini** (AI), **Cloudinary** (Media) |

---

## 🚀 Quick Start

Want to see the code in action?

1.  **Clone & Install**
    ```bash
    git clone [https://github.com/yourusername/VirtualCourses.git](https://github.com/yourusername/VirtualCourses.git)
    cd Backend && npm install
    cd ../Frontend && npm install
    ```

2.  **Environment Secrets**
    Create a `.env` in `Backend/` with your keys:
    ```env
    MONGO_URI=your_mongo_url
    RAZORPAY_KEY_ID=your_test_key
    RAZORPAY_KEY_SECRET=your_test_secret
    GEMINI_API_KEY=your_ai_key
    ```

3.  **Run Locally**
    ```bash
    # Run backend (Port 5000)
    cd Backend && npm run dev
    # Run frontend (Port 5173)
    cd Frontend && npm run dev
    ```

---

