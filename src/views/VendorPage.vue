<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>

    <vendor-settings
        v-if="displaySettings"
        @closeSettings="closeSettings"
        @updateVendor="updateVendor"
        :vendor="this.vendor"
    ></vendor-settings>

    <div class="container" :style="{'color': vendor.style?.textColor}">
        <div class="sidebar" :style="{'background': vendor.style?.secondaryColor}">
            <home-button id="mobileHomeButton"></home-button>

            <h1>{{vendor.name}}</h1>

            <div class="sidebarDetail" v-if="vendor.email">
                <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M7 12l5 3.5 5-3.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M2 20V9.132a2 2 0 01.971-1.715l8-4.8a2 2 0 012.058 0l8 4.8A2 2 0 0122 9.132V20a2 2 0 01-2 2H4a2 2 0 01-2-2z" stroke="#ffffff" stroke-width="1.5"></path>
                </svg>

                <p>{{vendor.email}}</p>
            </div>
            
            <div class="sidebarDetail">
                <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M3.338 17A9.996 9.996 0 0012 22a9.996 9.996 0 008.662-5M3.338 7A9.996 9.996 0 0112 2a9.996 9.996 0 018.662 5M13 21.95s1.408-1.853 2.295-4.95M13 2.05S14.408 3.902 15.295 7M11 21.95S9.592 20.098 8.705 17M11 2.05S9.592 3.902 8.705 7M9 10l1.5 5 1.5-5 1.5 5 1.5-5M1 10l1.5 5L4 10l1.5 5L7 10M17 10l1.5 5 1.5-5 1.5 5 1.5-5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>

                <p>myvillage.market/{{vendor.url}}</p>

                <svg class="urlClick" @click="copyUrl" width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M19.4 20H9.6a.6.6 0 01-.6-.6V9.6a.6.6 0 01.6-.6h9.8a.6.6 0 01.6.6v9.8a.6.6 0 01-.6.6z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M15 9V4.6a.6.6 0 00-.6-.6H4.6a.6.6 0 00-.6.6v9.8a.6.6 0 00.6.6H9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>

            <div class="sidebarDetail">
                <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                    <path d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1116 0z" stroke="#ffffff" stroke-width="1.5"></path>
                    <path d="M12 11a1 1 0 100-2 1 1 0 000 2z" fill="#000000" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>

                <p v-if="loggedIn">{{vendor.address?.full}}</p>

                <div class="noVendorAddress" v-else>
                    <p v-if="vendor.address?.streetNumber">{{vendor.address.streetNumber}}</p>
                    <p v-if="vendor.address?.road">{{vendor.address.road}},</p>
                    <p v-if="vendor.address?.city">{{vendor.address.city}},</p>
                    <p v-if="vendor.address?.state">{{vendor.address.state}}</p>
                </div>
            </div>

            <div class="hours">
                <div class="sidebarDetail">
                    <svg width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                        <path d="M12 6v6h6" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>

                    <p>Hours</p>
                </div>

                <div
                    class="day"
                    v-if="vendor.hours?.sunday && vendor.hours?.sunday.open !== null"
                >
                    <p class="dayName">Sunday:</p>
                    <p class="time">{{timeFromMinutes(vendor.hours?.sunday.open)}} - {{timeFromMinutes(vendor.hours?.sunday.close)}}</p>
                </div>

                <div
                    class="day"
                    v-if="vendor.hours?.monday && vendor.hours?.monday.open !== null"
                >
                    <p class="dayName">Monday:</p>
                    <p class="time">{{timeFromMinutes(vendor.hours?.monday.open)}} - {{timeFromMinutes(vendor.hours?.monday.close)}}</p>
                </div>

                <div
                    class="day"
                    v-if="vendor.hours?.tuesday && vendor.hours?.tuesday.open !== null"
                >
                    <p class="dayName">Tuesday:</p>
                    <p class="time">{{timeFromMinutes(vendor.hours?.tuesday.open)}} - {{timeFromMinutes(vendor.hours?.tuesday.close)}}</p>
                </div>

                <div
                    class="day"
                    v-if="vendor.hours?.wednesday && vendor.hours?.wednesday.open !== null"
                >
                    <p class="dayName">Wednesday:</p>
                    <p class="time">{{timeFromMinutes(vendor.hours?.wednesday.open)}} - {{timeFromMinutes(vendor.hours?.wednesday.close)}}</p>
                </div>

                <div
                    class="day"
                    v-if="vendor.hours?.thursday && vendor.hours?.thursday.open !== null"
                >
                    <p class="dayName">Thursday:</p>
                    <p class="time">{{timeFromMinutes(vendor.hours?.thursday.open)}} - {{timeFromMinutes(vendor.hours?.thursday.close)}}</p>
                </div>

                <div
                    class="day"
                    v-if="vendor.hours?.friday && vendor.hours?.friday.open !== null"
                >
                    <p class="dayName">Friday:</p>
                    <p class="time">{{timeFromMinutes(vendor.hours?.friday.open)}} - {{timeFromMinutes(vendor.hours?.friday.close)}}</p>
                </div>

                <div
                    class="day"
                    v-if="vendor.hours?.saturday && vendor.hours?.saturday.open !== null"
                >
                    <p class="dayName">Saturday</p>
                    <p class="time">{{timeFromMinutes(vendor.hours?.saturday.open)}} - {{timeFromMinutes(vendor.hours?.saturday.close)}}</p>
                </div>
            </div>
        </div>

        <div class="contents" :style="{'background': vendor.style?.mainColor}">
            <home-button class="mainHomeBtn"></home-button>

            <svg v-if="loggedIn" @click="showSettings" class="settingsIcon" width="30px" height="30px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" color="#000000">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.735 1.483-2.707-1.113L12.935 2h-1.954l-.632 2.401-2.645 1.115L6 4 4 6l1.453 1.789-1.08 2.657L2 11v2l2.401.655L5.516 16.3 4 18l2 2 1.791-1.46 2.606 1.072L11 22h2l.604-2.387 2.651-1.098C16.697 18.831 18 20 18 20l2-2-1.484-1.75 1.098-2.652 2.386-.62V11l-2.378-.605z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>

            <h1>{{vendor.name}}</h1>

            <div v-if="vendor.photos?.length > 0" class="vendorPhotos" ref="photoContainer">
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

            <h2 class="prodTitle">AVAILABLE PRODUCTS</h2>

            <div class="products">
                <vendor-product
                    v-for="product in vendor.products"
                    :product="product"
                    :style="vendor.style"
                ></vendor-product>
            </div>
        </div>
    </div>
