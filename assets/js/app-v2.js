// Q&A Kashrut App - Main JavaScript
// In-memory storage (no backend yet)

let questions = [];
const DATA_VERSION = '5'; // Increment to force sample data reload

// Badatz and Hechsher list
const BADATZ_LIST = [
  'בד״ץ אגודת ישראל',
  'בד״ץ אור החיים',
  'בד״ץ איגוד רבנים (BIR)',
  'בד״ץ בית יוסף',
  'בד״ץ הרב וסטהיים',
  'בד״ץ הרב לנד״א',
  'בד״ץ הרב מוצפי',
  'בד״ץ הרב מחפוד (יורה דעה)',
  'בד״ץ הרב רובין',
  'בד״ץ העדה החרדית',
  'בד״ץ חתם סופר בני ברק',
  'בד״ץ חתם סופר פתח תקווה',
  'בד״ץ מונסי',
  'בד״ץ מחזיקי הדת',
  'בד"ץ מנצ\'סטר (מנטשסטר)',
  'בד״ץ קהילות',
  'בד״ץ קהילות נווה ציון',
  'בד״ץ שארית ישראל'
];

const AMERICAN_HECHSHER_LIST = [
  'OU – או או יו',
  'OK – או קיי',
  'KOF-K – קוף קיי',
  'Star-K – סטאר קיי',
  'cRc – סי אר סי',
  'KLBD – קיי אל בי די',
  'COR – סי או אר',
  'MK – אם קיי',
  'BCK – בי סי קיי',
  'EarthKosher – ארץ קושר'
];

const RABANUT_LIST = [
  'רבנות אור יהודה',
  'רבנות אור עקיבא',
  'רבנות אשדוד',
  'רבנות אשקלון',
  'רבנות אלעד',
  'רבנות באר שבע',
  'רבנות בת ים',
  'רבנות בני ברק',
  'רבנות בית שמש',
  'רבנות ביתר עילית',
  'רבנות גבעת שמואל',
  'רבנות גבעתיים',
  'רבנות הרצליה',
  'רבנות חדרה',
  'רבנות חולון',
  'רבנות חיפה',
  'רבנות טבריה',
  'רבנות טירת כרמל',
  'רבנות יבנה',
  'רבנות ירושלים',
  'רבנות כפר סבא',
  'רבנות לוד',
  'רבנות מודיעין עילית',
  'רבנות מגדל העמק',
  'רבנות נהריה',
  'רבנות נס ציונה',
  'רבנות נתניה',
  'רבנות נוף הגליל (נצרת עילית)',
  'רבנות עפולה',
  'רבנות פתח תקווה',
  'רבנות צפת',
  'רבנות קרית אונו',
  'רבנות קרית ביאליק',
  'רבנות קרית שמונה',
  'רבנות קריית גת',
  'רבנות קריית ים',
  'רבנות קריית מוצקין',
  'רבנות קריית מלאכי',
  'רבנות קריית ספר',
  'רבנות ראשון לציון',
  'רבנות רחובות',
  'רבנות רמלה',
  'רבנות רעננה',
  'רבנות רמת גן',
  'רבנות סחנין'
];

// Combined list for search
const HECHSHER_LIST = [...BADATZ_LIST, ...AMERICAN_HECHSHER_LIST, ...RABANUT_LIST];

// Initialize with sample data
function initData() {
  const sampleQuestions = [
    {
      id: '1',
      product: 'חלב טבעי 3%',
      company: 'טרה',
      category: 'חלב',
      country: 'ישראל',
      sku: '7290001234567',
      kashrutType: 'רבנות',
      hechsher: 'רבנות ראשית ישראל',
      question: 'האם החלב מחלב ישראל או נוכרי? מה מעמדו בהלכה?',
      createdAt: '2026-02-01',
      status: 'approved',
      answer: 'חלב טבעי 3% של טרה הוא חלב ישראל. ניתן לצרוך לפי כל הדעות.',
      answeredAt: '2026-02-02',
      rejectionReason: ''
    },
    {
      id: '2',
      product: 'סוכריות גומי',
      company: 'חלווה מרשמלו',
      category: 'תוספי מזון',
      country: 'ארצות הברית',
      sku: '038000123456',
      kashrutType: 'בד"ץ',
      hechsher: 'OU – או או יו',
      question: 'האם הסוכריות מכילות ג׳לטין? מה מקורו?',
      createdAt: '2026-02-03',
      status: 'approved',
      answer: 'מכילות ג׳לטין מן החי. יש לבדוק את תווית הכשרות הספציפית על המוצר. מוצרים עם תעודת כשרות מהודרים - ג׳לטין כשר.',
      answeredAt: '2026-02-04',
      rejectionReason: ''
    },
    {
      id: '3',
      product: 'פסטה איטלקית',
      company: 'ברילה',
      category: 'מאפים',
      country: 'אירופה',
      sku: '8001234567890',
      kashrutType: 'בד"ץ',
      hechsher: '',
      question: 'האם מייצרים בציוד משותף עם מוצרים לא כשרים?',
      createdAt: '2026-02-05',
      status: 'pending',
      answer: '',
      answeredAt: '',
      rejectionReason: ''
    },
    {
      id: '4',
      product: 'שוקו ללא סוכר',
      company: 'אלית',
      category: 'משקאות',
      country: 'ישראל',
      sku: '7290009876543',
      kashrutType: 'רבנות',
      hechsher: 'רבנות ראשית ישראל',
      question: 'האם מתאים לצריכה בשרי?',
      createdAt: '2026-01-28',
      status: 'approved',
      answer: 'המוצר פרווה בפסקה. ניתן לשתות אחרי בשרי ואחרי חלבי לפי מנהגי כל הקהילות.',
      answeredAt: '2026-01-29',
      rejectionReason: ''
    },
    {
      id: '5',
      product: 'מרגרינה צמחית',
      company: 'מאסטר שף',
      category: 'חלב',
      country: 'ישראל',
      sku: '7290004567890',
      kashrutType: '',
      hechsher: '',
      question: 'האם מכילה שומן חזיר או חומרים אסורים?',
      createdAt: '2026-02-05',
      status: 'rejected',
      answer: '',
      answeredAt: '',
      rejectionReason: 'שאלה לא ברורה - יש לציין את שם המוצר המדויק והמק"ט. מרגרינה היא קטגוריה רחבה.'
    }
  ];
  
  // Try to load from localStorage first
  const storedVersion = localStorage.getItem('kashrut_data_version');
  const stored = localStorage.getItem('kashrut_questions');
  
  // Force reload if version mismatch or no stored data
  if (storedVersion !== DATA_VERSION || !stored) {
    questions = sampleQuestions;
    saveData();
    localStorage.setItem('kashrut_data_version', DATA_VERSION);
    return;
  }
  
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) {
      questions = parsed;
    } else {
      questions = sampleQuestions;
      saveData();
    }
  } catch (e) {
    questions = sampleQuestions;
    saveData();
  }
}

