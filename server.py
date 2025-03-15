from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  

app = Flask(__name__, template_folder='templates')
CORS(app)  

# Store conversation state for each user
user_context = {}

@app.route("/")
def home():
    return render_template("connect.html")  

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "").lower().strip()  
    user_id = request.remote_addr  

    if user_id not in user_context:
        user_context[user_id] = {"topic": None, "step": 0}  

    # Common greetings
    greetings = ["hi", "hello", "hey", "greetings", "how are you"]
    
    # Check if user message matches any greeting
    if any(word in user_message.split() for word in greetings):
        return jsonify({"reply": "Hello! How can I assist you today?"})
    
    # List of topics and their definitions
    topics = {
        "asd": "Autism Spectrum Disorder (ASD) affects social communication, sensory processing, and behavior. Would you like to know common symptoms?",
        "autism": "Autism Spectrum Disorder (ASD) affects social communication, sensory processing, and behavior. Would you like to know common symptoms?",
        "adhd": "Attention Deficit Hyperactivity Disorder (ADHD) involves inattention, hyperactivity, and impulsivity. Do you want to learn some management tips?",
        "dyslexia": "Dyslexia impacts reading and language processing skills. Need tips on how to manage it?",
        "dyscalculia": "Dyscalculia affects mathematical and numerical understanding. Would you like strategies to deal with it?",
        "dyspraxia": "Dyspraxia involves challenges with motor coordination and physical tasks. Need coping strategies?",
        "tourette": "Tourette Syndrome causes involuntary movements and vocalizations (tics). Do you need information on treatments?",
        "ocd": "Obsessive-Compulsive Disorder (OCD) involves repetitive thoughts and behaviors. Do you need self-help strategies?",
        "bipolar": "Bipolar Disorder causes extreme mood swings, including emotional highs and lows. Want to know treatment options?",
        "schizophrenia": "Schizophrenia affects perception, thought processes, and emotional responsiveness. Looking for symptoms or treatments?",
        "down syndrome": "Down Syndrome is a genetic condition causing developmental and intellectual delays. Need support resources?",
        "spd": "Sensory Processing Disorder (SPD) causes difficulty in processing sensory information. Need sensory-friendly tips?",
        "nvld": "Nonverbal Learning Disorder (NVLD) causes challenges with visual-spatial and nonverbal skills. Need coping strategies?"
    }

    # Multi-step detailed responses
    details = {
        "asd": [
            "Common symptoms of ASD include difficulty with social interactions, sensory sensitivities, and repetitive behaviors. Want management tips?",
            "For autism management: 1) Create structured routines. 2) Use visual supports. 3) Encourage communication skills. Need more?",
            "Early intervention, therapy, and social skills training can help. Would you like resource links?"
        ],
        "autism": [
            "Common symptoms of ASD include difficulty with social interactions, sensory sensitivities, and repetitive behaviors. Want management tips?",
            "For autism management: 1) Create structured routines. 2) Use visual supports. 3) Encourage communication skills. Need more?",
            "Early intervention, therapy, and social skills training can help. Would you like resource links?"
        ],
        "adhd": [
            "Common ADHD symptoms include difficulty focusing, impulsivity, and restlessness. Want practical coping tips?",
            "Management tips: 1) Use planners & reminders. 2) Break tasks into small steps. 3) Take short breaks. Need more?",
            "Cognitive behavioral therapy (CBT) and medication can help. Would you like resources?"
        ],
        "dyslexia": [
            "Dyslexia can make reading, spelling, and writing challenging. Want learning strategies?",
            "Try text-to-speech tools, audiobooks, and structured phonics programs. Would you like more methods?"
        ],
        "dyscalculia": [
            "Dyscalculia affects number sense and math skills. Want practical strategies?",
            "Try using visual aids, number games, and step-by-step math guides. Need more suggestions?"
        ],
        "dyspraxia": [
            "Dyspraxia can cause motor coordination difficulties. Want daily life adaptation tips?",
            "Use assistive tools, occupational therapy, and movement exercises. Would you like more advice?"
        ],
        "tourette": [
            "Tourette Syndrome causes involuntary tics. Need treatment info?",
            "Behavioral therapy, habit reversal training, and medications can help. Want details?"
        ],
        "ocd": [
            "OCD involves intrusive thoughts and repetitive behaviors. Need self-help tips?",
            "Exposure therapy, mindfulness, and cognitive-behavioral therapy (CBT) can help. Want more strategies?"
        ],
        "bipolar": [
            "Bipolar Disorder involves episodes of mania and depression. Want treatment options?",
            "Mood stabilizers, therapy, and lifestyle adjustments can help. Need details?"
        ],
        "schizophrenia": [
            "Schizophrenia affects thoughts, emotions, and perceptions. Want treatment options?",
            "Medication and therapy are key. Support groups can also help. Need more info?"
        ],
        "down syndrome": [
            "Down Syndrome leads to developmental challenges. Looking for educational support?",
            "Specialized learning plans and therapy can aid development. Need resources?"
        ],
        "spd": [
            "SPD causes difficulties in processing sensory input. Want coping strategies?",
            "Try sensory-friendly spaces, weighted blankets, and therapy. Need more tips?"
        ],
        "nvld": [
            "NVLD affects social and spatial skills. Need learning strategies?",
            "Social skills training, visual supports, and therapy can help. Want more info?"
        ]
    }

    # Handling user queries
    for keyword, response in topics.items():
        if keyword in user_message:
            user_context[user_id] = {"topic": keyword, "step": 0}
            return jsonify({"reply": response})

    # Handle follow-up "yes" or "more" messages
    current_topic = user_context[user_id]["topic"]
    step = user_context[user_id]["step"]

    if user_message in ["yes", "more", "tell me more"] and current_topic in details:
        if step < len(details[current_topic]) - 1:
            user_context[user_id]["step"] += 1
            return jsonify({"reply": details[current_topic][step + 1]})
        else:
            return jsonify({"reply": "That's all I have for now. Let me know if you need anything else!"})
    
    if user_message in ["no", "exit", "bye"]:
        return jsonify({"reply": "Alright! If you need anything else, feel free to ask. Have a great day!"})

    # Default fallback response
    return jsonify({"reply": "I'm still learning. Can you rephrase that or ask about a specific condition?"})

if __name__ == "__main__":
    app.run(debug=True)