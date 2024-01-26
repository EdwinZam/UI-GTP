import { useState } from "react"
import { GptMessage, MyMessage, TextMessageBox, TypingLoader } from "../components"

interface Message {
  text: string;
  isGpt: boolean;
}


export const ChatTemplate = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) =>{
    setIsLoading(true);
    setMessages((prev) => [...prev, {text: text, isGpt: false}]);
    //useCase
    setIsLoading(false);
    //Todo: Añadir msj isGPT true
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GptMessage text="Hello, Puedes escribir tu texto y con gusto yo lo corregire" />

          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={index} text="Esto es de OpenAI" /> 
                )
                : (
                  <MyMessage key={index} text={message.text} />
                )
            ) )
          }

          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader />
              </div>
            )
          }
          
        </div>
      </div>
      {/* text message Box */}
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe lo que deseas"
        disableCorrection
      />
    </div>
  )
}
