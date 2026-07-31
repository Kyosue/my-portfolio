# Vetra — Portfolio & Resume Copy

## Overview

Vetra is an offline-first point-of-sale (POS) mobile app for small retailers and service businesses, letting owners run inventory, checkout, and sales reporting without relying on cloud connectivity. Built with Expo/React Native, TypeScript, Expo Router, and expo-sqlite local persistence, with AsyncStorage sessions, receipt capture, and on-device PDF report generation.

## Resume / Portfolio Bullets

- Architected an offline-first POS data layer on expo-sqlite (`products`, `sales`, `users`, `business_profiles`) with transactional sale writes that decrement stock and reject under-stocked checkouts, so merchants can keep selling when internet is unavailable.
- Built a cart-driven checkout flow with category filters, search/sort, and multi-item cart state, then captured receipts via react-native-view-shot + expo-file-system/MediaLibrary/Sharing so staff can save or share PNG receipts from the device.
- Implemented local auth and business onboarding (SQLite user validation + AsyncStorage session) with field-level validation for retail profiles (business type, contact, credentials), enabling fully device-side registration and login.
- Delivered sales analytics (daily/weekly/monthly totals, low-stock and out-of-stock counts) and HTML-to-PDF export through expo-print, with Android Downloads album persistence and iOS share-sheet handoff for printable business reports.

## Alternate Shorter Set (3 bullets)

- Built an offline POS app (Expo, TypeScript, expo-sqlite) covering inventory, checkout, receipts, and sales PDF reports for small businesses.
- Designed transactional SQLite sales that update stock atomically and surface low-stock alerts (≤5 units) on the home dashboard.
- Shipped receipt PNG capture/share and expo-print PDF reporting with MediaLibrary/Sharing so owners export sales data without a backend.

## One-Line Tagline (optional)

Offline-first POS for small businesses — SQLite inventory & sales, on-device receipts, and printable reports with no cloud required.
