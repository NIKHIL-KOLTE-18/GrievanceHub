"use client"

import { useState } from "react"
import { Card, Button, Form } from "react-bootstrap"

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! I'm here to help with common grievance questions. How can I assist you?", isBot: true },
  ])
  const [selectedFAQ, setSelectedFAQ] = useState("")

  const faqs = [
    {
      question: "How do I submit a grievance?",
      answer:
        "To submit a grievance, log in to your account, go to 'Submit Complaint', select your department and category, describe your issue, and attach any relevant documents.",
    },
    {
      question: "How long does it take to resolve a complaint?",
      answer:
        "Resolution time varies by complexity. Academic issues typically take 5-7 days, administrative issues 3-5 days, and behavioral issues 7-10 days.",
    },
    {
      question: "Can I track my complaint status?",
      answer:
        "Yes! Once logged in, go to 'My Complaints' to view all your submissions, their current status, and resolution history.",
    },
    {
      question: "Who can see my complaint?",
      answer:
        "Only relevant faculty members from your selected department, administrators, and you can view your complaint details.",
    },
    {
      question: "What if I'm not satisfied with the resolution?",
      answer:
        "You can appeal the decision by contacting the admin or submitting a follow-up complaint with additional details.",
    },
    {
      question: "Can I submit anonymous complaints?",
      answer:
        "Currently, all complaints require user authentication for accountability. However, your identity is only visible to authorized personnel.",
    },
  ]

  const handleFAQSelect = (faq) => {
    setMessages((prev) => [...prev, { text: faq.question, isBot: false }, { text: faq.answer, isBot: true }])
    setSelectedFAQ("")
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <div className="position-fixed bottom-0 end-0 m-4" style={{ zIndex: 1050 }}>
        <Button
          className="primary-btn rounded-circle p-3 shadow-lg d-flex align-items-center justify-content-center"
          onClick={toggleChatbot}
          style={{ width: "60px", height: "60px" }}
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-comments"}`}></i>
        </Button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div
          className="position-fixed bottom-0 end-0 m-4"
          style={{ zIndex: 1049, width: "350px", marginBottom: "80px" }}
        >
          <Card className="card-custom shadow-lg">
            <Card.Header className="bg-primary-custom text-white">
              <div className="d-flex align-items-center">
                <i className="fas fa-robot me-2"></i>
                <strong>GrievanceBot</strong>
                <Button variant="link" className="text-white ms-auto p-0" onClick={toggleChatbot}>
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="chat-messages" style={{ height: "400px", overflowY: "auto" }}>
              <div>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-3 d-flex ${message.isBot ? "justify-content-start" : "justify-content-end"}`}
                  >
                    <div
                      className={`p-2 rounded-3 ${
                        message.isBot ? "bg-light text-dark" : "bg-primary-custom text-white"
                      }`}
                      style={{ maxWidth: "80%" }}
                    >
                      <small>{message.text}</small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
            <Card.Footer className="bg-light">
              <Form.Group>
                <Form.Label className="small fw-semibold mb-2">Select a common question:</Form.Label>
                <Form.Select size="sm" value={selectedFAQ} onChange={(e) => setSelectedFAQ(e.target.value)}>
                  <option value="">Choose a question...</option>
                  {faqs.map((faq, index) => (
                    <option key={index} value={index.toString()}>
                      {faq.question}
                    </option>
                  ))}
                </Form.Select>
                {selectedFAQ && (
                  <Button
                    size="sm"
                    className="primary-btn mt-2 w-100"
                    onClick={() => handleFAQSelect(faqs[Number.parseInt(selectedFAQ)])}
                  >
                    Ask Question
                  </Button>
                )}
              </Form.Group>
            </Card.Footer>
          </Card>
        </div>
      )}
    </>
  )
}

export default Chatbot
