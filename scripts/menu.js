class SidebarMenu {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menuToggle');
        this.closeMenu = document.getElementById('closeMenu');
        this.overlay = document.getElementById('overlay');
        
        this.init();
    }
    
    init() {
        // Открытие меню
        this.menuToggle.addEventListener('click', () => {
            this.openMenu();
        });
        
        // Закрытие меню
        this.closeMenu.addEventListener('click', () => {
            this.closeMenuHandler();
        });
        
        this.overlay.addEventListener('click', () => {
            this.closeMenuHandler();
        });
        
        // Обработка подменю
        this.initSubmenus();
        
        // Открытие элементов
        document.querySelectorAll('.link a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.showSection(targetSection);
                this.closeMenuHandler(); // Закрываем меню после выбора
            });
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenuHandler();
            }
        });
    }
    
    openMenu() {
        this.sidebar.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeMenuHandler() {
        this.sidebar.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Закрываем все подменю при закрытии основного меню
        this.closeAllSubmenus();
    }
    
    initSubmenus() {
        const submenuItems = document.querySelectorAll('.has-submenu > a');
        
        submenuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = item.parentElement;
                
                // Закрываем другие открытые подменю
                document.querySelectorAll('.has-submenu.active').forEach(activeItem => {
                    if (activeItem !== parent) {
                        activeItem.classList.remove('active');
                    }
                });
                
                // Переключаем текущее подменю
                parent.classList.toggle('active');
            });
        });
    }
    
    closeAllSubmenus() {
        document.querySelectorAll('.has-submenu.active').forEach(item => {
            item.classList.remove('active');
        });
    }
    
    showSection(sectionId) {
        // Скрываем все секции
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Показываем выбранную секцию
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        const inputChecked = targetSection.querySelector('input');
        if (inputChecked) {
            inputChecked.checked = true;
        };
        
        // Обновляем URL без перезагрузки страницы
        history.pushState(null, null, `#${sectionId}`);
    }
}

// Инициализация меню при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new SidebarMenu();
});
