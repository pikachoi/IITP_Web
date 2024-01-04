var ctx = document.getElementById('LineChart').getContext('2d');
var lineData = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Packet',
            data: [],
            backgroundColor: 'rgba(73, 198, 230, 0.2)',
            borderWidth: 1,
            borderColor: 'rgba(73, 255, 255, 1)',
            pointRadius: 0, // 동그라미로 점을 표시하지 않음
        }]
            },
    options: {
        fill: true,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)', // y 축 레이블 색상 변경
                },
                grid: {
                color: 'rgba(255, 255, 255, 0.1)', // y 축 격자 무늬 색상 변경
                },
            },
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)', // x 축 레이블 색상 변경l
                },
                grid: {
                color: 'rgba(255, 255, 255, 0.1)', // y 축 격자 무늬 색상 변경
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(255, 255, 255, 0.8)', // 범례 레이블 색상 변경
                },
            },
        },
    },
};

var LineChart = new Chart(ctx, lineData);
//------------------------------------------------------------------------

var ctx = document.getElementById('DoughnutChart').getContext('2d');
var doughnutData = {
    type: 'doughnut',
    data: {
        datasets: [{
            labels: ['정상', '이상'],
            data: [0, 0,],
            backgroundColor: ['aqua', 'rgb(255, 180, 35, 1)'],
            borderWidth: 1,
            borderColor: ['aqua', 'rgb(255, 180, 35, 1)'],
            cutout: "80%",
        }]
    },
    options: {
        cutoutPercentage: 0,
        fill: true,
        responsive: true,
        maintainAspectRatio: false,
    },
};
var DoughnutChart = new Chart(ctx, doughnutData);
//------------------------------------------------------------------------

var barCtx = document.getElementById('barChart').getContext('2d');
var barData = {
    type: 'bar',
    data: {
        labels: ['장비1', '장비2', '장비3', '장비4', '장비5',],
        datasets: [{
            label: 'Packet',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(73, 255, 255, 0.5)',
            borderWidth: 1
        }]
    },
    options: {
    responsive: true, // 그래프 크기 자동 조정 여부
    maintainAspectRatio: false, // 종횡비 유지 여부
    scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)', // y 축 레이블 색상 변경
                },
                grid: {
                color: 'rgba(255, 255, 255, 0.1)', // y 축 격자 무늬 색상 변경
                },
            },
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)', // x 축 레이블 색상 변경
                },
                grid: {
                color: 'rgba(255, 255, 255, 0.1)', // y 축 격자 무늬 색상 변경
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'rgba(255, 255, 255, 0.8)', // 범례 레이블 색상 변경
                },
            },
        },
    }
}

var barChart = new Chart(barCtx, barData);
//------------------------------------------------------------------------

var pieCtx = document.getElementById('pieChart').getContext('2d');
var pieData = {
    type: 'pie',
    data: {
        labels: ['공격유형1', '공격유형2', '공격유형3', '공격유형4', '공격유형5', '공격유형6'],
        datasets: [{
            data: [10, 20, 30, 5, 15, 20],
            backgroundColor: [
                'rgba(50, 198, 230, 0.5)',
                'rgba(90, 198, 230, 0.5)',
                'rgba(130, 198, 230, 0.5)',
                'rgba(170, 198, 230, 0.5)',
                'rgba(210, 198, 230, 0.5)',
                'rgba(250, 198, 230, 0.5)'
            ],
        
            borderWidth: 0
        }]
    },
    options: {
    responsive: true, // 그래프 크기 자동 조정 여부
    maintainAspectRatio: false, // 종횡비 유지 여부
    scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)', // y 축 레이블 색상 변경
                },
            },
            x: {
                ticks: {
                    color: 'rgba(255, 255, 255, 0.8)', // x 축 레이블 색상 변경
                },
            },
        },
    plugins: {
        legend: {
            labels: {
                color: 'rgba(255, 255, 255, 0.8)', // 범례 레이블 색상 변경
            },
        },
    },
}
}

