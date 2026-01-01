# 🎓 VirtualCourses: Next-Gen LMS with AI & Secure Payments

![Project Banner](public/VC.png) 
> **Live Demo:** [Insert Link Here]  |  **Backend API:** [Insert Link Here]

---

## 🚀 The Elevator Pitch
**VirtualCourses** is more than just a place to watch videos—it's a production-grade Learning Management System (LMS) engineered to handle the full lifecycle of online education. 

I built this project to challenge myself with real-world integrations. Instead of simple CRUD, I tackled **AI-powered content discovery** (using Gemini), **cryptographically secure payments** (Razorpay), and **complex state management** (Redux Toolkit). It bridges the gap between instructors who need powerful publishing tools and students who demand a seamless learning experience.

---

## ⚡ Key Engineering Highlights
* **🤖 AI-Powered Search Engine:**
   - **The Problem:** Traditional regex search fails when users search by "intent" rather than exact keywords.
   - **The Solution:** Integrated **Google Gemini API** (`searchController.js`) to process natural language queries, allowing users to find courses based on context and relevance, not just string matching.

* **🛡️ Bulletproof Payment Architecture:**
   - **The Challenge:** Preventing client-side manipulation of course prices.
   - **The Implementation:** Utilized a **Razorpay Order-Id verification system**. Transactions are initiated on the server (`orderController.js`), and access is only granted after verifying the cryptographic signature returned by the payment gateway.

* **☁️ Media Streaming & Optimization:**
   - Built a scalable pipeline using **Multer** and **Cloudinary**. Video lectures are uploaded in chunks to prevent server timeouts, and assets are served via CDN for low-latency playback.

* **🔐 JWT & Role-Based Security:**
   - Custom middleware (`isAuth.js`) manages secure cookie extraction and verifies tokens. Protected routes distinguish between `Student` and `Educator` roles, preventing unauthorized access to sensitive endpoints like `EditProfile` or `UploadCourse`.

---

## 🛠️ The Tech Stack

### **Frontend (Client-Side)**
* **Core:** React.js + Vite (for lightning-fast builds)
* **State Management:** Redux Toolkit (Slices for `User`, `Course`, `Lecture`, `Review`)
* **Styling:** Tailwind CSS (Responsive & Mobile-first)
* **Hooks:** Custom hooks architecture (`useGetAllReviews`, `useGetCreatorCourse`)

### **Backend (Server-Side)**
* **Runtime:** Node.js & Express.js
* **Database:** MongoDB (Mongoose) with relational schemas for efficient querying.
* **Security:** JSON Web Tokens (JWT), Bcrypt, CORS
* **Integrations:** Razorpay (Payments), Cloudinary (Media), Nodemailer (`sendMail.js`)

---

## 📂 Architecture Overview
I structured the project using a clean **MVC (Model-View-Controller)** pattern to ensure scalability.

```text
VirtualCourses/
├── Backend/
│   ├── controllers/   # Business logic (Auth, Order, Search via AI)
│   ├── middleware/    # Security checks (isAuth, Multer)
│   └── models/        # Database Schemas (User, Course, Review)
├── Frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI (Card, ReviewCard)
│   │   ├── pages/       # Full views (SearchWithAi, ViewLectures)
│   │   └── redux/       # Global state slices
