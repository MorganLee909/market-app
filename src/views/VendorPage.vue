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
            <h1>{{vendor.name}}</h1>

            <p>{{vendor.description}}</p>
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
            }
        }
    },

    created(){
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
                console.log(this.vendor);
            })
            .catch((err)=>{
                console.error(err);
            });
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
            this.showBanner("success", "Personal URL copied to clipboard");
        }
    }
}
</script>

<style scoped>
.container{
    display: flex;
    height: 100vh;
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
}
</style>