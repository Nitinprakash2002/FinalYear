# import sys
# import json
# def recommend_based_on_reviews(location, max_cost, test_size=0.5):
#     from sklearn.feature_extraction.text import TfidfVectorizer
#     from sklearn.metrics.pairwise import cosine_similarity
#     from sklearn.model_selection import train_test_split
#     from sklearn.utils import shuffle
#     from sklearn.preprocessing import MinMaxScaler
#     import pandas as pd
#     import string
#     data=pd.read_csv("TrainModel/dataset.csv")
#     #Deleting Unnnecessary Columns
#     #This is the recommendation model
#     # data = shuffle(zomato, random_state=0)
#     zomato=data.drop(['url','menu_item'],axis=1)
#     train_data, test_data = train_test_split(zomato, test_size=test_size, random_state=42)
#     train_data["reviews_list"] = train_data["reviews_list"].str.lower()
# ## Removal of Puctuations
#     import string
#     PUNCT_TO_REMOVE = string.punctuation
#     def remove_punctuation(text):
#         """Custom function to remove punctuation"""
#         return text.translate(str.maketrans('', '', string.punctuation))

#     train_data["reviews_list"] = train_data["reviews_list"].apply(lambda text: remove_punctuation(text))
#     train_data = train_data.reset_index(drop=True)
#     # print(train_data)
#     test_data = test_data.reset_index(drop=True)
#     train_filtered = train_data[(train_data['location'].str.lower() == location.lower()) & (train_data['cost'] <= max_cost)]
#     # print(train_data)
#     # Combine all the reviews for each restaurant
#     # train_filtered['combined_reviews'] = train_filtered['reviews_list']
#     # Initialize the TF-IDF Vectorizer
#     tfidf = TfidfVectorizer(stop_words='english')

#     # Fit and transform the combined reviews
#     tfidf_matrix = tfidf.fit_transform(train_filtered['reviews_list'])
# # def split_data(data, test_size=0.2):
# #     # Shuffle the data to ensure randomness
#     # train_filtered.loc[:, 'combined_reviews'] = train_filtered['reviews_list']

# #     data = shuffle(data, random_state=0)
#     cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
#     recommendations = pd.DataFrame()
# #     train, test = train_test_split(data, test_size=test_size, random_state=42)
# #     return train, test



# # Function to preprocess and vectorize the reviews list
# # def vectorize_reviews(data):
# #     # Combine all the reviews for each restaurant
# #     data['combined_reviews'] = data['reviews_list']
# #
# #     # Initialize the TF-IDF Vectorizer
# #     tfidf = TfidfVectorizer(stop_words='english')
# #
# #     # Fit and transform the combined reviews
# #     tfidf_matrix = tfidf.fit_transform(data['combined_reviews'])
# #
# #     return tfidf_matrix, tfidf

#     # for index in range(len(cosine_sim)):
#     #       # Change here
#     #     sim_scores = list(enumerate(cosine_sim[index]))
#     #     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
#     #     sim_scores = sim_scores[1:31]
#     #     restaurant_indices = [i[0] for i in sim_scores]
#     #     top_restaurants = train_filtered.iloc[restaurant_indices]
#     #     recommendations = pd.concat([recommendations, top_restaurants[['cuisines', 'Mean Rating', 'cost', 'location', 'address', 'name', 'online_order', 'book_table', 'rate', 'votes', 'rest_type']]], ignore_index=True)
#     #     # recommendations = recommendations.append([top_restaurants[['cuisines', 'Mean Rating', 'cost','location','address','name','online_order','book_table','rate','votes','rest_type']]])
#     # ... previous code ...

# # Generate recommendations
#     # newdata=[]
#     # for index in range(len(cosine_sim)):
#     #     sim_scores = list(enumerate(cosine_sim[index]))
#     #     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
#     #     sim_scores = sim_scores[1:31]
#     #     restaurant_indices = [i[0] for i in sim_scores]
#     #     top_restaurants = train_filtered.iloc[restaurant_indices]
#     #     recommendations = recommendations.append(top_restaurants)
#     recommendations_list = []

#     for index in range(len(cosine_sim)):
#         sim_scores = list(enumerate(cosine_sim[index]))
#         sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
#         sim_scores = sim_scores[1:31]  # Get top 30 similar restaurants
#         restaurant_indices = [i[0] for i in sim_scores]
#         top_restaurants = train_filtered.iloc[restaurant_indices]
#         recommendations_list.append(top_restaurants)

#     # Concatenate all the DataFrames in the list into one DataFrame
#     recommendations_df = pd.concat(recommendations_list).drop_duplicates(subset=['cuisines','Mean Rating', 'cost','name']).reset_index(drop=True).drop(['reviews_list'],axis=1)
#     data_ne=recommendations_df.head(5).to_json(orient="records");
#     # data_ne=json.load(data_ne)

#     return data_ne

# if __name__=="__main__":
#     data_from_fe=sys.stdin.read()
#     # data_new=json.loads(data);

# # Convert the JSON string into a Python dictionary
#     data_new = json.loads(data_from_fe)

# # Now you can use 'data_new' in your Python script
#     location = data_new['loacion'].lower()
#     max_cost = data_new['max_cost']
#     # location = 'BTM'.lower()
#     # max_cost = 500
#     data = recommend_based_on_reviews(location, max_cost)
#     print(json.dumps(data))
import sys
import json
from fuzzywuzzy import process
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
import pandas as pd
import string

def recommend_based_on_reviews(location, max_cost, test_size=0.5):
    data = pd.read_csv("TrainModel/dataset.csv")
    zomato = data.drop(['url', 'menu_item'], axis=1)
    train_data, test_data = train_test_split(zomato, test_size=test_size, random_state=42)
    train_data["reviews_list"] = train_data["reviews_list"].str.lower()

    PUNCT_TO_REMOVE = string.punctuation
    def remove_punctuation(text):
        """Custom function to remove punctuation"""
        return text.translate(str.maketrans('', '', string.punctuation))

    train_data["reviews_list"] = train_data["reviews_list"].apply(remove_punctuation)
    train_data = train_data.reset_index(drop=True)
    test_data = test_data.reset_index(drop=True)
    
    # Fuzzy matching for location
    unique_locations = train_data['location'].unique()
    location_matched, _ = process.extractOne(location, unique_locations)

    train_filtered = train_data[(train_data['location'].str.lower() == location_matched.lower()) & (train_data['cost'] <= max_cost)]
    
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(train_filtered['reviews_list'])

    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    recommendations_list = []

    for index in range(len(cosine_sim)):
        sim_scores = list(enumerate(cosine_sim[index]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:31]  # Get top 30 similar restaurants
        restaurant_indices = [i[0] for i in sim_scores]
        top_restaurants = train_filtered.iloc[restaurant_indices]
        recommendations_list.append(top_restaurants)

    recommendations_df = pd.concat(recommendations_list).drop_duplicates(subset=['cuisines', 'Mean Rating', 'cost', 'name']).reset_index(drop=True).drop(['reviews_list'], axis=1)
    data_ne = recommendations_df.head(5).to_json(orient="records")
    
    return data_ne

if __name__ == "__main__":
    data_from_fe = sys.stdin.read()

    # Convert the JSON string into a Python dictionary
    data_new = json.loads(data_from_fe)

    # Extract required data
    location_input = data_new['loacion'].lower()
    print(location_input)
    max_cost = data_new['max_cost']

    # Call recommendation function with fuzzy matching
    data = recommend_based_on_reviews(location_input, max_cost)

    print(json.dumps(data))
