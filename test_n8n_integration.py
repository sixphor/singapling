#!/usr/bin/env python3
"""
Test script for n8n integration with Singapling
Tests the chatbot webhook and customer service endpoints
"""

import requests
import json
import sys

def test_chatbot_webhook(url, question):
    """Test the chatbot webhook"""
    print(f"Testing chatbot with question: '{question}'")
    
    try:
        response = requests.post(
            url,
            json={"question": question},
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Chatbot Response:")
            print(f"   {result.get('text', 'No response text')}")
            return True
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Connection Error: {e}")
        return False

def test_customer_service_webhook(url, customer_data):
    """Test the customer service webhook"""
    print(f"Testing customer service with: {customer_data['issue']}")
    
    try:
        response = requests.post(
            url,
            json=customer_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Customer Service Response:")
            print(f"   Ticket ID: {result.get('ticketId', 'N/A')}")
            print(f"   Status: {result.get('status', 'N/A')}")
            print(f"   Response: {result.get('response', 'N/A')}")
            if result.get('offers'):
                print(f"   Offers: {len(result['offers'])} available")
            return True
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Connection Error: {e}")
        return False

def main():
    """Main test function"""
    print("🚀 Singapling n8n Integration Test")
    print("=" * 40)
    
    # Configuration
    base_url = "https://n8ngc.codeblazar.org/webhook"
    chatbot_url = f"{base_url}/chatbot"
    customer_service_url = f"{base_url}/customer-service"
    
    # Test cases
    test_questions = [
        "What plans do you have?",
        "I need help with billing",
        "Network coverage in Singapore",
        "Any special offers?"
    ]
    
    customer_test_cases = [
        {
            "email": "test@example.com",
            "issue": "I want to cancel my plan",
            "sentiment": "negative",
            "tenure": 18,
            "customerType": "existing"
        },
        {
            "email": "user@example.com",
            "issue": "Technical problem with internet",
            "priority": "high",
            "tenure": 6
        }
    ]
    
    # Test chatbot
    print("\\n🤖 Testing Chatbot Webhook")
    print("-" * 30)
    chatbot_success = 0
    for question in test_questions:
        if test_chatbot_webhook(chatbot_url, question):
            chatbot_success += 1
        print()
    
    # Test customer service
    print("\\n🎫 Testing Customer Service Webhook")
    print("-" * 40)
    cs_success = 0
    for case in customer_test_cases:
        if test_customer_service_webhook(customer_service_url, case):
            cs_success += 1
        print()
    
    # Summary
    print("📊 Test Summary")
    print("=" * 20)
    print(f"Chatbot Tests: {chatbot_success}/{len(test_questions)} passed")
    print(f"Customer Service Tests: {cs_success}/{len(customer_test_cases)} passed")
    
    if chatbot_success == len(test_questions) and cs_success == len(customer_test_cases):
        print("\\n🎉 All tests passed! n8n integration is working correctly.")
        sys.exit(0)
    else:
        print("\\n⚠️  Some tests failed. Check your n8n workflows and URLs.")
        sys.exit(1)

if __name__ == "__main__":
    main()