#!/usr/bin/env python3
"""
CSV to TXT Converter Script
Converts SingaPlingPlanDetails.csv and SingaPlingRetentionOffers.csv to formatted TXT files
"""

import csv
import os
from typing import List, Dict

def read_csv_file(file_path: str) -> List[Dict[str, str]]:
    """
    Read CSV file and return list of dictionaries
    """
    data = []
    try:
        with open(file_path, 'r', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                data.append(row)
        print(f"Successfully read {len(data)} rows from {file_path}")
        return data
    except FileNotFoundError:
        print(f"Error: File {file_path} not found")
        return []
    except Exception as e:
        print(f"Error reading {file_path}: {str(e)}")
        return []

def format_plan_details_to_txt(data: List[Dict[str, str]], output_file: str) -> None:
    """
    Convert plan details CSV data to formatted TXT
    """
    try:
        with open(output_file, 'w', encoding='utf-8') as txtfile:
            txtfile.write("SINGAPLING PLAN DETAILS\n")
            txtfile.write("=" * 50 + "\n\n")
            
            for i, row in enumerate(data, 1):
                txtfile.write(f"Plan {i}:\n")
                txtfile.write(f"  Name: {row.get('Plan', 'N/A')}\n")
                txtfile.write(f"  Price: ${row.get('Price', 'N/A')}\n")
                txtfile.write(f"  Data: {row.get('Data', 'N/A')}\n")
                txtfile.write(f"  Service Type: {row.get('Service Type', 'N/A')}\n")
                txtfile.write(f"  Speed: {row.get('Speed', 'N/A')}\n")
                txtfile.write("-" * 30 + "\n")
            
        print(f"Successfully converted plan details to {output_file}")
    except Exception as e:
        print(f"Error writing to {output_file}: {str(e)}")

def format_retention_offers_to_txt(data: List[Dict[str, str]], output_file: str) -> None:
    """
    Convert retention offers CSV data to formatted TXT
    """
    try:
        with open(output_file, 'w', encoding='utf-8') as txtfile:
            txtfile.write("SINGAPLING RETENTION OFFERS\n")
            txtfile.write("=" * 50 + "\n\n")
            
            for i, row in enumerate(data, 1):
                txtfile.write(f"Offer {i}:\n")
                txtfile.write(f"  Code: {row.get('OfferCode', 'N/A')}\n")
                txtfile.write(f"  Description: {row.get('Description', 'N/A')}\n")
                txtfile.write(f"  Eligibility: {row.get('Eligibility', 'N/A')}\n")
                txtfile.write("-" * 50 + "\n")
            
        print(f"Successfully converted retention offers to {output_file}")
    except Exception as e:
        print(f"Error writing to {output_file}: {str(e)}")

def main():
    """
    Main function to convert CSV files to TXT format
    """
    # Define file paths
    documents_dir = "documents"
    plan_details_csv = os.path.join(documents_dir, "SingaPlingPlanDetails.csv")
    retention_offers_csv = os.path.join(documents_dir, "SingaPlingRetentionOffers.csv")
    
    plan_details_txt = os.path.join(documents_dir, "SingaPlingPlanDetails.txt")
    retention_offers_txt = os.path.join(documents_dir, "SingaPlingRetentionOffers.txt")
    
    print("Starting CSV to TXT conversion...")
    print("=" * 40)
    
    # Convert Plan Details
    print("\n1. Converting Plan Details...")
    plan_data = read_csv_file(plan_details_csv)
    if plan_data:
        format_plan_details_to_txt(plan_data, plan_details_txt)
    
    # Convert Retention Offers
    print("\n2. Converting Retention Offers...")
    retention_data = read_csv_file(retention_offers_csv)
    if retention_data:
        format_retention_offers_to_txt(retention_data, retention_offers_txt)
    
    print("\n" + "=" * 40)
    print("Conversion completed!")
    
    # Display summary
    if os.path.exists(plan_details_txt):
        print(f"✓ Created: {plan_details_txt}")
    if os.path.exists(retention_offers_txt):
        print(f"✓ Created: {retention_offers_txt}")

if __name__ == "__main__":
    main()