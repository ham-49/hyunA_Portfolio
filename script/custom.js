/* ########## intro ########## */
  const lines = document.querySelectorAll(".text-wrap p");
  let currentLine = 0;
  let charIndex = 0;

  const parsedLines = Array.from(lines).map(line => {
    const result = [];
    line.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        [...node.textContent].forEach(char => {
          result.push({ char, tag: null });
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        [...node.textContent].forEach(char => {
          result.push({ char, tag: node.nodeName.toLowerCase() });
        });
      }
    });
    return result;
  });

  // 초기화
  lines.forEach(line => line.innerHTML = '');

  function type() {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    const content = parsedLines[currentLine];

    if (charIndex < content.length) {
      const { char, tag } = content[charIndex];

      if (tag === 'span') {
        let span = line.querySelector('span');
        if (!span) {
          span = document.createElement('span');
          line.appendChild(span);
        }
        span.textContent += char;
      } else {
        line.append(char);
      }

      charIndex++;
      setTimeout(type, 100);
    } else {
      currentLine++;
      charIndex = 0;
      setTimeout(type, 400);
    }
  }

  window.addEventListener('DOMContentLoaded', type);

/* ########## nav ########## */

/* 선택자 */
let intro = document.querySelector(".intro");
let aboutMe = document.querySelector("#aboutMe");
let nav = document.querySelector(".nav");
let navItems = document.querySelectorAll(".nav-item");

/* 초기값 */
let navShown = false;

/* 섹션 배열 */
let sectionIds = ["aboutMe", "Skills", "portfolioHub", "epilogue"];
let sections = sectionIds.map(id => document.getElementById(id));

