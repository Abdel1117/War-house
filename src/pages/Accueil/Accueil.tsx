import { Block } from "../../components/Block/Block"
import Wargame from "../../assets/images/Wargame.jpg"
import { Carousel } from "../../components/Carousel/Carousel"
const Accueil = () => {
  const myFunction = () => {
    console.log("Hello")
  }
  return (
    <section data-testid="HomeApp"  className=''>
      <Carousel />
      <Block 
          image={Wargame} 
          textAlt={"Mon image"}
          title={"Notre site"}
          text={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. At quibusdam quia, architecto similique alias, harum debitis non tempora porro asperiores explicabo vel recusandae voluptates dignissimos mollitia saepe sequi tempore quos hic? Asliquid, consequuntur? Laborum quos eius ipsa ea consequuntur repudiandae."}
          callToActionMessage={"Cliquer ici"}
          actionButton={myFunction} 
      />
     
      </section>
  )
}

export default Accueil