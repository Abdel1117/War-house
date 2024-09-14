import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface CarouselExpo  {
    arrayImage : string[]
    Title : string
    SecondTitle : string
}
/* Reusable Components for carousel Profil */
export const CarouselExpo : React.FC<CarouselExpo> = ({arrayImage, Title, SecondTitle }) => {
  return (
    <section className=" p-1 sm:p-5 lg:p-10 xl:p-40 bg-[#f1f1f1] dark:bg-[#404040]  mx-auto relative ">
        <div className="mt-12 lg:mt-0 lg:absolute lg:top-12 flex items-end ">
          <h2 className="dark:text-white text-2xl">{Title}</h2>
          <span className="h-[2px] w-[200px] bg-green-500 mb-3 ml-4"></span>
        </div>
        <div className="mb-6 lg:mb-0 ">
          <h3 className="dark:text-white text-3xl  lg:absolute lg:top-20 font-semibold">
            {SecondTitle}
          </h3>
        </div>
        <Swiper
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}

        className="mySwiper"
      >
        {
            arrayImage.map((val, index) => 
            
                <SwiperSlide className='!h-[500px] bg-slate-600 dark:bg-white rounded-md relative' key={index}>
                    
                    <img className='!w-[150px] !h-[150px] rounded-full mx-auto mt-6 mb-4 ' src={val} alt="Image de profil " />
                    <div className='p-4 text-center'>
                        <h2 className='my-4 text-xl'>Pseudo </h2>
                        <p className='text-lg'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, consectetur? Aperiam laboriosam modi tenetur deserunt est repellendus nam, amet odit provident! Quas ipsa tempora consequatur alias, neque accusamus necessitatibus dicta.</p>
                        

                    </div>
                </SwiperSlide>
            )
        }
                   
                </Swiper>



    </section>
  )
}
