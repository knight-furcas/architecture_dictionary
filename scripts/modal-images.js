document.addEventListener('DOMContentLoaded', function() {
    // Получаем объект SVG
    svgList = document.querySelectorAll('.pictures-svg-modal'); 
    

    // Ждем, пока SVG полностью загрузится
    svgList.forEach(function(svgObject) {
        svgObject.addEventListener('load', function() {
            // Получаем внутренний документ SVG
            const svgDoc = svgObject.contentDocument;
            
            
            // Находим все элементы внутри SVG, которые имеют ID (наши кликабельные зоны)
            // Лучше заранее назначить им общий класс, например .hotspot, для удобства выбора.
            const clickableElements = svgDoc.querySelectorAll('.wood_hotspot'); // или .hotspot

            // Для каждого кликабельного элемента вешаем обработчик события
            clickableElements.forEach(function(element) {
                element.addEventListener('click', function(e) {
                    clickableElements.forEach(function(element) {
                        // Вешаем обработчик на саму группу/элемент
                        element.addEventListener('click', modalClick);
                        
                        // Меняем курсор для всей группы
                        element.style.cursor = 'pointer';
                
                    });
                    
                    const modal = document.getElementById("myModal");
                    const span = document.getElementsByClassName("close")[0];
                    
                    function modalClick(event) {
                        const clickedElement = event.currentTarget;
                        const modalImg = document.getElementById("img01");
                        const captionText = document.getElementById("caption");
                        
                        modal.style.display = "block";
                        modalImg.src = clickedElement.getAttribute('data_src');
                        captionText.innerHTML = clickedElement.getAttribute('data_alt');
                    };
                    
                    // When the user clicks on <span> (x), close the modal
                    span.onclick = function() {
                        modal.style.display = "none";
                    };
                });
            });
        });
    });
});
