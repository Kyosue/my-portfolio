# Barangay Business Permit Tracking System — Portfolio & Resume Copy

## Overview

BBPMTS (Barangay Marayag Business Permit Management and Tracking System) is a web application for Barangay Marayag, Lupon, Davao Oriental that digitizes barangay business clearance applications, multi-stage review, payment confirmation, and printable permit issuance for applicants, staff, and administrators. Built with PHP, MySQL/PDO, session-based authentication, and vanilla JavaScript—aligned with RA 7160 (Local Government Code) rules for Dec 31 permit expiry and the January 1–20 renewal window.

## Resume / Portfolio Bullets

- Engineered a nine-state permit lifecycle (`submitted` → `under_review` → `on_hold` → `for_payment` → `payment_confirmed` → `approved` / `released` / `rejected` / `revoked`) with PDO-prepared status updates that auto-assign unique `BBC-YYYY-MM-NNNNN` permit numbers and force Dec 31 expiry only on approval, preventing premature or duplicate clearance issuance.
- Implemented role-based access (admin / staff / applicant) using PHP sessions, `password_hash` / `password_verify`, and `require_role` guards, plus admin-safe user CRUD that blocks self-deletion and removal of the last admin while writing login, status, and permit-number changes to a paginated audit log.
- Built RA 7160–aligned renewal flows and a schedulable `cron_reminders.php` endpoint that notifies owners in December before Dec 31 expiry and again during January 1–20 if no renewal application exists, reducing missed renewals without manual barangay follow-up.
- Delivered printable Barangay Business Clearance certificates (HTML print layout with O.R. and payment amount), multi-file document uploads (PDF/images stored under `uploads/` with basename-sanitized downloads), and near–real-time in-app alerts via 5-second JSON polling of unread user/role notifications with optional sound cues.

## Alternate Shorter Set (3 bullets)

- Built a PHP/MySQL business permit portal for Barangay Marayag covering online applications, staff review, payment tracking, and printable clearances.
- Designed a multi-status workflow with auto-generated permit numbers, Dec 31 expiry, and January renewal windows aligned to the Local Government Code.
- Shipped RBAC with bcrypt password hashing, audit logging, document uploads, and polled in-app notifications for applicants and barangay staff.

## One-Line Tagline (optional)

Barangay business clearance management for Marayag — online applications, LGC-aligned renewals, and printable permits for local government staff and owners.