/* 스크롤 이벤트 */
// 기준 비율 조정
let scrollPointRatio = window.innerWidth <= 768 ? 0.3 : 0.4;

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach(section => {
    let rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * scrollPointRatio && rect.bottom >= window.innerHeight * scrollPointRatio) {
      currentSection = section.id;
    }
  });

  let introBottom = intro.getBoundingClientRect().bottom;
  let aboutTop = document.getElementById("aboutMe").getBoundingClientRect().top;

  // 인트로 영역이 화면에 보이면 nav 숨기기
  if (introBottom > 0 && navShown) {
    nav.style.opacity = "0";
    navShown = false;
  } 
  // 인트로 영역 벗어나면 nav 보여주기
  else if (introBottom <= 0 && !navShown) {
    nav.style.opacity = "1";
    navShown = true;
  }

  // nav 색상 변경
  let skillsTop = document.getElementById("Skills").getBoundingClientRect().top;
  if (skillsTop <= window.innerHeight * scrollPointRatio) {
    nav.classList.add("changeNav");
  } else {
    nav.classList.remove("changeNav");
  }

  // active 클래스 처리
  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${currentSection}`) {
      item.classList.add("active");
    }
  });
});



/* 클릭하면 해당 위치에 대한 active class 추가 */
navItems.forEach(item => {
  item.addEventListener("click", e => {
    navItems.forEach(i => i.classList.remove("active"));
    e.currentTarget.classList.add("active");
  });
});

/* ######## portfolio ######## */
const projectLists = [
  {
    id : "movie",
    title: "Movie 306",
    titleMain: "영화 사이트 프로젝트",
    titleSub: "TMDB API를 활용하여 영화에 대한, <br> 리뷰, 정보를 제공하는 사이트를 제작했습니다.",
    skills: ["VS Code", "HTML5", "React", "SCSS"],
    tags: ["개인", "반응형", "React Bootstrap"],
    option: "Solo",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/movie",
    pageUrl: "https://movie-306.netlify.app/",
    thumImg: "image/movie-thum.png",
    mainImg: "image/movie.png",
    subImg: "image/movie-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여 (개인프로젝트)",
    mainList: ["메인페이지 전체"],
    SubList: ["movie","My Page", "Login", "404"],
    /* plannerLink: , */
    designLink: "https://www.figma.com/design/9BUnz6DkhRflJLlbSQhCGa/movie?node-id=5-118&m=dev&t=VKhXr858lX1YK3nI-1"
  },
  {
    id : "jeongdong",
    title: "정동야행",
    titleMain: "정동야행 클론코딩 프로젝트",
    titleSub: "정동야행 사이트의 다양한 이벤트를, <br> script Library로 클론 코딩 사이트를 제작하였습니다.",
    skills: ["VS Code", "HTML5", "SCSS", "JavaScript"],
    tags: ["개인", "반응형", "클론코딩"],
    option: "Solo",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/jeongdong-culturenight",
    pageUrl: "https://ham-49.github.io/jeongdong-culturenight/",
    thumImg: "image/jeongdong-thum.png",
    mainImg: "image/jeongdong.png",
    subImg: "image/jeongdong-responsive.png",
    popupInfo: "웹 퍼플리싱 참여 (개인프로젝트)",
    mainList: ["메인페이지 전체"],
    SubList: ["서브페이지 전체"],
    /* plannerLink: , */
    designLink: "https://www.figma.com/design/WMhNsUUVMMMZGFUHK4mNig/%EC%A0%95%EB%8F%99%EC%95%BC%ED%96%89-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0-1&m=dev&t=e8yod5wjTuZrxfvl-1"
  },
  {
    id : "weather",
    title: "날씨웹",
    titleMain: "날씨 웹 프로젝트",
    titleSub: "openweather API를 활용하여 <br> 실시간 날씨 정보를 보여주는 웹을 설계하였습니다.",
    skills: ["VS Code", "HTML5", "React", "CSS"],
    tags: ["개인", "반응형", "React"],
    option: "Solo",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/weather",
    pageUrl: "https://weather-49.netlify.app/",
    thumImg: "image/weather-thum.png",
    mainImg: "image/weather.png",
    subImg: "image/weather-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여 (개인프로젝트)",
    mainList: ["메인페이지 전체"],
    SubList: ["서브페이지 X"],
    /* plannerLink: , */
    designLink: "https://www.figma.com/design/0vwPwwWuKwiQBdCc5w0c3P/%EB%82%A0%EC%94%A8API?node-id=0-1&m=dev&t=EdZxsXANRGDt2PTy-1"
  },
  {
    id : "knotted",
    title: "Knotted",
    titleMain: "노티드 일체형 페이지 리뉴얼",
    titleSub: "다양한 레이아웃으로 브렌드의 가치를 살리며, <br> 직관적으로 이용할 수 있는 사이트를 제작하였습니다.",
    skills: ["VS Code", "HTML5", "SCSS", "JavaScript"],
    tags: ["팀", "반응형"],
    option: "Team",
    design: "Figma",
    impact: "40%",
    gitUrl: "https://github.com/ham-49/Knotted",
    pageUrl: "https://ham-49.github.io/Knotted/",
    thumImg: "image/knotted-thum.png",
    mainImg: "image/knotted.png",
    subImg: "image/knotted-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여 (팀프로젝트)",
    mainList: ["신메뉴", "온라인샵", "공지사항"],
    SubList: ["온라인예매", "자주묻는 질문", "창업문의"],
    plannerLink: "/hyunA_Portfolio/pdf/노티드도넛 기획서.pdf",
    designLink: "https://www.figma.com/design/XptJ3xqQf0KaSSnmCPcYKM/%EB%85%B8%ED%8B%B0%EB%93%9C-%EB%8F%84%EB%84%9B-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=0-1&m=dev&t=vqZ8Ea5vsH88OqCj-1"
  },
  {
    id : "aquarium",
    title: "롯데 아쿠아리움",
    titleMain: "롯데 아쿠아리움 페이지 리뉴얼",
    titleSub: "아쿠아리움의 생동감을 시각적으로 구현하고, <br> 브랜드의 이미지를 담아낸 리뉴얼 페이지를 설계했습니다.",
    skills: ["VS Code", "HTML5", "SCSS", "JavaScript"],
    tags: ["팀", "반응형"],
    option: "Team",
    design: "Figma",
    impact: "50%",
    gitUrl: "https://github.com/ham-49/aquarium",
    pageUrl: "https://ham-49.github.io/aquarium/",
    thumImg: "image/aquarium-thum.png",
    mainImg: "image/aquarium.png",
    subImg: "image/aquarium-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여 (팀프로젝트)",
    mainList: ["headerAPI, Date", "프로그램", "리뷰", "Footer"],
    SubList: ["설명프로그램", "체험프로그램", "교육프로그램"],
    plannerLink: "https://docs.google.com/presentation/d/1vTG0JJkd84qfz4xTqQhuSxXUBTXuoIO8ciO7UXdLdVc/edit?usp=sharing",
    designLink: "https://www.figma.com/file/cYRyXXyj2RU8S13r8s38OI/Plan-A?node-id=90-2"
  },
  {
    id : "inflearn",
    title: "인프런",
    titleMain: "인프런 페이지 리뉴얼",
    titleSub: "온라인 강의 플랫폼의 콘텐츠 다양성을 효과적으로 <br> 표현하기 위해, 다양한 레이아웃으로 구성하였습니다.",
    skills: ["VS Code", "HTML5", "SCSS", "JavaScript"],
    tags: ["개인", "반응형"],
    option: "Solo",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/inflearn",
    pageUrl: "https://ham-49.github.io/inflearn/",
    thumImg: "image/inflearn-thum.png",
    mainImg: "image/inflearn.png",
    subImg: "image/inflearn-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여(개인 프로젝트)",
    mainList: ["메인페이지 전체"],
    SubList: ["전체 카테고리", "수강 상세페이지", "수강신청 장바구니", "회원가입"],
    designLink: "https://www.figma.com/design/zqwy2JwjfrYaDrtlbxs8t3/%EC%9D%B8%ED%94%84%EB%9F%B0%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8?node-id=11-1020&m=dev&t=MoDOXHqkXpH0lpSy-1"
  },
  {
    id : "kipi",
    title: "한국 특허정보원",
    titleMain: "한국 특허정보원 페이지 리뉴얼",
    titleSub: "다양한 이용자가 쉽게 정보를 찾을 수 있도록 <br> 직관적인 공공기관 사이트로 리뉴얼하고자 합니다.",
    skills: ["VS Code", "HTML5", "SCSS", "CSS", "JavaScript"],
    tags: ["개인", "반응형"],
    option: "Solo",
    design: "Figma",
    impact: "100%",
    gitUrl: "https://github.com/ham-49/KIPI_Project",
    pageUrl: "https://ham-49.github.io/KIPI_Project/",
    thumImg: "image/kipi-thum.png",
    mainImg: "image/kipi.png",
    subImg: "image/kipi-responsive.png",
    popupInfo: "기획, 디자인, 웹 퍼플리싱 참여 (개인 프로젝트)",
    mainList: ["메인페이지 전체"],
    SubList: ["채용정보", "입찰정보", "공지사항", "자주묻는질문", "온라인 민원창구"],
    plannerLink: "/hyunA_Portfolio/pdf/한국특허정보원기획서.pdf",
    designLink: "https://www.figma.com/design/6VzlaNIbrZn0dT5HyDkdPq/%EA%B3%B5%EA%B3%B5%EA%B8%B0%EA%B4%80-%EB%A6%AC%EB%89%B4%EC%96%BC_%EB%AC%B8%ED%98%84%EC%95%84%EC%B5%9C%EC%A2%85?node-id=0-1&m=dev&t=JlCpuhwjiOc6J5Iu-1"
  }
];

/* content */
/* 선택자 */
let container = document.getElementById('contentwrap');
let checkItem = document.querySelectorAll('.checkItem');
let popup = document.getElementById('portfolioPopupWrap');


/* 카드 렌더링 함수 */
const pagination = document.getElementById('pagination');

function renderProjects(data) {
  container.innerHTML = '';

  const start = (currentPage - 1) * itemPage;
  const end = start + itemPage;
  const currentItems = data.slice(start, end);

  currentItems.forEach((list, index) => {
    let Cards = document.createElement('div');
    Cards.className = `portfolio-Card ${list.id}`;
    Cards.innerHTML = `
      <div class="card-img">
        <img src="${list.thumImg}" alt="${list.title}">
      </div>
      <div class="card-text-wrap">
        <h5>${list.title}</h5>
        <p>${list.titleSub}</p>
        <div class="tag-wrap">
          ${list.tags.map(t=> `<span>${t}</span>`).join('')}
        </div>
      </div>
      <div class="btn-wrap">
        <button class="portfolio-btn popup" data-index="${projectLists.indexOf(list)}">자세히 보기</button>
        <a class="portfolio-btn popup" href="${list.pageUrl}" target="_blank">홈페이지 이동</a>
      </div>
    `;
    container.appendChild(Cards);
  });

  renderPagination(data);
}

/* 페이지네이션 함수 */
let itemPage = 6;
let currentPage = 1;
let filteredProjects = [...projectLists];

function setItemPageByDevice() {
  const width = window.innerWidth;
  if (width <= 768) {
    itemPage = 2; // 모바일
  } else if (width <= 1024) {
    itemPage = 4; // 태블릿
  } else {
    itemPage = 6; // 데스크탑
  }
}

// 초기 설정
setItemPageByDevice();
renderProjects(projectLists);

// 리사이즈 대응
window.addEventListener("resize", () => {
  const prev = itemPage;
  setItemPageByDevice();
  if (prev !== itemPage) {
    currentPage = 1; // 현재 페이지 초기화
    renderProjects(filteredProjects); // 다시 렌더링
  }
});

function renderPagination(data) {
  pagination.innerHTML = '';

  const totalPages = Math.ceil(data.length / itemPage);

  // 무조건 1페이지 이상이면 페이지네이션 표시
  if (totalPages <= 1) {
    pagination.style.display = "none";
    return;
  } else {
    pagination.style.display = "flex";
  }

  for (let i = 1; i <= totalPages; i++) {
    let btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === currentPage ? 'active page-btn' : 'page-btn';
    btn.addEventListener('click', () => {
      currentPage = i;
      renderProjects(filteredProjects);
    });
    pagination.appendChild(btn);
  }
}


/* 필터링 함수 */
let optionTypes = ['Solo', 'Team'];
let skillTypes = ['html5', 'css', 'scss', 'javascript', 'react'];

checkItem.forEach(cb => {
  cb.addEventListener('change', (e) => {
    const value = e.target.value.toLowerCase();

    // 스킬은 하나만 선택 가능하도록 처리
    if (skillTypes.includes(value)) {
      checkItem.forEach(other => {
        if (other !== e.target && skillTypes.includes(other.value.toLowerCase())) {
          other.checked = false;
        }
      });
    }

    filterProjects();
  });
});

function filterProjects() {
  let selected = Array.from(checkItem)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  let selectedOptions = selected.filter(val => optionTypes.includes(val));
  let selectedSkills = selected.filter(val => skillTypes.includes(val));

  // 스킬은 하나만 유지
  if (selectedSkills.length > 1) {
    const lastChecked = Array.from(checkItem)
      .reverse()
      .find(cb => selectedSkills.includes(cb.value.toLowerCase()));

    checkItem.forEach(cb => {
      if (SKILL_TYPES.includes(cb.value.toLowerCase()) && cb !== lastChecked) {
        cb.checked = false;
      }
    });

    selectedSkills = [lastChecked.value.toLowerCase()];
  }

  filteredProjects = projectLists.filter(({ option, skills }) => {
    const optionMatch =
      selectedOptions.length === 0 || selectedOptions.includes(option.toLowerCase());

    const normalizedSkills = skills.map(skill => skill.toLowerCase());
    const skillMatch =
      selectedSkills.length === 0 || selectedSkills.every(skill => normalizedSkills.includes(skill));

    return optionMatch && skillMatch;
  });

  currentPage = 1;
  renderProjects(filteredProjects);
}

/* 팝업 열기/닫기 이벤트 */
document.addEventListener('click', (e) => {
  let openBtn = e.target.closest('.portfolio-btn.popup[data-index]');
  let closeBtn = e.target.closest('.popup-close-btn');
  let isOutside = e.target === popup;
  let popupBg = document.querySelector(".portfolio-popup-bg")
  

  if (openBtn) {
    e.preventDefault();
    let index = openBtn.dataset.index;
    renderPopup(projectLists[index]);
    popupBg.style.display = "block"
  }

  if (closeBtn || isOutside) {
    popup.style.display = 'none';
    popup.innerHTML = '';
    popupBg.style.display = "none"
  }
});

/* 팝업 렌더링 함수 */
function renderPopup(data) {
  let plannerBtn = data.plannerLink
    ? `<a href="${data.plannerLink}" class="portfolio-btn link-btn planner" target="_blank">기획서 바로가기</a>`
    : '';
  let designBtn = data.designLink
    ? `<a href="${data.designLink}" class="portfolio-btn link-btn design" target="_blank">figma 바로가기</a>`
    : '';
    let gitBtn = data.gitUrl
    ? `<a href="${data.gitUrl}" class="portfolio-btn link-btn design" target="_blank">git Hub</a>`
    : '';

  popup.innerHTML = `
    <div class="popup-close-btn">
      <i class="fa-solid fa-xmark"></i>
    </div>
    <div class="popup-content">
      <h4>${data.title}</h4>
      <h6>${data.titleSub}</h6>
      <div class="img-wrap">
        <img src="${data.mainImg}" alt="main-img" class="main-img">
        <img src="${data.subImg}" alt="sub-img" class="sub-img">
      </div>
      <div class="btn-wrap">
        ${designBtn}
        ${plannerBtn}
        ${gitBtn}
      </div>
      <div class="text-container">
        <div class="planner text-wrap">
          <h6>작업 환경</h6>
          <p><span>구분 :</span> ${data.option}</p>
          <p><span>스킬 :</span> ${data.skills.map(skill=> `${skill}`).join (', ')}</p>
          <p><span>디자인 설계 :</span> ${data.design}</p>
          <p><span>기여도 :</span> ${data.impact}</p>
        </div>
        <div class="produce text-wrap">
          <h6>작업 내용</h6>
          <p class="info">${data.popupInfo}</p>
          <div class="list-wrap">
            <div class="main-list list">
              <p>메인페이지</p>
                <ul>
                ${data.mainList.map(list=> `<li>${list}</li>`).join ('')}
                </ul>
            </div>
            <div class="sub-list list">
              <p>서브페이지</p>
                <ul>
                ${data.SubList.map(list=> `<li>${list}</li>`).join('')}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  popup.style.display = 'block';
}

/*  체크박스 이벤트 연결  */
checkItem.forEach(cb => cb.addEventListener('change', filterProjects));

/*  초기 전체 프로젝트 보여주기  */
renderProjects(projectLists);
