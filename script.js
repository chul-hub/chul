const domesticSupports = [
  {
    name: "강릉지원",
    address: "(우) 25565 강원도 강릉시 하평 5길 29 (포남 2동 1304)",
    phones: ["(033)651-3003"],
    faxes: ["(033)652-0281"],
    website: "https://gng.hanmaum.org/"
  },
  {
    name: "공주지원",
    address: "(우) 32522 충청남도 공주시 사곡면 위안양골길 157-61 (신영3리 152-3)",
    phones: ["(041)852-9100"],
    faxes: ["(041)852-9105"],
    website: "https://gju.hanmaum.org/"
  },
  {
    name: "광명선원",
    address: "(우) 27638 충청북도 음성군 금왕읍 대금로 1402 (무극리 559-13)",
    phones: ["(043)877-5000"],
    faxes: ["(043)877-2900"],
    website: "https://gm.hanmaum.org/"
  },
  {
    name: "광주지원",
    address: "(우) 61965 광주광역시 서구 운천로 204번길 23-1 (치평동 201-5)",
    phones: ["(062)373-8801"],
    faxes: ["(062)373-0174"],
    website: "https://gwj.hanmaum.org/"
  },
  {
    name: "대구지원",
    address: "(우) 42152 대구광역시 수성구 수성로 41길 76 (중동 532-274)",
    phones: ["(053)767-3100"],
    faxes: ["(053)765-1600"],
    website: "https://dgu.hanmaum.org/"
  },
  {
    name: "목포지원",
    address: "(우) 58696 전라남도 목포시 백년대로 266번길 31-1(상동 952-19)",
    phones: ["(061)284-1771"],
    faxes: ["(061)284-1770"],
    website: "https://mp.hanmaum.org/"
  },
  {
    name: "문경지원",
    address: "(우) 36937 경상북도 문경시 산양면 봉서1길 10(반곡리 44)",
    phones: ["(054)555-8871"],
    faxes: ["(054)556-1989"],
    website: "https://myg.hanmaum.org/"
  },
  {
    name: "부산지원",
    address: "(우) 49113 부산광역시 영도구 함지로 79번길 23-26 (동삼동 522-1)",
    phones: ["(051)403-7077"],
    faxes: ["(051)403-1077"],
    website: "https://bs.hanmaum.org/"
  },
  {
    name: "울산지원",
    address: "(우) 44200 울산광역시 북구 달래골길 26-12 (천곡동 927-7)",
    phones: ["(052)295-2335"],
    faxes: ["(052)295-2336"],
    website: "https://us.hanmaum.org/"
  },
  {
    name: "제주지원",
    address: "(우) 63308 제주도 제주시 황사평 6길 176-1 (영평동 1500)",
    phones: ["(064)727-3100"],
    faxes: ["(064)727-0302"],
    website: "https://jej.hanmaum.org/"
  },
  {
    name: "중부경남지원",
    address: "(우) 50871 경상남도 김해시 진영읍 하계로 35 (방동리 321-1)",
    phones: ["(055)345-9900"],
    faxes: ["(055)346-2179"],
    website: "https://mkn.hanmaum.org/"
  },
  {
    name: "진주지원",
    address: "(우) 52602 경상남도 진주시 미천면 오방로 528-40 (오방리 50)",
    phones: ["(055)746-8163"],
    faxes: ["(055)746-7825"],
    website: "https://jju.hanmaum.org/"
  },
  {
    name: "청주지원",
    address: "(우) 28540 충청북도 청주시 청원구 교서로 109 (우암동 295-7)",
    phones: ["(043)259-5599"],
    faxes: ["(043)255-5599"],
    website: "https://cju.hanmaum.org/"
  },
  {
    name: "통영지원",
    address: "(우) 53021 경상남도 통영시 광도면 조암길 45-230",
    phones: ["(055)643-0643"],
    faxes: ["(055)643-0642"],
    website: "https://ty.hanmaum.org/"
  },
  {
    name: "포항지원",
    address: "(우) 37635 경상북도 포항시 북구 우창로 59 (우현동 13-1)",
    phones: ["(054)232-3163"],
    faxes: ["(054)241-3503"],
    website: "https://phg.hanmaum.org/"
  }
];

