# import pandas as pd
# import random
# from fuzzywuzzy import process

# # Load the dataset
# df = pd.read_csv('./experiment.csv')

# # Define the list of cities and their corresponding postal codes
# cities = {
#     'yelahanka': '560064',
#     'electroniccity': '560100',
#     'btm': '560076',
#     'hebbal': '560024',
#     'mekhricircle': '560006',
#     'whitefield': '560066'
# }

# # Generate random addresses for the given cities
# def generate_random_address(city):
#     street_names = ['Main Street', 'First Avenue', 'Second Road', 'Park Avenue', 'Elm Street']
#     return f'{random.randint(1, 100)}, {random.choice(street_names)}, {city}, Bangalore - {cities[city]}'

# # Add a new column named "address" with random addresses based on city
# def generate_address(row):
#     location = str(row['location']).lower().replace(' ', '')  # Ensure 'location' is converted to string and properly formatted
#     match, score = process.extractOne(location, cities.keys())
#     city = match if score >= 80 else random.choice(list(cities.keys()))
#     return generate_random_address(city)

# df['address'] = df.apply(generate_address, axis=1)

# # Save the modified dataset
# df.to_csv('experiment.csv', index=False)

# print("Address column added successfully!")





# import pandas as pd
# import random

# # Function to generate random contact numbers
# def generate_contact_number():
#     return random.randint(8000000000, 9999999999)

# # Load the existing CSV file
# csv_file = "./Bengaluru_House_Data.csv"  # Replace 'your_existing_data.csv' with your actual CSV file path
# dataf = pd.read_csv(csv_file)

# # Generate random contact numbers and add them as a new column
# dataf['contact_number'] = [generate_contact_number() for _ in range(len(dataf))]

# # Save the modified DataFrame back to CSV
# output_csv_file = "./Bengaluru_House_Data.csv"  # Replace 'modified_data_with_contact_numbers.csv' with your desired output file path
# dataf.to_csv(output_csv_file, index=False)

# print("Contact numbers added successfully and saved to:", output_csv_file)



# import csv

# # Path to the input CSV file
# input_file = './Bengaluru_House_Data_cleaned.csv'

# # Path to the output CSV file
# output_file = './Bengaluru_House_Data_cleaned1.csv'

# # Open the input CSV file for reading and output CSV file for writing
# with open(input_file, 'r', newline='') as infile, open(output_file, 'w', newline='') as outfile:
#     reader = csv.reader(infile)
#     writer = csv.writer(outfile)

#     # Write the header row to the output file
#     header = next(reader)
#     writer.writerow(header)

#     # Process each row in the CSV
#     for row in reader:
#         # Clean the 'location' column (assuming it's the 3rd column)
#         location = row[11]
#         cleaned_location = ' '.join(location.split(','))
#         row[11] = cleaned_location

#         # Write the modified row to the output CSV file
#         writer.writerow(row)

# print("CSV file cleaned successfully.")





# import pandas as pd

# # Read the CSV file
# df = pd.read_csv('./Bengaluru_House_Data.csv')

# # Check if the 'society' column is empty and replace empty values with 'No Society'
# df['society'] = df['society'].fillna('No Society')

# # Write the modified data back to the CSV file
# df.to_csv('modified_dataset.csv', index=False)

# print("Processing completed. Modified dataset saved to 'modified_dataset.csv'.")

import pandas as pd

# Read the CSV file
df = pd.read_csv('./Bengaluru_House_Data.csv')

# Convert 'balcony' column from float to integer
df['total_sqft'] = df['total_sqft'].round().astype(int)

# Write the modified data back to the CSV file
df.to_csv('./Bengaluru_House_Data.csv', index=False)


# import pandas as pd
# import numpy as np

# # Read the CSV file
# df = pd.read_csv('./Bengaluru_House_Data.csv')

# # Check for NaN or infinite values in 'balcony' column
# invalid_values_mask = (df['bath'].isna()) | (~np.isfinite(df['bath']))

# # Replace invalid values with 0
# df.loc[invalid_values_mask, 'bath'] = 0

# # Write the modified data back to the CSV file
# df.to_csv('./Bengaluru_House_Data.csv', index=False)


