import React, {MouseEventHandler} from "react"

interface BlockProps {
    image : string,
    textAlt : string
    title : string
    text : string
    callToActionMessage : string
    imageOrder : number
    SpeechOrder : number
    actionButton : () => MouseEventHandler<HTMLButtonElement>
}


export const  Block : React.FC<BlockProps> = ({image, textAlt, title, text,  callToActionMessage, imageOrder = 1, SpeechOrder = 2, actionButton }) => {

  return (
    <section className="p-5 lg:p-10 xl:p-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] bg-[#FDFCFA] dark:bg-[#303030] ">
        <div className={`flex items-center justify-center lg:col-span-1 order-${imageOrder}`}>
            <img className="w-auto sm:min-h-[500px]" src={image} alt={textAlt} />
        </div>
        <div className={`flex flex-col items-start justify-center lg:col-span-2  order-${SpeechOrder}`}>
            <h1 className="dark:text-white text-xl my-4">{title}</h1>
            <p className="mb-8 text-justify dark:text-white">
                {text}
            </p>
            <div>
                <button id="buttonCallToAction" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={actionButton} type="button">{callToActionMessage}</button>
            </div>
        </div>
    </section>
  )
}
