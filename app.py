from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import sqlite3

app = Flask(__name__)
app.secret_key = "campus_event_hub_admin_secret_2026"

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"


# ================= DATABASE =================

def get_db():
    conn = sqlite3.connect("campus.db")
    conn.row_factory = sqlite3.Row
    return conn


def create_database():

    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            college TEXT NOT NULL,
            department TEXT NOT NULL,
            year TEXT NOT NULL,
            gender TEXT NOT NULL,
            student_id TEXT NOT NULL,
            event TEXT NOT NULL,
            payment TEXT NOT NULL,
            address TEXT NOT NULL,
            message TEXT
        )
    """)

    conn.commit()
    conn.close()


# ================= PAGES =================

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/notice")
def notice():
    return render_template("notice.html")


@app.route("/events")
def events():
    return render_template("events.html")


@app.route("/register", methods=["GET"])
def register_page():
    return render_template("register.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")

    # ================= ADMIN LOGIN =================

@app.route("/admin/login", methods=["GET", "POST"])
def admin_login():

    if request.method == "POST":

        username = request.form.get("username")
        password = request.form.get("password")

        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:

            session["admin_logged_in"] = True

            return redirect(url_for("admin_dashboard"))

        return render_template(
            "admin_login.html",
            error="Invalid username or password"
        )

    return render_template("admin_login.html")

# ================= ADMIN DASHBOARD =================

@app.route("/admin/dashboard")
def admin_dashboard():

    if not session.get("admin_logged_in"):
        return redirect(url_for("admin_login"))

    conn = get_db()

    registrations = conn.execute("""
        SELECT * FROM registrations
        ORDER BY id DESC
    """).fetchall()

    total_registrations = conn.execute("""
        SELECT COUNT(*) AS count
        FROM registrations
    """).fetchone()["count"]

    event_counts = conn.execute("""
        SELECT event, COUNT(*) AS count
        FROM registrations
        GROUP BY event
        ORDER BY count DESC
    """).fetchall()

    conn.close()

    return render_template(
        "admin_dashboard.html",
        registrations=registrations,
        total_registrations=total_registrations,
        event_counts=event_counts
    )

    # ================= ADMIN LOGOUT =================

@app.route("/admin/logout")
def admin_logout():

    session.pop("admin_logged_in", None)

    return redirect(url_for("admin_login"))

# ================= REGISTRATION =================

@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    conn = get_db()

    conn.execute("""
        INSERT INTO registrations
        (
            name,
            email,
            phone,
            college,
            department,
            year,
            gender,
            student_id,
            event,
            payment,
            address,
            message
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["name"],
        data["email"],
        data["phone"],
        data["college"],
        data["department"],
        data["year"],
        data["gender"],
        data["student_id"],
        data["event"],
        data["payment"],
        data["address"],
        data.get("message", "")
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Registration successful!"
    })


# ================= START SERVER =================

if __name__ == "__main__":

    create_database()

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )