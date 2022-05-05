import { CloseButton } from "../CloseButton";
import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { useState } from "react";
import { FeedBackTypeStep } from "./Steps/FeedBackTypeStep";
import { FeedBackContentStep } from "./Steps/FeedBackContentStep";
import { FeedBackSuccess } from "./Steps/FeedBackSuccess";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: "imagem de um inseto",
        },
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        },

    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de uma nuvem de pensamento'
        },
    },
}

export type feedBacktype = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedBackType, setFeedBackType] = useState<feedBacktype | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedBack() {
        setFeedbackSent(false)
        setFeedBackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

            {feedbackSent ? (
                <FeedBackSuccess onFeedbackRestartRequest={handleRestartFeedBack} />
            ) : (
                <>
                    {!feedBackType ? (
                        <FeedBackTypeStep onFeedBacktypeChanged={setFeedBackType} />
                    ) : (
                        <FeedBackContentStep
                            feedBackType={feedBackType}
                            onFeedBackRestartRequest={handleRestartFeedBack}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}

        </div>
    )
}