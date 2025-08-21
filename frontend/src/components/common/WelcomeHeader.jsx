import { Container } from "react-bootstrap"

const WelcomeHeader = ({ userName, userType, subtitle, bgColor = "bg-light" }) => {
  const getEmoji = () => {
    switch (userType) {
      case "admin":
        return "🛡️"
      case "faculty":
        return "👨‍🏫"
      case "student":
        return "👋"
      default:
        return "👋"
    }
  }

  const getTextColor = () => {
    return bgColor === "bg-dark" ? "text-white" : "text-dark"
  }

  return (
    <div className={`${bgColor} py-3`}>
      <Container fluid>
        <h4 className={`mb-0 ${getTextColor()}`}>
          Welcome, {userName}! {getEmoji()}
        </h4>
        <small className={bgColor === "bg-dark" ? "text-light" : "text-muted"}>{subtitle}</small>
      </Container>
    </div>
  )
}

export default WelcomeHeader
