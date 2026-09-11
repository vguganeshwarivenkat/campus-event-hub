from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)


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


# ================= HOME PAGE =================

@app.route("/")
def home():
    return render_template("index.html")


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