function saveData() {
  localStorage.setItem('kashrut_questions', JSON.stringify(questions));
}

// Global variables for question navigation
let currentQuestionList = [];
let currentQuestionIndex = -1;

// Homepage functions
function loadRecentQuestions() {
  const container = document.getElementById('recent-questions');
  if (!container) return;
  
  // Sort by date - newest first
  const approved = questions
    .filter(q => q.status === 'approved')
    .sort((a, b) => {
      const dateA = new Date(a.answeredAt || a.createdAt);
      const dateB = new Date(b.answeredAt || b.createdAt);
      return dateB - dateA; // Descending order (newest first)
    })
    .slice(0, 5);
  
  console.log('Sorted questions:', approved.map(q => ({
    product: q.product,
    answeredAt: q.answeredAt,
    createdAt: q.createdAt
  })));
  
  currentQuestionList = approved; // Save for navigation
  
  if (approved.length === 0) {
    container.innerHTML = '<div class="empty-state">אין שאלות מאושרות עדיין</div>';
    return;
  }
  
  container.innerHTML = approved.map((q, index) => `
    <div class="question-card fade-up" data-question-id="${q.id}" onclick="toggleQuestionDetail('${q.id}', ${index})">
      <div class="card-header">
        <h3>${escapeHtml(q.product)}</h3>
        <span class="tag approved">נענה</span>
      </div>
      <div class="card-details-line">
        <span class="clickable-filter" onclick="event.stopPropagation(); filterByField('product', '${escapeHtml(q.product).replace(/'/g, "\\'")}');">${escapeHtml(q.product)}</span>
        <span class="detail-separator">|</span>
        <span class="clickable-filter" onclick="event.stopPropagation(); filterByField('company', '${escapeHtml(q.company).replace(/'/g, "\\'")}');">${escapeHtml(q.company)}</span>
        <span class="detail-separator">|</span>
        <span class="clickable-filter" onclick="event.stopPropagation(); filterByField('category', '${escapeHtml(q.category).replace(/'/g, "\\'")}');">${escapeHtml(q.category)}</span>
        <span class="detail-separator">|</span>
        <span class="clickable-filter" onclick="event.stopPropagation(); filterByField('country', '${escapeHtml(q.country || '-').replace(/'/g, "\\'")}');">${escapeHtml(q.country || '-')}</span>
        ${q.sku ? `<span class="detail-separator">|</span><span class="clickable-filter" onclick="event.stopPropagation(); filterByField('sku', '${escapeHtml(q.sku).replace(/'/g, "\\'")}');">מק"ט: ${escapeHtml(q.sku)}</span>` : ''}
        ${q.hechsher ? `<span class="detail-separator">|</span><span class="clickable-filter" onclick="event.stopPropagation(); filterByField('hechsher', '${escapeHtml(q.hechsher).replace(/'/g, "\\'")}');" style="color: #8B4513; font-weight: 600;">${escapeHtml(q.hechsher)}</span>` : q.kashrutType ? `<span class="detail-separator">|</span><span class="clickable-filter" onclick="event.stopPropagation(); filterByField('hechsher', '${escapeHtml(q.kashrutType).replace(/'/g, "\\'")}');" style="color: #8B4513; font-weight: 600;">${escapeHtml(q.kashrutType)}</span>` : ''}
      </div>
      <div class="card-question-preview card-collapsible">${escapeHtml(q.question?.substring(0, 120) || 'אין פירוט')}${q.question?.length > 120 ? '...' : ''}</div>
      <div class="card-meta card-collapsible">
        <span>${formatDate(q.createdAt)}</span>
      </div>
      
      <!-- Full question and answer (hidden by default) -->
      <div class="card-expanded-content" style="display: none;">
        <div class="expanded-divider"></div>
        <div class="question-full">
          <div class="question-label">השואל:</div>
          <div class="question-text">${escapeHtml(q.question) || 'אין פירוט נוסף'}</div>
        </div>
        ${q.status === 'approved' && q.answer ? `
          <div class="answer-full">
            <div class="answer-label">הרב:</div>
            <div class="answer-text">${escapeHtml(q.answer)}</div>
          </div>
          <div class="card-meta-bottom">
            <span>${formatDate(q.answeredAt || q.createdAt)}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
  
  // Highlight current question if viewing
  highlightCurrentQuestionCard();
}

// Category icons mapping
const CATEGORY_ICONS = {
  'חלב': 'coffee',
  'בשר': 'drumstick',
  'פרווה': 'leaf',
  'תוספי מזון': 'flask-conical',
  'משקאות': 'wine',
  'מאפים': 'cookie',
  'חומרי גלם': 'package'
};

// Load categories dynamically - only show if approved questions exist
function loadCategories() {
  const container = document.getElementById('category-grid');
  if (!container) return;
  
  const categories = ['חלב', 'בשר', 'פרווה', 'תוספי מזון', 'משקאות', 'מאפים', 'חומרי גלם'];
  
  // Filter categories that have approved questions
  const categoriesWithQuestions = categories.filter(category => {
    return questions.some(q => q.category === category && q.status === 'approved');
  });
  
  if (categoriesWithQuestions.length === 0) {
    container.innerHTML = '<div class="empty-state">אין קטגוריות עם שאלות מאושרות</div>';
    return;
  }
  
  container.innerHTML = categoriesWithQuestions.map(category => {
    const icon = CATEGORY_ICONS[category] || 'circle';
    const count = questions.filter(q => q.category === category && q.status === 'approved').length;
    return `
      <a href="repository.html?category=${encodeURIComponent(category)}" class="category-card">
        <div class="category-icon">
          <i data-lucide="${icon}"></i>
        </div>
        <span class="category-name">${escapeHtml(category)}</span>
        <span class="category-count">${count} שאלות</span>
      </a>
    `;
  }).join('');
  
  // Re-initialize Lucide icons after adding new elements
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function updateStats() {
  const approvedCount = questions.filter(q => q.status === 'approved').length;
  const pendingCount = questions.filter(q => q.status === 'pending').length;
  
  const approvedEl = document.getElementById('approved-count');
  const pendingEl = document.getElementById('pending-count');
  
  if (approvedEl) approvedEl.textContent = approvedCount;
  if (pendingEl) pendingEl.textContent = pendingCount;
}

// Ask Question form
function initQuestionForm() {
  const form = document.getElementById('question-form');
  if (!form) return;
  
  // Initialize autocomplete for hechsher
  initHechsherAutocomplete();
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const hechsherValue = document.getElementById('hechsher')?.value || '';
    
    const newQuestion = {
      id: Date.now().toString(),
      product: document.getElementById('product').value,
      company: document.getElementById('company').value,
      category: document.getElementById('category').value,
      country: document.getElementById('country').value,
      sku: document.getElementById('sku').value,
      kashrutType: '', // No longer used
      hechsher: hechsherValue,
      question: document.getElementById('question').value,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
      answer: '',
      answeredAt: '',
      rejectionReason: ''
    };
    
    // Debug: Show what was saved
    console.log('שאלה חדשה נשמרה:', newQuestion);
    console.log('סוג כשרות:', newQuestion.kashrutType);
    console.log('שם הכשרות:', newQuestion.hechsher);
    
    questions.push(newQuestion);
    saveData();
    
    const message = document.getElementById('form-message');
    if (message) {
      message.classList.add('show');
    }
    
    form.reset();
    
    setTimeout(() => {
      if (message) {
        message.classList.remove('show');
      }
    }, 5000);
  });
}

// Repository functions
function loadQuestionsList() {
  const container = document.getElementById('questions-list');
  if (!container) return;
  
  const approved = questions.filter(q => q.status === 'approved');
  renderQuestionsList(approved);
  
  // Check if there are filter parameters in URL
  const urlParams = new URLSearchParams(window.location.search);
  const filterField = urlParams.get('filter');
  const filterValue = urlParams.get('value');
  
  if (filterField && filterValue) {
    const decodedValue = decodeURIComponent(filterValue);
    
    // Only set the free text search input (not the specific filter fields)
    const searchInput = document.getElementById('filter-text');
    if (searchInput) {
      searchInput.value = decodedValue;
    }
    
    // Apply filters automatically
    setTimeout(() => {
      applyFilters();
    }, 100);
  }
}

function renderQuestionsList(list) {
  const container = document.getElementById('questions-list');
  const noResults = document.getElementById('no-results');
  
  if (!container) return;
  
  // Save current list for navigation
  currentQuestionList = list;
  
  if (list.length === 0) {
    container.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }
  
  if (noResults) noResults.style.display = 'none';
  
  container.innerHTML = list.map((q, index) => `
    <div class="question-card fade-up" data-question-id="${q.id}" onclick="toggleQuestionDetail('${q.id}', ${index})">
      <div class="card-header">
        <h3>${escapeHtml(q.product)}</h3>
        <span class="tag approved">נענה</span>
      </div>
      <div class="card-details-line">
        <span class="clickable-filter" onclick="event.stopPropagation(); filterByField('product', '${escapeHtml(q.product).replace(/'/g, "\\'")}');">${escapeHtml(q.product)}</span>
        <span class="detail-separator">|</span>
        <span class="clickable-filter" onclick="event.stopPropagation(); filterByField('company', '${escapeHtml(q.company).replace(/'/g, "\\'")}');">${escapeHtml(q.company)}</span>
        <span class="detail-separator">|</span>
        <span class="clickable-filter" onclick="event.stopPropagation(); filterByField('category', '${escapeHtml(q.category).replace(/'/g, "\\'")}');">${escapeHtml(q.category)}</span>
        <span class="detail-separator">|</span>
        <span class="clickable-filter" onclick="event.stopPropagation(); filterByField('country', '${escapeHtml(q.country || '-').replace(/'/g, "\\'")}');">${escapeHtml(q.country || '-')}</span>
        ${q.sku ? `<span class="detail-separator">|</span><span class="clickable-filter" onclick="event.stopPropagation(); filterByField('sku', '${escapeHtml(q.sku).replace(/'/g, "\\'")}');">מק"ט: ${escapeHtml(q.sku)}</span>` : ''}
        ${q.hechsher ? `<span class="detail-separator">|</span><span class="clickable-filter" onclick="event.stopPropagation(); filterByField('hechsher', '${escapeHtml(q.hechsher).replace(/'/g, "\\'")}');" style="color: #8B4513; font-weight: 600;">${escapeHtml(q.hechsher)}</span>` : q.kashrutType ? `<span class="detail-separator">|</span><span class="clickable-filter" onclick="event.stopPropagation(); filterByField('hechsher', '${escapeHtml(q.kashrutType).replace(/'/g, "\\'")}');" style="color: #8B4513; font-weight: 600;">${escapeHtml(q.kashrutType)}</span>` : ''}
      </div>
      <div class="card-question-preview card-collapsible">${escapeHtml(q.question?.substring(0, 120) || 'אין פירוט')}${q.question?.length > 120 ? '...' : ''}</div>
      <div class="card-meta card-collapsible">
        <span>${formatDate(q.createdAt)}</span>
      </div>
      
      <!-- Full question and answer (hidden by default) -->
      <div class="card-expanded-content" style="display: none;">
        <div class="expanded-divider"></div>
        <div class="question-full">
          <div class="question-label">השואל:</div>
          <div class="question-text">${escapeHtml(q.question) || 'אין פירוט נוסף'}</div>
        </div>
        ${q.status === 'approved' && q.answer ? `
          <div class="answer-full">
            <div class="answer-label">הרב:</div>
            <div class="answer-text">${escapeHtml(q.answer)}</div>

          </div>
          <div class="card-meta-bottom">
            <span>${formatDate(q.answeredAt || q.createdAt)}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
  
  // Highlight current question if viewing
  highlightCurrentQuestionCard();
}

function initFilters() {
  const applyBtn = document.getElementById('apply-filters');
  const clearBtn = document.getElementById('clear-filters');
  
  if (applyBtn) {
    applyBtn.addEventListener('click', applyFilters);
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', clearFilters);
  }
}

function applyFilters() {
  const product = document.getElementById('filter-product').value.toLowerCase();
  const company = document.getElementById('filter-company').value.toLowerCase();
  const category = document.getElementById('filter-category').value;
  const country = document.getElementById('filter-country').value;
  const sku = document.getElementById('filter-sku').value.toLowerCase();
  const hechsher = document.getElementById('filter-hechsher')?.value.toLowerCase();
  const text = document.getElementById('filter-text').value.toLowerCase();
  
  const filtered = questions.filter(q => {
    if (q.status !== 'approved') return false;
    
    if (product && !q.product.toLowerCase().includes(product)) return false;
    if (company && !q.company.toLowerCase().includes(company)) return false;
    if (category && q.category !== category) return false;
    if (country && q.country !== country) return false;
    if (sku && !q.sku.toLowerCase().includes(sku)) return false;
    if (hechsher && !q.hechsher.toLowerCase().includes(hechsher)) return false;
    
    // Enhanced free text search - search in question, answer, AND all tags
    if (text) {
      const searchInQuestion = q.question.toLowerCase().includes(text);
      const searchInAnswer = q.answer.toLowerCase().includes(text);
      const searchInProduct = q.product.toLowerCase().includes(text);
      const searchInCompany = q.company.toLowerCase().includes(text);
      const searchInCategory = q.category.toLowerCase().includes(text);
      const searchInCountry = q.country?.toLowerCase().includes(text);
      const searchInHechsher = q.hechsher?.toLowerCase().includes(text);
      const searchInSku = q.sku?.toLowerCase().includes(text);
      
      if (!searchInQuestion && !searchInAnswer && !searchInProduct && 
          !searchInCompany && !searchInCategory && !searchInCountry && 
          !searchInHechsher && !searchInSku) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort results: tag matches first, then content matches
  if (text) {
    filtered.sort((a, b) => {
      const aTagMatch = a.product.toLowerCase().includes(text) ||
                        a.company.toLowerCase().includes(text) ||
                        a.category.toLowerCase().includes(text) ||
                        a.country?.toLowerCase().includes(text) ||
                        a.hechsher?.toLowerCase().includes(text);
      
      const bTagMatch = b.product.toLowerCase().includes(text) ||
                        b.company.toLowerCase().includes(text) ||
                        b.category.toLowerCase().includes(text) ||
                        b.country?.toLowerCase().includes(text) ||
                        b.hechsher?.toLowerCase().includes(text);
      
      // Tag matches come first
      if (aTagMatch && !bTagMatch) return -1;
      if (!aTagMatch && bTagMatch) return 1;
      return 0;
    });
  }
  
  renderQuestionsList(filtered);
}

function clearFilters() {
  document.getElementById('filter-product').value = '';
  document.getElementById('filter-company').value = '';
  document.getElementById('filter-category').value = '';
  document.getElementById('filter-country').value = '';
  document.getElementById('filter-sku').value = '';
  const filterHechsher = document.getElementById('filter-hechsher');
  if (filterHechsher) filterHechsher.value = '';
  document.getElementById('filter-text').value = '';
  
  loadQuestionsList();
}

function toggleQuestionDetail(id, index) {
  const card = document.querySelector(`[data-question-id="${id}"]`);
  if (!card) return;
  
  const expandedContent = card.querySelector('.card-expanded-content');
  if (!expandedContent) return;
  
  // Update current question index
  currentQuestionIndex = index;
  
  // Check if already expanded
  const isExpanded = expandedContent.style.display !== 'none';
  
  // If switching between cards, add smooth transition
  const currentlyExpanded = document.querySelector('.question-card.expanded');
  if (currentlyExpanded && currentlyExpanded !== card) {
    // Fade out current
    const currentContent = currentlyExpanded.querySelector('.card-expanded-content');
    if (currentContent) {
      currentContent.style.opacity = '0';
      setTimeout(() => {
        currentContent.style.display = 'none';
        currentContent.style.opacity = '1';
        currentlyExpanded.classList.remove('expanded');
      }, 300);
    }
  }
  
  // Close all other expanded cards
  document.querySelectorAll('.card-expanded-content').forEach(content => {
    if (content !== expandedContent) {
      content.style.display = 'none';
    }
  });
  
  document.querySelectorAll('.question-card').forEach(c => {
    if (c !== card) {
      c.classList.remove('expanded');
    }
  });
  
  // Toggle current card
  if (isExpanded) {
    expandedContent.style.opacity = '0';
    setTimeout(() => {
      expandedContent.style.display = 'none';
      expandedContent.style.opacity = '1';
      card.classList.remove('expanded');
    }, 300);
  } else {
    expandedContent.style.display = 'block';
    expandedContent.style.opacity = '0';
    card.classList.add('expanded');
    
    // Fade in with delay
    setTimeout(() => {
      expandedContent.style.opacity = '1';
    }, 50);
    
    // Scroll to card smoothly and center it with longer delay
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }, 400);
  }
}

function openQuestionDetail(id, index) {
  // Close any open detail first
  closeQuestionDetail();
  
  // If index not provided, find it in current list
  if (index === undefined) {
    index = currentQuestionList.findIndex(q => q.id === id);
  }
  
  currentQuestionIndex = index;
  
  const q = questions.find(item => item.id === id);
  if (!q) return;
  
  // Find the card element
  const card = document.querySelector(`[data-question-id="${id}"]`);
  if (!card) return;
  
  // Create or get detail element
  let detail = card.querySelector('.question-detail');
  if (!detail) {
    detail = document.createElement('div');
    detail.className = 'question-detail';
    detail.id = `detail-${id}`;
    card.appendChild(detail);
  }
  
  // Update navigation buttons state
  updateNavButtons();
  
  detail.innerHTML = `
    <div class="detail-header">
      <button class="detail-close" onclick="closeQuestionDetail()">
        סגור ✕
      </button>
      <div class="detail-nav">
        <button class="nav-btn" onclick="previousQuestion()" title="שאלה קודמת" ${currentQuestionIndex === 0 ? 'disabled' : ''}>
          <span>↑</span>
        </button>
        <button class="nav-btn" onclick="nextQuestion()" title="שאלה הבאה" ${currentQuestionIndex >= currentQuestionList.length - 1 ? 'disabled' : ''}>
          <span>↓</span>
        </button>
      </div>
    </div>
    
    <div class="detail-banner">
      <div class="detail-header-line">
        <span class="detail-product">${escapeHtml(q.product)}</span>
        <span class="detail-separator">|</span>
        <span>${escapeHtml(q.company)}</span>
        <span class="detail-separator">|</span>
        <span>${escapeHtml(q.category)}</span>
        <span class="detail-separator">|</span>
        <span>${escapeHtml(q.country || '-')}</span>
        ${q.sku ? `<span class="detail-separator">|</span><span>מק"ט: ${escapeHtml(q.sku)}</span>` : ''}
        ${q.hechsher ? `<span class="detail-separator">|</span><span class="detail-kashrut">${escapeHtml(q.hechsher)}</span>` : q.kashrutType ? `<span class="detail-separator">|</span><span class="detail-kashrut">${escapeHtml(q.kashrutType)}</span>` : ''}
      </div>
    </div>
    
    <div class="detail-block question-block">
      <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">השואל:</div>
      <div class="detail-question-text">${escapeHtml(q.question) || 'אין פירוט נוסף'}</div>
    </div>
    
    <div class="detail-block answer-block">
      <div style="color: #666; font-size: 0.9rem; margin-bottom: 0.5rem;">הרב:</div>
      ${q.status === 'approved' && q.answer ? 
        `<div class="detail-answer-text">${escapeHtml(q.answer)}</div>
         <p style="color: #666; font-size: 0.9rem; margin-top: 1rem;">נענה: ${formatDate(q.answeredAt)}</p>` :
        `<p style="color: #666; font-size: 1.2rem;">השאלה ממתינה למענה הרב.</p>`
      }
    </div>
  `;
  
  detail.setAttribute('data-open', 'true');
  
  // Highlight the current card immediately
  highlightCurrentQuestionCard();
  
  // Scroll to the card
  setTimeout(() => {
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

function highlightCurrentQuestionCard() {
  // Remove current-question class from all cards
  document.querySelectorAll('.question-card').forEach(card => {
    card.classList.remove('current-question');
  });
  
  // Add to current question if exists
  if (currentQuestionIndex >= 0 && currentQuestionList[currentQuestionIndex]) {
    const currentId = currentQuestionList[currentQuestionIndex].id;
    const currentCard = document.querySelector(`.question-card[data-question-id="${currentId}"]`);
    if (currentCard) {
      currentCard.classList.add('current-question');
      
      // Scroll to the card with smooth animation
      currentCard.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
    }
  }
}

function updateNavButtons() {
  const prevBtn = document.querySelector('.nav-btn[onclick="previousQuestion()"]');
  const nextBtn = document.querySelector('.nav-btn[onclick="nextQuestion()"]');
  
  if (prevBtn) {
    prevBtn.disabled = currentQuestionIndex <= 0;
  }
  if (nextBtn) {
    nextBtn.disabled = currentQuestionIndex >= currentQuestionList.length - 1;
  }
}

function nextQuestion() {
  if (currentQuestionIndex < currentQuestionList.length - 1) {
    currentQuestionIndex++;
    const nextQ = currentQuestionList[currentQuestionIndex];
    toggleQuestionDetail(nextQ.id, currentQuestionIndex);
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    const prevQ = currentQuestionList[currentQuestionIndex];
    toggleQuestionDetail(prevQ.id, currentQuestionIndex);
  }
}

// Keyboard navigation for question detail
document.addEventListener('keydown', function(e) {
  const anyDetailOpen = document.querySelector('.question-card.expanded');
  
  // Only handle arrow keys if a question is expanded
  if (!anyDetailOpen) return;
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    nextQuestion();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    previousQuestion();
  } else if (e.key === 'Escape') {
    closeQuestionDetail();
  }
});

// Close expanded question when clicking outside
document.addEventListener('click', function(e) {
  const expandedCard = document.querySelector('.question-card.expanded');
  if (!expandedCard) return;
  
  // Check if click is outside all question cards
  if (!e.target.closest('.question-card')) {
    closeQuestionDetail();
  }
});

// Filter by field - navigate to repository with filter
function filterByField(field, value) {
  // Encode the value for URL
  const encodedValue = encodeURIComponent(value);
  // Navigate to repository page with filter parameter
  window.location.href = `repository.html?filter=${field}&value=${encodedValue}`;
}

function closeQuestionDetail() {
  // Close all expanded cards
  document.querySelectorAll('.card-expanded-content').forEach(content => {
    content.style.display = 'none';
  });
  
  // Remove expanded class from all cards
  document.querySelectorAll('.question-card').forEach(card => {
    card.classList.remove('expanded');
  });
}

function viewQuestion(id) {
  window.location.href = `repository.html?id=${id}`;
}

// Admin functions
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tab === tab) {
      btn.classList.add('active');
    }
  });
  
  loadAdminTab(tab);
}

function loadAdminTab(tab) {
  const container = document.getElementById('admin-content');
  if (!container) return;
  
  const filtered = questions.filter(q => q.status === tab);
  
  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state">אין שאלות ${getStatusLabel(tab)}</div>`;
    return;
  }
  
  container.innerHTML = filtered.map(q => renderAdminCard(q, tab)).join('');
}

function renderAdminCard(q, tab) {
  const statusClass = q.status === 'approved' ? 'approved' : q.status === 'pending' ? 'pending' : 'rejected';
  
  let actions = '';
  
  if (tab === 'pending') {
    actions = `
      <div class="admin-actions">
        <button class="btn btn-primary" onclick="answerQuestion('${q.id}')">ענה</button>
        <button class="btn btn-outline" onclick="returnQuestion('${q.id}')">החזר לבירור</button>
        <button class="btn btn-ghost" onclick="rejectQuestion('${q.id}')">דחה</button>
      </div>
      <div id="answer-box-${q.id}" style="display: none; margin-top: 1rem;">
        <textarea id="answer-text-${q.id}" class="admin-textarea" placeholder="כתוב תשובה..."></textarea>
        <div style="margin-top: 0.8rem;">
          <button class="btn btn-primary" onclick="submitAnswer('${q.id}')">שלח תשובה</button>
          <button class="btn btn-ghost" onclick="cancelAnswer('${q.id}')">ביטול</button>
        </div>
      </div>
    `;
  } else if (tab === 'approved') {
    actions = `
      <div class="admin-actions">
        <button class="btn btn-outline" onclick="editAnswer('${q.id}')">ערוך תשובה</button>
        <button class="btn btn-ghost" onclick="unapproveQuestion('${q.id}')">החזר לממתינות</button>
      </div>
      <div id="edit-box-${q.id}" style="display: none; margin-top: 1rem;">
        <textarea id="edit-text-${q.id}" class="admin-textarea">${escapeHtml(q.answer)}</textarea>
        <div style="margin-top: 0.8rem;">
          <button class="btn btn-primary" onclick="saveEdit('${q.id}')">שמור שינויים</button>
          <button class="btn btn-ghost" onclick="cancelEdit('${q.id}')">ביטול</button>
        </div>
      </div>
    `;
  } else if (tab === 'rejected') {
    actions = `
      <div class="admin-actions">
        <button class="btn btn-outline" onclick="restoreQuestion('${q.id}')">שחזר לממתינות</button>
      </div>
    `;
  }
  
  const rejectionNote = q.status === 'rejected' && q.rejectionReason ? 
    `<div class="admin-note"><strong>סיבת דחייה:</strong> ${escapeHtml(q.rejectionReason)}</div>` : '';
  
  const kashrutInfo = q.hechsher ? 
    `<span class="tag ${q.kashrutType === 'בד"ץ' ? 'approved' : 'pending'}">${escapeHtml(q.hechsher.substring(0, 30))}${q.hechsher.length > 30 ? '...' : ''}</span>` : 
    q.kashrutType ? `<span class="tag ${q.kashrutType === 'בד"ץ' ? 'approved' : 'pending'}">${escapeHtml(q.kashrutType)}</span>` : '';
  
  return `
    <div class="admin-card fade-up">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h4>${escapeHtml(q.product)}</h4>
          <div class="admin-meta">
            ${escapeHtml(q.company)} | ${escapeHtml(q.category)} | ${formatDate(q.createdAt)}
          </div>
          ${kashrutInfo ? `<div style="margin-top: 0.5rem;">${kashrutInfo}</div>` : ''}
        </div>
        <span class="tag ${statusClass}">${getStatusLabel(q.status)}</span>
      </div>
      
      <div>
        <strong>שאלה:</strong>
        <p style="margin: 0.5rem 0;">${escapeHtml(q.question) || 'אין פירוט נוסף'}</p>
      </div>
      
      ${q.answer ? `
        <div>
          <strong>תשובה:</strong>
          <p style="margin: 0.5rem 0;">${escapeHtml(q.answer)}</p>
        </div>
      ` : ''}
      
      ${rejectionNote}
      
      ${actions}
    </div>
  `;
}

