<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>

    <div class="container">
        

        <div class="sidebar">
            <h1>{{vendor.name}}</h1>

            <p>{{vendor.email}}</p>
            
            <div class="personalUrl">
                <p>market.com/{{vendor.url}}</p>

                <svg @click="copyUrl" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M19.4 20H9.6a.6.6 0 01-.6-.6V9.6a.6.6 0 01.6-.6h9.8a.6.6 0 01.6.6v9.8a.6.6 0 01-.6.6z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M15 9V4.6a.6.6 0 00-.6-.6H4.6a.6.6 0 00-.6.6v9.8a.6.6 0 00.6.6H9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
        </div>

        <div class="contents">
            <svg class="settingsIcon" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645 1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072L11 22h2l.604-2.387 2.651-1.098C16.697 18.831 18 20 18 20l2-2-1.484-1.75 1.098-2.652 2.386-.62V11l-2.378-.605z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>

            <h1>{{vendor.name}}</h1>

            <div class="vendorPhotos">
                <img
                    v-for="(photo, i) in vendor.photos"
                    ref="vendorPhoto"
                    :key="i"
                    :src="`http://localhost:8000${photo}`"
                    alt="Vendor provided image"
                    :class="i===displayedPhoto ? 'displayPhoto vendorPhoto' : 'hidePhoto vendorPhoto'"
                />
            </div>

            <p class="vendorDescription">{{vendor.description}}</p>

            <h2 class="prodTitle">PRODUCTS</h2>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            vendor: {},
            banner: {
                displayed: false,
                type: "",
                message: ""
            },
            displayedPhoto: 0,
        }
    },

    created(){
        this.getVendorData();
    },

    beforeUnmount(){
        clearInterval(this.photoInterval);
    },

    watch: {
        vendor: {
            handler(newData, oldData){
                let photoCount = this.vendor.photos.length - 1;
                this.photoInterval = setInterval(()=>{
                    this.displayedPhoto = (this.displayedPhoto + 1) % photoCount;
                }, 5000);

                for(let i = 0; i < this.$refs.vendorPhoto.length; i++){
                    this.$refs.vendorPhoto[i].onload = ()=>{
                        this.$refs.vendorPhoto[i].style.marginLeft = `-${this.$refs.vendorPhoto[i].width / 2}px`;
                    }
                }
            },
            flush: "post"
        }
    },

    methods: {
        showBanner(type, message){
            this.banner.type = type;
            this.banner.message = message;
            this.banner.displayed = true;

            setTimeout(this.hideBanner, 5000);
        },
        hideBanner(){
            this.banner.displayed = false;
        },
        copyUrl(){
            navigator.clipboard.writeText(`https://market.com/${this.vendor.url}`);
            this.showBanner("success", "URL copied to clipboard");
        },
        getVendorData(){
            let token = localStorage.getItem("jwt");
            let headers = {"Content-Type": "application/json"};
            if(token !== null) headers["Authorization"] = `Bearer ${token}`;

            fetch(`http://localhost:8000/vendor${document.location.pathname}`, {
                method: "get",
                headers: headers,
            })
                .then(r=>r.json())
                .then((vendor)=>{
                    this.vendor = vendor;
                })
                .catch((err)=>{
                    this.showBanner("error", "Something went wrong. Try reloading the page");
                });
        }
    }
}
</script>

<style scoped>
.container{
    display: flex;
    height: 100vh;
    width: 100vw;
}

.sidebar{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 35px;
    box-sizing: border-box;
    width: 500px;
    background: var(--green);
}

.sidebar h1{
    margin-bottom: 15px;
}

.personalUrl{
    display: flex;
}

.personalUrl svg{
    margin-left: 15px;
    cursor: pointer;
}

.contents{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 35px;
    position: relative;
    overflow-y: auto;
    height: 100vh;
    box-sizing: border-box;
}

.settingsIcon{
    position: absolute;
    top: 35px;
    right: 35px;
    cursor: pointer;
    z-index: 10;
}

.contents h1{
    margin-bottom: 35px;
    font-size: 45px;
}

.vendorPhotos{
    display: flex;
    justify-content: center;
    position: relative;
    min-height: 70vh;
    width: 100%;
}

.vendorPhoto{
    position: absolute;
    top: 0;
    left: 50%;
    transition: opacity 2s;
    height: 100%;
}

.displayPhoto{
    opacity: 1;
}

.hidePhoto{
    opacity: 0;
}

.vendorDescription{
    padding: 35px;
    font-size: 22px;
    line-height: 40px;
    text-align: justify;
}

.contents h2{
    font-size: 30px;
    margin-right: auto;
}
</style>