<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>

    <div class="header">
        <h1>Your Profile</h1>

        <button class="actionButton" @click="submit">Save</button>
    </div>

    <form ref="profileForm">
        <label>Name of Business/Owner
            <input name="name" type="text" v-model="compVendor.name"/>
        </label>

        <label>Email
            <input name="email" type="email" v-model="compVendor.email"/>
        </label>

        <label>Description
            <textarea name="description" v-model="compVendor.description"></textarea>
        </label>

        <label>Address
            <input name="address" type="text" v-model="compVendor.address.full"/>
        </label>

        <label>Your URL
            <input name="url" type="text" v-model="compVendor.url"/>
        </label>

        <label>Photos
            <input name="images" type="file" multiple/>
        </label>

        <label>Business hours
            <input name="hours" type="text"/>
        </label>
    </form>
</template>

<script>
export default {
    props: ["vendor"],

    data(){
        return {
            banner: {
                displayed: false,
                type: "",
                message: ""
            },
            compVendor: this.vendor
        }
    },

    methods: {
        submit(){
            let data = new FormData(this.$refs.profileForm);

            fetch("http://localhost:8000/vendor", {
                method: "put",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                },
                body: data
            })
                .then(r=>r.json())
                .then((response)=>{
                    if(typeof(response) === "string"){
                        this.showBanner("error", response);
                    }else{
                        this.showBanner("success", "Profile data saved");
                    }
                })
                .catch((err)=>{
                    console.log(err);
                    this.showBanner("error", "Something went wrong. Try refreshing the page");
                });
        },
        showBanner(type, message){
            this.banner.type = type;
            this.banner.message = message;
            this.banner.displayed = true;

            setTimeout(()=>{this.banner.displayed = false}, 5000);
        }
    }
}
</script>

<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
}

.actionButton{
    padding: 5px;
    width: 125px;
}

form{
    display: flex;
    flex-direction: column;
    height: 90%;
    overflow-y: auto;
}

label{
    display: flex;
    flex-direction: column;
    margin: 10px;
    font-size: 12px;
}

input, textarea{
    font-size: 22px;
    width: 50%;
}
</style>