function answerQuestion(id) {
  const box = document.getElementById(`answer-box-${id}`);
  if (box) {
    box.style.display = 'block';
    document.getElementById(`answer-text-${id}`).focus();
  }
}

function cancelAnswer(id) {
  const box = document.getElementById(`answer-box-${id}`);
  if (box) {
    box.style.display = 'none';
    document.getElementById(`answer-text-${id}`).value = '';
  }
}

function submitAnswer(id) {
  const text = document.getElementById(`answer-text-${id}`).value.trim();
  if (!text) {
    showToast('יש לכתוב תשובה לפני השליחה');
    return;
  }
  
  const q = questions.find(item => item.id === id);
  if (q) {
    q.answer = text;
    q.status = 'approved';
    q.answeredAt = new Date().toISOString();
    saveData();
    showToast('התשובה נשלחה והשאלה אושרה');
    loadAdminTab('pending');
  }
}

function returnQuestion(id) {
  const reason = prompt('ציין מה חסר בשאלה:');
  if (reason) {
    showToast('השאלה הוחזרה לבירור');
    // In real system, would notify user
  }
}

function rejectQuestion(id) {
  const reason = prompt('ציין סיבת הדחייה:');
  if (reason) {
    const q = questions.find(item => item.id === id);
    if (q) {
      q.status = 'rejected';
      q.rejectionReason = reason;
      saveData();
      showToast('השאלה נדחתה');
      loadAdminTab('pending');
    }
  }
}

