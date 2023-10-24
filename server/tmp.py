import requests

# Your LendingTree API key
api_key = "<YOUR_LENDINGTREE_API_KEY>"

# The JSON data to send in the request body
request_body = {
  "accounts": [
    {
      "account_id": "A3wenK5EQRfKlnxlBbVXtPw9gyazDWu1EdaZD",
      "balances": {
        "available": 100,
        "current": 110,
      },
      "subtype": "checking",
      "type": "depository"
    },
    {
      "account_id": "GPnpQdbD35uKdxndAwmbt6aRXryj4AC1yQqmd",
      "balances": {
        "available": 200,
        "current": 210,
      },
      "subtype": "savings",
      "type": "depository"
    },
    {
      "account_id": "nVRK5AmnpzFGv6LvpEoRivjk9p7N16F6wnZrX",
      "balances": {
        "current": 1000,
      },
      "subtype": "cd",
      "type": "depository"
    }
  ]
}

# Make a POST request to the LendingTree loan prediction API
response = requests.post(
  "https://api.lendingtree.com/loans/predict",
  headers={"Authorization": f"Bearer {api_key}"},
  json=request_body
)

# Get the loan prediction results
prediction_results = response.json()

# The probability of getting approved for a loan
approval_probability = prediction_results["approval_probability"]

# The estimated interest rate for the loan
estimated_interest_rate = prediction_results["estimated_interest_rate"]

# Print the loan prediction results
print("Approval probability:", approval_probability)
print("Estimated interest rate:", estimated_interest_rate)
