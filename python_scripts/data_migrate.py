import psycopg2
import pandas as pd
from dotenv import load_dotenv
import os
from datetime import datetime

# Load environment variables
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Directory containing CSV files
csv_directory = "/Users/danschmidt/Downloads/importProps"

try:
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    print("Connection successful")

    # Loop through all CSV files in the directory
    for filename in os.listdir(csv_directory):
        if filename.endswith(".csv"):
            # Construct full filepath
            csv_file_path = os.path.join(csv_directory, filename)

            # Parse filename for year and proposition name
            # Expected format: e.g., "2010_Amendment_P_Regulation_of_Games_of_Chance.csv"
            base_name = os.path.splitext(filename)[0]  # remove .csv extension
            parts = base_name.split("_")
            if len(parts) < 2:
                print(f"Skipping '{filename}' because it doesn't match the naming pattern.")
                continue

            proposition_year = parts[0]
            # Convert year to int and ensure it's valid
            try:
                proposition_year = int(proposition_year)
            except ValueError:
                print(f"Skipping '{filename}' because the year '{proposition_year}' is not valid.")
                continue
            
            # Re-join the remaining parts as the proposition name
            proposition_name_str = " ".join(parts[1:])
            
            proposition_description = "TODO"
            
            # Read the CSV data
            data = pd.read_csv(csv_file_path)

            # Insert proposition
            timestamp = datetime.now()
            insert_proposition_query = """
                INSERT INTO propositions (name, description, year, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s) RETURNING id
            """
            cursor.execute(insert_proposition_query, (proposition_name_str, proposition_description, proposition_year, timestamp, timestamp))
            proposition_id = cursor.fetchone()[0]
            print(f"Inserted proposition '{proposition_name_str}' with ID: {proposition_id}")

            # Prepare insert query for proposition_county_votes
            insert_votes_query = """
                INSERT INTO proposition_county_votes (proposition_id, county_id, yes_count, no_count, updated_at)
                VALUES (%s, %s, %s, %s, %s)
            """

            # Iterate through CSV rows
            for index, row in data.iterrows():
                try:
                    county_name = row["County"]
                    if county_name == "Totals":
                        print("Skipping 'Totals' row.")
                        continue  # Skip totals row

                    # Parse yes and no counts
                    yes_count = int(row["Yes\nNone/Unknown"].replace(",", "").replace("None/Unknown", "0"))
                    no_count = int(row["No\nNone/Unknown"].replace(",", "").replace("None/Unknown", "0"))

                    # Fetch County ID
                    cursor.execute("SELECT id FROM counties WHERE name = %s", (county_name,))
                    county_result = cursor.fetchone()
                    if county_result is None:
                        print(f"Error: County '{county_name}' not found in the database.")
                        continue

                    county_id = county_result[0]

                    # Insert votes
                    cursor.execute(insert_votes_query, (proposition_id, county_id, yes_count, no_count, timestamp))
                    print(f"Data inserted for county '{county_name}' (County ID: {county_id})")
                
                except Exception as e:
                    print(f"Error inserting row for county '{county_name}': {e}")

            # Commit after each file to ensure data integrity
            conn.commit()
            print(f"Data migration for '{filename}' completed successfully!")

except Exception as e:
    print(f"An error occurred: {e}")

finally:
    if cursor:
        cursor.close()
    if conn:
        conn.close()
