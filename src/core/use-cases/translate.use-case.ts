import type { TranslateResponsse } from "../../interfaces";

export const translateUseCase = async (prompt: string, lang: string) => {

    try {

        const resp = await fetch(`http://localhost:3000/gpt/translate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, lang })
        });
        if (!resp.ok) throw new Error('No se pudo realizar la traducción');

        const data = await resp.json() as TranslateResponsse;

        // console.log(data)

        return {
            ok: true,
            ...data
        }

    } catch (error) {
        return {
            ok: false,
            content: 'No se pudo realizar la traducción'
        }
    }

}