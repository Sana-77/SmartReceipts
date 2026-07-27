const categoryKeywords = {
  "Office Supplies": [
    "paper",
    "pen",
    "printer",
    "notebook",
    "folder",
    "ink",
    "stapler",
    "office",
    "chair",
    "desk",
  ],

  Software: [
    "figma",
    "github",
    "chatgpt",
    "openai",
    "cursor",
    "copilot",
    "windows",
    "office365",
    "adobe",
    "canva",
    "hosting",
    "domain",
  ],

  Travel: [
    "hotel",
    "flight",
    "taxi",
    "uber",
    "bus",
    "train",
    "airline",
    "fuel",
  ],

  Meals: [
    "coffee",
    "restaurant",
    "pizza",
    "lunch",
    "dinner",
    "burger",
    "food",
    "breakfast",
  ],

  Utilities: [
    "electricity",
    "water",
    "internet",
    "wifi",
    "gas",
    "phone",
    "electric",
  ],

  Marketing: [
    "facebook",
    "instagram",
    "google ads",
    "ads",
    "promotion",
    "marketing",
    "banner",
  ],

  Equipment: [
    "laptop",
    "monitor",
    "keyboard",
    "mouse",
    "camera",
    "phone",
    "tablet",
    "server",
  ],

  Transportation: [
    "parking",
    "toll",
    "metro",
    "subway",
    "fuel",
    "petrol",
    "diesel",
  ],
};

export function categorizeExpense(itemName) {
  const text = itemName.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((word) => text.includes(word))) {
      return category;
    }
  }

  return "Miscellaneous";
}
