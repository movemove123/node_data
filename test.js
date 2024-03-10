const axios = require('axios');

const clientId = 'p587vzx03i'; // 네이버 개발자 센터에서 발급받은 클라이언트 ID
const clientSecret = 'jgkzi7HyWa0l7CWgS4kyEmYIiFBHkgzlFtmry9vr'; // 네이버 개발자 센터에서 발급받은 클라이언트 Secret

async function findLocationByZipCode(zipCode) {
  try {
    const response = await axios.get('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode', {
      params: {
        query: zipCode,
      },
      headers: {
        'X-NCP-APIGW-API-KEY-ID': clientId,
        'X-NCP-APIGW-API-KEY': clientSecret,
      },
    });

    const items = response.data.addresses;

    if (items.length === 0) {
      console.log('검색 결과가 없습니다.');
    } else {
      // 첫 번째 결과를 출력
      const location = items[0];

      console.log('도로명 주소:', location.roadAddress);
      console.log('지번 주소:', location.jibunAddress);
      console.log('위도:', location.x);
      console.log('경도:', location.y);
    }
  } catch (error) {
    console.error('검색 중 오류가 발생했습니다.', error.message);
  }
}

// 예제: 우편번호 '12345'를 기반으로 위치 찾기
findLocationByZipCode('14971');


