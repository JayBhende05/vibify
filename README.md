# Vibify 🎵

A collaborative real-time music streaming platform where users can create rooms, join shared music sessions, upload songs, and control playback through community voting.

---

## 🚀 Overview

Vibify is a modern collaborative music room application built to create an interactive shared listening experience.
Users can create or join music rooms, upload songs, vote on tracks, and enjoy synchronized playback with other participants in real time.

The platform focuses on community-driven music streaming where the queue is dynamically managed based on user upvotes and downvotes.

---

## ✨ Features

### 🔐 Authentication

* Secure user authentication using **NextAuth**
* Sign in using credentials-based authentication
* Session management and protected routes

### 🏠 Homepage

* Modern landing page with application overview
* “Get Started” flow routing users directly to authentication

### 📊 Dashboard

After signing in, users can access their personalized dashboard containing:

* Rooms created by the user
* Rooms joined by the user
* Previously streamed/uploaded songs
* Quick navigation to room management features

### 🎧 Music Rooms

Users can:

* Create new music rooms
* Join existing rooms
* Collaborate with other users in real-time

### 👑 Host Controls

Room hosts have additional permissions such as:

* Play songs from the queue
* Delete songs from the playlist
* Manage room music flow

### 📤 Song Upload System

* Users can upload songs to the room queue
* Shared collaborative playlist experience

### 👍 Community Voting System

All users in a room can:

* Upvote songs
* Downvote songs

Songs with higher votes get prioritized in the playback queue, creating a community-driven music experience.

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL

### Authentication

* NextAuth.js

### Validation & Utilities

* Zod

---

## ⚙️ Application Flow

1. User lands on the homepage
2. Clicks on **Get Started**
3. Redirected to Sign In page
4. Authenticates using credentials or NextAuth providers
5. Accesses personalized dashboard
6. Creates or joins a room
7. Uploads songs and interacts with the queue
8. Users vote on songs
9. Songs are played based on community voting priority

---

## 📌 Core Functionalities

* Real-time collaborative music rooms
* Authentication & authorization
* Dynamic song queue management
* Role-based room controls
* Interactive voting mechanism
* User-centric dashboard experience

---

## 🔮 Future Enhancements

* Real-time socket integration
* Live chat inside rooms
* Spotify/YouTube API integration
* Queue synchronization improvements
* Music recommendations using AI
* Friend system and invitations
* Room privacy settings

---

## 📷 Project Preview

*Add screenshots or GIFs here*

---

## 🧑‍💻 Author

Developed by **Jay Bhende** using modern full-stack technologies and collaborative streaming concepts.
