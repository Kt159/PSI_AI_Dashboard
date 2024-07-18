import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import pickle
from fastapi import FastAPI, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

model_path = "./Model_predictions/coolbit_5_GB.pkl"

with open(model_path, 'rb') as file:
    model = pickle.load(file)

def select_data(df, session, person):
    df_new = df[(df['Session']==session) & (df['Subject No.'] == person) & (df['Time (min)'] >= -4)]
    df_new = df_new.drop(['Subject No.','Session','Tc type','Phase','Real time','Gold_Tc','Gold_HR'], axis=1)
    return df_new

def dataset_generator(df, time_window, step):
    x_dataset = []
    timeline = len(df) - time_window
    for i in range(0, timeline + 1, step):
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
    try:
        df = pd.read_csv('./public/processed_coolbit.csv')
        df_new = select_data(df, session, person)
        x_dataset = dataset_generator(df_new, 5, 1)
        model_data = normalize(x_dataset)
        
        predictions = model.predict(model_data).tolist()

        result = []
        for i, prediction in enumerate(predictions):
            result.append({
                "index": i ,
                "prediction": prediction
            })

        return result

    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@app.get("/overview/{session}")
async def predict(session: str = Path(..., title="Session")):
    try:
        df = pd.read_csv('./public/processed_coolbit.csv')
        unique_id = df[df['Session']==session]["Subject No."].unique()
        predictedValues = {}

        for id in unique_id:
            df_new = select_data(df, session, id)
            x_dataset = dataset_generator(df_new, 5, 1)
            model_data = normalize(x_dataset)
            predictions = model.predict(model_data).tolist()
            predictedValues[id] = predictions

        return predictedValues
    
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")