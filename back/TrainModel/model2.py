import json
import sys
def recommend_transport(inps):   
    import pandas as pd
    import numpy as np
    import matplotlib.pyplot as plt
    import nltk
    from nltk.tokenize import word_tokenize
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import linear_kernel
    from fuzzywuzzy import fuzz, process
    dataf=pd.read_csv('TrainModel/Transportation.csv')
    dataf['VIA']=dataf['VIA'].str.lower()
    dataf['Destination']=dataf['Destination'].str.lower()
    tfidf=TfidfVectorizer(stop_words='english')
    tfidf_matrix=tfidf.fit_transform(dataf['VIA'])
    cosine_sim=linear_kernel(tfidf_matrix,tfidf_matrix)
    indices=pd.Series(dataf.index,index=dataf['VIA'])
    # def get_recommendations(partial_location, dataf):
    #     # Create a list of unique VIA values
    #     via_values = dataf['Destination'].unique()
    #     matches = process.extract(partial_location, via_values, scorer=fuzz.partial_ratio, limit=10)
    #     matched_routes = pd.concat([dataf[dataf['Destination'] == match[0]] for match in matches], axis=0)
    #     return matched_routes
    def get_recommendations(partial_location, dataf):
    # Create a list of unique Destination values
        destination_values = dataf['Destination'].unique()

    # Use fuzzy string matching to find the closest matches
        matches = process.extract(partial_location, destination_values, scorer=fuzz.partial_ratio,limit=10)

    # Extract the matched routes based on Destination values
        matched_routes = pd.concat([dataf[dataf['Destination'] == match[0]] for match in matches], axis=0)

        return matched_routes
    # Example usage
    
    partial_location = inps
    recommendations = get_recommendations(partial_location, dataf).head(7)

    jsonRecommendations=recommendations.to_dict(orient='records')
    return jsonRecommendations

if __name__=="__main__":
    input_data = sys.stdin.read().strip()
    inps=input_data
    answer=recommend_transport(inps)
    print(json.dumps(answer))
