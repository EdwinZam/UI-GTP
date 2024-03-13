import { QuestionResponse } from "../../../interfaces";

export const postQuestionUseCase =async(threadId: string, question: string)=>{

    try {
        const resp = await fetch(`${import.meta.env.VITE_ASSITNT_API}/user-question`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({threadId, question})
        });

        //console.log(resp);

        const replies = await resp.json() as QuestionResponse[];

        return replies;

    } catch (error) {
        throw new Error ('Error posting question ')    
    }
}