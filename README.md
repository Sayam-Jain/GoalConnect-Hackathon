# Manipal Hackathon 2024 README Template

**Team Name:** `<Goal Connect>`

**Problem Statement:** In the rapidly evolving landscape of football in India, there is a growing demand for a comprehensive platform that enhances player performance tracking, fan engagement, and event management. The challenge is to develop a real-world solution that integrates real-time data analytics, interactive fan features, and an e-commerce component, all specifically tailored to the Indian football ecosystem. A multi-functional football portal should be developed to provide an immersive experience, including detailed player profiles, live match updates, virtual meetups, a football shop, and additional features. The solution must incorporate elements that reflect the unique culture of Indian football while ensuring seamless user interaction and engagement.

## 📜 Introduction

Our project allows users to see real-time match statistics. We have utilised web sockets to integrate a live match chat, JSON web tokens for login authentication, and razorpay payment integration for e-commerce and crowdfunding.

## ✨ Features

Website:

- Live chat discussion
- Real time match data
- Browse clubs
- Search tournaments nearby
- Login / Register as a user, club, sponsor, playe

## 🟢 Access

🌐 Website link: https://goal-connect-nu.vercel.app/

## 📦 Instructions For Local Deployment With Docker (Optional)

To deploy the application locally using docker, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/MadScientistt4/Goal-Connect.git
   ```

1. Build the docker image

   ```bash
   sudo docker build -t hackathon .
   ```

1. Start a container using the built image and expose necessary ports

   ```bash
   sudo docker run -it --rm -p 3000:3000 hackathon
   ```

1. Access the application at http://localhost:3000

## ⚙️ Instructions For Local Deployment Without Docker

```
Python version: 3.10

Operating system: Ubuntu 22
```

Follow these steps to run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-team-repo/manipal-hackathon-2024.git
   cd manipal-hackathon-2024
   ```

1. Install dependencies

   ```bash
   npm install
   ```

1. Start server

   ```bash
   npm run start
   ```

1. Access the Frontend at http://localhost:3000
2. Run the backend at http://localhost:5000
