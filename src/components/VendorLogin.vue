<template>
    <div @click="$emit('closeModal')" class="modal">
        <form @submit.prevent="submit" @click.stop>
            <label>Email
                <input ref="email" name="email" type="text" placeholder="Email" required/>
            </label>

            <label>Password
                <input name="pass" type="password" placeholder="Password" required/>
            </label>

            <div class="buttonContainer">
                <button class="actionButton" @click="$emit('closeModal')" type="button">Cancel</button>

                <input class="actionButton" type="submit" value="Log In"/>
            </div>

            <button type="button" class="registerButton" @click="$emit('register')">New Vendor</button>
        </form>
    </div>
</template>

<script>
export default {
    mounted(){
        this.$refs.email.focus();
    },

    emits: ["register"],

    methods: {
        submit: function(e){
            fetch(`${this.$apiRoute}/vendor/login`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: e.target.email.value,
                    password: e.target.pass.value
                })
            })
                .then(r=>r.json())
                .then((response)=>{
                    if(typeof(response) === "string"){
                        this.$emit("banner", "error", response);
                    }else{
                        localStorage.setItem("jwt", response.jwt);
                        localStorage.setItem("vendorUrl", response.vendor.url);
                        this.$router.push(`/${response.vendor.url}`);
                    }
                })
                .catch((err)=>{
                    this.$emit("banner", "error", "Internal error, please try refreshing the page.");
                });
        }
    }
}
</script>

<style scoped>
form{
    display: flex;
    flex-direction: column;
    background: white;
    padding: 35px;
    color: var(--textOnWhite);
    max-width: 750px;
}

input, textarea{
    font-size: 22px;
}

.modal label{
    display: flex;
    flex-direction: column;
    color: var(--textOnWhite);
    margin: 5px 0;
}

.buttonContainer{
    display: flex;
    justify-content: flex-end;
}

.buttonContainer > button{
    color: var(--textOnWhite);
    border: 1px solid var(--textOnWhite);
    background: none;
}

.buttonContainer input{
    margin-right: 0;
}

.registerButton{
    background: none;
    text-decoration: underline;
    border: none;
    cursor: pointer;
}

@media screen and (max-width: 600px){
    form{
        align-items: center;
        padding: 15px;
        width: 100%;
    }

    label{
        width: 300px;
    }
    
    .buttonContainer{
        flex-direction: column-reverse;
        width: 100%;
    }

    .buttonContainer > *{
        width: 100%;
        margin: 10px 0;
    }

    .registerButton{
        margin-top: 15px;
    }
}
</style>