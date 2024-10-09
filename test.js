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


Use the id_token for SSO:

When the user visits subdomain1.mysite.com, the browser will automatically send the cookie containing the id_token.
subdomain1.mysite.com can then verify this id_token by checking its signature (using the public key from the OpenID Connect provider), validating its expiration, and confirming other claims such as the aud (audience) and iss (issuer).
If the token is valid, you can consider the user authenticated without needing to redirect them to account.mysite.com to generate a new authorization code.

print(f"{num_uuids} unique UUIDs have been saved to {filename}.")


-------------------

To build a Redis-based queue for email triggering, the general architecture involves several components working together to ensure that email requests are processed reliably, even when the notification service fails. Here’s how you can approach this:
Steps to Build a Redis Queue for Email Triggering:
Set up Redis:
Install Redis on your server or use a cloud-based Redis service like AWS ElastiCache, Redis Labs, etc.
Configure Redis with appropriate persistence options (AOF or RDB) to prevent data loss.
Define the API Layer:
Create an API endpoint (e.g., using Flask, Express.js, or Django) that accepts email requests. Each request should contain the necessary data for sending the email (recipient, subject, body, etc.).
Once the API receives the request, it should push this data to a Redis queue (usually a list structure in Redis).
Email Worker Service:
This service is responsible for pulling email requests from the Redis queue, processing them, and sending the emails. The worker should constantly poll the Redis queue for new entries.
If the email sending process fails, the request should be re-queued (or retried after a delay).
Handle Failures and Retries:
Use Redis’ list (queue) to hold email requests until they are successfully processed. When a worker pulls a request but fails to send an email, it requeues the request (or handles retry delays before re-adding it to the queue).
Optionally, you can add a retry counter to each email job to avoid retrying indefinitely and alerting the admin after a set number of failures.
Redis Queue Persistence:
Ensure that Redis is configured to persist the queue data on disk to prevent losing email jobs in case of crashes. Use either Append-Only File (AOF) or RDB snapshotting for persistence.
Monitoring and Alerts:
Set up monitoring for Redis and the worker service to alert if email jobs are piling up in the queue or if there are too many failures.
This setup ensures:
Resilience: Failed email requests are not lost and can be retried.
Scalability: Multiple worker services can be deployed to scale the email processing.
Persistence: Redis can store email jobs even if the service restarts or fails temporarily.

