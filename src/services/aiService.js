import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

// ===============================
// AI Expense Categorization
// ===============================
export async function categorizeExpense(itemName) {
  try {
    const completion = await client.chat.completions.create({
      model: "openrouter/free",

      messages: [
        {
          role: "system",
          content:
            "You categorize business expenses. Reply with ONLY one category.",
        },
        {
          role: "user",
          content: `Expense: ${itemName}`,
        },
      ],

      temperature: 0,
      max_tokens: 10,
    });

    console.log("FULL RESPONSE:");
    console.log(completion);

    console.log("CHOICE:");
    console.log(completion.choices[0]);

    return completion.choices?.[0]?.message?.content?.trim() ?? "Miscellaneous";
  } catch (error) {
    console.error(error);
    return "Miscellaneous";
  }
}

// ===============================
// AI Expense Analysis
// ===============================
export async function analyzeExpenses(expenses) {
  if (!expenses.length) {
    return "No expenses available to analyze.";
  }

  try {
    const formattedExpenses = expenses
      .map(
        (expense) =>
          `${expense.itemName} - $${expense.price} (${expense.aiCategory})`,
      )
      .join("\n");

    const completion = await client.chat.completions.create({
      model: "openrouter/free",

      messages: [
        {
          role: "system",
          content:
            "You are a financial assistant. Analyze business expenses and provide concise recommendations.",
        },
        {
          role: "user",
          content: `Analyze these expenses:

${formattedExpenses}

Provide:

1. Highest spending category
2. Spending habits
3. Three recommendations

Keep the response under 150 words.`,
        },
      ],

      temperature: 0.3,
      max_tokens: 200,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Expense analysis failed");
    console.error("Status:", error.status);
    console.error("Message:", error.message);

    return "Unable to analyze expenses at the moment.";
  }
}
