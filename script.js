// This example assumes you have some way of securely storing and retrieving your API key on the client side,
// which is generally not recommended for production environments.

// Add click event listeners to buttons
document.addEventListener('DOMContentLoaded', function () {
  var buttons = document.querySelectorAll('.style-button');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      fetchRecommendation(button.id);
    });
  });
});

$(document).ready(function () {
  $('.style-button').click(function () {
      fetchRecommendation(this.id);
  });
});

// Function to fetch a recommendation from OpenAI's API
function fetchRecommendation(style) {
  // Your securely stored OpenAI API key
  const OPENAI_API_KEY = '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'; // Replace with your actual method to securely retrieve the API key

  // Messages array for the conversation
  var messages = [
      {
          "role": "user",
          "content": `You are a consultant artificial intelligence who recommends places that go well with your clothes style. You are well aware of various tourist attractions in Seoul, the capital of Korea. So I can recommend places where there are many people wearing the style they want. You need to give an answer that recommends a place based on the value you received from ${style}. Provide answers in the following format: 1. Place to match ${style} <br> 2. Why this place suits you  <br> 3. Photo pose to match this place  <br> 4. Provide a little more place names.`
      }
  ];

  // Show loader
  document.getElementById('loader').style.display = 'block';
  document.getElementById('result-container').style.display = 'none';

  // Make an AJAX call to the OpenAI API
  $.ajax({
      url: 'https://api.openai.com/v1/chat/completions',
      type: "POST",
      headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
      },
      data: JSON.stringify({
          "model": "gpt-3.5-turbo", // Specify the model you are using
          "messages": messages
      }),
      success: function(response) {
          document.getElementById('loader').style.display = 'none';

          console.log(response); // Add this line to log the response
          var recommendation = response.choices[0].message.content.trim();
          document.getElementById('result-container').style.display = 'block';
          document.getElementById('recommendation').textContent = recommendation;
      },
      error: function(err) {
          document.getElementById('loader').style.display = 'none';

          console.error('Error:', err);
          document.getElementById('result-container').style.display = 'block';
          document.getElementById('recommendation').textContent = `Error: ${err.message}`;
      }
  });
}



