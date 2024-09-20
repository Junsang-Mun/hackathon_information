const API_BASE_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
const SERVICE_KEY = "GaxSEBDmqdqyKFKE3Hjw7S8muLQNKXcDpNBB7Uq47gWyHPv0sA5DP%2FUc%2BbnzeDG0Xf5pHusm76d0SDH2WuxMFQ%3D%3D";

export async function GET({ url }) {
  const mergedData = {};
  const queryString = `serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${getCurrentDateString()}&base_time=${getPreviousClosestTime()}&nx=61&ny=125`;

  try {
    const response = await fetch(`${API_BASE_URL}?${queryString}`);
    const data = await response.json();
    
    if (!data.response?.body?.items?.item) {
      throw new Error('Invalid API response structure');
    }

    processApiData(data.response.body.items.item, mergedData);

    return new Response(JSON.stringify(mergedData), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching or processing data:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

function processApiData(items, mergedData) {
  const targetTimes = new Set(['0900', '2000']);

  items.forEach(item => {
    if (targetTimes.has(item.fcstTime)) {
      const key = `${item.fcstDate}-${item.fcstTime}`;
      
      if (!mergedData[key]) {
        mergedData[key] = {
          baseDate: item.baseDate,
          baseTime: item.baseTime,
          fcstDate: item.fcstDate,
          fcstTime: item.fcstTime,
          nx: item.nx,
          ny: item.ny
        };
      }
      
      mergedData[key][item.category] = item.fcstValue;
    }
  });
}


function getCurrentDateString() {
    let now = new Date();

    // 현재 시간이 02:10 이전인지 확인
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // 만약 02:10 이전이라면 날짜를 하루 빼기
    if (hours < 2 || (hours === 2 && minutes < 10)) {
        now.setDate(now.getDate() - 1);
    }

    const year = now.getFullYear();  // 연도
    const month = (now.getMonth() + 1).toString().padStart(2, '0');  // 월
    const day = now.getDate().toString().padStart(2, '0');  // 일

    return `${year}${month}${day}`;
}

function getPreviousClosestTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // 기준 시간대 배열 (분으로 변환: 시*60 + 분)
    const timePoints = [
        { hour: 2, minute: 10 }, 
        { hour: 5, minute: 10 }, 
        { hour: 8, minute: 10 }, 
        { hour: 11, minute: 10 }, 
        { hour: 14, minute: 10 }, 
        { hour: 17, minute: 10 }, 
        { hour: 20, minute: 10 }, 
        { hour: 23, minute: 10 }
    ];

    const currentMinutes = hours * 60 + minutes;  // 현재 시간을 분으로 변환

    // 기준 시간대를 분으로 변환하여 가장 가까운 이전 시간을 찾음
    let previousTime = timePoints[timePoints.length - 1]; // 초기값을 마지막 시간대로 설정 (자정을 넘겼을 때 대비)
    
    for (let i = 0; i < timePoints.length; i++) {
        const pointMinutes = timePoints[i].hour * 60 + timePoints[i].minute;
        if (currentMinutes >= pointMinutes) {
            previousTime = timePoints[i];  // 현재 시간을 기준으로 이전의 시간으로 설정
        } else {
            break;  // 이전 시간을 찾으면 반복 종료
        }
    }

    // 자정을 넘겼을 경우 처리: 현재 시간이 기준 시간보다 앞에 있는 경우
    if (currentMinutes < timePoints[0].hour * 60 + timePoints[0].minute) {
        previousTime = { hour: 23, minute: 10 }; // 가장 마지막 시간 (23:10) 설정
    }

    // 시간 정보만 남기고 분은 00으로 처리
    const result = `${previousTime.hour.toString().padStart(2, '0')}00`;
    
    return result;
}