function editAnswer(id) {
  const box = document.getElementById(`edit-box-${id}`);
  if (box) {
    box.style.display = 'block';
  }
}

function cancelEdit(id) {
  const box = document.getElementById(`edit-box-${id}`);
  if (box) {
    box.style.display = 'none';
    const q = questions.find(item => item.id === id);
    if (q) {
      document.getElementById(`edit-text-${id}`).value = q.answer;
    }
  }
}

function saveEdit(id) {
  const text = document.getElementById(`edit-text-${id}`).value.trim();
  const q = questions.find(item => item.id === id);
  if (q) {
    q.answer = text;
    saveData();
    showToast('התשובה עודכנה');
    loadAdminTab('approved');
  }
}

function unapproveQuestion(id) {
  if (confirm('להחזיר שאלה לממתינות?')) {
    const q = questions.find(item => item.id === id);
    if (q) {
      q.status = 'pending';
      saveData();
      showToast('השאלה הוחזרה לממתינות');
      loadAdminTab('approved');
    }
  }
}

function restoreQuestion(id) {
  const q = questions.find(item => item.id === id);
  if (q) {
    q.status = 'pending';
    q.rejectionReason = '';
    saveData();
    showToast('השאלה שוחזרה לממתינות');
    loadAdminTab('rejected');
  }
}

