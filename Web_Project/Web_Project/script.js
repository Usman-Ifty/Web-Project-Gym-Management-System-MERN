// Make these functions globally accessible by placing them at the top level
function editFeedback(id) {
    fetch(`http://localhost:5000/api/feedback/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Feedback not found');
            return res.json();
        })
        .then(feedback => {
            const newName = prompt("Edit name:", feedback.name);
            const newMessage = prompt("Edit message:", feedback.message);
            if (newName && newMessage) {
                fetch(`http://localhost:5000/api/feedback/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newName, message: newMessage })
                })
                .then(res => {
                    if (!res.ok) throw new Error('Failed to update');
                    return res.json();
                })
                .then(() => {
                    alert("Feedback updated successfully!");
                    displayFeedbackSubmissions();
                })
                .catch(() => {
                    alert("Failed to update feedback. It may have been deleted. Please refresh the page.");
                    displayFeedbackSubmissions();
                });
            }
        })
        .catch(() => {
            alert("Feedback not found. It may have been deleted. Please refresh the page.");
            displayFeedbackSubmissions();
        });
}

function deleteFeedback(id) {
    if (confirm("Are you sure you want to delete this feedback?")) {
        fetch(`http://localhost:5000/api/feedback/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to delete');
            return res.json();
        })
        .then(() => {
            alert("Feedback deleted successfully!");
            displayFeedbackSubmissions();
        })
        .catch(() => {
            alert("Failed to delete feedback. It may have been deleted already. Please refresh the page.");
            displayFeedbackSubmissions();
        });
    }
}

function editReview(id) {
    fetch(`http://localhost:5000/api/review/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Review not found');
            return res.json();
        })
        .then(review => {
            const newName = prompt("Edit name:", review.name);
            const newRating = prompt("Edit rating (1-5):", review.rating);
            const newComment = prompt("Edit comment:", review.comment);
            if (newName && newRating && newComment) {
                fetch(`http://localhost:5000/api/review/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newName, rating: parseInt(newRating), comment: newComment })
                })
                .then(res => {
                    if (!res.ok) throw new Error('Failed to update');
                    return res.json();
                })
                .then(() => {
                    alert("Review updated successfully!");
                    displayReviewSubmissions();
                })
                .catch(() => {
                    alert("Failed to update review. It may have been deleted. Please refresh the page.");
                    displayReviewSubmissions();
                });
            }
        })
        .catch(() => {
            alert("Review not found. It may have been deleted. Please refresh the page.");
            displayReviewSubmissions();
        });
}

function deleteReview(id) {
    if (confirm("Are you sure you want to delete this review?")) {
        fetch(`http://localhost:5000/api/review/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to delete');
            return res.json();
        })
        .then(() => {
            alert("Review deleted successfully!");
            displayReviewSubmissions();
        })
        .catch(() => {
            alert("Failed to delete review. It may have been deleted already. Please refresh the page.");
            displayReviewSubmissions();
        });
    }
}

function editContact(id) {
    fetch(`http://localhost:5000/api/contact/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('Contact not found');
            return res.json();
        })
        .then(contact => {
            const newName = prompt("Edit name:", contact.name);
            const newEmail = prompt("Edit email:", contact.email);
            const newSubject = prompt("Edit subject:", contact.subject);
            const newMessage = prompt("Edit message:", contact.message);
            if (newName && newEmail && newSubject && newMessage) {
                fetch(`http://localhost:5000/api/contact/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newName, email: newEmail, subject: newSubject, message: newMessage })
                })
                .then(res => {
                    if (!res.ok) throw new Error('Failed to update');
                    return res.json();
                })
                .then(() => {
                    alert("Contact message updated successfully!");
                    displayContactSubmissions();
                })
                .catch(() => {
                    alert("Failed to update contact message. It may have been deleted. Please refresh the page.");
                    displayContactSubmissions();
                });
            }
        })
        .catch(() => {
            alert("Contact not found. It may have been deleted. Please refresh the page.");
            displayContactSubmissions();
        });
}

