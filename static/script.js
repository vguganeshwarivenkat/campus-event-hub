/* =====================================================
   CAMPUS EVENT HUB
   MAIN JAVASCRIPT
===================================================== */


/* ================= EVENT DATA ================= */

const events = [

    {
        name: "Hackathon",
        title: "💻 Hackathon",
        category: "Technical",
        description: "24 hours coding challenge for innovative students."
    },

    {
        name: "AI Workshop",
        title: "🤖 AI Workshop",
        category: "Technical",
        description: "Learn Artificial Intelligence and Machine Learning."
    },

    {
        name: "Web Development Bootcamp",
        title: "🌐 Web Development Bootcamp",
        category: "Technical",
        description: "Create modern websites using latest technologies."
    },

    {
        name: "Cultural Night",
        title: "🎤 Cultural Night",
        category: "Cultural",
        description: "Music, dance and amazing performances."
    },

    {
        name: "Drama Competition",
        title: "🎭 Drama Competition",
        category: "Cultural",
        description: "Show your acting skills on stage."
    },

    {
        name: "Art Exhibition",
        title: "🎨 Art Exhibition",
        category: "Creative",
        description: "Display your creativity and artwork."
    },

    {
        name: "Football Tournament",
        title: "🏆 Football Tournament",
        category: "Sports",
        description: "Inter department football competition."
    },

    {
        name: "Cricket Championship",
        title: "🏏 Cricket Championship",
        category: "Sports",
        description: "Campus cricket tournament."
    },

    {
        name: "Basketball League",
        title: "🏀 Basketball League",
        category: "Sports",
        description: "Exciting basketball matches."
    },

    {
        name: "Photography Contest",
        title: "📸 Photography Contest",
        category: "Creative",
        description: "Capture beautiful campus moments."
    },

    {
        name: "Startup Expo",
        title: "🚀 Startup Expo",
        category: "Business",
        description: "Present your startup ideas."
    },

    {
        name: "Knowledge Fest",
        title: "📚 Knowledge Fest",
        category: "Academic",
        description: "Quiz and knowledge-based competitions."
    },

    {
        name: "Gaming Tournament",
        title: "🎮 Gaming Tournament",
        category: "Entertainment",
        description: "Competitive gaming event."
    },

    {
        name: "Green Campus Drive",
        title: "🌱 Green Campus Drive",
        category: "Social",
        description: "Environmental awareness program."
    },

    {
        name: "Science Fair",
        title: "🧪 Science Fair",
        category: "Academic",
        description: "Innovative science projects exhibition."
    },

    {
        name: "DJ Night",
        title: "🎧 DJ Night",
        category: "Entertainment",
        description: "Music and fun celebration."
    },

    {
        name: "Paper Presentation",
        title: "📝 Paper Presentation",
        category: "Academic",
        description: "Share your research ideas."
    },

    {
        name: "Yoga Session",
        title: "🧘 Yoga Session",
        category: "Health",
        description: "Relaxing wellness activity."
    },

    {
        name: "Innovation Challenge",
        title: "💡 Innovation Challenge",
        category: "Technical",
        description: "Solve real world problems."
    },

    {
        name: "Short Film Festival",
        title: "🎬 Short Film Festival",
        category: "Creative",
        description: "Show your filmmaking talent."
    }

];


/* ================= LOAD EVENTS ================= */

const container = document.getElementById("eventContainer");

const eventSelect = document.getElementById("event");


/* Load event cards only on Events page */

if (container) {

    events.forEach(function(event) {

        container.innerHTML += `

            <div class="card">

                <h2>
                    ${event.title}
                </h2>

                <p>
                    🏷 Category:
                    ${event.category}
                </p>

                <p>
                    ${event.description}
                </p>

                <button
                    onclick="selectEvent('${event.name}')">

                    Register 🎓

                </button>

            </div>

        `;

    });

}


/* Load dropdown only on Register page */

if (eventSelect) {

    events.forEach(function(event) {

        eventSelect.innerHTML += `

            <option value="${event.name}">
                ${event.name}
            </option>

        `;

    });


    /* Select event from URL */

    const params = new URLSearchParams(
        window.location.search
    );

    const selectedEvent = params.get("event");

    if (selectedEvent) {

        eventSelect.value = selectedEvent;

    }

}


/* ================= EXPLORE EVENTS ================= */

function scrollEvents() {

    window.location.href = "/events";

}


/* ================= REGISTER ================= */

function scrollToRegister() {

    window.location.href = "/register";

}


/* ================= SELECT EVENT ================= */

function selectEvent(eventName) {

    window.location.href =
        "/register?event=" +
        encodeURIComponent(eventName);

}


/* ================= REGISTRATION ================= */

const registrationForm =
    document.getElementById("registrationForm");


if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const data = {

                name:
                    document.getElementById("name")
                    .value.trim(),

                email:
                    document.getElementById("email")
                    .value.trim(),

                phone:
                    document.getElementById("phone")
                    .value.trim(),

                college:
                    document.getElementById("college")
                    .value.trim(),

                department:
                    document.getElementById("department")
                    .value,

                year:
                    document.getElementById("year")
                    .value,

                gender:
                    document.getElementById("gender")
                    .value,

                student_id:
                    document.getElementById("studentId")
                    .value.trim(),

                event:
                    document.getElementById("event")
                    .value,

                payment:
                    document.getElementById("payment")
                    .value,

                address:
                    document.getElementById("address")
                    .value.trim(),

                message:
                    document.getElementById("message")
                    .value.trim()

            };


            try {

                const response = await fetch(
                    "/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );


                const result =
                    await response.json();


                if (result.success) {

                    document.getElementById(
                        "popupName"
                    ).textContent = data.name;


                    document.getElementById(
                        "popupEvent"
                    ).textContent = data.event;


                    document.getElementById(
                        "successPopup"
                    ).classList.add("show");


                    registrationForm.reset();

                }

                else {

                    alert(
                        "Registration failed!"
                    );

                }

            }

            catch (error) {

                console.error(
                    "Backend Error:",
                    error
                );

                alert(
                    "Server connection failed. Please try again."
                );

            }

        }
    );

}


/* ================= CLOSE POPUP ================= */

function closePopup() {

    const popup =
        document.getElementById("successPopup");


    if (popup) {

        popup.classList.remove("show");

    }

}


/* ================= CURSOR GLOW ================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


if (cursorGlow) {

    document.addEventListener(
        "mousemove",
        function(e) {

            cursorGlow.style.left =
                e.clientX + "px";

            cursorGlow.style.top =
                e.clientY + "px";

        }
    );

}


/* ================= ESC TO CLOSE POPUP ================= */

document.addEventListener(
    "keydown",
    function(e) {

        if (e.key === "Escape") {

            closePopup();

        }

    }
);