function showToast(message) {
  const toast = document.getElementById('admin-toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Helper functions
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function parseDateInput(dateStr) {
  if (!dateStr) return null;

  if (dateStr instanceof Date) return dateStr;

  if (typeof dateStr === 'string') {
    const m = dateStr.match(/^\s*(\d{4})-(\d{2})-(\d{2})\s*$/);
    if (m) {
      const y = Number(m[1]);
      const mo = Number(m[2]);
      const d = Number(m[3]);
      return new Date(y, mo - 1, d);
    }
  }

  const dt = new Date(dateStr);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = parseDateInput(dateStr);
  if (!date) return '';
  const gregorian = date.toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' });
  
  try {
    // Convert to Hebrew date
    const hebrewDate = toHebrewDateGematriya(date);
    return `<span style="font-weight: 600; color: #8B4513; font-size: 1.05em;">${hebrewDate}</span> <span style="font-size: 0.85em; color: #999;">(${gregorian})</span>`;
  } catch (e) {
    console.error('Error converting to Hebrew date:', e);
    return gregorian;
  }
}

function toHebrewDateGematriya(date) {
  const dt = parseDateInput(date);
  if (!dt) return '';

  const formatter = new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jerusalem'
  });

  const parts = formatter.formatToParts(dt);
  let day = parts.find(p => p.type === 'day')?.value || '';
  let month = parts.find(p => p.type === 'month')?.value || '';
  let year = parts.find(p => p.type === 'year')?.value || '';

  const stripMarks = (s) => String(s).replace(/[\u05F3\u05F4"׳״]/g, '');

  day = stripMarks(day);
  month = stripMarks(month);
  year = stripMarks(year);

  if (/^\d+$/.test(day)) {
    day = stripMarks(numberToGematriya(Number(day)));
  }

  if (/^\d+$/.test(year)) {
    const yearNum = Number(year);
    const yearShort = yearNum % 1000;
    const yearG = stripMarks(numberToGematriya(yearShort));
    year = yearG;
  }

  if (month.startsWith('ב')) {
    month = month.slice(1);
  }

  if (year.length > 1) {
    year = `${year.slice(0, -1)}"${year.slice(-1)}`;
  }

  return `${day} ${month} ${year}`.trim();
}

// Convert number to Hebrew Gematriya
function numberToGematriya(num) {
  const ones = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
  const tens = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
  const hundreds = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];
  
  if (num === 0) return '';
  if (num > 999) num = num % 1000;
  
  let result = '';
  
  // Hundreds
  const h = Math.floor(num / 100);
  if (h > 0 && h <= 9) {
    if (h <= 4) {
      result += hundreds[h];
    } else if (h === 5) {
      result += 'תק';
    } else if (h === 6) {
      result += 'תר';
    } else if (h === 7) {
      result += 'תש';
    } else if (h === 8) {
      result += 'תת';
    } else if (h === 9) {
      result += 'תתק';
    }
  }
  
  // Tens and ones
  const remainder = num % 100;
  
  // Special cases for 15 and 16 (avoid writing God's name)
  if (remainder === 15) {
    result += 'טו';
  } else if (remainder === 16) {
    result += 'טז';
  } else {
    const t = Math.floor(remainder / 10);
    const o = remainder % 10;
    
    if (t > 0) result += tens[t];
    if (o > 0) result += ones[o];
  }
  
  // Add geresh (׳) for single letter or gershayim (״) for multiple
  if (result.length === 1) {
    result += '׳';
  } else if (result.length > 1) {
    result = result.slice(0, -1) + '״' + result.slice(-1);
  }
  
  return result;
}

function getStatusLabel(status) {
  const labels = {
    'pending': 'ממתין',
    'approved': 'נענה',
    'rejected': 'נדחה'
  };
  return labels[status] || status;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initData();
});

