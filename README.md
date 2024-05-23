# Heat Analytics Dashboard with Next.js

## Overview
This repository contains a hypothetical deployment of the ML model integrated dashboard to predict and visualize heat exhaustion.
Below is an overview of the folder structure:

```plaintext
├── src                    # Source code directory
|   |── app 
|      |── (dashboard)
|          |── components  # Components used for dashboard 
|          |── individual  # Individual page
|          |── model       # Model JSON testing page
|          |── settings    # Settings page
|          |── page.tsx    # Overview page (default page) 
|
├── Model_predictions      # Folder containing trained RF model for Coolbit
├── main.py                # Preprocess data for model prediction
├── public                 # Folder containing csv file for data retrieval
├── README.md              # Project README file
```

## Intialize Next.js Dashboard
Enter `npm run dev` into terminal to set up local next.js server
- Server should be running on http://localhost:3000

## Model API (Uvicorn Server)
### Steps to run Model API
Enter `uvicorn main:app --reload` into terminal to set up local uvicorn server  
- Server should be running on http://localhost:8000/docs

### Expected Output (Visualized on `Model Test` page)
1. Index (each index represents 10 min worth of data)
2. Prediction (0/1 --> Negative or positive classification of data)
3. Interpretation (Not heat exhausted OR Approaching heat exhaustion)
