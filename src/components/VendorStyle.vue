<template>
    <notification-banner
        v-show="banner.displayed"
        :type="banner.type"
        :message="banner.message"
    ></notification-banner>

    <div class="header">
        <h1>Page Style</h1>

        <button class="actionButton" @click="submit">Save</button>
    </div>

    <label>Main Color:
        <input type="color" v-model="style.mainColor"/>
    </label>

    <label>Secondary Color:
        <input type="color" v-model="style.secondaryColor"/>
    </label>

    <label>Text Color:
        <input type="color" v-model="style.textColor"/>
    </label>
</template>

<script>
export default {
    props: ["style"],

    emits: ["updateStyle"],

    data(){
        return {
            banner: {
                displayed: false,
                type: "",
                message: ""
            }
        }
    },

    methods: {
        submit(){
            fetch("http://localhost:8000/vendor/style", {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                },
                body: JSON.stringify(this.style)
            })
                .then(r=>r.json())
                .then((response)=>{
                    if(typeof(response) === "string"){
                        this.showBanner("error", response);
                    }else{
                        this.$emit("updateStyle", response);
                        this.showBanner("success", "Page style updated");
                    }
                })
                .catch((err)=>{
                    this.showBanner("error", "Something went wrong. Try refreshing the page.");
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
 
h1{
    margin-bottom: 35px;
}

label{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: 24px;
    width: 35%;
    border-bottom: 1px solid black;
    margin-bottom: 35px;
}

input{
    cursor: pointer;
}
</style>