// Hechsher autocomplete functions
function initHechsherAutocomplete(inputId = 'hechsher') {
  const hechsherInput = document.getElementById(inputId);
  
  if (!hechsherInput) return;
  
  // Create wrapper if not exists
  let wrapper = hechsherInput.closest('.autocomplete-wrapper');
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'autocomplete-wrapper';
    hechsherInput.parentNode.insertBefore(wrapper, hechsherInput);
    wrapper.appendChild(hechsherInput);
  }
  
  // Create autocomplete list
  let list = wrapper.querySelector('.autocomplete-list');
  if (!list) {
    list = document.createElement('div');
    list.className = 'autocomplete-list';
    wrapper.appendChild(list);
  }
  
  let selectedIndex = -1;
  let filteredList = [];
  
  // Show full list on focus/click
  hechsherInput.addEventListener('focus', function() {
    showFullHechsherList(list, hechsherInput);
  });
  
  hechsherInput.addEventListener('click', function() {
    showFullHechsherList(list, hechsherInput);
  });
  
  hechsherInput.addEventListener('input', function() {
    const value = this.value.trim();
    
    if (!value) {
      showFullHechsherList(list, hechsherInput);
      return;
    }
    
    // Filter based on input
    filteredList = HECHSHER_LIST.filter(h => {
      return h.toLowerCase().includes(value.toLowerCase());
    });
    
    renderAutocompleteList(list, filteredList, value, hechsherInput);
    selectedIndex = -1;
  });
  
  // Keyboard navigation
  hechsherInput.addEventListener('keydown', function(e) {
    const items = list.querySelectorAll('.autocomplete-item');
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelection(items, selectedIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      updateSelection(items, selectedIndex);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      items[selectedIndex].click();
    } else if (e.key === 'Escape') {
      list.classList.remove('show');
    }
  });
  
  // Close on click outside
  document.addEventListener('click', function(e) {
    if (!wrapper.contains(e.target)) {
      list.classList.remove('show');
    }
  });
}

