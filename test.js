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


----

     import uuid

# Set the number of UUIDs to generate
num_uuids = 20000
filename = "uuids.txt"

# Open the file in write mode
with open(filename, "w") as file:
    for _ in range(num_uuids):
        # Generate a UUID and prefix it with 'U-'
        unique_id = f"U-{uuid.uuid4()}"
        # Write the UUID to the file
        file.write(unique_id + "\n")

print(f"{num_uuids} unique UUIDs have been saved to {filename}.")

---


    import uuid
from openpyxl import Workbook

# Set the number of UUIDs to generate
num_uuids = 20000
filename = "uuids.xlsx"

# Create a new Excel workbook and select the active worksheet
wb = Workbook()
ws = wb.active
ws.title = "UUIDs"

# Write headers to the first row
ws.append(["UUID"])

# Generate UUIDs and write them to the worksheet
for _ in range(num_uuids):
    unique_id = f"U-{uuid.uuid4()}"
    ws.append([unique_id])

# Save the workbook to the specified file
wb.save(filename)

print(f"{num_uuids} unique UUIDs have been saved to {filename}.")

