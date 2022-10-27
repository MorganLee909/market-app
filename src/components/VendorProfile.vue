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

        <div class="busHours">
            <h2>Hours of Operation</h2>

            <h3>Sunday</h3>
            <div class="openClose">
                <label>Open
                    <input ref="sunOpen" type="time" :value="toHumanTime(compVendor.hours.sunday.open)"/>
                </label>
                <label>Close
                    <input ref="sunClose" type="time" :value="toHumanTime(compVendor.hours.sunday.close)"/>
                </label>
            </div>

            <h3>Monday</h3>
            <div class="openClose">
                <label>Open
                    <input ref="monOpen" type="time" :value="toHumanTime(compVendor.hours.monday.open)"/>
                </label>
                <label>Close
                    <input ref="monClose" type="time" :value="toHumanTime(compVendor.hours.monday.close)"/>
                </label>
            </div>

            <h3>Tuesday</h3>
            <div class="openClose">
                <label>Close
                    <input ref="tueClose" type="time" :value="toHumanTime(compVendor.hours.tuesday.close)"/>
                </label>
            </div>

            <h3>Wednesday</h3>
            <div class="openClose">
                <label>Open
                    <input ref="wedOpen" type="time" :value="toHumanTime(compVendor.hours.wednesday.open)"/>
                </label>
                <label>Close
                    <input ref="wedClose" type="time" :value="toHumanTime(compVendor.hours.wednesday.close)"/>
                </label>
            </div>

            <h3>Thursday</h3>
            <div class="openClose">
                <label>Open
                    <input ref="thuOpen" type="time" :value="toHumanTime(compVendor.hours.thursday.open)"/>
                </label>
                <label>Close
                    <input ref="thuClose" type="time" :value="toHumanTime(compVendor.hours.thursday.close)"/>
                </label>
            </div>

            <h3>Friday</h3>
            <div class="openClose">
                <label>Open
                    <input ref="friOpen" type="time" :value="toHumanTime(compVendor.hours.friday.open)"/>
                </label>
                <label>Close
                    <input ref="friClose" type="time" :value="toHumanTime(compVendor.hours.friday.close)"/>
                </label>
            </div>
            
            <h3>Saturday</h3>
            <div class="openClose">
                <label>Open
                    <input ref="satOpen" type="time" :value="toHumanTime(compVendor.hours.saturday.open)"/>
                </label>
                <label>Close
                    <input ref="satClose" type="time" :value="toHumanTime(compVendor.hours.saturday.close)"/>
                </label>
            </div>
        </div>
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
            data.append("hours", JSON.stringify(this.formatHours()));

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
                        this.compVendor = response;
                        this.showBanner("success", "Profile data saved");
                    }
                })
                .catch((err)=>{
                    this.showBanner("error", "Something went wrong. Try refreshing the page");
                });
        },
        formatHours(){
            let getMinutes = (time)=>{
                let split = time.split(":");
                let hours = Number(split[0]);
                let minutes = Number(split[1]);
                return (hours * 60) + minutes;
            }
            
            return {
                sunday: {
                    open: getMinutes(this.$refs.sunOpen.value),
                    close: getMinutes(this.$refs.sunClose.value)
                },
                monday: {
                    open: getMinutes(this.$refs.monOpen.value),
                    close: getMinutes(this.$refs.monClose.value)
                },
                tuesday: {
                    open: getMinutes(this.$refs.tueOpen.value),
                    close: getMinutes(this.$refs.tueClose.value)
                },
                wednesday: {
                    open: getMinutes(this.$refs.wedOpen.value),
                    close: getMinutes(this.$refs.wedClose.value)
                },
                thursday: {
                    open: getMinutes(this.$refs.thuOpen.value),
                    close: getMinutes(this.$refs.thuClose.value)
                },
                friday: {
                    open: getMinutes(this.$refs.friOpen.value),
                    close: getMinutes(this.$refs.friClose.value)
                },
                saturday: {
                    open: getMinutes(this.$refs.satOpen.value),
                    close: getMinutes(this.$refs.satClose.value)
                }
            }
        },
        toHumanTime(time){
            let hours = Math.floor(time / 60);
            hours = hours < 10 ? `0${hours}` : `${hours}`;
            let minutes = time % 60;
            minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            return `${hours}:${minutes}`;
        },
        showBanner(type, message){
            this.banner.type = type;
            this.banner.message = message;
            this.banner.displayed = true;

            setTimeout(()=>{this.banner.displayed = false}, 5000);
        }
    },
    computed:{
        humanTime(event, day, openClose){
            let time = this.vendor.hours[day][openClose];
            let hours = Math.floor(time / 60);
            hours = hours < 10 ? `0${hours}` : `${hours}`;
            let minutes = time % 60;
            minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
            return `${hours}:${minutes}`;
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

.busHours{
    margin: 10px;
}

.openClose{
    display: flex;
    margin-bottom: 10px;
}

.openClose{
    width: 50%;
}

.openClose label{
    width: 50%;
    margin-left: 0;
    margin-top: 0;
}

.openClose input{
    width: 100%;
}
</style>