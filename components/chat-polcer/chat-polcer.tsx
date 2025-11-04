'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Image as ImageIcon,
  Mic,
  Plus,
  Search,
  Send,
  Settings,
  Star
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// shadcn/ui Sidebar components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
}

const chatItems = [
  {
    id: '1',
    title: 'Chat about AI',
    lastMessage: 'What is machine learning?',
    timestamp: new Date(),
  },
  {
    id: '2',
    title: 'Coding help',
    lastMessage: 'How to use React hooks?',
    timestamp: new Date(),
  },
]

export default function ChatPolcer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Good evening, zhou-shi',
      timestamp: new Date()
    },
    {
      id: '2',
      sender: 'bot',
      text: 'How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'I understand your question. Let me help you with that.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-white">
        {/* Sidebar - Exact match dengan screenshot */}
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="bg-white border-b border-gray-200">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start h-10 px-3 py-2 hover:bg-gray-50">
                  <Plus className="h-4 w-4" />
                  <span className="ml-2">New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search Chats"
                  className="pl-10 h-9 bg-gray-50 border-gray-200 text-sm"
                />
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="bg-white">
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Today
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {chatItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton className="w-full justify-start h-auto p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 w-full">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Star className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-xs text-gray-500 truncate">{item.lastMessage}</div>
                          </div>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="bg-white border-t border-gray-200">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-start h-10 px-3 py-2 hover:bg-gray-50">
                  <Settings className="h-4 w-4" />
                  <span className="ml-2">Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Chat Area - Exact match dengan screenshot */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header - Exact match */}
          <header className="flex h-16 items-center gap-3 border-b border-gray-200 bg-white px-6">
            <SidebarTrigger className="h-8 w-8 hover:bg-gray-50" />
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-semibold text-gray-900">Good evening, zhou-shi</h2>
                <p className="text-sm text-gray-500">How can I help you today?</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Polcer AI
              </div>
            </div>
          </header>

          {/* Messages Area - Exact match */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                )}

                <div className={`max-w-3xl ${message.sender === 'user' ? 'ml-auto' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white text-gray-900 shadow-sm border border-gray-100'
                      }`}
                  >
                    {message.text}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600">U</span>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Exact match */}
          <div className="border-t border-gray-200 bg-white px-6 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="h-10 pr-12 border-gray-200 focus:border-primary"
                    disabled={isLoading}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || inputValue.trim() === ''}
                  size="icon"
                  className="h-9 w-9 bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Actions - Exact match */}
              <div className="flex items-center gap-2 mt-3">
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs border-gray-200 text-gray-700 hover:bg-gray-50">
                  Image Edit
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs border-gray-200 text-gray-700 hover:bg-gray-50">
                  Web Dev
                </Button>
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs border-gray-200 text-gray-700 hover:bg-gray-50">
                  Thinking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}