function deleteContact(id) {
    if (confirm("Are you sure you want to delete this contact message?")) {
        fetch(`http://localhost:5000/api/contact/${id}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (!res.ok) throw new Error('Failed to delete');
            return res.json();
        })
        .then(() => {
            alert("Contact message deleted successfully!");
            displayContactSubmissions();
        })
        .catch(() => {
            alert("Failed to delete contact message. It may have been deleted already. Please refresh the page.");
            displayContactSubmissions();
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;

    const featureIDs = [
        'feedback',
        'membership-form',
        'contact-form',
        'feedback-form',
        'logout-button',
        'review',
        'services',
        'join-button'
    ];

    featureIDs.forEach(featureId => {
        const featureElement = document.getElementById(featureId);
        if (featureElement) {
            featureElement.classList.toggle("hidden", !isLoggedIn);
        }
    });

    const loginButton = document.querySelector('.navbar-nav .nav-link[href="login.html"]');
    const logoutButton = document.getElementById('logout-button');
    const joinButton = document.getElementById('join-button');

    if (joinButton) joinButton.style.display = isLoggedIn ? 'none' : 'block';
    if (loginButton && logoutButton) {
        loginButton.style.display = isLoggedIn ? 'none' : 'block';
        logoutButton.style.display = isLoggedIn ? 'block' : 'none';
    }

    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (event) {
            const name = form.querySelector("input[type='text']");
            const email = form.querySelector("input[type='email']");
            const message = form.querySelector("textarea");

            if ((name && name.value.trim() === "") ||
                (email && email.value.trim() === "") ||
                (message && message.value.trim() === "")) {
                alert("All fields are required!");
                event.preventDefault();
            }
        });
    });

    document.querySelectorAll(".feature-btn").forEach(button => {
        button.addEventListener("click", function (e) {
            if (!isLoggedIn) {
                e.preventDefault();
                alert("Please login to access this feature.");
            }
        });
    });

    document.querySelectorAll('.navbar-nav .nav-link:not(.btn)').forEach(link => {
        const href = link.getAttribute("href");
        if (["membership-plans.html", "contact-us.html", "feedback.html", "review-form.html"].includes(href)) {
            link.addEventListener("click", function (e) {
                if (!isLoggedIn) {
                    e.preventDefault();
                    alert("Please login to access this page.");
                }
            });
        }
    });

    const chatIcon = document.querySelector(".chat-icon");
    const chatbot = document.getElementById("chatbot");

    if (chatIcon && chatbot) {
        chatIcon.addEventListener("click", () => {
            chatbot.style.display = chatbot.style.display === "block" ? "none" : "block";
        });
    }

    const closeChat = document.querySelector(".close-chat");
    if (closeChat && chatbot) {
        closeChat.addEventListener("click", () => {
            chatbot.style.display = "none";
        });
    }

    const notifyBtn = document.getElementById("notify-btn");
    const notificationPopup = document.getElementById("notification-popup");
    const closeNotificationBtn = notificationPopup?.querySelector("button");

    if (notifyBtn && notificationPopup && closeNotificationBtn) {
        notifyBtn.addEventListener("click", () => {
            notificationPopup.style.display = "block";
        });
        closeNotificationBtn.addEventListener("click", () => {
            notificationPopup.style.display = "none";
        });
    }

    const userInput = document.getElementById("user-input");
    const chatBody = document.getElementById("chat-body");

    const sendMessage = () => {
        const input = userInput?.value.trim();
        if (input) {
            addUserMessage(input);
            addBotReply(input);
            userInput.value = "";
        }
    };

    const addUserMessage = (text) => {
        const userMsg = document.createElement("p");
        userMsg.className = "chat-message user-message";
        userMsg.innerText = text;
        chatBody.appendChild(userMsg);
    };

    const addBotReply = (text) => {
        const botMsg = document.createElement("p");
        botMsg.className = "chat-message bot-message";

        switch (text.toLowerCase()) {
            case "membership plans":
                botMsg.innerText = "We offer Basic, Intermediate, and Pro memberships starting at $10/month.";
                break;
            case "trainers":
                botMsg.innerText = "Our certified trainers are available 7 days a week!";
                break;
            case "location":
                botMsg.innerText = "We're located at Main Boulevard, Gym City.";
                break;
            case "contact":
                botMsg.innerText = "You can email us at contact@gympro.com.";
                break;
            case "gym timings":
                botMsg.innerText = "We are open from 5 AM to 11 PM daily.";
                break;
            default:
                botMsg.innerText = "Thank you! We'll get back to you soon.";
        }

        chatBody.appendChild(botMsg);
    };

    if (userInput) {
        userInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    document.querySelectorAll(".chat-options button").forEach(button => {
        button.addEventListener("click", () => {
            addUserMessage(button.innerText);
            addBotReply(button.innerText);
        });
    });

    $('#feedback-form').off('submit').on('submit', async function (e) {
        e.preventDefault();
        const name = $('#name').val().trim();
        const message = $('#message').val().trim();
        if (name === "" || message === "") {
            alert("Please fill out all fields.");
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message })
            });
            if (!res.ok) throw new Error();
            alert("✅ Feedback submitted successfully!");
            await displayFeedbackSubmissions();
            document.getElementById("feedback-form")?.reset();
        } catch {
            alert("Failed to submit feedback. Please try again.");
        }
    });

    async function editFeedback(id) {
        try {
            const res = await fetch(`http://localhost:5000/api/feedback/${id}`);
            if (!res.ok) throw new Error('Feedback not found');
            const feedback = await res.json();
            const newName = prompt("Edit name:", feedback.name);
            const newMessage = prompt("Edit message:", feedback.message);
            if (newName && newMessage) {
                const updateRes = await fetch(`http://localhost:5000/api/feedback/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newName, message: newMessage })
                });
                if (!updateRes.ok) throw new Error('Failed to update');
                alert("Feedback updated successfully!");
                await displayFeedbackSubmissions();
            }
        } catch {
            alert("Feedback not found or failed to update. Please refresh the page.");
            await displayFeedbackSubmissions();
        }
    }

    async function deleteFeedback(id) {
        if (confirm("Are you sure you want to delete this feedback?")) {
            try {
                const res = await fetch(`http://localhost:5000/api/feedback/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Failed to delete');
                alert("Feedback deleted successfully!");
                await displayFeedbackSubmissions();
            } catch {
                alert("Failed to delete feedback. It may have been deleted already. Please refresh the page.");
                await displayFeedbackSubmissions();
            }
        }
    }

    function displayFeedbackSubmissions() {
        fetch('http://localhost:5000/api/feedback')
            .then(res => res.json())
            .then(feedbackData => {
                const container = $("#feedback-submissions");
                if (!container.length) return;
                container.empty();
                feedbackData.forEach(entry => {
                    let emoji = "";
                    if (entry.message.toLowerCase().includes("good")) emoji = "👍";
                    else if (entry.message.toLowerCase().includes("bad")) emoji = "👎";
                    container.append(`
                        <div class="card bg-light p-3 mb-2" id="feedback-${entry._id}">
                            <div class="d-flex justify-content-between align-items-start">
                                <h5>${entry.name} ${emoji}</h5>
                                <div>
                                    <button class="btn btn-warning btn-sm me-2" onclick="editFeedback('${entry._id}')">Edit</button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteFeedback('${entry._id}')">Delete</button>
                                </div>
                            </div>
                            <p>${entry.message}</p>
                            <small><em>${new Date(entry.createdAt).toLocaleString()}</em></small>
                        </div>
                    `);
                });
            });
    }

    displayFeedbackSubmissions();

    $('#review-form').off('submit').on('submit', async function (e) {
        e.preventDefault();
        const name = $('#name').val() ? $('#name').val().trim() : 'Anonymous';
        const rating = $('#rating').val();
        const review = $('#review').val().trim();
        if (rating === "" || review === "") {
            alert("Please complete all fields.");
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/api/review', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, rating, review })
            });
            if (!res.ok) throw new Error();
            alert("✅ Review submitted successfully!");
            await displayReviewSubmissions();
            document.getElementById("review-form")?.reset();
        } catch {
            alert("Failed to submit review. Please try again.");
        }
    });

    async function editReview(id) {
        try {
            const res = await fetch(`http://localhost:5000/api/review/${id}`);
            if (!res.ok) throw new Error('Review not found');
            const review = await res.json();
            const newName = prompt("Edit name:", review.name);
            const newRating = prompt("Edit rating (1-5):", review.rating);
            const newComment = prompt("Edit comment:", review.comment || review.review);
            if (newName && newRating && newComment) {
                const updateRes = await fetch(`http://localhost:5000/api/review/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newName, rating: parseInt(newRating), comment: newComment })
                });
                if (!updateRes.ok) throw new Error('Failed to update');
                alert("Review updated successfully!");
                await displayReviewSubmissions();
            }
        } catch {
            alert("Review not found or failed to update. Please refresh the page.");
            await displayReviewSubmissions();
        }
    }

    async function deleteReview(id) {
        if (confirm("Are you sure you want to delete this review?")) {
            try {
                const res = await fetch(`http://localhost:5000/api/review/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Failed to delete');
                alert("Review deleted successfully!");
                await displayReviewSubmissions();
            } catch {
                alert("Failed to delete review. It may have been deleted already. Please refresh the page.");
                await displayReviewSubmissions();
            }
        }
    }

    function displayReviewSubmissions() {
        fetch('http://localhost:5000/api/review')
            .then(res => res.json())
            .then(reviewData => {
                const container = $("#review-submissions");
                if (!container.length) return;
                container.empty();
                reviewData.forEach(entry => {
                    const stars = '★'.repeat(entry.rating) + '☆'.repeat(5 - entry.rating);
                    const comment = entry.comment || entry.review || '';
                    const name = entry.name || 'Anonymous';
                    container.append(`
                        <div class="card bg-light p-3 mb-2" id="review-${entry._id}">
                            <div class="d-flex justify-content-between align-items-start">
                                <h5>${name}</h5>
                                <div>
                                    <button class="btn btn-warning btn-sm me-2" onclick="editReview('${entry._id}')">Edit</button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteReview('${entry._id}')">Delete</button>
                                </div>
                            </div>
                            <p class="text-warning">${stars}</p>
                            <p>${comment}</p>
                            <small><em>${new Date(entry.createdAt).toLocaleString()}</em></small>
                        </div>
                    `);
                });
            });
    }

    displayReviewSubmissions();

    $('#contact-form').off('submit').on('submit', async function (e) {
        e.preventDefault();
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();
        if (name === "" || email === "" || subject === "" || message === "") {
            alert("Please fill out all fields.");
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });
            if (!res.ok) throw new Error();
            alert("✅ Message submitted successfully!");
            await displayContactSubmissions();
            document.getElementById("contact-form")?.reset();
        } catch {
            alert("Failed to submit message. Please try again.");
        }
    });

    async function editContact(id) {
        try {
            const res = await fetch(`http://localhost:5000/api/contact/${id}`);
            if (!res.ok) throw new Error('Contact not found');
            const contact = await res.json();
            const newName = prompt("Edit name:", contact.name);
            const newEmail = prompt("Edit email:", contact.email);
            const newSubject = prompt("Edit subject:", contact.subject);
            const newMessage = prompt("Edit message:", contact.message);
            if (newName && newEmail && newSubject && newMessage) {
                const updateRes = await fetch(`http://localhost:5000/api/contact/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newName, email: newEmail, subject: newSubject, message: newMessage })
                });
                if (!updateRes.ok) throw new Error('Failed to update');
                alert("Contact message updated successfully!");
                await displayContactSubmissions();
            }
        } catch {
            alert("Contact not found or failed to update. Please refresh the page.");
            await displayContactSubmissions();
        }
    }

    async function deleteContact(id) {
        if (confirm("Are you sure you want to delete this contact message?")) {
            try {
                const res = await fetch(`http://localhost:5000/api/contact/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('Failed to delete');
                alert("Contact message deleted successfully!");
                await displayContactSubmissions();
            } catch {
                alert("Failed to delete contact message. It may have been deleted already. Please refresh the page.");
                await displayContactSubmissions();
            }
        }
    }

    function displayContactSubmissions() {
        fetch('http://localhost:5000/api/contact')
            .then(res => res.json())
            .then(contactData => {
                const container = $("#contact-submissions");
                if (!container.length) return;
                container.empty();
                contactData.forEach(entry => {
                    container.append(`
                        <div class="card bg-light p-3 mb-2" id="contact-${entry._id}">
                            <div class="d-flex justify-content-between align-items-start">
                                <h5>${entry.name}</h5>
                                <div>
                                    <button class="btn btn-warning btn-sm me-2" onclick="editContact('${entry._id}')">Edit</button>
                                    <button class="btn btn-danger btn-sm" onclick="deleteContact('${entry._id}')">Delete</button>
                                </div>
                            </div>
                            <p class="text-muted">${entry.email}</p>
                            <p><strong>Subject:</strong> ${entry.subject}</p>
                            <p>${entry.message}</p>
                            <small><em>${new Date(entry.createdAt).toLocaleString()}</em></small>
                        </div>
                    `);
                });
            });
    }

    displayContactSubmissions();

    function logout() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        document.querySelectorAll('.hidden').forEach(section => section.classList.add('hidden'));
        window.location.href = "login.html";
    }

});