</template>

<script>
import VendorProduct from "../components/VendorProduct.vue";
import VendorSettings from "../components/VendorSettings.vue";
import HomeButton from "../components/HomeButton.vue";

export default {
    components: {
        VendorProduct,
        VendorSettings,
        HomeButton
    },

    data(){
        return {
            vendor: {},
            loggedIn: false,
            banner: {
                displayed: false,
                type: "",
                message: ""
            },
            displayedPhoto: 0,
            displaySettings: false
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
                let photoCount = this.vendor.photos.length;
                this.photoInterval = setInterval(()=>{
                    this.displayedPhoto = (this.displayedPhoto + 1) % photoCount;
                }, 5000);
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
            navigator.clipboard.writeText(`https://myvillage.market/${this.vendor.url}`);
            this.showBanner("success", "URL copied to clipboard");
        },
        timeFromMinutes(num){
            if(num === null) return null;
            let hours = Math.floor(num / 60);
            let minutes = num % 60;
            if(minutes < 10) minutes = `${minutes}0`;
            return `${hours}:${minutes}`;
        },
        showSettings(){
            this.displaySettings = true;
        },
        closeSettings(){
            this.displaySettings = false;
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
                .then((response)=>{
                    if(typeof(response) === "response"){
                        this.showBanner("error", response)
                    }else{
                        this.loggedIn = response.loggedIn;
                        this.vendor = response.vendor;
                    }
                })
                .catch((err)=>{
                    this.showBanner("error", "Something went wrong. Try reloading the page");
                });
        },
        updateVendor(vendor){
            this.vendor = vendor;
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
    flex-shrink: 0;
    padding: 35px;
    box-sizing: border-box;
    width: 500px;
    background: var(--secondaryColor);
}

#mobileHomeButton{
    display: none;
}

.sidebar h1{
    margin-bottom: 15px;
}

.sidebarDetail{
    display: flex;
    align-items: center;
    margin: 5px auto 5px 0;
}

.sidebarDetail svg{
    margin-right: 10px;
}

.urlClick{
    margin-left: 10px;
    cursor: pointer;
}

.noVendorAddress{
    display: flex;
}

.noVendorAddress > *{
    margin: 0 3px;
}

.hours{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
}

.day{
    display: flex;
    justify-content: flex-start;
    padding-left: 35px;
    width: 100%;
    box-sizing: border-box;
}

.dayName{
    width: 35%;
    min-width: 100px;
}

.contents{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 35px;
    overflow-y: auto;
    height: 100vh;
    box-sizing: border-box;
    position: relative;
    flex-grow: 1;
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
    flex-shrink: 0;
    position: relative;
    height: 563px;
    width: 750px;
}

.vendorPhoto{
    position: absolute;
    top: 0;
    left: 0;
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

.products{
    width: 50%;
    margin-right: auto;
}

@media screen and (max-width: 1200px){
    .vendorPhotos{
        height: 375px;
        width: 500px;
    }

    .sidebar{
        width: 300px;
        padding: 5px;
    }

    .products{
        width: 100%;
    }

    .settingsIcon{
        display: none;
    }
}

@media screen and (max-width: 800px){
    .contents{
        height: initial;
    }

    .container{
        flex-direction: column;
        height: initial;
    }

    .sidebar{
        width: 100vw;
        padding-left: 35px;
    }

    .contents h1{
        display: none;
    }

    .vendorDescription{
        line-height: initial;
        font-size: 18px;
    }
}

@media screen and (max-width: 600px){
    .mainHomeBtn{
        display: none;
    }

    #mobileHomeButton{
        display: flex;
        top: 10px;
        left: 10px;
    }

    .vendorPhotos{
        height: 240px;
        width: 320px;
    }

    .contents{
        padding: 5px;
    }
}

@media screen and (max-width: 400px){
    .sidebar{
        padding-left: 5px;
    }

    .vendorDescription{
        padding: 5px;
    }
}
</style>