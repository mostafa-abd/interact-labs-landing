'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export type SlideItem = string | { type: 'video'; url: string };

interface ProductGalleryProps {
  productImages: SlideItem[];
  mainImage: SlideItem;
  dir: 'rtl' | 'ltr';
  activeIndex: number;
  onSelect: (item: SlideItem, index: number) => void;
  mainImageSizes: string;
  thumbSizes: string;
}

export default function ProductGallery({
  productImages,
  mainImage,
  dir,
  activeIndex,
  onSelect,
  mainImageSizes,
  thumbSizes,
}: ProductGalleryProps) {
  return (
    <div className="product-images">
      <div className="main-product-image" style={{ position: 'relative' }}>
        {typeof mainImage === 'object' && mainImage.type === 'video' ? (
          <iframe
            width="100%"
            height="450"
            src={mainImage.url}
            title="Product Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: 12, width: '100%', height: '100%' }}
            loading="lazy"
          />
        ) : (
          <Image
            src={mainImage as string}
            alt="Main Product"
            fill
            priority
            style={{ objectFit: 'contain' }}
            sizes={mainImageSizes}
            fetchPriority="high"
            quality={80}
          />
        )}
      </div>

      <Swiper
        dir="ltr"
        slidesPerView={4.3}
        grabCursor
        style={{ width: '100%', padding: '10px 0' }}
        breakpoints={{
          0: { slidesPerView: 2.5 },
          640: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.3 },
        }}
      >
        {productImages.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className={`sub-image cursor-pointer ${i === activeIndex ? 'active' : ''}`}
              onClick={() => onSelect(item, i)}
              style={{ position: 'relative' }}
              dir={dir}
            >
              {typeof item === 'object' && item.type === 'video' ? (
                <>
                  <Image
                    src={
                      item.url.includes('4oytDp2Sdsw')
                        ? 'https://img.youtube.com/vi/4oytDp2Sdsw/hqdefault.jpg'
                        : 'https://img.youtube.com/vi/Ne1A3bCe0zc/hqdefault.jpg'
                    }
                    alt="Video Thumbnail"
                    fill
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                    loading="lazy"
                    sizes={thumbSizes}
                    quality={70}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(0,0,0,0.6)',
                      borderRadius: '50%',
                      width: 50,
                      height: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent',
                        borderLeft: '15px solid white',
                      }}
                    ></span>
                  </div>
                </>
              ) : (
                <Image
                  src={item as string}
                  alt={`Sub ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover', borderRadius: 8 }}
                  loading="lazy"
                  sizes={thumbSizes}
                  quality={70}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

