import { supabase } from "../lib/supabase";

// =====================================================
// GET CURRENT USER
// =====================================================

const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  return user;
};

// =====================================================
// GET USER EXPENSES
// =====================================================

export const getExpensesFromSupabase = async () => {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data.map((expense) => ({
    id: expense.id,
    itemName: expense.item_name,
    price: Number(expense.price),
    aiCategory: expense.ai_category,
    receiptImage: expense.receipt_image,
    createdAt: expense.created_at,
  }));
};

// =====================================================
// ADD EXPENSE
// =====================================================

export const addExpenseToSupabase = async ({
  itemName,
  price,
  aiCategory,
  receiptImage = null,
}) => {
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("expenses")
    .insert([
      {
        user_id: user.id,
        item_name: itemName,
        price,
        ai_category: aiCategory,
        receipt_image: receiptImage,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    itemName: data.item_name,
    price: Number(data.price),
    aiCategory: data.ai_category,
    receiptImage: data.receipt_image,
    createdAt: data.created_at,
  };
};

// =====================================================
// UPDATE EXPENSE
// =====================================================

export const updateExpenseInSupabase = async (id, updatedData) => {
  const user = await getCurrentUser();

  const updatePayload = {
    item_name: updatedData.itemName,
    price: updatedData.price,
  };

  if (updatedData.receiptImage !== undefined) {
    updatePayload.receipt_image = updatedData.receiptImage;
  }

  const { data, error } = await supabase
    .from("expenses")
    .update(updatePayload)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    itemName: data.item_name,
    price: Number(data.price),
    aiCategory: data.ai_category,
    receiptImage: data.receipt_image,
    createdAt: data.created_at,
  };
};

// =====================================================
// DELETE EXPENSE
// =====================================================

export const deleteExpenseFromSupabase = async (id) => {
  const user = await getCurrentUser();

  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    throw error;
  }
};
