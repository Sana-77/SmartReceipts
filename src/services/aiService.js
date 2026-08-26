import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

// ==================================================
// FREE MODELS (tries each one until one works)
// ==================================================

const FREE_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "mistralai/mistral-7b-instruct:free",
  "google/gemma-2-9b-it:free",
  "qwen/qwen-2.5-7b-instruct:free",
  "openrouter/free",
];

// ==================================================
// Generic Request Function
// ==================================================

async function requestAI(messages, temperature = 0.2, max_tokens = 150) {
  let lastError = null;

  for (const model of FREE_MODELS) {
    try {
      console.log(`Trying model: ${model}`);

      const completion = await client.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens,
      });

      const response = completion.choices?.[0]?.message?.content?.trim();

      if (response) {
        console.log(`Success using ${model}`);
        return response;
      }
    } catch (error) {
      console.warn(`${model} failed`);
      console.warn(error.message);

      lastError = error;
    }
  }

  throw lastError;
}

// ==================================================
// AI Expense Categorization
// ==================================================

export async function categorizeExpense(itemName) {
  try {
    const response = await requestAI(
      [
        {
          role: "system",
          content: `
You categorize business expenses.

Reply with ONLY ONE of these categories.

Office Supplies
Travel
Meals
Software
Utilities
Marketing
Equipment
Transportation
Miscellaneous

Return ONLY the category name.
`,
        },
        {
          role: "user",
          content: itemName,
        },
      ],
      0,
      20,
    );

    const categories = [
      "Office Supplies",
      "Travel",
      "Meals",
      "Software",
      "Utilities",
      "Marketing",
      "Equipment",
      "Transportation",
      "Miscellaneous",
    ];

    const category = categories.find((c) =>
      response.toLowerCase().includes(c.toLowerCase()),
    );

    return category || "Miscellaneous";
  } catch (error) {
    console.error("Categorization failed");
    console.error(error);

    return "Miscellaneous";
  }
}

// ==================================================
// AI Expense Analysis
// ==================================================

export async function analyzeExpenses(expenses) {
  if (!expenses.length) {
    return {
      summary: "No expenses available to analyze.",
      topCategory: "No data",
      observation:
        "There is not enough spending data to identify a spending pattern.",
      recommendations: [],
      savingTip:
        "Add some expenses to receive personalized saving recommendations.",
    };
  }

  try {
    const formattedExpenses = expenses
      .map(
        (expense) =>
          `${expense.itemName} - $${Number(expense.price || 0).toFixed(2)} (${
            expense.aiCategory || "Miscellaneous"
          })`,
      )
      .join("\n");

    const response = await requestAI(
      [
        {
          role: "system",
          content: `
You are SmartReceipts AI, a business expense analysis assistant.

Your job is to analyze the user's recorded expenses and create a simple,
easy-to-understand financial report.

IMPORTANT RULES:

1. Use ONLY the expense information provided.
2. Never invent expenses, prices, categories, or financial information.
3. Identify the category with the highest total spending.
4. Explain the user's main spending behavior.
5. Provide exactly 3 practical recommendations.
6. Provide one practical saving tip.
7. Use simple language that a normal user can easily understand.
8. Keep the summary concise.
9. Do not use complicated financial terminology.
10. Return ONLY valid JSON.
11. Do NOT use Markdown.
12. Do NOT use \`\`\`json.
13. Do NOT write anything before or after the JSON.

Return EXACTLY this structure:

{
  "summary": "A simple 2-3 sentence overview of the user's spending.",
  "topCategory": "The category with the highest total spending.",
  "observation": "A simple explanation of the user's main spending pattern.",
  "recommendations": [
    "First practical recommendation.",
    "Second practical recommendation.",
    "Third practical recommendation."
  ],
  "savingTip": "One short practical saving tip."
}
`,
        },

        {
          role: "user",
          content: `
Analyze these recorded expenses:

${formattedExpenses}

Create the financial report using the required JSON structure.
`,
        },
      ],
      0.2,
      300,
    );

    // ==================================================
    // CLEAN RESPONSE
    // ==================================================

    let cleanedResponse = response.trim();

    // Remove Markdown code fences if the AI adds them
    cleanedResponse = cleanedResponse
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    // ==================================================
    // PARSE JSON
    // ==================================================

    let parsed;

    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.warn("AI returned invalid JSON. Trying to recover...");

      const start = cleanedResponse.indexOf("{");
      const end = cleanedResponse.lastIndexOf("}");

      if (start !== -1 && end !== -1 && end > start) {
        const possibleJson = cleanedResponse.slice(start, end + 1);

        try {
          parsed = JSON.parse(possibleJson);
        } catch (recoveryError) {
          console.error("JSON recovery failed.");
          console.error(recoveryError);

          throw new Error("AI returned an invalid analysis format.");
        }
      } else {
        throw new Error("AI returned an invalid analysis format.");
      }
    }

    // ==================================================
    // VALIDATE RECOMMENDATIONS
    // ==================================================

    const recommendations = Array.isArray(parsed.recommendations)
      ? parsed.recommendations
          .filter((item) => typeof item === "string" && item.trim().length > 0)
          .slice(0, 3)
      : [];

    // ==================================================
    // RETURN STRUCTURED REPORT
    // ==================================================

    return {
      summary:
        typeof parsed.summary === "string" && parsed.summary.trim()
          ? parsed.summary.trim()
          : "Your spending has been analyzed.",

      topCategory:
        typeof parsed.topCategory === "string" && parsed.topCategory.trim()
          ? parsed.topCategory.trim()
          : "Not available",

      observation:
        typeof parsed.observation === "string" && parsed.observation.trim()
          ? parsed.observation.trim()
          : "No specific spending pattern was identified.",

      recommendations,

      savingTip:
        typeof parsed.savingTip === "string" && parsed.savingTip.trim()
          ? parsed.savingTip.trim()
          : "Review your largest spending categories to find opportunities to save.",
    };
  } catch (error) {
    console.error("Analysis failed");
    console.error(error);

    // Safe fallback so the dashboard does not break
    return {
      summary: "SmartReceipts could not generate the AI report right now.",

      topCategory: "Not available",

      observation: "The AI analysis could not be completed at this time.",

      recommendations: [
        "Review your largest recorded expenses.",
        "Check which category uses the most of your spending.",
        "Consider setting a monthly spending limit.",
      ],

      savingTip:
        "Review your recent expenses and look for one unnecessary cost you can reduce.",
    };
  }
}
// -------------------------
// AI Chat Companion
// -------------------------

