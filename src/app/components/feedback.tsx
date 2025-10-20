"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Star } from "lucide-react";


export default function Feedback(){
    return(
        <section className="feedback">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
             <h1>TACT changed the way I interact</h1>
            <div className="Stars">
            <Star size={17} />
            <Star size={17} />
            <Star size={17} />
            <Star size={17} />
            <Star size={17} />
            </div>
            <p>Read some awesome feedback from our clients all over the world. We are giving the best to our clients Read some awesome feedback from our clients all over the world. We are giving the best to our clients Read some awesome feedback from our clients all over the world. We are giving the best to our clients Read some awesome feedback from our clients all over the world.</p>
            <div className="feed-profile"></div>
        </SwiperSlide>

      </Swiper>
        </section>
    );
};