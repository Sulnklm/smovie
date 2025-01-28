import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
// axios는 비동기 HTTP 요청을 보내는 데 사용되는 라이브러리
import axios from "axios";
import "swiper/css";
import "swiper/css/effect-coverflow";
import MovieCard from "../../elements/MovieCard";
import categories from "/public/data/categories.json"; // 카테고리 데이터 JSON으로부터 불러오기

const API_KEY = "0e16d9b4af07e316bb36fc1286684dd6"; // The Movie DB API 키
const BASE_URL = "https://api.themoviedb.org/3"; // The Movie DB API URL

function Mood() {
  const [selectedCategory, setSelectedCategory] = useState(""); // 카테고리 상태 category status
  const [movies, setMovies] = useState([]); // 영화 목록 상태 movie list status
  const [loading, setLoading] = useState(false); // 로딩 상태 loading status
  const [error, setError] = useState(null); // 오류 상태 error status

  // 카테고리 버튼 클릭 시 해당 카테고리의 영화를 가져오기 위한 API 호출
  // Call API when click the category btn
  const fetchMovies = async (category) => {
    setLoading(true); // API 요청 시작 시 로딩 상태 true로 설정
    setError(null); // 오류 상태 초기화 Error reset

    // 에러가 발생할 수 있는 부분을 try에 넣음
    try {
      // ${BASE_URL} 는 변수이고 /discover/movie 는 고정된 문자열
      // /discover/movie**는 영화 목록을 가져오는 엔드포인트.
      // 또다른 엔드포인트의 예시 => /movie/{movie_id}: 특정 영화의 상세 정보 가져오기(MovieDetail.jsx에서 확인 가능)
      const response = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_genres: category, // 장르 필터링 Genre Filtering
        },
      });
      setMovies(response.data.results);
      // 에러가 발생했을 때 어떻게 할지를 catch에 넣음
    } catch (err) {
      setError("Failed to load movie data.");
      console.error(err);
      // 에러가 발생하든 안 하든 항상 실행되는 코드
    } finally {
      setLoading(false); // API 요청 후 로딩 종료
    }
  };

  // 카테고리 변경 시 API 호출
  // Call API when category is changed
  useEffect(() => {
    if (selectedCategory) {
      fetchMovies(selectedCategory); // 선택된 카테고리로 영화 요청
    } else {
      // 카테고리가 선택되지 않으면 기본적으로 액션 장르를 불러옴
      fetchMovies("28"); // 예시: 액션 장르 ID
    }
  }, [selectedCategory]); // selectedCategory 상태가 변경될 때마다 호출

  // 카테고리 버튼 클릭 시 선택된 카테고리 변경
  // Switch category when btn is clicked
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId); // 선택된 카테고리 ID로 상태 업데이트
  };

  if (loading) return <div>Loading...</div>; // 로딩 중일 때 표시되는 메시지
  if (error) return <div>{error}</div>; // 오류가 발생했을 때 표시되는 메시지

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="mb-7 pl-5 pt-5 xl:pl-0 xl:pt-0">Pick Your Mood!</h1>
        {/* Category buttons */}
        <div className="pl-3 xl:pl-0 flex gap-3 overflow-x-auto scrollbar-hide items-center mb-8">
          {categories.map((category) => (
            <p
              key={category.id}
              className={`cursor-pointer font-[400] text-center whitespace-nowrap py-2 px-4 rounded-full transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-customGreenLight brightness-125 text-customMint" // 활성화된 버튼 스타일
                  : "bg-customGreenLight text-white/40" // 비활성화된 버튼 스타일
              }`}
              onClick={() => handleCategoryClick(category.id)} // 카테고리 클릭 시 해당 ID로 필터링
            >
              {category.name}
            </p>
          ))}
        </div>

        {/* 슬라이더 */}
        {/* Slider */}
        <Swiper
          //   effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"2"}
          spaceBetween={20}
          speed={2000}
          //   coverflowEffect={{
          //     rotate: 0,
          //     stretch: 0,
          //     depth: 100,
          //     modifier: 1,
          //     slideShadows: false, 
          //   }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false, 
          }}
          loop={true} 
          modules={[EffectCoverflow, Autoplay]} 
          breakpoints={{
            1024: {
              slidesPerView: 4.5, 
            },
            768: {
              slidesPerView: 2, 
            },
          }}
        >
          {movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <MovieCard movie={movie} /> 
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Mood;
