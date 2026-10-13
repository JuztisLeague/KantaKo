# KantaKo 🎤

**Your videoke night, on your phone.**

KantaKo is a web app for karaoke nights with friends and family. One person hosts a room on a laptop or TV, and everyone else joins from their own phone to pick songs and add them to a shared queue. The name comes from the Filipino _"kanta ko"_ ("my song"), and the app is inspired by the _videoke_ culture found in Filipino homes, fiestas, and birthdays.

> 🚧 **Status: in development.** This is a learning project built step by step. See the roadmap below for what works today and what is coming.

## How it will work

1. The host creates a room and gets a short room code.
2. Guests join the room using the code (later, by scanning a QR code).
3. Guests search for karaoke songs on YouTube and add them to the queue.
4. The host screen plays the queue in order, using YouTube's official embedded player.

## Tech stack

| Area            | Technology                                          |
| --------------- | --------------------------------------------------- |
| Frontend        | React (JavaScript) with Vite                        |
| Routing         | React Router                                        |
| Styling         | Plain CSS (CSS variables, Flexbox, media queries)   |
| Icons           | lucide-react                                        |
| Version control | Git and GitHub (feature branches and pull requests) |

**Planned:** Node.js and Express backend, YouTube Data API v3 for search, YouTube IFrame Player API for playback, `qrcode.react` for QR codes, and WebSockets (or polling) for real-time queue updates.

## Features

**Done**

- Home page with Create Room and Join Room forms
- Input validation (empty names and codes, case-insensitive code matching)
- Mobile-friendly responsive layout, tested on a real phone
- Client-side routing with a dynamic room page at `/room/:roomId`
  **In progress**
- Random room code generation
- Navigating to the room page after creating or joining a room
  **Planned**
- Backend for storing rooms and queues
- YouTube karaoke search
- Song queue and embedded player
- Guest page and QR code for joining
- Real-time queue updates
- Favorites and history
