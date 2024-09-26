import pandas as pd
import json

# Load the Excel file (replace 'file.xlsx' with the actual file name)
excel_data = pd.read_excel('file.xlsx')

# Assuming the column with UUIDs is named 'UUID' or is the first column
uuid_column = excel_data.iloc[:, 0]

# Create the JSON structure
json_data = {}
for uuid in uuid_column:
    json_data[uuid] = {"BOOL": True}

# Write the JSON data to a file
with open('output.json', 'w') as json_file:
    json.dump(json_data, json_file, indent=4)

print("Excel UUIDs have been converted to JSON with boolean values!")
