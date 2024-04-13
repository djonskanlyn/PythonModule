from flask import Flask, render_template, request, redirect, url_for, jsonify

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

@app.route("/fav")
def fav():
    return render_template("fav.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

favourite_data = {} # create dict to store favourites

@app.route("/favourites", methods=['POST'])
def save_favourite():
    favourite = request.get_json()

    if not all(k in favourite for k in ("mealClass", "mealName", "mealThumb", "mealInstructions")):
        return jsonify({"error": "Missing data"}), 400
    
    favouriteId = max(favourite_data.keys(), default=0) + 1

    favourite_data[favouriteId] = {
        "Class": favourite["mealClass"],
        "Meal": favourite["mealName"],
        "Thumbnail": favourite["mealThumb"],
        "Instructions": favourite["mealInstructions"]
    }

    return jsonify({"message": "Data saved successfully!", "id": favouriteId}), 200

if __name__ == "__main__":
    app.run(debug=True, port=8080)