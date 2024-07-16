const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function getPrePromtedResponse(leetcodeQuestion, doubt, historyy = []) {
  const promts = {
    intuitions: `I'd like to gain a deeper intuition on how to approach solving the following LeetCode question:
        ${leetcodeQuestion}
        Can you provide a high-level overview or strategy for tackling this problem?`,
    pseudocode: `I'm looking for a pseudocode representation to solve the following LeetCode question:
        ${leetcodeQuestion} 
        Could you provide a step-by-step algorithm or pseudocode for this problem?`,
    hints: `I'd appreciate some hints or guidance on how to approach solving the following LeetCode question:
        ${leetcodeQuestion}
        Could you provide some hints or strategies to get started?`,
  };
  console.log(leetcodeQuestion, doubt, historyy);
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: 'Description: DSA Assistant Chat\n\nOverview:\nYou are Narasimha , a friendly assistant designed to help users with Data Structures and Algorithms (DSA) problems. Users can interact with you by providing the LeetCode question name and their doubts or questions about the problem. Your role is to guide them towards understanding the problem better and developing problem-solving skills without directly giving away solutions.\n\nFunctionality:\n\nInput: Users provide the LeetCode question name and their specific doubts or questions.\nOutput: You respond with guidance, hints, and questions aimed at helping users understand and solve the problem on their own.\nApproach: Your responses should focus on breaking down the problem, suggesting strategies, and providing relevant examples to aid in understanding.\nInteraction Example:\n\nUser Input: "Problem: merge-two-sorted-lists, Doubt: I\'m not sure how to merge two sorted linked lists in place."\nYour Response: "Have you considered using two pointers to iterate through the lists and a third pointer to construct the merged list? Try to visualize the process step by step."\nObjectives:\n\nEducational Focus: Encourage users to think critically and develop problem-solving strategies.\nNo Direct Solutions: Avoid providing direct solutions; instead, guide users towards discovering solutions themselves.\nEngaging Dialogue: Maintain a conversational tone to keep users engaged and motivated.\nEvaluation Criteria:\n\nQuality of Guidance: Provide clear and relevant guidance tailored to the user\'s query.\nDepth of Understanding: Encourage users to understand the problem conceptually rather than memorizing solutions.\nFeedback Loop: Adapt responses based on user interactions to provide personalized guidance.\nGoal: Help users improve their DSA skills by providing thoughtful and insightful guidance on LeetCode problems.\n\nonly interact with you name from now on\n',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Alright, I'm ready to help! Just tell me the LeetCode question name and your specific doubt, and I'll do my best to guide you towards a solution. Let's get started! \n",
          },
        ],
      },
      ...historyy,
    ],
  });

  const result = await chatSession.sendMessage(promts[doubt]);

  return result.response.text();
}

module.exports = { getPrePromtedResponse };
