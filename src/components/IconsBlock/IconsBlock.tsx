interface IconsBlockProps {
  arrayImage : JSX.Element[]
  Titre : string
}

export const IconsBlock : React.FC<IconsBlockProps> = ({arrayImage, Titre = "Mon Titre"}) => {
  return (
      <section className="p-5 lg:p-10 xl:p-40 bg-[#f1f1f1] dark:bg-[#404040]  mx-auto relative">
        <div className="mt-12 lg:mt-0 lg:absolute lg:top-12 flex items-end ">
          <h2 className="dark:text-white text-2xl">Nos services</h2>
          <span className="h-[2px] w-[200px] bg-green-500 mb-3 ml-4"></span>
        </div>
        <div className="mb-6 lg:mb-0 ">
          <h3 className="dark:text-white text-3xl  lg:absolute lg:top-20 font-semibold">
            Ce que nous vous offrons
          </h3>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 md:grid-rows-2 gap-8 items-center justify-items-center bg-[#f1f1f1] dark:bg-[#404040]">
            {arrayImage.map((val, index) => (
              <div className="bg-[#FFFFFF] dark:bg-[#303030] shadow-lg rounded-md w-auto p-5 flex flex-col justify-between items-center hover:animate-pulse cursor-pointer" key={index}>
                  <div className="my-4 ">
                    {val}
                  </div> 
                  <div className="mr-auto my-2">
                    <h2 className="dark:text-[#F6F6F6] text-justify">
                     {Titre}
                    </h2>
                  </div>
                  <div>
                    <p className="mb-2 dark:text-[#F6F6F6] text-justify">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum magni similique quidem nostrum inventore quaerat reiciendis, ullam, voluptas maiores dicta atque ut eveniet? Odio error ad in minima ratione rem!
                    </p>
                  </div>
              </div>            
          ))}
        </div>

      </section>
  )
}
