// Firebase Configuration (Same as Backend)
const firebaseConfig = {
    apiKey: "AIzaSyABR4ypXLaLcE-tpJtTUwvBNaKB7Cc-3c",
    authDomain: "gas-management-system-4870c.firebaseapp.com",
    projectId: "gas-management-system-4870c",
    storageBucket: "gas-management-system-4870c.appspot.com",
    messagingSenderId: "749348180428",
    appId: "1:749348180428:web:1b2f21c7c034e66d608d69"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Select Elements
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const bookCylinderBtn = document.getElementById("bookCylinderBtn");

// Display Status Message
function showMessage(message, type = "success") {
    const statusMessage = document.getElementById("statusMessage");
    statusMessage.innerText = message;
    statusMessage.className = type;
}

// Register User
registerBtn.addEventListener("click", async () => {
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        showMessage("✅ Registration Successful!", "success");
    } catch (error) {
        showMessage(`❌ ${error.message}`, "error");
    }
});

// Login User
loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        showMessage(`✅ Logged in as: ${email}`, "success");
    } catch (error) {
        showMessage(`❌ ${error.message}`, "error");
    }
});

// Book Cylinder
bookCylinderBtn.addEventListener("click", async () => {
    const user = auth.currentUser;

    if (!user) {
        showMessage("❌ Please log in first!", "error");
        return;
    }

    try {
        const userRef = db.collection("users").doc(user.uid);
        const userSnap = await userRef.get();

        if (!userSnap.exists) {
            showMessage("❌ User not found!", "error");
            return;
        }

        let barrelsRemaining = userSnap.data().barrelsRemaining || 0;

        if (barrelsRemaining <= 0) {
            showMessage("❌ No barrels remaining!", "error");
            return;
        }

        await userRef.update({
            barrelsRemaining: barrelsRemaining - 1,
            bookingHistory: firebase.firestore.FieldValue.arrayUnion({
                date: new Date().toISOString(),
                status: "Pending"
            })
        });

        showMessage("✅ Cylinder booked successfully!", "success");
    } catch (error) {
        showMessage(`❌ ${error.message}`, "error");
    }
});
