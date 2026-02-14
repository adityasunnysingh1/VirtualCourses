
# 🎓 VirtualCourses: AI-Powered Immersive Learning Ecosystem

![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge) ![Core](https://img.shields.io/badge/Stack-MERN_Pro-blue?style=for-the-badge) ![Performance](https://img.shields.io/badge/Performance-Redis_Caching-red?style=for-the-badge) ![AI](https://img.shields.io/badge/AI-Gemini_3_Flash-violet?style=for-the-badge) ![3D](https://img.shields.io/badge/UX-Three.js_3D-orange?style=for-the-badge)

> **🚀 More than an LMS.** VirtualCourses is a distributed, high-performance educational platform that redefines online learning by merging **Generative AI assistance**, **Redis-powered caching**, **Real-time collaboration**, and **3D immersive experiences** into a single, scalable architecture.

🔗 **Live Deployment:** [https://virtual-courses-frontend.vercel.app/](https://virtual-courses-frontend.vercel.app/) | 🔌 **Backend API:** [https://virtualcourses-ize6.onrender.com/](https://virtualcourses-ize6.onrender.com/)

---

## ⚡ **System Architecture & Engineering Highlights**

This project was engineered to solve specific challenges in scalability, latency, and user engagement. It is not just a CRUD app; it is a complex system integration.

### **1. 🤖 Multimodal RAG & Semantic Search Architecture**
* **The Engineering Challenge:** Video content is **"dark data"** opaque to standard indexing, and traditional regex search fails to bridge the **"semantic gap"** between vague user intent and strict database schemas.
* **The Solution:** Architected a **Dual-Layer Generative AI Pipeline** using **Google Gemini 3 Flash**:
    * **Video-to-Text RAG:** Built an ingestion pipeline that generates timestamped transcripts from raw video buffers, enabling a **"Context-Aware QA Engine"** where students can "chat" with lecture content.
    * **Semantic Query Expansion:** Replaced rigid keyword matching with an intent analysis layer that maps natural language (e.g., *"I want to build APIs"*) to precise database taxonomy for high-precision retrieval.
      
### **2. 🚀 Latency Optimization (Redis Caching)**
* **The Problem:** Repeated database queries for static content (Course Categories, Top Instructors) caused unnecessary MongoDB load.
* **The Solution:** Implemented a **Cache-Aside Strategy** using **Upstash Serverless Redis** (via the `ioredis` client).
    * **Impact:** Reduced Time-to-First-Byte (TTFB) by **~400ms** for public pages.
    * **Strategy:** Data is cached with a 1-hour TTL and invalidated immediately upon admin updates.

### **3. 🛡️ Financial Security (Cryptographic Webhooks)**
* **The Tech:** **Razorpay** + **HMAC-SHA256**.
* **The Security:** To prevent "Client-Side Manipulation" (where a user might try to fake a success response), the system relies purely on **Server-to-Server Webhooks**.
* **Verification:** The backend cryptographically verifies the webhook signature before granting course access, ensuring a **Zero-Trust** environment.

### **4. 📹 Real-Time Collaboration Suite**
* **Video:** Integrated **ZegoCloud UIKit** for low-latency, peer-to-peer (P2P) video conferencing for live classes.
* **Chat:** Custom **Socket.io** server handling bi-directional events for instant doubt resolution and class announcements.

### **5. 🧊 Immersive 3D User Experience (Three.js & OGL)**
* **The Engineering:** Unlike flat, 2D interfaces, VirtualCourses leverages **WebGL** via **Three.js** and **React Three Fiber**.
* **The Result:** A GPU-accelerated landing experience featuring interactive 3D elements that respond to cursor movement and scroll depth, powered by **GSAP** and **Framer Motion** for buttery-smooth performance (60 FPS).

### **6. 🚀 Streaming & State — Optimized and Scalable**
* **Implemented:** chunked uploads using **Multer** + **Cloudinary** with automatic adaptive-bitrate transcoding (HLS/DASH) and CDN delivery for smooth playback on low-bandwidth networks.
* **State:** centralized global store with **Redux Toolkit**; async logic via Thunks and session/cart persistence with **redux-persist** to avoid redundant fetches.
* **Impact:** lower buffering, reduced bandwidth/storage overhead, and predictable state across complex flows (Auth, Cart, Course Player, Instructor Dashboard).

---

## 🛠️ **Complete Tech Stack**

### **Frontend: The Immersive Client**
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `v19.2.0` | **Latest Stable.** Leveraging new Concurrent Mode features. |
| **Vite** | `v7.2.4` | Ultra-fast build tool with HMR. |
| **Tailwind CSS** | `v4.1.17` | **Bleeding Edge.** Utility-first styling engine. |
| **Three.js / R3F** | `v0.182.0` | Rendering complex 3D scenes and geometries. |
| **GSAP / Framer** | `v3.14` | Complex timeline-based animations and layout transitions. |
| **Redux Toolkit** | `v2.x` | Global state (Auth, Cart, Course Player). |
| **Recharts** | `v3.6.0` | Visualizing instructor revenue and student progress data. |
| **Lucide React** | `v0.563` | Lightweight, consistent iconography. |

### **Backend: The Scalable Server**
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `v20+` | JavaScript runtime environment. |
| **Express.js** | `v5.1.0` | **Next-Gen Framework.** Improved routing and error handling. |
| **MongoDB** | `v9.0.0` | **Latest Driver.** NoSQL database for flexible course schemas. |
| **Redis (ioredis)** | `v5.9.2` | In-memory key-value store for caching and sessions. |
| **Socket.io** | `v4.8.3` | Real-time event-driven communication. |
| **Google Gemini** | `v0.24` | Generative AI integration. |
| **Razorpay** | `v2.9.6` | Payment gateway and subscription management. |
| **Cloudinary** | `v2.8.0` | CDNs for optimizing and serving video lectures. |
| **Nodemailer** | `v7.0.11` | Transactional emails (OTP, Welcome, Receipts). |

---

## ⚙️ **Installation & Environment Setup**

### **Prerequisites**
* Node.js v18+ installed.
* MongoDB Atlas Account (or local instance).
* Redis Server running (or use Railway/Upstash).

### **1. Clone the Repository**
```bash
git clone [https://github.com/adityasunnysingh1/VirtualCourses.git](https://github.com/adityasunnysingh1/VirtualCourses.git)
cd VirtualCourses

```

### **2. Install Dependencies**

**Backend:**

```bash
cd Backend
npm install

```

**Frontend:**

```bash
cd ../Frontend
npm install

```

### **3. Environment Configuration (`.env`) 🔐**

You must configure **two** `.env` files with your specific API keys.

#### **📂 Backend (`/Backend/.env`)**

```env
# Server Configuration
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/VirtualCourses

# Authentication
JWT_SECRET=your_super_complex_secret_key

# Caching (Redis)
REDIS_URL=redis://localhost:6379

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Media Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI Service (Google Gemini)
GEMINI_API_KEY=your_gemini_api_key

# Email Service (SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

```

#### **📂 Frontend (`/Frontend/.env`)**

```env
# API Endpoint
VITE_SERVER_URL=http://localhost:5000/api

# Payment Integration
VITE_RAZORPAY_KEY_ID=rzp_test_...

# Real-Time Video (ZegoCloud)
VITE_ZEGO_APP_ID=your_app_id
VITE_ZEGO_SERVER_SECRET=your_server_secret

# Firebase Services
VITE_FIREBASE_APIKEY=your_firebase_key

```

### **4. Launch the System**

**Terminal 1 (Backend):**

```bash
cd Backend
npm run dev
# Server connects to MongoDB & Redis...

```

**Terminal 2 (Frontend):**

```bash
cd Frontend
npm run dev
# Client runs on localhost:5173

```

---

## 📈 **Key Features Overview**

* **Authentication:** Secure Login/Signup with **OTP Verification** (Nodemailer) and **JWT** (HTTP-Only Cookies).
* **Instructor Dashboard:** Create courses, upload videos (chunked upload via Multer), and view earnings graphs (**Recharts**).
* **Student Learning:** Progress tracking, course wishlist, and cart management via **Redux**.
* **Review System:** Students can rate and review courses; data is validated using `validator`.

---

## 🤝 Contributing

**We welcome contributions!** whether it's a bug fix, feature request, or documentation improvement. Please follow the standard engineering workflow:

1. **Fork** the repository.
2. Create a **Feature Branch** (`git checkout -b feature/NewFeature`).
3. **Commit** your changes (`git commit -m 'Add some NewFeature'`).
4. **Push** to the branch (`git push origin feature/NewFeature`).
5. Open a **Pull Request**.

> 💡 *Note: For major architectural changes, please open an issue first to discuss the approach.*

---

## 📬 Author & System Architect

<div align="center">

### **Aditya Singh**
**Full Stack Engineer specialized in Distributed Systems & MERN Architecture.**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/adityasunnysingh) [![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/adityasunnysingh1)

<br />

<sub>© 2025 VirtualCourses. Architected with the **MERN Stack** & **Redis** by Aditya Singh.</sub>

</div>
```

```
