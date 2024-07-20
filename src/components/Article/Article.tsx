import React from 'react'
import { BsCalendarDateFill } from "react-icons/bs";
import { LiaUser } from "react-icons/lia";
interface ArticleProps {
    flexOption : string;
    urlImage : string;
    altText : string;
    isPromo : boolean;
    promo : string; 
    productName : string;
    descriptionProduct : string;
    buttonEnabled : boolean;
    author : string;
    date : string;
}

export const Article : React.FC<ArticleProps>= ({flexOption = "flex-row", urlImage, altText,isPromo = false,  promo = "", productName, descriptionProduct, buttonEnabled = false, author, date}) => {
  return (
    <article className={`p-6 flex ${flexOption} h-full bg-[#FFFFFF] dark:bg-[#303030] shadow-lg relative rounded-md`}>

        <img className='max-w-[300px] h-auto' src={urlImage} alt={altText} />
        {isPromo ? 
        <div className='absolute top-12 left-72 bg-red-600 w-[60px] h-[60px] rounded-full p-4 flex items-center justify-start '>
            <p className='text-white font-bold mr-2'>
                {promo}%
            </p>
        </div>
        : 
        null
        }
        
        <div className={`${flexOption === "flex-row" ? "ml-8" : "mt-4"}`}>
            <div className=' flex justify-between'>
                <p className='dark:text-white flex items-center'><LiaUser  style={{
                    marginRight:"2px "
                }}/> {author}</p>
                <p className='dark:text-white flex items-center'><BsCalendarDateFill style={{
                    marginRight:"2px "
                }} /> {date}</p>
            </div>
            <div className='flex flex-col items-start w-full mt-20'>
                <h2 className='dark:text-white text-xl font-semibold'>{productName}</h2>
                <p className='dark:text-white mt-8'>{descriptionProduct}</p>
                {buttonEnabled ?   
                    <button className=''>Acheter</button>
                    :
                    null
                }
            </div>
        </div>
    </article>
  )
}
