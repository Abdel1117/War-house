

interface Banner {
    image : string
    imageDes : string 
    title : string
    text : string 
    flexDirection : "row" | "row-reverse"


}
export const Banner : React.FC <Banner> = ({image, imageDes, title, text, flexDirection}) => {
  return (
    <section>
        <div className={`flex ${flexDirection} space-x-10`}>
            <div>
                <img src={image} alt={imageDes} />
            </div>
            <div>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
        </div>
    </section>
  )
}
