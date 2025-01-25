# VoiceScribe - Audio Transcription Service

## Implemented Features
- Landing page (EN/IT)
- Dark/light theme
- Contact form with Firebase storage
- Responsive design
- Framer Motion animations

## TODO
- Admin dashboard
  - Login page
  - Form submissions view
  - Firebase auth setup
- i18n setup
- Analytics
- SEO optimization
- Images optimization
- Testing

## Tech Stack
```
Frontend: Next.js 13.5.1, TypeScript, Tailwind CSS, Shadcn/UI
Backend: Firebase (Firestore)
Authentication: Firebase Auth (pending)
```

## Project Structure
```
app/
├── page.tsx         # EN homepage
├── it/             # IT routes
├── admin/          # To be implemented
└── components/     # UI components
```

## Setup
```bash
npm install
npm run dev
```

Required env vars:
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
```
