# Campus Mobility Platform — Portfolio & Resume Copy

## Overview

GoPass DORSU is a full-stack campus workforce authorization system built for Davao Oriental State University (DOrSU), digitizing pass-slip leave and multi-stage travel-order approval for faculty, program heads, deans, the president’s office, HR, and gate security across multiple campuses. Built with Expo/React Native (mobile + web), TypeScript, Express 5, MongoDB/Mongoose, JWT RBAC, Socket.IO + SSE realtime, Leaflet/GeoJSON geofencing, and QR gate verification.

## Resume / Portfolio Bullets

- Architected a split-client platform (Expo Router mobile for employees/approvers/security; Expo web HR/admin console on Vercel; Express API on Render) with JWT `x-auth-token` auth, bcrypt credentials, Google reCAPTCHA registration, and route-level authorize middleware across nine campus roles so each actor only reaches the workflows their office owns.
- Implemented seconds-based weekly leave accounting (default 120-minute allotment) with MongoDB balance state, Monday `node-cron` resets, HR-time reservation on approval, overlap prevention, early-return credit/overdue debit, auto-return at 5:00 PM ETB, and Asia/Manila server-time sync so timers and ledgers stay consistent when device clocks drift.
- Delivered dual realtime channels—Socket.IO events on mobile and SSE fed by MongoDB Change Streams on web—plus expo-camera QR scan flows that advance slips Approved → Verified → Returned at the gate while reconciling leave balance and broadcasting dashboard updates to HR trackers.
- Enforced city-bounded pass slips with ray-casting point-in-polygon against a Mati City PSGC GeoJSON boundary, OSRM driving routes encoded with `@mapbox/polyline`, Leaflet destination maps, canvas signature capture, Cloudinary travel attachments, and OIC signer delegation so approvals continue when primary officers are on travel.

## Alternate Shorter Set (3 bullets)

- Built a campus pass-slip and travel-order system (Expo, TypeScript, Express, MongoDB) for DOrSU covering multi-role approvals, HR leave tracking, and security gate QR verification.
- Designed weekly leave-balance accounting with cron resets, reservation/credit/debit rules, and Manila server-time sync so short leave stays auditable across campuses.
- Shipped Socket.IO + Change Stream SSE realtime, Mati City GeoJSON geofencing, OIC signing delegation, and PDF/print HTML generation for authorized documents.

## One-Line Tagline (optional)

Campus leave and travel authorization for DOrSU — role-gated approvals, live gate QR scans, and weekly balance accounting with city-bounded geofencing.
