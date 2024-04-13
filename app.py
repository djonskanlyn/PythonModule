from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def index():
    return render_template("index.html")

@app.route("/gallery")
def gallery():
    return render_template("gallery.html")

@app.route("/faqs")
def faqs():
    return render_template("faqs.html")

@app.route("/meals")
def weekend():
    return render_template("meals.html")

@app.route("/contact")
def festival():
    return render_template("contact.html")

if __name__ == "__main__":
    app.run(debug=True, port=8080)