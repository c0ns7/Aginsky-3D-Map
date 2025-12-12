// Глобальные переменные
let scene, camera, renderer, currentModel;
let isAutoRotating = false;
let animationId;
let currentVillage = null;
let currentObject = null;

// Элементы интерфейса
const screens = {
    main: document.getElementById('mainScreen'),
    village: document.getElementById('villageScreen'),
    object: document.getElementById('objectScreen')
};

// Инициализация приложения
function init() {
    setupEventListeners();
    renderMapScreen();
    
    // Скрываем загрузчик
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 2000);
}

// Настройка обработчиков событий
function setupEventListeners() {
    document.getElementById('backToMain').addEventListener('click', showMainScreen);
    document.getElementById('backToVillage').addEventListener('click', goBackToVillage);
    document.getElementById('resetCamera').addEventListener('click', resetCamera);
    document.getElementById('toggleAutoRotate').addEventListener('click', toggleAutoRotate);
}

// Рендер карты с точками сёл - УЛУЧШЕННАЯ ФУНКЦИЯ ДЛЯ АГИНСКОГО РАЙОНА
function renderMapScreen() {
    const container = document.querySelector('.village-points');
    container.innerHTML = '';

    // Создаем стилизованную карту Агинского района
    createDistrictMap();

    villagesData.forEach((village, index) => {
        const position = village.position || { x: '50%', y: '50%' };
        
        const villagePoint = document.createElement('div');
        villagePoint.className = 'village-point';
        villagePoint.style.left = position.x;
        villagePoint.style.top = position.y;
        villagePoint.style.opacity = '0';
        villagePoint.style.transform = 'scale(0.5)';
        villagePoint.innerHTML = `
            <div class="point-pulse" style="background: ${village.color};"></div>
            <div class="point-icon" style="background: ${village.color};">
                <span class="point-number">${village.id}</span>
            </div>
            <div class="point-label">
                <strong>${village.id}. ${village.name}</strong>
            </div>
        `;
        
        // Обработчик клика
        villagePoint.addEventListener('click', function(event) {
            event.stopPropagation();
            console.log('Клик по селу:', village.name);
            openVillageScreen(village);
        });
        
        container.appendChild(villagePoint);

        // Анимация появления точек с задержкой
        setTimeout(() => {
            villagePoint.style.opacity = '1';
            villagePoint.style.transform = 'scale(1)';
        }, index * 200 + 500);
    });

    // Обновляем легенду с номерами
    updateMapLegend();
    
    showScreen('main');
}

// Создание стилизованной карты Агинского района
function createDistrictMap() {
    const mapContainer = document.querySelector('.map-background');
    
    // Добавляем контур района
    const districtOutline = document.createElement('div');
    districtOutline.className = 'district-outline';
    districtOutline.innerHTML = `
        <div class="district-name">Агинский Бурятский район</div>
        <div class="district-border"></div>
    `;
    mapContainer.appendChild(districtOutline);
}

// Обновление легенды карты с номерами сёл
function updateMapLegend() {
    const legend = document.querySelector('.map-legend');
    
    // Очищаем существующий список
    const existingList = legend.querySelector('.villages-list');
    if (existingList) {
        existingList.remove();
    }
    
    const villagesList = document.createElement('div');
    villagesList.className = 'villages-list';
    villagesList.innerHTML = '<h4>Сёла Агинского района:</h4>' + 
        villagesData.map(village => 
            `<div class="legend-village-item" data-village-id="${village.id}">
                <span class="legend-number">${village.id}</span>
                <span class="legend-name">${village.name}</span>
            </div>`
        ).join('');
    
    // Добавляем обработчики клика для элементов списка
    villagesList.querySelectorAll('.legend-village-item').forEach(item => {
        item.addEventListener('click', function() {
            const villageId = parseInt(this.getAttribute('data-village-id'));
            const village = villagesData.find(v => v.id === villageId);
            if (village) {
                openVillageScreen(village);
            }
        });
    });
    
    legend.appendChild(villagesList);
}

let currentViewMode = 'map';