const globalSupports = [
  {
    region: "독일",
    name: "독일지원",
    address: "Broicherdorf Str. 102, 41564 Kaarst, Germany",
    phones: ["(49-2131)969551"],
    faxes: ["(49-2131)969552"],
    website: "https://ger.hanmaum.org/"
  },
  {
    region: "미국",
    name: "뉴욕지원",
    address: "144-39, 32 Ave. Flushing, NY 11354, USA",
    phones: ["070-7899-5899", "(1-718)460-2019"],
    faxes: ["(1-718)939-3974"],
    website: "https://nyk.hanmaum.org/"
  },
  {
    region: "미국",
    name: "로스엔젤레스지원",
    address: "1905, S. Victoria Ave. L.A., CA 90016, USA",
    phones: ["(1-323)766-1316"],
    website: "https://la.hanmaum.org/"
  },
  {
    region: "미국",
    name: "시카고지원",
    address: "854 RIVERWOODS RD. METTAWA, IL, 60045 USA",
    phones: ["(1-224)632-0959"],
    website: "https://chi.hanmaum.org/"
  },
  {
    region: "미국",
    name: "워싱턴지원",
    address: "10303 Burke Lake Rd. Fairfax Station, VA 22039",
    phones: ["(1-703)560-5166"],
    faxes: ["(1-703)560-5166"],
    website: "https://wah.hanmaum.org/"
  },
  {
    region: "아르헨티나",
    name: "부에노스 아이레스지원",
    address: "Miró 1575, CABA, C1406CVE, República Argentina",
    phones: ["(54-11)4921-9286"],
    website: "http://hanmaumbsas.org/"
  },
  {
    region: "아르헨티나",
    name: "뚜꾸만지원",
    address: "Av. Aconquija 5250, El Corte, Yerba Buena, T4107CHN, Tucumán, Argentina",
    phones: ["54-381-408-2894"],
    website: "https://tuc.hanmaum.org/"
  },
  {
    region: "브라질",
    name: "상파울로지원",
    address: "Rua Muniz de Sousa, 1296-Aclimação, São Paulo -SP, 01534-001, Brasil"
  },
  {
    region: "캐나다",
    name: "토론토지원",
    address: "20 Mobile Drive North York, Ontario M4A 1H9 CANADA",
    phones: ["(1-416)750-7943"],
    faxes: ["(1-416)981-7815"],
    website: "https://tor.hanmaum.org/"
  },
  {
    region: "태국",
    name: "태국지원",
    address: "86/1 Soi 4 Ekkamai, Sukhumvit 63Rd. Bangkok 10110, Thailand",
    phones: ["66) 61-413-7000"],
    website: "https://thi.hanmaum.org/"
  }
];

function renderSupportSection(data, listId, detailId) {
  const listEl = document.getElementById(listId);
  const detailEl = document.getElementById(detailId);

  if (!listEl || !detailEl) return;

  let activeCard = null;

  data.forEach((entry, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "support-card";
    card.setAttribute("data-index", String(index));

    const nameWrapper = document.createElement("div");
    nameWrapper.className = "name";
    nameWrapper.textContent = entry.name;

    if (entry.region) {
      const regionBadge = document.createElement("span");
      regionBadge.className = "region";
      regionBadge.textContent = entry.region;
      nameWrapper.appendChild(regionBadge);
    }

    const summary = document.createElement("div");
    summary.className = "summary";
    const addressLine = entry.address || "주소 정보 없음";
    const contactLine = entry.phones && entry.phones.length > 0
      ? `☎ ${entry.phones[0]}`
      : entry.faxes && entry.faxes.length > 0
        ? `Fax ${entry.faxes[0]}`
        : "연락처 정보 없음";
    summary.innerHTML = `${addressLine}<br>${contactLine}`;

    card.append(nameWrapper, summary);

    card.addEventListener("click", () => {
      if (activeCard) {
        activeCard.classList.remove("active");
      }
      card.classList.add("active");
      activeCard = card;
      renderDetail(entry, detailEl);
    });

    listEl.appendChild(card);

    if (index === 0) {
      card.classList.add("active");
      activeCard = card;
      renderDetail(entry, detailEl);
    }
  });
}