function showFullHechsherList(list, input) {
  let html = '';
  
  // Show all categories - Badatz, American, and Rabanut
  html += '<div class="autocomplete-category">בד"צים</div>';
  BADATZ_LIST.forEach((item) => {
    html += `<div class="autocomplete-item" data-value="${escapeHtml(item)}">${escapeHtml(item)}</div>`;
  });
  
  html += '<div class="autocomplete-category">כשרות אמריקאיות</div>';
  AMERICAN_HECHSHER_LIST.forEach((item) => {
    html += `<div class="autocomplete-item" data-value="${escapeHtml(item)}">${escapeHtml(item)}</div>`;
  });
  
  html += '<div class="autocomplete-category">רבנויות</div>';
  RABANUT_LIST.forEach((item) => {
    html += `<div class="autocomplete-item" data-value="${escapeHtml(item)}">${escapeHtml(item)}</div>`;
  });
  
  list.innerHTML = html;
  list.classList.add('show');
  
  // Scroll to top to show Badatz first
  list.scrollTop = 0;
  
  // Add click handlers
  list.querySelectorAll('.autocomplete-item').forEach(item => {
    item.addEventListener('click', function() {
      input.value = this.dataset.value;
      list.classList.remove('show');
    });
  });
}

function renderAutocompleteList(list, items, searchValue, input) {
  if (items.length === 0) {
    list.innerHTML = `
      <div class="no-results-msg">לא נמצאו תוצאות</div>
      <div class="add-custom-option" onclick="addCustomHechsher('${escapeHtml(searchValue)}')">
        + הוסף "${escapeHtml(searchValue)}" כבד"ץ חדש
      </div>
    `;
  } else {
    list.innerHTML = items.map((item, index) => {
      const highlighted = highlightMatch(item, searchValue);
      return `<div class="autocomplete-item" data-index="${index}">${highlighted}</div>`;
    }).join('');
    
    // Add click handlers
    list.querySelectorAll('.autocomplete-item').forEach(item => {
      item.addEventListener('click', function() {
        input.value = items[this.dataset.index];
        list.classList.remove('show');
      });
    });
  }
  
  list.classList.add('show');
}

function highlightMatch(text, search) {
  const regex = new RegExp(`(${escapeRegex(search)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function updateSelection(items, index) {
  items.forEach((item, i) => {
    item.classList.toggle('selected', i === index);
  });
  if (items[index]) {
    items[index].scrollIntoView({ block: 'nearest' });
  }
}

function addCustomHechsher(value) {
  const hechsherInput = document.getElementById('hechsher');
  if (hechsherInput) {
    hechsherInput.value = value;
    const list = document.querySelector('.autocomplete-list');
    if (list) list.classList.remove('show');
  }
}
