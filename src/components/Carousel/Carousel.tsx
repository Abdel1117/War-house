import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import "./Carousel.css"

export const Carousel = () => {


    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    
  };
  return (
    <>
    <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect="fade"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation,EffectFade]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide><img  src="https://c.wallhere.com/photos/e3/e1/movie_poster_George_Spigot_Spigot_Total_Recall-1879095.jpg!d" alt="" /></SwiperSlide>
        <SwiperSlide><img  src="https://uhdwallpapers.org/download/the-cat-and-the-butterfly_477645/1920x1080/" alt="" /></SwiperSlide>
        <SwiperSlide><img  src="https://uhdwallpapers.org/download/the-cat-and-the-butterfly_477645/1920x1080/" alt="" /></SwiperSlide>
        <SwiperSlide><img  src="https://uhdwallpapers.org/download/the-cat-and-the-butterfly_477645/1920x1080/" alt="" /></SwiperSlide>
        <SwiperSlide><img  src="https://uhdwallpapers.org/download/the-cat-and-the-butterfly_477645/1920x1080/" alt="" /></SwiperSlide>
        <SwiperSlide><img  src="https://uhdwallpapers.org/download/the-cat-and-the-butterfly_477645/1920x1080/" alt="" /></SwiperSlide>
        <SwiperSlide><img  src="https://uhdwallpapers.org/download/the-cat-and-the-butterfly_477645/1920x1080/" alt="" /></SwiperSlide>
        <SwiperSlide><img  src="https://uhdwallpapers.org/download/the-cat-and-the-butterfly_477645/1920x1080/" alt="" /></SwiperSlide>
        <SwiperSlide><img  src="https://uhdwallpapers.org/download/the-cat-and-the-butterfly_477645/1920x1080/" alt="" /></SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
     )
}
