# 🛡️ Firebase Security Setup

## Current Status: ⚠️ **UNSECURED**

Your Firestore database is currently **OPEN** and vulnerable to unauthorized access.

## 🚨 **Immediate Actions Required:**

### 1. Deploy Security Rules
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project (if not done)
firebase init firestore

# Deploy security rules
firebase deploy --only firestore:rules
```

### 2. Set Up Admin Authentication

Your security rules require admin authentication. Choose one option:

#### Option A: Custom Claims (Recommended)
```javascript
// In Firebase Admin SDK (server-side)
admin.auth().setCustomUserClaims(adminUid, { admin: true });
```

#### Option B: Admin UIDs List
Replace the `isAdmin()` function in `firestore.rules`:
```javascript
function isAdmin() {
  return request.auth != null && 
         request.auth.uid in ['your-admin-uid-1', 'your-admin-uid-2'];
}
```

### 3. Test Security Rules
```bash
# Run local emulator to test rules
firebase emulators:start --only firestore
```

## 🔒 **Security Rules Applied:**

✅ **Products**: Public read, admin-only write
✅ **Categories**: Public read, admin-only write  
✅ **Orders**: Public create, admin manage
✅ **Reviews**: Public read, auth users create, admin/owner manage
✅ **Wishlist**: User-specific access only
✅ **Settings**: Admin-only access

## ⚡ **Next Steps:**

1. **Deploy rules immediately**: `firebase deploy --only firestore:rules`
2. **Set up admin authentication** using custom claims
3. **Test your app** to ensure functionality works with new rules
4. **Monitor security** in Firebase Console

## 🚧 **Temporary Admin Access:**

If you need immediate admin access for testing, temporarily modify the `isAdmin()` function to return `true`, then revert after setting up proper authentication.

**WARNING**: Do not leave the database open in production!
