document.querySelectorAll('.resizer').forEach(resizer => {
    resizer.addEventListener('mousedown', startResize);
    resizer.addEventListener('touchstart', startResize);
    
    function startResize(e) {
        let th = e.target.parentElement;
        let startX = e.touches ? e.touches[0].pageX : e.pageX;
        let startWidth = th.offsetWidth;
        
        function onMove(e) {
            let moveX = e.touches ? e.touches[0].pageX : e.pageX;
            let newWidth = startWidth + (moveX - startX);
            th.style.width = newWidth + 'px';
        }
        
        function stopResize() {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', stopResize);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', stopResize);
        }
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', stopResize);
        document.addEventListener('touchmove', onMove);
        document.addEventListener('touchend', stopResize);
    }
});