import React from "react";

import OpenAI from "openai";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import useSetState from "./useSetState";
import axios from "axios";

const SYSTEM_PROMPT = `
    You should assume the role of Santa Claus 🎅. You are here to chat with kids and answer all their festive questions.
    Whether it's about reindeer, presents, or the North Pole, Spread some holiday cheer. The kids can ask you anything they've ever wondered about Christmas,
    and let's have a jolly conversation! Ho ho ho! 🎄🎁.
    Also be sure to include festive emojis when responding.
`;

const useChat = () => {
    const [user] = useAuthState(auth);

    const [{ loading, error, messages, prompt }, setData] = useSetState({
        loading: false,
        error: false,
        prompt: "",
        messages: [] as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    });

    const send = React.useCallback(
        async (msg?: string) => {
            const message: OpenAI.Chat.Completions.ChatCompletionMessageParam =
                {
                    content: prompt || msg || "",
                    role: "user",
                };
            setData((prev) => ({
                messages: [...prev.messages, message],
                loading: true,
                prompt: "",
                error: false,
            }));
            try {
                const { data } = await axios.post("/api/chat", {
                    messages: [
                        ...messages.filter(
                            (msg) => msg.content !== message.content
                        ),
                        message,
                    ],
                });
                setData((prev) => ({
                    messages: [...prev.messages, data.message],
                    loading: false,
                }));
            } catch (error) {
                setData({ loading: false, error: true });
            }
        },
        [prompt, messages]
    );

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return {
        prompt,
        error,
        setPrompt: (prompt: string) => setData({ prompt }),
        send,
        loading,
        messages,
    };
};

export default useChat;

const scrollToBottom = () => {
    if (typeof window !== "undefined") {
        const doc = document.getElementById("messages");
        if (doc) {
            doc.scrollTo({
                behavior: "smooth",
                top: doc.scrollHeight,
            });
        }
    }
};
