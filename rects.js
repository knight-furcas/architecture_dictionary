document.addEventListener('DOMContentLoaded', function() {
    // Получаем объект SVG
    const svgObject = document.getElementById('plan');
    

    // Ждем, пока SVG полностью загрузится
    svgObject.addEventListener('load', function() {
        // Получаем внутренний документ SVG
        const svgDoc = svgObject.contentDocument;
        
        
        // Находим все элементы внутри SVG, которые имеют ID (наши кликабельные зоны)
        // Лучше заранее назначить им общий класс, например .hotspot, для удобства выбора.
        const clickableElements = svgDoc.querySelectorAll('[id].hotspot, .hotspot[id]'); // или .hotspot

        // Для каждого кликабельного элемента вешаем обработчик события
        clickableElements.forEach(function(element) {
            element.addEventListener('click', function(e) {
                clickableElements.forEach(function(element) {
                    // Вешаем обработчик на саму группу/элемент
                    element.addEventListener('click', handleSvgClick);
                    
                    // Меняем курсор для всей группы
                    element.style.cursor = 'pointer';
            
                });
                
                function handleSvgClick(event) {
                    // Останавливаем всплытие, чтобы клик не срабатывал на родительских элементах
                    event.stopPropagation();
                    
                    // event.currentTarget - это элемент, на который мы повесили обработчик (группа)
                    // event.target - это конкретный элемент, по которому кликнули (внутри группы)
                    const clickedElement = event.currentTarget;
                    const targetId = clickedElement.id;
                    
                    console.log('Клик по группе:', targetId);
                    console.log('Конкретный элемент:', event.target);
                    
                    // Прокрутка к термину в словаре
                    const targetTerm = document.getElementById(targetId);
                    if (targetTerm) {
                        targetTerm.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                        
                        // Визуальное выделение термина
                        highlightTerm(targetTerm);
                    }
                }
                
                function highlightTerm(termElement) {
                    termElement.style.transition = 'background-color 0.5s ease';
                    termElement.style.backgroundColor = '#fffde0';
                    
                    setTimeout(() => {
                        termElement.style.backgroundColor = 'transparent';
                    }, 2000);
                }
               
            });
        });
    });
});
