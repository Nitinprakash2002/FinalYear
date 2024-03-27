import json
import sys
import random
def recommendation_model(inps): 
    import pandas as pd
    import numpy as np
    import matplotlib.pyplot as plt
    import nltk
    from nltk.tokenize import word_tokenize
    from sklearn.neighbors import NearestNeighbors
    from sklearn.model_selection import train_test_split 
    import re
    from fuzzywuzzy import fuzz
    from fuzzywuzzy import process
    dataf=pd.read_csv("./TrainModel/Bengaluru_House_Data.csv")
    dataf.drop(columns=['area_type'], inplace=True)
    def convert_range_to_float(value):
        if isinstance(value, (int, float)):
            return float(value)
        if '-' in value:
            range_values = value.split('-')
            try:
                start = float(range_values[0].strip())
                end = float(range_values[1].strip())
                avg = (start + end) / 2
                return avg
            except (ValueError, IndexError):
                return np.nan  # Return NaN if unable to convert or invalid range format
        else:
            try:
                return float(value.strip())
            except ValueError:
                return np.nan
    
    dataf['total_sqft'] = dataf['total_sqft'].apply(convert_range_to_float)

    for i in range(0, 13320):
        if(dataf['price'][i]>10 and dataf['price'][i]<=14):
            dataf.loc[i, 'price'] = float(dataf.loc[i, 'price'] / 2)
        elif(dataf['price'][i]>14 and dataf['price'][i]<=100):
            dataf.loc[i, 'price'] = float(dataf.loc[i, 'price'] /4)
        elif(dataf['price'][i]>100 and dataf['price'][i]<=400):
            dataf.loc[i, 'price'] = float(dataf.loc[i, 'price'] / 10)
        elif(dataf['price'][i]>400 and dataf['price'][i]<=1000):
            dataf.loc[i, 'price'] = float(dataf.loc[i, 'price'] / 30)
        elif(dataf['price'][i]>1000):
            dataf.loc[i, 'price'] = float(dataf.loc[i, 'price'] / 40)
    dataf['society'] = np.where(pd.isna(dataf['society']), "PG", dataf['society'])
    dataf['location'] = np.where(pd.isna(dataf['location']), "baglore", dataf['location'])
    dataf['size'] = np.where(pd.isna(dataf['size']), "2 BHK", dataf['size'])
    dataf['balcony'] = np.where(pd.isna(dataf['balcony']), 0, dataf['balcony'])
    dataf['bath'] = np.where(pd.isna(dataf['bath']), 0, dataf['bath'])
    dataf['total_sqft'] = dataf['total_sqft'].apply(lambda x: None if pd.isnull(x) else x)
    # nan_counts = dataf.isnull().sum()
    # print(nan_counts)
    string_cols = ['availability', 'location', 'size', 'society']
    dataf[string_cols] = dataf[string_cols].astype(str)
    dataf['total_sqft'] = pd.to_numeric(dataf['total_sqft'], errors='coerce')
    dataf['bath'] = dataf['bath'].astype(int)
    dataf['balcony'] = dataf['balcony'].astype(int)
    # print(dataf.dtypes)
    list1=[]
    for i in dataf['location']:
        list1.append(i)
    # print(list1)
    dataf.location=dataf.location.str.lower()
    list1=[]
    for i in dataf['location']:
        list1.append(i)
    # print(list1)
    dataf['location'][568]
    separator=","
    newString=separator.join(list1)
    places=[]
    for i in dataf['location']:
        if(i not in places):
            places.append(i)
    # Define a custom rating function based on the attributes you want to consider
    def calculate_rating(row):
        # You can customize this function to assign ratings based on attribute values
        rating = 0
        # Example: Assign rating based on the 'size' of the property
        size = int(str(row['size']).split()[0])
        if size >= 3:
            rating += 3
        elif size == 2:
            rating += 2
        else:
            rating += 1

        # Example: Convert and assign rating based on the 'total_sqft'
        try:
            total_sqft = float(row['total_sqft'])
            if total_sqft >= 1500:
                rating += 2
            elif total_sqft >= 1000:
                rating += 1
        except (ValueError, TypeError):
            pass  # Handle missing or non-numeric values

        return rating

    dataf['Rating'] = dataf.apply(calculate_rating, axis=1)
    X=dataf[['price']]
    x=np.array(X)
    # print(x.shape)
    knn = NearestNeighbors(n_neighbors=10000, metric='euclidean')  # Adjust parameters as needed
    knn.fit(x)
    target_price = inps[0]  # Example target price
    # target_rating = inps[1]  # Example target rating
    inpStr1=inps[1]
    # Find recommendations based on user input
    user_input = np.array([[target_price]])
    distance,indices = knn.kneighbors(user_input, return_distance=True)
    sorted_indices = indices[0][np.argsort(distance[0])]
    random.shuffle(sorted_indices)
    recommended_properties = dataf.iloc[sorted_indices]
    target_price = inps[0]
    lower_bound = 0.9 * target_price  # 90% of the target price
    recommended_properties= recommended_properties[(recommended_properties['price'] >= lower_bound) & (recommended_properties['price'] <= target_price)]
    saveRecommendation=[]
    for i in range(0, len(recommended_properties)):
        loc=recommended_properties.iloc[i]['location']
        similarity_score = fuzz.partial_ratio(inpStr1.lower(), loc.lower())
        if similarity_score >= 80: 
            # saveRecommendation.append(recommended_properties.iloc[i].to_dict())
            property_dict=recommended_properties.iloc[i].to_dict()
            property_dict = {k: v if pd.notnull(v) else None for k, v in property_dict.items()}
            saveRecommendation.append(property_dict)
    saveRecommendation=saveRecommendation[:10]
    return saveRecommendation

if __name__== "__main__":
    input_data = sys.stdin.read()
    input_data=json.loads(input_data)
    inps=[input_data['field1'],input_data['field2']]
    recommendations = recommendation_model(inps)
    print(json.dumps(recommendations))