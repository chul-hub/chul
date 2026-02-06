const branches = [
  {
    name: "한마음선원 본원",
    region: "경기도 안양 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "https://www.hanmaum.org",
  },
  {
    name: "서울 지원",
    region: "서울 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "부산 지원",
    region: "부산 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "대구 지원",
    region: "대구 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "광주 지원",
    region: "광주 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "대전 지원",
    region: "대전 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "울산 지원",
    region: "울산 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "인천 지원",
    region: "인천 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "수원 지원",
    region: "경기도 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "성남 지원",
    region: "경기도 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "춘천 지원",
    region: "강원도 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "청주 지원",
    region: "충청북도 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "전주 지원",
    region: "전라북도 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "제주 지원",
    region: "제주도 · 국내",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "뉴욕 지원",
    region: "미국 · 국외",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "LA 지원",
    region: "미국 · 국외",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "시카고 지원",
    region: "미국 · 국외",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "토론토 지원",
    region: "캐나다 · 국외",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "밴쿠버 지원",
    region: "캐나다 · 국외",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "시드니 지원",
    region: "호주 · 국외",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
  {
    name: "런던 지원",
    region: "영국 · 국외",
    phone: "정보 준비 중",
    address: "정보 준비 중",
    website: "정보 준비 중",
  },
];

const listElement = document.querySelector("#branch-list");
const template = document.querySelector("#branch-card");
const searchInput = document.querySelector("#search");

const normalize = (value) => value.replace(/\s+/g, "").toLowerCase();

const buildMapUrl = (branch) => {
  const query = encodeURIComponent(`${branch.name} ${branch.address}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

const buildPhoneLink = (phone) => {
  if (!phone || phone.includes("정보")) {
    return null;
  }
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
};

const renderBranches = (items) => {
  listElement.innerHTML = "";

  items.forEach((branch) => {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector(".branch-card");
    const header = clone.querySelector(".branch-card__header");

    clone.querySelector(".branch-card__name").textContent = branch.name;
    clone.querySelector(".branch-card__region").textContent = branch.region;

    const phoneElement = clone.querySelector(".detail__phone");
    phoneElement.textContent = branch.phone;
    const phoneLink = buildPhoneLink(branch.phone);
    if (phoneLink) {
      phoneElement.href = phoneLink;
    } else {
      phoneElement.removeAttribute("href");
    }

    clone.querySelector(".detail__address").textContent = branch.address;

    const mapLink = clone.querySelector(".detail__map");
    mapLink.href = buildMapUrl(branch);

    const siteLink = clone.querySelector(".detail__site");
    if (branch.website.includes("정보")) {
      siteLink.textContent = "정보 준비 중";
      siteLink.removeAttribute("href");
    } else {
      siteLink.textContent = branch.website;
      siteLink.href = branch.website;
    }

    header.addEventListener("click", () => {
      card.classList.toggle("is-open");
    });

    listElement.appendChild(clone);
  });
};

const filterBranches = () => {
  const query = normalize(searchInput.value);
  const filtered = branches.filter((branch) => {
    if (!query) return true;
    const haystack = normalize(`${branch.name}${branch.region}${branch.address}`);
    return haystack.includes(query);
  });
  renderBranches(filtered);
};

searchInput.addEventListener("input", filterBranches);

renderBranches(branches);
