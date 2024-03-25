import pandas as pd

# Read the dataset from a CSV file
df = pd.read_csv('./Bengaluru_House_Data.csv')

# Remove the two dots from the imagePath column
df['imagePath'] = df['imagePath'].str.replace('..', '', regex=False)

# Write the updated dataset back to a CSV file
df.to_csv('./Bengaluru_House_Data.csv', index=False)

print("Dataset updated successfully.")