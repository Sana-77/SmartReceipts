import { useEffect, useRef, useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes, FaTrash } from "react-icons/fa";

import { chatWithAI } from "../services/aiService";

function AIChat({ expenses, budget, total, isOpen, onOpen, onClose }) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm your SmartReceipts AI companion. Ask me anything about your spending, budget, expenses, or ways to save money.",
    },
  ]);

  const messagesEndRef = useRef(null);

  // =====================================================
  // SCROLL TO LATEST MESSAGE
  // =====================================================

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading, isOpen]);

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const userMessage = message.trim();

    if (!userMessage || isLoading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const response = await chatWithAI({
        message: userMessage,
        expenses,
        budget,
        total,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response,
        },
      ]);
    } catch (error) {
      console.error("AI chat failed:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting to my AI service right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // =====================================================
  // CLEAR CHAT
  // =====================================================

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared. I'm ready to help you with your SmartReceipts data.",
      },
    ]);
  };

  // =====================================================
  // SUGGESTIONS
  // =====================================================

  const suggestedQuestions = [
    "What is my biggest expense?",
    "Which category costs me the most?",
    "How can I reduce my spending?",
    "Am I within my budget?",
  ];

  const handleSuggestion = (question) => {
    setMessage(question);
  };

  return (
    <>
      {/* =================================================
          FLOATING AI BUTTON
      ================================================== */}

      {!isOpen && (
        <button
          type="button"
          onClick={onOpen}
          className="
            fixed
            bottom-6
            right-6
            z-[90]

            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            bg-emerald-500
            text-white

            shadow-xl
            shadow-emerald-500/20

            transition-all
            duration-200

            hover:-translate-y-1
            hover:bg-emerald-400
            hover:shadow-2xl

            focus:outline-none
            focus:ring-4
            focus:ring-emerald-500/20

            dark:bg-emerald-500
            dark:hover:bg-emerald-400
          "
          aria-label="Open SmartReceipts AI"
          title="Open SmartReceipts AI"
        >
          <FaRobot className="text-xl" />
        </button>
      )}

      {/* =================================================
          CHAT WINDOW
      ================================================== */}

      {isOpen && (
        <div
          className="
            fixed
            bottom-6
            right-6
            z-[100]

            flex
            h-[600px]
            w-[380px]
            max-w-[calc(100vw-2rem)]
            flex-col

            overflow-hidden
            rounded-3xl

            border
            border-gray-200
            bg-white

            shadow-2xl

            dark:border-gray-700
            dark:bg-gray-900
          "
        >
          {/* =================================================
              HEADER
          ================================================== */}

          <div
            className="
              flex
              items-center
              justify-between

              bg-emerald-500
              px-5
              py-4
              text-white
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/15
                "
              >
                <FaRobot />
              </div>

              <div>
                <h2 className="font-semibold">SmartReceipts AI</h2>

                <p className="text-xs text-emerald-50">
                  Your financial companion
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Clear */}

              <button
                type="button"
                onClick={handleClearChat}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl

                  text-white/80

                  transition

                  hover:bg-white/15
                  hover:text-white
                "
                title="Clear chat"
                aria-label="Clear chat"
              >
                <FaTrash className="text-sm" />
              </button>

              {/* Close */}

              <button
                type="button"
                onClick={onClose}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl

                  text-white/80

                  transition

                  hover:bg-white/15
                  hover:text-white

                  focus:outline-none
                  focus:ring-2
                  focus:ring-white/40
                "
                title="Close chat"
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* =================================================
              MESSAGES
          ================================================== */}

          <div
            className="
              flex-1
              space-y-4
              overflow-y-auto

              bg-gray-50
              p-4

              dark:bg-gray-950
            "
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-emerald-500 text-white"
                      : "rounded-bl-md bg-white text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading */}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className="
                    rounded-2xl
                    rounded-bl-md
                    bg-white
                    px-4
                    py-3
                    shadow-sm
                    dark:bg-gray-800
                  "
                >
                  <div className="flex items-center gap-2">
                    <FaRobot className="text-emerald-500" />

                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "150ms" }}
                      />

                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* =================================================
              SUGGESTIONS
          ================================================== */}

          {messages.length === 1 && !isLoading && (
            <div
              className="
                border-t
                border-gray-200
                bg-white
                px-4
                py-3

                dark:border-gray-700
                dark:bg-gray-900
              "
            >
              <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                Try asking:
              </p>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => handleSuggestion(question)}
                    className="
                      whitespace-nowrap
                      rounded-full
                      border
                      border-emerald-200
                      bg-emerald-50
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-emerald-700

                      transition

                      hover:bg-emerald-100

                      dark:border-emerald-800
                      dark:bg-emerald-950/40
                      dark:text-emerald-300
                    "
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* =================================================
              INPUT
          ================================================== */}

          <form
            onSubmit={handleSendMessage}
            className="
              flex
              items-center
              gap-2

              border-t
              border-gray-200
              bg-white
              p-3

              dark:border-gray-700
              dark:bg-gray-900
            "
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask your AI companion..."
              disabled={isLoading}
              className="
                min-w-0
                flex-1
                rounded-xl

                border
                border-gray-300

                bg-gray-50

                px-4
                py-3

                text-sm
                text-gray-800

                outline-none
                transition

                placeholder:text-gray-400

                focus:border-emerald-500
                focus:ring-4
                focus:ring-emerald-500/10

                dark:border-gray-700
                dark:bg-gray-800
                dark:text-gray-100
                dark:placeholder:text-gray-500
              "
            />

            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center

                rounded-xl

                bg-emerald-500
                text-white

                transition

                hover:bg-emerald-400

                disabled:cursor-not-allowed
                disabled:bg-gray-400
              "
              aria-label="Send message"
            >
              {isLoading ? (
                <div
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-white
                    border-t-transparent
                  "
                />
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default AIChat;
