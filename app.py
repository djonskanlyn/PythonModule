from flask import Flask, render_template, request, redirect, url_for, jsonify

#from flask_cors import CORS

app = Flask(__name__)

#CORS(app)

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
        mealName = request.form.get('mealNameForm', '').strip()

        # Accessing form data
        mealId = request.form['mealIdForm'].strip()
        mealClass = request.form['mealClassForm'].strip()
        mealName = request.form['mealNameForm'].strip()
        mealThumb = request.form['mealThumbForm']
        mealInstructions = request.form['mealInstructionsForm'].strip()


        # Validation could be added here as necessary
        if not all([mealId, mealClass, mealName, mealInstructions]):
           return jsonify({"error": "Missing data"}), 400

        favouriteId = int(mealId)
        favourite_data[favouriteId] = {
            "Class": mealClass,
            "Meal": mealName,
            "Thumbnail": mealThumb,
            "Instructions": mealInstructions
        }

        return jsonify({"message": "Data saved successfully!", "id": favourite_data}), 200

if __name__ == "__main__":
    app.run(debug=True)