function renderDetail(entry, container) {
  container.innerHTML = "";

  const header = document.createElement("div");
  header.className = "detail-header";

  const title = document.createElement("h3");
  title.textContent = entry.name;
  header.appendChild(title);

  if (entry.region) {
    const region = document.createElement("span");
    region.className = "region-tag";
    region.textContent = entry.region;
    header.appendChild(region);
  }

  const body = document.createElement("div");
  body.className = "detail-body";

  const addressBlock = createInfoBlock("주소", entry.address || "주소 정보가 등록되어 있지 않습니다.");
  body.appendChild(addressBlock);

  if (entry.phones && entry.phones.length > 0) {
    body.appendChild(createListBlock("전화", entry.phones, true));
  }

  if (entry.faxes && entry.faxes.length > 0) {
    body.appendChild(createListBlock("팩스", entry.faxes, false));
  }

  if ((!entry.phones || entry.phones.length === 0) && (!entry.faxes || entry.faxes.length === 0)) {
    body.appendChild(createInfoBlock("연락처", "등록된 연락처 정보가 없습니다."));
  }

  if (entry.website) {
    const websiteBlock = document.createElement("dl");
    websiteBlock.className = "info-block";
    const dt = document.createElement("dt");
    dt.textContent = "홈페이지";
    const dd = document.createElement("dd");
    const link = document.createElement("a");
    link.href = entry.website;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = entry.website.replace(/^https?:\/\//, "");
    dd.appendChild(link);
    websiteBlock.append(dt, dd);
    body.appendChild(websiteBlock);
  }

  const mapLink = document.createElement("a");
  mapLink.className = "map-link";
  mapLink.href = createMapSearchUrl(entry);
  mapLink.target = "_blank";
  mapLink.rel = "noopener";
  mapLink.textContent = "구글 지도에서 보기";

  const mapContainer = document.createElement("div");
  mapContainer.className = "map-container";
  const iframe = document.createElement("iframe");
  iframe.loading = "lazy";
  iframe.src = createMapEmbedUrl(entry);
  iframe.title = `${entry.name} 위치 지도`;
  mapContainer.appendChild(iframe);

  container.append(header, body, mapLink, mapContainer);
}

function createInfoBlock(label, text) {
  const block = document.createElement("dl");
  block.className = "info-block";
  const dt = document.createElement("dt");
  dt.textContent = label;
  const dd = document.createElement("dd");
  dd.textContent = text;
  block.append(dt, dd);
  return block;
}

function createListBlock(label, items, withTelLinks) {
  const block = document.createElement("dl");
  block.className = "info-block";
  const dt = document.createElement("dt");
  dt.textContent = label;
  block.appendChild(dt);

  items.forEach((item) => {
    const dd = document.createElement("dd");
    if (withTelLinks) {
      const href = buildTelHref(item);
      if (href) {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = item;
        link.className = "contact-link";
        dd.appendChild(link);
      } else {
        dd.textContent = item;
      }
    } else {
      dd.textContent = item;
    }
    block.appendChild(dd);
  });

  return block;
}

function buildTelHref(value) {
  const cleaned = value.replace(/[^0-9+]/g, "");
  if (!cleaned) {
    return null;
  }

  if (cleaned.startsWith("00")) {
    return `tel:+${cleaned.slice(2)}`;
  }

  return `tel:${cleaned}`;
}

function createMapQuery(entry) {
  const parts = [];
  if (entry.address) parts.push(entry.address);
  if (entry.region && !entry.address?.includes(entry.region)) parts.push(entry.region);
  parts.push("한마음선원", entry.name);
  return parts.filter(Boolean).join(" ");
}

function createMapEmbedUrl(entry) {
  const query = encodeURIComponent(createMapQuery(entry));
  return `https://maps.google.com/maps?q=${query}&output=embed`;
}

function createMapSearchUrl(entry) {
  const query = encodeURIComponent(createMapQuery(entry));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderSupportSection(domesticSupports, "domestic-list", "domestic-detail");
  renderSupportSection(globalSupports, "global-list", "global-detail");
});
