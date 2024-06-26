<template>
	<div>
        <div class="right-scroll" :style="{height:positionData.height+'px',top:positionData.top+'px'}" @mousedown="legendDrag('R',$event)"></div>
        <div class="bottom-scroll" :style="{width:positionData.width+'px',left:positionData.left+'px'}" @mousedown="legendDrag('B',$event)"></div>
	</div>
</template>

<script>
export default {
	props: {
		scrollData: {
			type: Object,
			default: {},
		},
	},
	data() {
		return {
            positionData:{
                top:0,
                left:0,
                width:0,
                height:0,
            }
		};
	},
    watch:{
    scrollData:{
      handler(val,old) {
    //    console.error(this.scrollData)
       if(this.scrollData.h){
        let scaleW = this.scrollData.pixiW/this.scrollData.appScale/this.scrollData.w
        let scaleH = this.scrollData.pixiH/this.scrollData.appScale/this.scrollData.h
      


        let width = Math.ceil(this.scrollData.pixiW*scaleW)>=50?Math.ceil(this.scrollData.pixiW*scaleW):50
        let height = Math.ceil(this.scrollData.pixiH*scaleH)>=50? Math.ceil(this.scrollData.pixiH*scaleH):50


        width = width>this.scrollData.pixiW?this.scrollData.pixiW:width
        height = height>this.scrollData.pixiH? this.scrollData.pixiH:height


        let boxR = (this.scrollData.h - (this.scrollData.pixiH/ this.scrollData.appScale) ) //操作计算的完全画布大小
        let boxB = (this.scrollData.w - (this.scrollData.pixiW/ this.scrollData.appScale))  

        let maxpixiR = this.scrollData.pixiH - height //操作的可滚动全部大小
        let maxpixiB = this.scrollData.pixiW - width

        let appy = Math.abs(this.scrollData.appy /this.scrollData.appScale)/boxR * maxpixiR  
        let appx = Math.abs(this.scrollData.appx /this.scrollData.appScale)/boxB * maxpixiB  
        this.positionData ={
                top:appy,
                left:appx,
                width:width,
                height:height,
                maxHeight:maxpixiR,
                maxWidth:maxpixiB,
            }
        // console.error(this.positionData)
       }
      },
      immediate: true,
      deep: true,
    }
  },
    created(){
        console.error(this.scrollData)
    },
    methods:{
        legendDrag(type,event){
            if (event.preventDefault) {
                event.preventDefault();
            } else{
                event.returnValue=false;
            };
            

            if(type==='B'){
               let left = this.positionData.left
                const startX = event.clientX;
                const move = (moveEvent) => {
                    let curX = moveEvent.clientX;
                    this.positionData.left = (curX - startX + left)>this.positionData.maxWidth?this.positionData.maxWidth: (curX - startX + left)<0?0:(curX - startX + left)
                    this.$emit('scrollPosition',{maxWidth:this.positionData.maxWidth,maxHeight:this.positionData.maxHeight,left:this.positionData.left,top:this.positionData.top})
                };
                const up = () => {
                    document.removeEventListener("mousemove", move);
                    document.removeEventListener("mouseup", up);
                };
                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", up);
            }

          

            if(type==='R'){
               let top = this.positionData.top
                const startY = event.clientY;
                const move = (moveEvent) => {
                    let curY = moveEvent.clientY;
                    this.positionData.top = (curY - startY + top)>this.positionData.maxHeight?this.positionData.maxHeight:(curY - startY + top)<0?0:(curY - startY + top)
                    this.$emit('scrollPosition',{maxWidth:this.positionData.maxWidth,maxHeight:this.positionData.maxHeight,left:this.positionData.left,top:this.positionData.top})
                };
                const up = () => {
                    document.removeEventListener("mousemove", move);
                    document.removeEventListener("mouseup", up);
                };
                document.addEventListener("mousemove", move);
                document.addEventListener("mouseup", up);
            }

            if(type==='wheel'){
                let top = this.positionData.top
                if(event.wheelDelta < 0){
                    this.positionData.top = ((this.positionData.maxHeight/20) + top)
                    if(this.positionData.top>this.positionData.maxHeight){
                        this.positionData.top = this.positionData.maxHeight
                    }
                }else{
                    this.positionData.top = ( top - (this.positionData.maxHeight/20) )
                    if(this.positionData.top<0){
                        this.positionData.top = 0
                    }
                }

                this.$emit('scrollPosition',{maxWidth:this.positionData.maxWidth,maxHeight:this.positionData.maxHeight,left:this.positionData.left,top:this.positionData.top})
            }
            
           
          
        },
    }
};
</script>

<style lang="scss" scoped>
.right-scroll{
    width: 6px;
    background: #b3b3b380;
    position: absolute;
    right: 0;
    border-radius: 4px;
    cursor: pointer;

}
.bottom-scroll{
    height: 6px;
    background: #b3b3b380;
    position: absolute;
    bottom: 0;
    border-radius: 4px;
    cursor: pointer;
}
</style>
