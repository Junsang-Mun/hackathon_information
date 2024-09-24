<script>
    // 역 이름을 저장하는 배열
    let stations = [
        { name: "Gangnam Station", line: "Shinbundang Line", color: "red" },
        { name: "Sinsa Station", line: "Line 3", color: "orange" },
        { name: "Gyeongbokgung Station", line: "Line 3", color: "orange" }
    ];
    
    // 노선 변경을 나타내는 위치
    let transfers = [
        { from: "Shinbundang Line", to: "Line 3", station: "Sinsa Station" }
    ];
</script>

<style>
    .subway-line {
        stroke-width: 4;
    }

    .station {
        font-size: 14px;
        fill: black;
        text-anchor: start; /* 텍스트를 시작 지점에서 정렬 */
    }

    .transfer {
        font-size: 12px;
        fill: gray;
        text-anchor: middle;
    }

    .circle {
        r: 10;
    }
</style>

<svg width="400" height="400">
    <!-- Shinbundang Line (Vertical) -->
    <line x1="100" y1="50" x2="100" y2="200" stroke="red" class="subway-line" />
    
    <!-- Line 3 (Vertical) -->
    <line x1="100" y1="200" x2="100" y2="350" stroke="orange" class="subway-line" />

    <!-- Stations -->
    {#each stations as station, i}
        <circle
            cx="100"
            cy="{i === 0 ? 50 : i === 1 ? 200 : 350}"
            fill="{station.color}"
            class="circle"
        />
        <text
            x="120"
            y="{i === 0 ? 50 : i === 1 ? 200 : 350}"
            class="station"
            alignment-baseline="middle"
        >
            {station.name}
        </text>
    {/each}
</svg>
