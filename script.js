
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
  const OPENAI_API_KEY = "GITHUB 업로드시 사라지기에 임시적으로 없애고 파일 올립니다";

  // Messages array for the conversation
  var messages = [
    {
        "role": "user",
        "content": `You are a consultant artificial intelligence who recommends places that go well with your clothes style. You are well aware of various tourist attractions in Seoul, the capital of Korea. Recommend places where there are many people wearing the style they want. Please recommend only one additional place name. Please try to answer correctly as fast as possible. Say the recommendation in a sentence format. Please format your answer with the following details about the place that matches the style "${style}": 
        1. Name and Description of the Place
        2. Why this place suits the "${style}" style
        3. Suggested Photo Pose to match this place
        4. Additional Place Name and Description for the "${style}" style`
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
        var recommendationText = response.choices[0].message.content.trim();
      
        // Apply the custom formatting
        var formattedRecommendation = formatRecommendation(recommendationText);
      
        document.getElementById('result-container').style.display = 'block';
        document.getElementById('recommendation').innerHTML = formattedRecommendation;
      },      
      error: function(err) {
          document.getElementById('loader').style.display = 'none';

          console.error('Error:', err);
          document.getElementById('result-container').style.display = 'block';
          document.getElementById('recommendation').textContent = `Error: ${err.message}`;
      }
  });
}

// Initialization function to reset the interface
function initializeFunction() {
  // Hide the result container
  document.getElementById('result-container').style.display = 'none';
  // Add additional reset logic if needed
}

function formatRecommendation(text) {
  // Formatting for numbered items: Add a line break before each number
  text = text.replace(/(\d\.\s)/g, '<br><br>$1');

  // Additional formatting when ':' is found - Add a line break after ':'
  if (text.includes(":")) {
    text = text.replace(/:/g, ':<br>');
  }

  return text;
}
// script.js

document.addEventListener('DOMContentLoaded', function () {
  var findStyleButton = document.getElementById('findstyle');
  findStyleButton.addEventListener('click', function () {
    redirectToMyModel();
  });
});

function redirectToMyModel() {
  window.location.href = "my_model/index.html";
}
