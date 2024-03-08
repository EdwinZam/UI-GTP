import { useState } from "react"
import { GptMessage, GptMessageImage, MyMessage, TextMessageBox, TypingLoader } from "../../components"
import { imageGenerationUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl:string;
    alt: string;   
  }
}


export const ImageGenerationPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])

  const handlePost = async (text: string) =>{
    setIsLoading(true);
    setMessages((prev) => [...prev, {text: text, isGpt: false}]);
    
    const imageInfo = await imageGenerationUseCase(text);
    setIsLoading(false);

    if(!imageInfo){
      return setMessages((prev) => [...prev, {text: 'No se pudo generar la imagen', isGpt: true}])
    }
    setMessages( prev => [
      ...prev,
      {
        text: text,
        isGpt: true,
        info:{
          imageUrl: imageInfo.url,
          alt: imageInfo.url  
        }   
      }
    ]

    )
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Welcome */}
          <GptMessage text="Hola, Puedes escribir tu texto y con gusto creare una imagen" />

          {
            messages.map( (message, index) => (
              message.isGpt
                ? (
                  <GptMessageImage 
                    key={index} 
                    text={message.text}
                    imageUrl={message.info?.imageUrl!}
                    alt={message.info?.alt!}
                  /> 
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
