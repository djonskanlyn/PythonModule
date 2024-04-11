from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")                                 #endpoint
@app.route("/home")
@app.route("/home/")
def home():
    return render_template("home.html")         #looking for /templates/home.html

@app.route("/contact")
@app.route("/contact/")
def contact():
    return render_template("contact.html")      #looking for /templates/contact.html  

@app.route("/greet")
@app.route("/greet/")
@app.route("/greet/<name>")
def greet(name="unknown"):
    return f"<h1>Hi there! {name}</h1>"     

@app.route("/takeNum")
@app.route("/takeNum/")
@app.route("/takeNum/<num>")
def takeNum(num="unknown"):
    return f"<h1>Your age as a number is: {num}</h1>"    

@app.route("/digitSum/<int:number>")
def digitSum(number):
    """Compute the digit sum of the url provided"""
    sum = 0
    while(digit := number%10):
        sum += digit
        number = number // 10
    
    return f"<h1> The digit sum is {sum}</h1>"

if __name__ == '__main__':
    app.run(debug=True, port=8080)