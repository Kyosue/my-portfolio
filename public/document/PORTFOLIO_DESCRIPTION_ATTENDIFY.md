# Attendify — Portfolio & Resume Copy

## Overview

Attendify is a cross-platform (iOS, Android, Web) school attendance and campus presence system built for Pantukan National High School (~3,150 students across 70 sections), enabling QR-based check-in, role-gated administration, live on-campus location awareness, and grade/section attendance reporting. Built with Expo/React Native, TypeScript, Firebase (Auth, Firestore, Storage, Cloud Functions, Hosting), and Leaflet/GeoJSON campus mapping.

## Resume / Portfolio Bullets

- Engineered campus geofencing and live presence on Leaflet + OpenStreetMap with platform-specific rendering (iframe Leaflet on web, WebView-injected Leaflet on native), KML/GeoJSON polygon checks (ray-casting + Haversine), and throttled Firestore location writes (~30s / 12m) plus `expo-task-manager` background GPS so on-campus status stays accurate without spiking battery or read/write cost.
- Built HMAC-signed, versioned QR attendance (`ATDFY1` payloads) with an Admin-only `expo-camera` scanner that records morning/afternoon time-in/out in Firestore—including late cutoffs (7:30 AM / 1:00 PM)—then generates weekday-aware grade/section Excel workbooks with SheetJS (`xlsx`).
- Implemented role-based access (SuperAdmin / Admin / Student) with Expo SecureStore + AsyncStorage session restore, Firestore security rules, and a SuperAdmin-only callable Cloud Function (`deleteAuthUser`) so user deletion and privileges stay enforced server-side—not only in the client UI.
- Delivered school-scale realtime UX with capped Firestore `onSnapshot` presence/location listeners, throttled online/offline sync across AppState and web tab visibility, and role-gated Expo Router navigation that unlocks the shell only after a successful Firestore profile fetch.

## Alternate Shorter Set (3 bullets)

- Built a cross-platform school attendance app (Expo, TypeScript, Firebase) for Pantukan National High School covering QR check-in, campus maps, roles, and Excel reports.
- Designed live campus awareness with Leaflet/GeoJSON geofencing, throttled location/presence writes, and background GPS so staff can see who is online and on campus.
- Shipped RBAC with Firestore rules + Cloud Functions user lifecycle, SecureStore auth restore, and SheetJS attendance exports for grade/section reporting.

## One-Line Tagline (optional)

Cross-platform school attendance for Pantukan NHS — secure QR check-in, live campus geofencing, and automated grade/section reports.