export async function chatWithAI({ message, expenses, budget, total }) {
  try {
    const expenseSummary = expenses.map((expense) => ({
      itemName: expense.itemName,
      price: Number(expense.price),
      category: expense.aiCategory || "Miscellaneous",
      date: expense.createdAt,
    }));

    const remaining = Number(budget || 0) - Number(total || 0);

    const largestExpense =
      expenses.length > 0
        ? expenses.reduce((max, expense) =>
            Number(expense.price) > Number(max.price) ? expense : max,
          )
        : null;

    const averageExpense =
      expenses.length > 0 ? Number(total) / expenses.length : 0;

    const categoryTotals = expenses.reduce((acc, expense) => {
      const category = expense.aiCategory || "Miscellaneous";

      acc[category] = (acc[category] || 0) + Number(expense.price);

      return acc;
    }, {});

    const systemPrompt = `
You are SmartReceipts AI, a friendly and intelligent financial companion.

You are part of the SmartReceipts expense tracking application.

Your purpose is to help the user understand their business expenses,
budget, spending behavior, categories, and financial organization.

You should behave like a helpful companion rather than a generic chatbot.

IMPORTANT RULES:

1. Answer questions using the SmartReceipts data provided below.
2. Never invent expenses, prices, categories, or financial information.
3. If the user's question cannot be answered using the available data,
   clearly explain that the information is not available.
4. You can answer questions about:
   - spending
   - expenses
   - categories
   - budget
   - remaining budget
   - largest expenses
   - average expenses
   - spending patterns
   - saving opportunities
   - budgeting suggestions
5. You may provide practical suggestions based on the user's spending.
6. Be conversational, friendly, and natural.
7. Keep answers concise unless the user asks for more detail.
8. Use actual numbers from the user's data when relevant.
9. For longer answers, use short paragraphs or bullet points.
10. Do not claim to have access to information outside the provided data.
11. If the user asks a general financial question, you may answer it
    generally, but clearly distinguish it from their personal data.
12. You are not a licensed financial advisor, so avoid presenting
    high-risk financial decisions as guaranteed advice.

CURRENT SMARTRECEIPTS DATA

Total Spending:
$${Number(total || 0).toFixed(2)}

Monthly Budget:
$${Number(budget || 0).toFixed(2)}

Remaining Budget:
$${remaining.toFixed(2)}

Number of Expenses:
${expenses.length}

Average Expense:
$${averageExpense.toFixed(2)}

Largest Expense:
${
  largestExpense
    ? `${largestExpense.itemName} - $${Number(largestExpense.price).toFixed(
        2,
      )} (${largestExpense.aiCategory || "Miscellaneous"})`
    : "No expenses recorded"
}

Spending by Category:
${JSON.stringify(categoryTotals, null, 2)}

Individual Expenses:
${JSON.stringify(expenseSummary, null, 2)}
`;

    return await requestAI(
      [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      0.7,
      300,
    );
  } catch (error) {
    console.error("AI chat failed");
    console.error(error);

    throw error;
  }
}