var pieChart = new Chart(pieCtx, pieData);
//------------------------------------------------------------------------

var socket = new WebSocket('ws://localhost:8000/ws/gg/');

const dataList1 = document.getElementById('data-list1');
const dataList2 = document.getElementById('data-list2');
const dataList3 = document.getElementById('data-list3');
const dataList4 = document.getElementById('data-list4');
const dataList5 = document.getElementById('data-list5');
const dataList6 = document.getElementById('data-list6');
const dataList7 = document.getElementById('data-list7');
const dataList8 = document.getElementById('data-list8');
const dataList9 = document.getElementById('data-list9');
const dataList10 = document.getElementById('data-list10');
const dataList11 = document.getElementById('data-list11');
const dataList12 = document.getElementById('data-list12');

const MAX_DATA_COUNT = 15; // 최대 데이터 개수

socket.onmessage = function(e){
    var djangoData = JSON.parse(e.data);
    // console.log(djangoData);
    var timestamp = new Date(); // 현재 시간을 타임스탬프로 사용


    const start_time = djangoData.start_time;
    const stop_time = djangoData.stop_time;
    const src_ip = djangoData.src_ip;
    const src_country = djangoData.src_country;
    const src_port = djangoData.src_port;
    const dst_ip = djangoData.dst_ip;
    const dst_country = djangoData.dst_country;
    const dst_port = djangoData.dst_port;
    const packets = djangoData.packets;
    const data_bytes = djangoData.data_bytes;
    const bytes = djangoData.bytes;

    const label = djangoData.label;

    // 실시간 로그------------------------------------------------------------------------------------------------------------------------------------
    // const dataElement = document.createElement('p');
    // dataElement.textContent = start_time;
    const  StartTimeSpan = document.createElement('span');
    const  StopTimeSpan = document.createElement('span');
    const  SrcIpSpan = document.createElement('span');
    const  SrcCountrySpan = document.createElement('span');
    const  SrcPortSpan = document.createElement('span');
    const  DstIpSpan = document.createElement('span');
    const  DstCountrySpan = document.createElement('span');
    const  DstPortSpan = document.createElement('span');
    const  PacketsSpan = document.createElement('span');
    const  DatabytesSpan = document.createElement('span');
    const BytesSpan = document.createElement('span');
    const LabelSpan = document.createElement('span');
    
    StartTimeSpan.textContent = start_time;
    StopTimeSpan.textContent = stop_time;
    SrcIpSpan.textContent = src_ip;
    SrcCountrySpan.textContent = src_country;
    SrcPortSpan.textContent = src_port;
    DstIpSpan.textContent = dst_ip;
    DstCountrySpan.textContent = dst_country;
    DstPortSpan.textContent = dst_port;
    PacketsSpan.textContent = packets;
    DatabytesSpan.textContent = data_bytes;
    BytesSpan.textContent = bytes;
    LabelSpan.textContent = label;
    
    // 실시간 로그 '컬럼'은 '값'을 담는 컨테이너 가로 넒이를 함.컬럼명이 길고 값이 짧으면 컬럼명이 짤림 -> 짧은 값을 가질때 좌우 패딩 추가로 임의의 길이 추가
    // 컬럼 1의 값 출력
    StartTimeSpan.style.marginBottom = '15px';
    StartTimeSpan.style.paddingRight = '5px'; 
    StartTimeSpan.style.paddingLeft = '5px';
    // 컬럼 2의 값 출력
    StopTimeSpan.style.marginBottom = '15px';
    StopTimeSpan.style.paddingLeft = '15px'; 
    StopTimeSpan.style.paddingRight = '15px'; 
    // 컬럼 3의 값 출력
    SrcIpSpan.style.marginBottom = '15px';
    SrcIpSpan.style.paddingLeft = '15px'; 
    SrcIpSpan.style.paddingRight = '15px';
    // 컬럼 4의 값 출력
    SrcCountrySpan.style.marginBottom = '15px';
    SrcCountrySpan.style.paddingLeft = '15px'; 
    SrcCountrySpan.style.paddingRight = '15px'; 
    // 컬럼 5의 값 출력
    SrcPortSpan.style.marginBottom = '15px';
    SrcPortSpan.style.paddingLeft = '5px'; 
    SrcPortSpan.style.paddingRight = '5px';
    // 컬럼 6의 값 출력
    DstIpSpan.style.marginBottom = '15px';
    DstIpSpan.style.paddingLeft = '15px'; 
    DstIpSpan.style.paddingRight = '15px'; 
    // 컬럼 7의 값 출력
    DstCountrySpan.style.marginBottom = '15px';
    DstCountrySpan.style.paddingLeft = '15px';
    DstCountrySpan.style.paddingRight = '15px'; 
    // 컬럼 8의 값 출력
    DstPortSpan.style.marginBottom = '15px';
    DstPortSpan.style.paddingLeft = '15px'; 
    DstPortSpan.style.paddingRight = '15px'; 
    // 컬럼 9의 값 출력
    PacketsSpan.style.marginBottom = '15px';
    PacketsSpan.style.paddingLeft = '15px'; 
    PacketsSpan.style.paddingRight = '15px'; 
    // 컬럼 10의 값 출력
    DatabytesSpan.style.marginBottom = '15px';
    DatabytesSpan.style.paddingLeft = '5px'; 
    DatabytesSpan.style.paddingRight = '5px'; 
    // 컬럼 11의 값 출력
    BytesSpan.style.marginBottom = '15px';
    BytesSpan.style.paddingLeft = '5px';
    BytesSpan.style.paddingRight = '5px'; 
    // 컬럼 12의 값 출력
    LabelSpan.style.marginBottom = '15px';
    LabelSpan.style.paddingRight = '13px'; 
    LabelSpan.style.paddingLeft = '13px';
    // 컬럼 1~12 값을 세로로 출력
    StartTimeSpan.style.display = 'block';
    StopTimeSpan.style.display = 'block';
    SrcIpSpan.style.display = 'block';
    SrcCountrySpan.style.display = 'block';
    SrcPortSpan.style.display = 'block';
    DstIpSpan.style.display = 'block';
    DstCountrySpan.style.display = 'block';
    DstPortSpan.style.display = 'block';
    PacketsSpan.style.display = 'block';
    DatabytesSpan.style.display = 'block';
    BytesSpan.style.display = 'block';
    LabelSpan.style.display = 'block';

    // JavaScript 코드
    if (label === 1) {
        LabelSpan.style.color = 'rgb(255, 100, 100, 1)';
    } else if (label === 2) {
        LabelSpan.style.color = 'rgb(255, 255, 100, 1)';
    } else if (label === 3) {
        LabelSpan.style.color = 'rgb(255, 100, 255, 1)';
    } else if (label === 4) {
        LabelSpan.style.color = 'rgb(170, 200, 100, 1)';
    } else {
        LabelSpan.style.color = 'rgba(73, 255, 255, 1)';
    }

    dataList1.appendChild(StartTimeSpan);
    dataList2.appendChild(StopTimeSpan);
    dataList3.appendChild(SrcIpSpan);
    dataList4.appendChild(SrcCountrySpan);
    dataList5.appendChild(SrcPortSpan);
    dataList6.appendChild(DstIpSpan);
    dataList7.appendChild(DstCountrySpan);
    dataList8.appendChild(DstPortSpan);
    dataList9.appendChild(PacketsSpan);
    dataList10.appendChild(DatabytesSpan);
    dataList11.appendChild(BytesSpan);
    dataList12.appendChild(LabelSpan);

    // MAX_DATA_COUNT 시 가장 오래된 데이터 삭제
    if (dataList1.children.length > MAX_DATA_COUNT) {
        dataList1.removeChild(dataList1.firstChild);
        dataList2.removeChild(dataList2.firstChild);
        dataList3.removeChild(dataList3.firstChild);
        dataList4.removeChild(dataList4.firstChild);
        dataList5.removeChild(dataList5.firstChild);
        dataList6.removeChild(dataList6.firstChild);
        dataList7.removeChild(dataList7.firstChild);
        dataList8.removeChild(dataList8.firstChild);
        dataList9.removeChild(dataList9.firstChild);
        dataList10.removeChild(dataList10.firstChild);
        dataList11.removeChild(dataList11.firstChild);
        dataList12.removeChild(dataList12.firstChild);
    }
    
    // 스크롤바를 항상 하단에 위치시킴
    dataList1.scrollTop = dataList1.scrollHeight;
    dataList2.scrollTop = dataList2.scrollHeight;
    dataList3.scrollTop = dataList3.scrollHeight;
    dataList4.scrollTop = dataList4.scrollHeight;
    dataList5.scrollTop = dataList5.scrollHeight;
    dataList6.scrollTop = dataList6.scrollHeight;
    dataList7.scrollTop = dataList7.scrollHeight;
    dataList8.scrollTop = dataList8.scrollHeight;
    dataList9.scrollTop = dataList9.scrollHeight;
    dataList10.scrollTop = dataList10.scrollHeight;
    dataList11.scrollTop = dataList11.scrollHeight;
    dataList12.scrollTop = dataList12.scrollHeight;

    // 라인 그래프 업데이트--------------------------------------------

    // 아래 레이블 시간으로 표시
    // lineData.data.labels.push(timestamp.toLocaleTimeString()); 

    // 로그의 데이터와 중복되지 않는 새 데이터 정의
    var newLineData = lineData.data.datasets[0].data;
    const MAX_DATA_COUNT_line = 100; // 최대 데이터 개수
    // MAX_DATA_COUNT 초과 시 가장 오래된 데이터 삭제
    if (lineData.data.labels.length > MAX_DATA_COUNT_line) {
        lineData.data.labels.shift();
        lineData.data.datasets[0].data.shift();
    }
    newLineData.push(label);

    if (label === 0) {
        lineData.data.labels.push(' '); // 레이블은 시간으로 표시    
    } else {
        lineData.data.labels.push(' ');
        
    }
     
    lineData.data.datasets[0].data = newLineData;
    LineChart.update();

    // 도넛 그래프 업데이트--------------------------------------------
    var totalNormal = 0;
    var totalAnomaly = 0;

    for (var i = 0; i < dataList12.children.length; i++) {
        var doughnutLabel = dataList12.children[i].textContent; // 레이블을 가져옴
        if (doughnutLabel == 0) {
            totalNormal++;
        } else if (doughnutLabel == 1) {
            totalAnomaly++;
        }
    }

    var normalRatio = totalNormal / (totalNormal + totalAnomaly);
    var anomalyRatio = totalAnomaly / (totalNormal + totalAnomaly);

    // doughnut 업데이트
    var newDoughnutData = doughnutData.data.datasets[0].data;
    newDoughnutData[0] = normalRatio * 100; // '정상' 비율을 백분율로 변환하여 데이터 설정
    newDoughnutData[1] = anomalyRatio * 100; // '이상' 비율을 백분율로 변환하여 데이터 설정
    
    doughnutData.data.datasets[0].data = newDoughnutData;
    DoughnutChart.update();

    // 정상, 이상 데이터 개수 업데이트
    const labelCountElement = document.getElementById('label_count');
    labelCountElement.textContent = `정상: ${totalNormal} 이상: ${totalAnomaly}`;


    // JavaScript를 사용하여 data_list와 data_list_column의 가로 크기를 동기화
    const data_list1 = document.querySelector('.data_list1');
    const data_list2 = document.querySelector('.data_list2');
    const data_list3 = document.querySelector('.data_list3');
    const data_list4 = document.querySelector('.data_list4');
    const data_list5 = document.querySelector('.data_list5');
    const data_list6 = document.querySelector('.data_list6');
    const data_list7 = document.querySelector('.data_list7');
    const data_list8 = document.querySelector('.data_list8');
    const data_list9 = document.querySelector('.data_list9');
    const data_list10 = document.querySelector('.data_list10');
    const data_list11= document.querySelector('.data_list11');
    const data_list12= document.querySelector('.data_list12');

    const data_list_column1 = document.querySelector('.data_list_column1');
    const data_list_column2 = document.querySelector('.data_list_column2');
    const data_list_column3 = document.querySelector('.data_list_column3');
    const data_list_column4 = document.querySelector('.data_list_column4');
    const data_list_column5 = document.querySelector('.data_list_column5');
    const data_list_column6 = document.querySelector('.data_list_column6');
    const data_list_column7 = document.querySelector('.data_list_column7');
    const data_list_column8 = document.querySelector('.data_list_column8');
    const data_list_column9 = document.querySelector('.data_list_column9');
    const data_list_column10 = document.querySelector('.data_list_column10');
    const data_list_column11 = document.querySelector('.data_list_column11');
    const data_list_column12 = document.querySelector('.data_list_column12');

    var addSize = 1  // 동기화 후 정밀도를 높이기 위한 사이즈 추가
    function syncWidth() {
        const data_list_width1 = data_list1.clientWidth;
        const data_list_width2 = data_list2.clientWidth;
        const data_list_width3 = data_list3.clientWidth;
        const data_list_width4 = data_list4.clientWidth;
        const data_list_width5 = data_list5.clientWidth;
        const data_list_width6 = data_list6.clientWidth;
        const data_list_width7 = data_list7.clientWidth;
        const data_list_width8 = data_list8.clientWidth;
        const data_list_width9 = data_list9.clientWidth;
        const data_list_width10 = data_list10.clientWidth;
        const data_list_width11 = data_list11.clientWidth;
        const data_list_width12 = data_list12.clientWidth;

        data_list_column1.style.width = `${data_list_width1 + addSize}px`;
        data_list_column2.style.width = `${data_list_width2 + addSize}px`;
        data_list_column3.style.width = `${data_list_width3 + addSize}px`;
        data_list_column4.style.width = `${data_list_width4 + addSize}px`;
        data_list_column5.style.width = `${data_list_width5 + addSize}px`;
        data_list_column6.style.width = `${data_list_width6 + addSize}px`;
        data_list_column7.style.width = `${data_list_width7 + addSize}px`;
        data_list_column8.style.width = `${data_list_width8 + addSize}px`;
        data_list_column9.style.width = `${data_list_width9 + addSize}px`;
        data_list_column10.style.width = `${data_list_width10 + addSize}px`;
        data_list_column11.style.width = `${data_list_width11 + addSize}px`;
        data_list_column12.style.width = `${data_list_width12 + addSize}px`;
    }

    // 초기 로딩 시 가로 크기 동기화
    syncWidth();

    // 창 크기가 변경될 때 가로 크기 다시 동기화
    window.addEventListener('resize', syncWidth);
}

var socket2 = new WebSocket('ws://localhost:8000/ws/gg2/');
socket2.onmessage = function(e){
    var djangoData = JSON.parse(e.data);
    // console.log(djangoData);

    // pie 업데이트
    var newPieData = pieData.data.datasets[0].data;
    newPieData.shift();
    newPieData.push(djangoData.value);
    pieChart.update();

    // 바 그래프 업데이트--------------------------------------------
    var newBarData = barData.data.datasets[0].data;
    newBarData.shift();
    newBarData.push(djangoData.value);
    barData.data.datasets[0].data = newBarData;
    barChart.update();
}