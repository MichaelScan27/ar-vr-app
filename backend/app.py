from flask import Flask, render_template, jsonify

app = Flask(
    __name__,
    template_folder="../frontend", # HTML
    static_folder="../frontend/static" # CSS and JS
)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False, host="0.0.0.0", port=5000, ssl_context="adhoc")