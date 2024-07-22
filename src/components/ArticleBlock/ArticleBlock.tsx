import React from 'react'
import { Article } from '../Article/Article'

export const ArticleBlock : React.FC = () => {
  return (
    <section  className="p-1 sm:px-5 lg:px-10 xl:px-40 bg-[#f1f1f1] dark:bg-[#404040]  mx-auto relative"> 
        <div className='grid grid-cols-1 xl:grid-cols-3 xl:grid-rows-2 gap-y-5 xl:gap-5'>
            <div className='col-span-2'>
                <Article 
                flexOption='md:flex-row'
                urlImage={"https://i.redd.it/foifdxq3sksb1.jpg"}                
                altText={"Image Article"}
                isPromo={true}
                promo='34'
                productName={"Figurine Iron Hands"}
                descriptionProduct={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, facilis excepturi exercitationem animi maiores quae error rem numquam mollitia tempora sed delectus recusandae, impedit ea dolore! Beatae eos ratione quasi tenetur vitae ut, non eaque veritatis dignissimos aspernatur reprehenderit obcaecati, ipsa voluptate numquam quae explicabo pariatur."}
                buttonEnabled={false}
                author='Jean Dupont'
                date='12/12/2024'
                />
            </div>
            <div className='xl:row-span-2'>
            <Article 
                flexOption='flex-col md:flex-row xl:flex-col'
                urlImage={"https://preview.redd.it/iron-hands-been-getting-some-love-could-be-a-sign-v0-8s1sh8kdfflb1.jpg?width=640&crop=smart&auto=webp&s=8a917686c41e5843916a9666b440df7fa1f833bd"}
                altText={"Image Article"}
                isPromo={true}
                promo='50'
                productName={"Figurine Iron Hands"}
                descriptionProduct={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, facilis excepturi exercitationem animi maiores quae error rem numquam mollitia tempora sed delectus recusandae, impedit ea dolore! Beatae eos ratione quasi tenetur vitae ut, non eaque veritatis dignissimos aspernatur reprehenderit obcaecati, ipsa voluptate numquam quae explicabo pariatur."}
                buttonEnabled={false}
                author='Jean Dupont'
                date='12/12/2024'
                />
            </div>
            <div className='col-span-2'>

            <Article  
            flexOption='md:flex-row'
                urlImage={"https://www.warhammer.com/app/resources/catalog/product/920x950/99120101127_SMDevastatorSquadBA01.jpg"}
                altText={"Image Article"}
                isPromo={true}
                promo='24'
                productName={"Figurine Blood Angels"}
                descriptionProduct={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, facilis excepturi exercitationem animi maiores quae error rem numquam mollitia tempora sed delectus recusandae, impedit ea dolore! Beatae eos ratione quasi tenetur vitae ut, non eaque veritatis dignissimos aspernatur reprehenderit obcaecati, ipsa voluptate numquam quae explicabo pariatur."}
                buttonEnabled={false}
                author='Jean Dupont'
                date='12/12/2024'
                />
            </div>
                        </div>
    </section>
  )
}
