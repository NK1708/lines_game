<template>
  <div>
    <div class="app__field">
      <div class="app__dot draggable"
           v-for="(dot, i) in dots"
           @mousedown="toDragElement"
           :id="'dot_' + (i + 1)"
           :style="{ top: dot.coordY + 'px', left: dot.coordX + 'px' }">
        {{ i + 1 }}
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
    export default {
        props: ['dots'],
        data() {
            return {
                isDragging: false,
                shiftX: '',
                shiftY: '',
                newX: '',
                newY: '',
                newBottom: '',
                dragElement: '',
                currentElement: ''
            };
        },
        methods: {
            toDragElement(event) {
                this.dragElement = event.target.closest('.draggable');

                if (!this.dragElement) return;
                event.preventDefault();
                this.startDrag(this.dragElement, event.clientX, event.clientY);
            },
            startDrag(element, clientX, clientY) {
                if(this.isDragging) {
                    return;
                }
                this.isDragging = true;
                document.addEventListener('mousemove', this.onMouseMove);
                element.addEventListener('mouseup', this.onMouseUp);
                this.shiftX = clientX - element.getBoundingClientRect().left;
                this.shiftY = clientY - element.getBoundingClientRect().top;
                element.style.position = 'fixed';
                this.moveAt(clientX, clientY, element.id);
            },
            onMouseUp() {
                this.finishDrag();
            },
            onMouseMove(event) {
                this.moveAt(event.clientX, event.clientY);
            },
            finishDrag() {
                if(!this.isDragging) {
                    return;
                }
                this.isDragging = false;
                this.dragElement.style.top = parseInt(this.dragElement.style.top) + pageYOffset + 'px';
                this.dragElement.style.position = 'absolute';
                document.removeEventListener('mousemove', this.onMouseMove);
                this.dragElement.removeEventListener('mouseup', this.onMouseUp);
            },
            moveAt(clientX, clientY, id) {

                this.newX = clientX - this.shiftX;
                this.newY = clientY - this.shiftY;
                this.newBottom = this.newY + this.dragElement.offsetHeight; // new bottom

                if (this.newBottom > document.documentElement.clientHeight) {
                    let docBottom = document.documentElement.getBoundingClientRect().bottom;
                    let scrollY = Math.min(docBottom - this.newBottom, 10);
                    if (scrollY < 0) scrollY = 0;
                    window.scrollBy(0, scrollY);
                    this.newY = Math.min(this.newY, document.documentElement.clientHeight - this.dragElement.offsetHeight);
                }
                if (this.newX > document.documentElement.clientWidth - this.dragElement.offsetWidth) {
                    this.newX = document.documentElement.clientWidth - this.dragElement.offsetWidth;
                }
                this.dragElement.style.left = this.newX + 'px';
                this.dragElement.style.top = this.newY + 'px';

                this.drawLine(id);
            },
            drawLine(id) {
                let gameField = document.querySelector('.app__field');
                let lines = document.querySelectorAll('svg');

                lines.forEach((line) => {
                    line.parentNode.removeChild(line);
                });

                this.dots.forEach((dot) => {
                    dot.dotsConnections.forEach((connection) => {
                        let connectionElement = document.querySelector('#dot_' + connection + ''),
                            startElement = document.querySelector('#dot_' + dot.dotIndex + ''),
                            x1 = parseInt(startElement.style.left),
                            y1 = parseInt(startElement.style.top),
                            x2 = parseInt(connectionElement.style.left),
                            y2 = parseInt(connectionElement.style.top);
                        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        let svgNS = svg.namespaceURI;
                        let line = document.createElementNS(svgNS,'line');

                            line.setAttribute('x1', x1 + 15);
                            line.setAttribute('y1', y1 + 15);
                            line.setAttribute('x2', x2 + 15);
                            line.setAttribute('y2', y2 + 15);
                            line.setAttribute('stroke','#D8D8D8');
                            line.setAttribute('stroke-width','4px');
                            svg.appendChild(line);
                            gameField.appendChild(svg);
                    });
                });
            }
        },
        mounted() {
            this.drawLine();
        }
    };
</script>

<style>
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .app__dot {
    position: absolute!important;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    color: #9B9FA6;
    font-weight: bold;
    background-color: #D8D8D8;
    border-radius: 50%;
    cursor: pointer;
    user-select: none;
    z-index: 1000;
  }

  .app__field {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