// Показать экран села (при клике на точку) - УЛУЧШЕННАЯ ФУНКЦИЯ
function openVillageScreen(village) {
    console.log('Открываем село:', village);
    
    if (village) {
        currentVillage = village;
        document.getElementById('villageName').textContent = village.name;
        
        // Показываем карту объектов по умолчанию
        showObjectsMap(village);
        
        // Скрываем сетку
        document.querySelector('.objects-grid').style.display = 'none';
    }
    
    showScreen('village');
}

function showObjectsMap(village) {
    const container = document.querySelector('.village-objects-points');
    const background = document.querySelector('.village-map-background');
    
    if (!container || !background) return;
    
    container.innerHTML = '';
    
    // Устанавливаем фоновое изображение
    background.style.backgroundImage = `url('maps/${village.name.toLowerCase()}.png')`;
    
    if (village.objects && village.objects.length > 0) {
        village.objects.forEach((obj, index) => {
            // ИСПОЛЬЗУЕМ ЗАДАННЫЕ КООРДИНАТЫ ИЛИ АВТОРАСЧЕТ
            const position = obj.position || calculateObjectPosition(index, village.objects.length);
            
            const objectPoint = document.createElement('div');
            objectPoint.className = 'object-point';
            objectPoint.style.left = position.x;
            objectPoint.style.top = position.y;
            objectPoint.style.opacity = '0';
            objectPoint.style.transform = 'scale(0.5)';
            objectPoint.dataset.objectId = obj.id;
            objectPoint.innerHTML = `
                <div class="object-point-pulse" style="background: ${getObjectColor(obj)};"></div>
                <div class="object-point-icon" style="background: ${getObjectColor(obj)};">
                    ${obj.icon}
                </div>
                <div class="object-point-label">
                    <strong>${obj.name}</strong><br>
                </div>
            `;
            
            // Обработчик клика
            objectPoint.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('Клик по объекту на карте:', obj.name);
                showObjectScreen(obj);
            });
            
            container.appendChild(objectPoint);
            
            // Анимация появления
            setTimeout(() => {
                objectPoint.style.opacity = '1';
                objectPoint.style.transform = 'scale(0.8)';
            }, index * 150);
        });
    } else {
        container.innerHTML = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; padding: 20px; background: rgba(0,0,0,0.7); border-radius: 15px; backdrop-filter: blur(10px);">
                <div style="font-size: 48px; margin-bottom: 15px;">🏞️</div>
                <h3 style="margin-bottom: 10px;">Объекты не найдены</h3>
                <p>В данном селе пока нет зарегистрированных объектов культурного наследия</p>
            </div>
        `;
    }
    
    showViewSwitcher();
}

// Функция для расчета позиций объектов на карте
function calculateObjectPosition(index, total) {
    const positions = calculateObjectPositions(total);
    return positions[index] || { x: '50%', y: '50%' };
}

function calculateObjectPositions(count) {
    const positions = [];
    
    if (count === 1) {
        positions.push({ x: '50%', y: '50%' });
    } else if (count === 2) {
        positions.push({ x: '35%', y: '50%' });
        positions.push({ x: '65%', y: '50%' });
    } else if (count === 3) {
        positions.push({ x: '50%', y: '35%' });
        positions.push({ x: '30%', y: '65%' });
        positions.push({ x: '70%', y: '65%' });
    } else if (count === 4) {
        positions.push({ x: '35%', y: '35%' });
        positions.push({ x: '65%', y: '35%' });
        positions.push({ x: '35%', y: '65%' });
        positions.push({ x: '65%', y: '65%' });
    } else {
        const rows = Math.ceil(Math.sqrt(count));
        const cols = Math.ceil(count / rows);
        
        for (let i = 0; i < count; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            
            const x = ((col + 0.5) / cols * 80 + 10) + '%';
            const y = ((row + 0.5) / rows * 80 + 10) + '%';
            
            positions.push({ x, y });
        }
    }
    
    return positions;
}

// Функция для определения цвета объекта
function getObjectColor(obj) {
    const colors = {
        '🏫': 'linear-gradient(45deg, #ff6b6b, #ffa726)',
        '🏛️': 'linear-gradient(45deg, #4ecdc4, #44a08d)',
        '⚔️': 'linear-gradient(45deg, #ffa726, #ffcc80)',
        '📿': 'linear-gradient(45deg, #ab47bc, #ce93d8)',
        '🎭': 'linear-gradient(45deg, #26c6da, #80deea)',
        '🏟️': 'linear-gradient(45deg, #66bb6a, #a5d6a7)',
        '⛺': 'linear-gradient(45deg, #ff7043, #ffab91)',
        '⛪': 'linear-gradient(45deg, #78909c, #b0bec5)',
        '🌳': 'linear-gradient(45deg, #8d6e63, #bcaaa4)',
        '🎨': 'linear-gradient(45deg, #f48fb1, #f8bbd9)',
        '🛕': 'linear-gradient(45deg, #ba68c8, #e1bee7)'
    };
    
    const icon = obj.icon || '🏫';
    return colors[icon] || 'linear-gradient(45deg, #4ecdc4, #44a08d)';
}

// Функция для показа переключателя вида
function showViewSwitcher() {
    // Удаляем старый переключатель если есть
    const oldSwitcher = document.querySelector('.map-switcher');
    if (oldSwitcher) oldSwitcher.remove();
    
    const villageScreen = document.getElementById('villageScreen');
    const switcher = document.createElement('div');
    switcher.className = 'map-switcher';
    switcher.innerHTML = `
        <button class="map-switch-btn ${currentViewMode === 'map' ? 'active' : ''}" id="showMapView">
            🗺️ Вид карты
        </button>
        <button class="map-switch-btn ${currentViewMode === 'grid' ? 'active' : ''}" id="showGridView">
            📋 Список объектов
        </button>
    `;
    
    villageScreen.insertBefore(switcher, villageScreen.children[1]);
    
    // Назначаем обработчики
    document.getElementById('showMapView').addEventListener('click', () => {
        if (currentViewMode !== 'map') {
            currentViewMode = 'map';
            document.querySelector('.village-map-container').style.display = 'block';
            document.querySelector('.objects-grid').style.display = 'none';
            document.querySelectorAll('.map-switch-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById('showMapView').classList.add('active');
            
            if (currentVillage) {
                showObjectsMap(currentVillage);
            }
        }
    });
    
    document.getElementById('showGridView').addEventListener('click', () => {
        if (currentViewMode !== 'grid') {
            currentViewMode = 'grid';
            document.querySelector('.village-map-container').style.display = 'none';
            document.querySelector('.objects-grid').style.display = 'grid';
            document.querySelectorAll('.map-switch-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById('showGridView').classList.add('active');
            
            if (currentVillage) {
                renderObjectsGrid(currentVillage);
            }
        }
    });
}

// Выносим рендер сетки в отдельную функцию
function renderObjectsGrid(village) {
    const container = document.querySelector('.objects-grid');
    container.innerHTML = '';

    if (village.objects && village.objects.length > 0) {
        village.objects.forEach((obj, index) => {
            const objectCard = document.createElement('div');
            objectCard.className = 'object-card';
            objectCard.style.opacity = '0';
            objectCard.style.transform = 'translateY(20px)';
            objectCard.innerHTML = `
                <div class="object-preview">
                    <div class="object-icon-large">${obj.icon}</div>
                    <div class="object-type">${getObjectType(obj.name)}</div>
                </div>
                <h3>${obj.name}</h3>
                <p>${obj.description || 'Объект культурного наследия'}</p>
                <div class="object-location">
                    <small>📍 ${village.name}</small>
                </div>
            `;
            
            objectCard.addEventListener('click', function() {
                showObjectScreen(obj);
            });
            
            container.appendChild(objectCard);

            setTimeout(() => {
                objectCard.style.opacity = '1';
                objectCard.style.transform = 'translateY(0)';
            }, index * 200);
        });
    } else {
        container.innerHTML = `
            <div class="no-objects">
                <div class="no-objects-icon">🏞️</div>
                <h3>Объекты культуры</h3>
                <p>В данном селе пока нет зарегистрированных объектов культурного наследия</p>
            </div>
        `;
    }
}


// Вспомогательная функция для определения типа объекта
function getObjectType(objectName) {
    const types = {
        '🛕': 'Буддийский храм',
        '🏫': 'Общественное здание', 
        '🏛️': 'Музей',
        '📿': 'Священное место',
        '🎭': 'Дом культуры',
        '⚔️': 'Памятник',
        '⛺': 'Этнографический объект',
        '⛪': 'Церковь',
        '🌳': 'Мемориал',
        '🎨': 'Культурный центр',
        '🏟️': 'Спортивный объект'
    };
    
    const icon = objectName.match(/[\p{Emoji}]/gu)?.[0];
    return types[icon] || 'Объект';
}

// Показать экран объекта
function showObjectScreen(object) {
    console.log('Открываем объект:', object);
    
    if (object) {
        currentObject = object;
        document.getElementById('objectName').textContent = object.name;
        document.getElementById('objectDescription').textContent = object.description;
        
        init3DScene();
        loadObjectModel(object.modelPath);
    }
    
    showScreen('object');
}

// Показать главный экран
function showMainScreen() {
    console.log('Возврат на главную');
    if (scene) {
        cleanup3DScene();
    }
    showScreen('main');
}

// Вернуться к селу (из просмотра объекта)
function goBackToVillage() {
    console.log('Возврат к селу:', currentVillage?.name);
    if (currentVillage) {
        cleanup3DScene();
        showScreen('village');
        
        // Восстанавливаем выбранный вид
        if (currentViewMode === 'grid') {
            document.querySelector('.village-map-container').style.display = 'none';
            document.querySelector('.objects-grid').style.display = 'grid';
        } else {
            document.querySelector('.village-map-container').style.display = 'block';
            document.querySelector('.objects-grid').style.display = 'none';
        }
    }
}

// Переключение экранов
function showScreen(screenName) {
    console.log('Переключаем экран на:', screenName);
    
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    setTimeout(() => {
        screens[screenName].classList.add('active');
    }, 50);
}

// Инициализация 3D сцены
function init3DScene() {
    if (scene) {
        cleanup3DScene();
    }

    // Создание сцены
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c1a3a);
    scene.fog = new THREE.Fog(0x0c1a3a, 10, 50);

    // Камера
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(8, 8, 8);

    // Рендерер
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const container = document.getElementById('canvasContainer');
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Освещение
    setupLighting();

    // Окружение
    setupEnvironment();

    // Управление
    setupMouseControls();

    // Запуск анимации
    animate();
}

// Настройка управления мышью - ДОРАБОТАННАЯ ВЕРСИЯ
function setupMouseControls() {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const canvas = renderer.domElement;

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        canvas.style.cursor = 'grabbing';
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };

        // Если есть модель - вращаем модель
        if (currentModel) {
            currentModel.rotation.y += deltaMove.x * 0.01;
            currentModel.rotation.x += deltaMove.y * 0.01;
        } else {
            // Если нет модели - двигаем камеру
            // Движение камеры влево-вправо (по оси X)
            camera.position.x -= deltaMove.x * 0.02;
            // Движение камеры вперед-назад (по оси Z)
            camera.position.z -= deltaMove.y * 0.02;
            
            // Сохраняем направление взгляда на центр сцены
            camera.lookAt(0, 1, 0);
        }

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
        canvas.style.cursor = 'grab';
    });

    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
        canvas.style.cursor = 'default';
    });

    canvas.addEventListener('mouseenter', () => {
        canvas.style.cursor = 'grab';
    });

    // Zoom колесиком - УЛУЧШЕННАЯ ВЕРСИЯ
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const zoomSpeed = 0.002;
        const zoomDelta = e.deltaY * zoomSpeed;
        
        if (currentModel) {
            // Zoom при просмотре модели
            const direction = new THREE.Vector3();
            camera.getWorldDirection(direction);
            
            const target = new THREE.Vector3(0, 1, 0);
            const distance = camera.position.distanceTo(target);
            
            const minDistance = 0.1;
            const maxDistance = 100;
            
            let newDistance = distance - zoomDelta * distance;
            newDistance = Math.max(minDistance, Math.min(maxDistance, newDistance));
            
            const newPosition = target.clone().addScaledVector(direction.negate(), newDistance);
            
            gsap.to(camera.position, {
                x: newPosition.x,
                y: newPosition.y,
                z: newPosition.z,
                duration: 0.1,
                ease: "power2.out"
            });
        } else {
            // Zoom при просмотре карты - движение камеры вверх-вниз
            camera.position.y -= e.deltaY * 0.01;
            camera.position.y = Math.max(5, Math.min(50, camera.position.y));
            
            // Сохраняем направление взгляда
            camera.lookAt(0, 0, 0);
        }
    });

    // ДОБАВЛЯЕМ УПРАВЛЕНИЕ С КЛАВИАТУРОЙ ДЛЯ ПЕРЕДВИЖЕНИЯ
    const keys = {};
    
    window.addEventListener('keydown', (e) => {
        keys[e.key.toLowerCase()] = true;
    });
    
    window.addEventListener('keyup', (e) => {
        keys[e.key.toLowerCase()] = false;
    });

    // Обработка движения камеры с клавиатуры
    function handleKeyboardMovement() {
        const moveSpeed = 0.5;
        
        if (keys['w'] || keys['ц'] || keys['arrowup']) {
            camera.position.z -= moveSpeed;
        }
        if (keys['s'] || keys['ы'] || keys['arrowdown']) {
            camera.position.z += moveSpeed;
        }
        if (keys['a'] || keys['ф'] || keys['arrowleft']) {
            camera.position.x -= moveSpeed;
        }
        if (keys['d'] || keys['в'] || keys['arrowright']) {
            camera.position.x += moveSpeed;
        }
        if (keys['q'] || keys['й'] || keys['pageup']) {
            camera.position.y += moveSpeed;
        }
        if (keys['e'] || keys['у'] || keys['pagedown']) {
            camera.position.y -= moveSpeed;
        }
        
        // Обновляем направление взгляда
        if (Object.keys(keys).some(key => keys[key])) {
            camera.lookAt(0, 0, 0);
        }
    }

    // Интегрируем обработку клавиатуры в анимацию
    const originalAnimate = animate;
    animate = function() {
        handleKeyboardMovement();
        originalAnimate();
    };
}

// Настройка освещения
function setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4a90e2, 0.8, 100);
    pointLight.position.set(0, 8, 0);
    scene.add(pointLight);

    const fillLight = new THREE.HemisphereLight(0x8a2be2, 0x4a90e2, 0.3);
    scene.add(fillLight);
}

// Настройка окружения
function setupEnvironment() {
    const platformGeometry = new THREE.CylinderGeometry(2.5, 2.5, 0.2, 32);
    const platformMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2c2c54,
        metalness: 0.3,
        roughness: 0.7
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -0.1;
    platform.receiveShadow = true;
    scene.add(platform);
}

// Загрузка модели объекта
function loadObjectModel(modelPath) {
    const loader = new THREE.GLTFLoader();
    
    const actualPath = getActualModelPath(modelPath);
    
    console.log('Загружаем модель по пути:', actualPath);

    if (!actualPath) {
        console.error('Путь к модели не определен:', modelPath);
        createFallbackModel();
        return;
    }

    loader.load(actualPath, (gltf) => {
        if (currentModel) {
            scene.remove(currentModel);
        }
        
        currentModel = gltf.scene;
        
        // Настройка модели
        currentModel.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                if (child.material) {
                    child.material.transparent = false;
                    child.material.opacity = 1.0;
                    child.material.visible = true;
                }
            }
        });

        // Сброс трансформаций
        currentModel.position.set(0, 0, 0);
        currentModel.rotation.set(0, 0, 0);
        currentModel.scale.set(1, 1, 1);
        
        currentModel.updateMatrixWorld(true);

        // Центрирование и масштабирование
        const box = new THREE.Box3().setFromObject(currentModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        console.log('Размеры модели:', size);

        const maxDim = Math.max(size.x, size.y, size.z);
        let scale = 1;
        
        if (maxDim > 0) {
            if (maxDim < 1) {
                scale = 5 / maxDim;
            } else if (maxDim > 10) {
                scale = 5 / maxDim;
            } else {
                scale = 3.5 / maxDim;
            }
        }

        console.log('Применяемый масштаб:', scale);

        currentModel.position.set(-center.x * scale, -center.y * scale + 1.5, -center.z * scale);
        currentModel.scale.setScalar(scale);

        scene.add(currentModel);
        
        setupCameraForModel(box, scale);
        
        console.log('Модель успешно загружена и отображена:', currentObject.name);

    }, 
    (progress) => {
        const percent = (progress.loaded / (progress.total || 1000000) * 100).toFixed(1);
        console.log(`Загрузка модели: ${percent}%`);
    },
    (error) => {
        console.error('Ошибка загрузки модели:', error);
        createFallbackModel();
    });
}

// Настройка камеры для модели
function setupCameraForModel(box, scale) {
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) * scale;
    
    let cameraDistance = Math.max(maxDim * 2, 5);
    cameraDistance = Math.min(cameraDistance, 20);
    
    const cameraPosition = new THREE.Vector3(
        cameraDistance,
        cameraDistance * 0.7,
        cameraDistance
    );
    
    gsap.to(camera.position, {
        x: cameraPosition.x,
        y: cameraPosition.y,
        z: cameraPosition.z,
        duration: 1
    });
    
    gsap.to(camera, {
        duration: 1,
        onUpdate: () => {
            camera.lookAt(0, 1, 0);
        }
    });
}

// Получение корректного пути к модели
function getActualModelPath(modelPath) {
    if (modelPath && modelPath.startsWith('models/')) {
        return modelPath;
    }
    
    const modelName = modelPath ? modelPath.split('/').pop().replace('.glb', '') : '';
    
    if (modelName && demoModels[modelName]) {
        return demoModels[modelName];
    }
    
    return modelPath;
}

// Заглушка если модель не загрузилась
function createFallbackModel() {
    console.log('Создаем заглушку модели для:', currentObject?.name);
    
    if (currentModel) {
        scene.remove(currentModel);
    }
    
    const group = new THREE.Group();
    
    const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xfeca57];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Основание
    const baseGeometry = new THREE.BoxGeometry(3, 0.5, 2);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: color,
        metalness: 0.3,
        roughness: 0.6
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = 0.25;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);
    
    // Основное здание
    const buildingGeometry = new THREE.BoxGeometry(2, 2, 1.5);
    const buildingMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffffff,
        metalness: 0.2,
        roughness: 0.5
    });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 1.5;
    building.castShadow = true;
    group.add(building);
    
    // Крыша
    const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x2c3e50,
        metalness: 0.1,
        roughness: 0.8
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 3.0;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    group.add(roof);
    
    currentModel = group;
    scene.add(currentModel);
    
    resetCamera();
    
    console.warn('Используется заглушка модели для:', currentObject?.name);
}

// Управление камерой
function resetCamera() {
    if (!camera || !currentModel) return;
    
    const box = new THREE.Box3().setFromObject(currentModel);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    let cameraDistance = Math.max(maxDim * 1.5, 5);
    
    const direction = new THREE.Vector3(-1, -0.5, -1).normalize();
    const target = new THREE.Vector3(0, 1, 0);
    
    gsap.to(camera.position, {
        x: target.x + direction.x * cameraDistance,
        y: target.y + direction.y * cameraDistance,
        z: target.z + direction.z * cameraDistance,
        duration: 1,
        onUpdate: () => {
            camera.lookAt(target);
        }
    });
    
    if (currentModel) {
        gsap.to(currentModel.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1
        });
    }
}

function toggleAutoRotate() {
    isAutoRotating = !isAutoRotating;
    const button = document.getElementById('toggleAutoRotate');
    button.textContent = isAutoRotating ? '⏸️ Стоп поворот' : '▶️ Автоповорот';
}

// Анимация
function animate() {
    animationId = requestAnimationFrame(animate);

    if (currentModel && isAutoRotating) {
        currentModel.rotation.y += 0.01;
    }

    if (camera && scene) {
        camera.lookAt(0, 1, 0);
        renderer.render(scene, camera);
    }
}

// Очистка 3D сцены
function cleanup3DScene() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    
    if (renderer) {
        renderer.dispose();
        renderer = null;
    }
    
    if (scene) {
        while(scene.children.length > 0) { 
            scene.remove(scene.children[0]); 
        }
        scene = null;
    }
    
    currentModel = null;
    isAutoRotating = false;
}

// Ресайз окна
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

function initAuthorsModal() {
    const modal = document.getElementById('authorsModal');
    const openBtn = document.getElementById('authorsBtn');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Открытие модального окна
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Закрытие при клике вне окна
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Вызвать в конце инициализации приложения:
initAuthorsModal();

// Запуск приложения
init();