import { useState } from "react";
import Wargame from "../../assets/images/Wargame.jpg";
import { Block } from "../../components/Block/Block";
import { Carousel } from "../../components/Carousel/Carousel";
import { IconsBlock } from "../../components/IconsBlock/IconsBlock";
import { useNavigate } from "react-router-dom";
import { BsDice5 } from "react-icons/bs";
import { GiTabletopPlayers } from "react-icons/gi";
import { FaPaintbrush } from "react-icons/fa6";
import { GiEvilMinion } from "react-icons/gi";
import { FaRocketchat } from "react-icons/fa";
import { TfiUser } from "react-icons/tfi";
import { ArticleBlock } from "../../components/ArticleBlock/ArticleBlock";
import { CarouselExpo } from "../../components/CarouselProfil/CarouselProfil";
import useThemeContext from "../../context/useThemeContext";

const Accueil: React.FC = () => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const myFunction = () => {
    navigate("/inscription");
  };

  /* Icônes Array */
  const imageForFirstBlockIcons: JSX.Element[] = [
    <BsDice5 color={`${theme == "light" ? "black" : "white"}`} size={70} />,
    <GiTabletopPlayers
      color={`${theme == "light" ? "black" : "white"}`}
      size={70}
    />,
    <FaPaintbrush
      color={`${theme == "light" ? "black" : "white"}`}
      size={70}
    />,
    <GiEvilMinion
      color={`${theme == "light" ? "black" : "white"}`}
      size={70}
    />,
    <FaRocketchat
      color={`${theme == "light" ? "black" : "white"}`}
      size={70}
    />,
    <TfiUser color={`${theme == "light" ? "black" : "white"}`} size={70} />,
  ];

  const profilImages: string[] = [
    "https://images.sftcdn.net/images/t_app-icon-s/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo",
    "https://images.sftcdn.net/images/t_app-icon-s/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo",
    "https://images.sftcdn.net/images/t_app-icon-s/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo",
    "https://images.sftcdn.net/images/t_app-icon-s/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo",
    "https://images.sftcdn.net/images/t_app-icon-s/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo",
    "https://images.sftcdn.net/images/t_app-icon-s/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo",
  ];

  return (
    <section data-testid="HomeApp">
      <Carousel />

      <Block
        image={Wargame}
        textAlt={"Mon image"}
        title={"Notre site"}
        text={
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At quibusdam quia, architecto similique alias, harum debitis non tempora porro asperiores explicabo vel recusandae voluptates dignissimos mollitia saepe sequi tempore quos hic? Asliquid, consequuntur? Laborum quos eius ipsa ea consequuntur repudiandae."
        }
        callToActionMessage={"Cliquer ici"}
        imageOrder={1}
        SpeechOrder={2}
        actionButton={myFunction}
      />
      <IconsBlock arrayImage={imageForFirstBlockIcons} Titre="Mon Titre" />
      <ArticleBlock />
      <CarouselExpo
        arrayImage={profilImages}
        Title="Nos utilisateurs témoignes"
        SecondTitle="C'est eux qui le disent"
      />
      <Block
        image={Wargame}
        textAlt={"Mon image"}
        title={"Notre site"}
        text={
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. At quibusdam quia, architecto similique alias, harum debitis non tempora porro asperiores explicabo vel recusandae voluptates dignissimos mollitia saepe sequi tempore quos hic? Asliquid, consequuntur? Laborum quos eius ipsa ea consequuntur repudiandae."
        }
        callToActionMessage={"Cliquer ici"}
        imageOrder={1}
        SpeechOrder={2}
        actionButton={myFunction}
      />
    </section>
  );
};

export default Accueil;
