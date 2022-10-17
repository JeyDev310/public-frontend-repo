export interface ISwiperProps {
  slidesPerView: number;
  spaceBetween: number;
}
export interface IAppSwiperConfig extends ISwiperProps {
  breakpoint: number;
}

export interface ISwiperConfig {
  [breakpoint: number]: ISwiperProps;
}
