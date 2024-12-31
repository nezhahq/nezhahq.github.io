---
outline: deep
---

# Multi-User

A simple multi-user feature designed for scenarios where multiple people share the same dashboard.

---

## Create a New User

You can create new users in the **Settings - Users** page (requires the current user to be an administrator).

---

## User Permissions

### Administrator

Holds the highest privileges on the dashboard, with access to all existing resources and the ability to modify settings.

### User

Standard user privileges. Can only access/modify their own resources and cannot change settings, but can update their own user information.

---

## Connection Secret

Each user has a unique **Agent** connection secret, used to identify the owner when creating servers.

You can copy the installation command to view the connection secret for the current user.

When a user is deleted, their connection secret becomes invalid immediately, and all associated servers will also be removed.
