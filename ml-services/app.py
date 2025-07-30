from flask import Flask, request, jsonify
from flask_cors import CORS
import librosa
import numpy as np
import os
from pydub import AudioSegment
import tempfile

app = Flask(__name__)
CORS(app)  # Allow requests from your backend

def extract_features(audio_path):
    # Load audio
    y, sr = librosa.load(audio_path, sr=None)
    # Duration (seconds)
    duration = librosa.get_duration(y=y, sr=sr)
    # Zero crossing rate (roughly: speech activity/pauses)
    zcr = librosa.feature.zero_crossing_rate(y)
    # Average pitch (fundamental frequency)
    pitches, _ = librosa.piptrack(y=y, sr=sr)
    avg_pitch = np.mean(pitches[pitches > 0]) if np.any(pitches > 0) else 0
    # Energy of signal
    rms = librosa.feature.rms(y=y).mean()
    return {
        "duration_sec": float(duration),
        "avg_zero_crossing_rate": float(np.mean(zcr)),
        "avg_pitch": float(avg_pitch),
        "avg_rms_energy": float(rms)
    }

@app.route("/analyze-audio", methods=["POST"])
def analyze_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp:
        file.save(temp.name)
        try:
            features = extract_features(temp.name)
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        finally:
            os.remove(temp.name)
    return jsonify(features)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
