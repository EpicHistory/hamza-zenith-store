import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface QuickQuestion {
  id: string;
  question: string;
  category: string;
}

const staticAnswers = {
  "delivery": "We deliver within 1-2 business days. Orders are processed within 1-2 business days and delivery times may vary depending on your location.",
  "payment": "We currently accept Cash on Delivery (COD) as our primary payment method. All prices are subject to change without notice.",
  "return": "We want you to be completely satisfied with your purchase. If you're not happy with your order, please contact us within 7 days of delivery. Items must be in original condition with tags attached.",
  "contact": "Email: support@hamzastore.com | Phone: +92 370 0823338 | For privacy concerns: privacy@hamzastore.com",
  "shipping": "Delivery times may vary depending on your location. We are not responsible for delays caused by weather conditions, carrier delays, or incorrect delivery addresses.",
  "warranty": "We strive to provide accurate product descriptions and pricing. All products are carefully selected and tested to meet our high standards of quality.",
  "tracking": "You'll receive order confirmations and shipping updates via email and SMS. Contact our customer service team for order status updates.",
  "policy": "We are committed to protecting your privacy. Personal information is used solely for order fulfillment and customer service. We do not share your information with third parties without consent.",
  "about": "Hamza Store is your trusted partner in finding quality products. Founded by Hamza, we serve 1000+ happy customers with 500+ products and 24/7 customer support.",
  "exchange": "Returns must be initiated within 7 days of delivery. Return shipping costs may apply unless the return is due to our error. Contact us for the return process."
};

const quickQuestions: QuickQuestion[] = [
  { id: "delivery", question: "How long does delivery take?", category: "Shipping" },
  { id: "payment", question: "What payment methods do you accept?", category: "Payment" },
  { id: "return", question: "What is your return policy?", category: "Returns" },
  { id: "contact", question: "How can I contact customer support?", category: "Support" }
];

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickQuestion = (questionId: string) => {
    const question = quickQuestions.find(q => q.id === questionId);
    if (question) {
      addMessage(question.question, 'user');
      setShowQuickQuestions(false);
      
      // Get static answer
      const staticAnswer = staticAnswers[questionId as keyof typeof staticAnswers];
      if (staticAnswer) {
        setTimeout(() => {
          addMessage(staticAnswer, 'bot');
        }, 500);
      }
    }
  };

  const getStaticAnswer = (query: string): string | null => {
    const lowercaseQuery = query.toLowerCase();
    
    for (const [key, answer] of Object.entries(staticAnswers)) {
      if (lowercaseQuery.includes(key) || 
          (key === 'delivery' && (lowercaseQuery.includes('ship') || lowercaseQuery.includes('deliver'))) ||
          (key === 'payment' && (lowercaseQuery.includes('pay') || lowercaseQuery.includes('cod'))) ||
          (key === 'return' && (lowercaseQuery.includes('refund') || lowercaseQuery.includes('exchange'))) ||
          (key === 'contact' && (lowercaseQuery.includes('support') || lowercaseQuery.includes('help'))) ||
          (key === 'about' && (lowercaseQuery.includes('company') || lowercaseQuery.includes('store'))) ||
          (key === 'policy' && (lowercaseQuery.includes('privacy') || lowercaseQuery.includes('data')))) {
        return answer;
      }
    }
    return null;
  };

  const callGroqAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: [
            {
              role: 'system',
              content: `You are a helpful customer service assistant for Hamza Store, an e-commerce website. 
              
              Key information about Hamza Store:
              - We deliver within 1-2 business days
              - We accept Cash on Delivery (COD) as primary payment
              - 7-day return policy with original condition requirement
              - Contact: support@hamzastore.com, +92 370 0823338
              - Founded by Hamza, serving 1000+ customers with 500+ products
              - 24/7 customer support available
              - We protect customer privacy and don't share data with third parties
              
              Keep responses helpful, concise, and professional. If you don't know something specific, direct them to contact support.`
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Groq API error:', error);
      return "I'm sorry, I'm having trouble connecting right now. Please contact our support team at support@hamzastore.com or +92 370 0823338 for immediate assistance.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    addMessage(userMessage, 'user');
    setShowQuickQuestions(false);
    setIsLoading(true);

    // Check for static answer first
    const staticAnswer = getStaticAnswer(userMessage);
    
    if (staticAnswer) {
      setTimeout(() => {
        addMessage(staticAnswer, 'bot');
        setIsLoading(false);
      }, 500);
    } else {
      // Use Groq API for dynamic response
      try {
        const aiResponse = await callGroqAPI(userMessage);
        addMessage(aiResponse, 'bot');
      } catch (error) {
        addMessage("I'm sorry, I'm having trouble right now. Please contact our support team at support@hamzastore.com for immediate assistance.", 'bot');
      }
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      addMessage("👋 Welcome to Hamza Store Customer Support! How can I help you today?", 'bot');
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      initializeChat();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full shadow-premium-lg hover:scale-110 transition-transform duration-300 bg-gradient-primary border-0"
          size="icon"
        >
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      )}

      {isOpen && (
        <div className="w-80 h-96 bg-card border border-border rounded-lg shadow-premium-xl animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-primary rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary-foreground" />
              <span className="font-semibold text-primary-foreground">Hamza Store Support</span>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-hover"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 h-64 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground ml-2'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {/* Quick Questions */}
              {showQuickQuestions && messages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <HelpCircle className="h-4 w-4" />
                    <span>Quick questions:</span>
                  </div>
                  {quickQuestions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuickQuestion(q.id)}
                      className="w-full text-left p-2 text-sm bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded transition-colors duration-200"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center">
                    <Bot className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="flex-shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;