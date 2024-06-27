import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import pickle
from fastapi import FastAPI, Path
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# Load data and get unique subjects
df = pd.read_csv('./public/New_Coolbit.csv')
unique_subjects = df['Subject No.'].unique()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

model_path = "./Model_predictions/coolbit_10_RF.pkl"

with open(model_path, 'rb') as file:
    model = pickle.load(file)

def select_data(df, session, person):
    df_new = df[(df['Session']==session) & (df['Subject No.'] == person)]
    df_new = df_new.drop(['Subject No.','Session','CB_Tc','Tc type','Phase','Real time','Gold_Tc','Gold_HR'], axis=1)
    return df_new

def dataset_generator(df, time_window, step):
    x_dataset = []
    timeline = len(df) - time_window
    for i in range(0, timeline, step):
        data = df.iloc[i:i+time_window, :].values
        x_dataset.append(data)
    return x_dataset

def normalize(x_data):
    scalerx = StandardScaler()
    x_data = np.array(x_data)
    scaled_x = scalerx.fit_transform(x_data.reshape(x_data.shape[0], x_data.shape[1]*x_data.shape[2]))
    return scaled_x

@app.get("/predict/{session}/{person}")
async def predict(session: str = Path(..., title="Session"), person: str = Path(..., title="Person")):
    df = pd.read_csv('./public/New_Coolbit.csv')
    df_new = select_data(df, session, person)
    x_dataset = dataset_generator(df_new, 10, 10)
    model_data = normalize(x_dataset)
    
    predictions = model.predict(model_data).tolist()

    result = []
    for i, prediction in enumerate(predictions):
        result.append({
            "index": i + 1,
            "prediction": prediction,
            "interpretation": "Person is approaching Heat Exhaustion." if prediction == 1 else "Heat Exhaustion not detected."
        })

    return result