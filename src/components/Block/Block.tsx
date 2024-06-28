interface BlockProps {
    image : string,
    textAlt : string
    title : string
    text : string
    callToActionMessage : string
    actionButton : () => MouseEventHandler<HTMLButtonElement>
}


export const  Block : React.FC<BlockProps> = ({image, textAlt, title, text,  callToActionMessage, actionButton}) => {

  return (
    <section className="mr-1 md:mr-4 lg:mr-6 pr-1 md:pr-2 lg:pr-4 grid grid-cols-1 sm:grid-cols-3 dark:bg-[#404040] shadow-xl">
        <div className="flex items-center justify-center sm:col-span-1">
            <img className="w-[300px] md:min-w-full min-h-[500px]" src={image} alt={textAlt} />
        </div>
        <div className="flex flex-col items-start justify-center ml-4  sm:col-span-2">
            <h1 className="dark:text-white text-xl mb-8">{title}</h1>
            <p className="mb-8 dark:text-white">
                {text}
            </p>
            <div>
                <button id="buttonCallToAction" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 " onClick={actionButton} type="button">{callToActionMessage}</button>
            </div>
        </div>
        
    </section>
  )
}
